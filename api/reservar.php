<?php
// ==========================================================
// == API DE RESERVAS v2 - Exclusiva Renta Autos           ==
// ==========================================================

// --- CONFIGURACIÓN DE CORS (Cross-Origin Resource Sharing) ---
$origen_permitido = 'https://fastidious-raindrop-ccb903.netlify.app';

if (isset($_SERVER['HTTP_ORIGIN']) && $_SERVER['HTTP_ORIGIN'] === $origen_permitido) {
    header("Access-Control-Allow-Origin: " . $origen_permitido);
}

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Cargar dependencias y configuración
require 'vendor/autoload.php';
require 'config.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// --- FUNCIONES DE FORMATO (NUEVO) ---
function formatSpanishDate($dateStr) {
    if (empty($dateStr)) return '';
    // Habilitar el locale en español para que los nombres de los meses salgan correctamente.
    setlocale(LC_TIME, 'es_ES.UTF-8', 'Spanish_Spain.1252');
    $date = new DateTime($dateStr);
    // Usamos IntlDateFormatter para un formato localizado robusto.
    $formatter = new IntlDateFormatter('es_ES', IntlDateFormatter::LONG, IntlDateFormatter::NONE);
    return $formatter->format($date);
}

function formatAmPmTime($timeStr) {
    if (empty($timeStr)) return '';
    $date = new DateTime($timeStr);
    return $date->format('h:i A');
}


try {
    $input = json_decode(file_get_contents('php://input'), true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Error al decodificar los datos JSON.");
    }
    
    // ==========================================================
    // == 1. ENVIAR CORREO INTERNO A LA EMPRESA CON CSV        ==
    // ==========================================================
    
    $mail_empresa = new PHPMailer(true);
    $mail_empresa->isSMTP();
    $mail_empresa->Host       = SMTP_HOST;
    $mail_empresa->SMTPAuth   = true;
    $mail_empresa->Username   = SMTP_USER;
    $mail_empresa->Password   = SMTP_PASS;
    $mail_empresa->SMTPSecure = SMTP_SECURE;
    $mail_empresa->Port       = SMTP_PORT;
    $mail_empresa->CharSet    = 'UTF-8';

    $mail_empresa->setFrom(SMTP_USER, NOMBRE_EMPRESA);
    $mail_empresa->addAddress(EMAIL_EMPRESA); 
    $mail_empresa->addReplyTo($input['customerEmail'] ?? SMTP_USER, $input['customerName'] ?? 'Cliente');

    $vehiculo = $input['VehiculoSeleccionado'] ?? 'N/A';
    $cliente = $input['customerName'] ?? 'N/A';
    $mail_empresa->Subject = "Nueva Solicitud de Reserva: {$vehiculo} para {$cliente}";
    
    $cuerpo_html_empresa = "<h1>Nueva Solicitud de Reserva</h1><p>Se ha recibido una nueva solicitud. Se adjunta un archivo CSV con los datos.</p>";
    $mail_empresa->Body = $cuerpo_html_empresa;
    $mail_empresa->isHTML(true);

    // --- Generación del archivo CSV (ACTUALIZADO) ---
    $csv_header = ['Fecha de Reserva', 'Nombre del Cliente', 'Email del Cliente', 'Teléfono', 'No. de Documento', 'No. de Licencia', 'País de Licencia', 'Vehículo Solicitado', 'Días de Renta', 'Fecha de Recogida', 'Hora de Recogida', 'Fecha de Devolución', 'Hora de Devolución', 'Lugar de Entrega', 'Total Estimado', 'Seguro LWD', 'Seguro PAI', 'Aerolínea', 'No. de Vuelo'];
    
    $seguros = $input['segurosSeleccionados'] ?? [];
    // Comprobar cada seguro individualmente
    $seguro_lwd = in_array('Cobertura Deducible por Pérdida y Daño', $seguros) ? 'Sí' : 'No';
    $seguro_pai = in_array('Seguro Personal de Accidente', $seguros) ? 'Sí' : 'No';

    $csv_data = [
        date('d/m/Y H:i:s'),
        $input['customerName'] ?? '',
        $input['customerEmail'] ?? '',
        ($input['countryCode'] ?? '') . ' ' . ($input['customerPhone'] ?? ''),
        $input['customerId'] ?? '',
        $input['customerLicense'] ?? '',
        ($input['license-origin'] === 'Otros') ? ($input['licenseOriginOther'] ?? '') : ($input['license-origin'] ?? ''),
        $input['VehiculoSeleccionado'] ?? '',
        $input['DiasDeRenta'] ?? '',
        $input['fechaRecogida'] ?? '',
        $input['horaRecogida'] ?? '',
        $input['fechaDevolucion'] ?? '',
        $input['horaDevolucion'] ?? '',
        $input['delivery-location'] ?? '',
        $input['TotalFinalEstimado'] ?? '',
        $seguro_lwd, // Nueva columna
        $seguro_pai, // Nueva columna
        $input['airlineName'] ?? '',
        $input['flightNumber'] ?? ''
    ];

    $csv_filename = "Reserva-{$vehiculo}-" . date('Y-m-d') . ".csv";
    $stream = fopen('php://memory', 'w+');
    fprintf($stream, chr(0xEF).chr(0xBB).chr(0xBF)); // BOM para compatibilidad con Excel en español
    fputcsv($stream, $csv_header);
    fputcsv($stream, $csv_data);
    rewind($stream);
    $csv_content = stream_get_contents($stream);
    fclose($stream);

    $mail_empresa->addStringAttachment($csv_content, $csv_filename, 'base64', 'text/csv');
    $mail_empresa->send();

    // ==========================================================
    // == 2. ENVIAR CORREO DE CONFIRMACIÓN AL CLIENTE          ==
    // ==========================================================
    
    $mail_cliente = new PHPMailer(true);
    // (La configuración SMTP se repite, esto es normal y seguro)
    $mail_cliente->isSMTP();
    $mail_cliente->Host       = SMTP_HOST;
    $mail_cliente->SMTPAuth   = true;
    $mail_cliente->Username   = SMTP_USER;
    $mail_cliente->Password   = SMTP_PASS;
    $mail_cliente->SMTPSecure = SMTP_SECURE;
    $mail_cliente->Port       = SMTP_PORT;
    $mail_cliente->CharSet    = 'UTF-8';

    $mail_cliente->setFrom(SMTP_USER, NOMBRE_EMPRESA);
    $mail_cliente->addAddress($input['customerEmail'], $input['customerName']);

    // Cargar plantilla y reemplazar placeholders (ACTUALIZADO con nuevos formatos)
    $template = file_get_contents('templates/email_template_cliente.html');
    $placeholders = [
        '{nombreCliente}'   => htmlspecialchars($input['customerName'] ?? 'Cliente'),
        '{nombreVehiculo}'  => htmlspecialchars($input['VehiculoSeleccionado'] ?? ''),
        '{fechaRecogida}'   => formatSpanishDate($input['fechaRecogida'] ?? ''),
        '{horaRecogida}'    => formatAmPmTime($input['horaRecogida'] ?? ''),
        '{fechaDevolucion}' => formatSpanishDate($input['fechaDevolucion'] ?? ''),
        '{horaDevolucion}'  => formatAmPmTime($input['horaDevolucion'] ?? ''),
        '{lugarEntrega}'    => htmlspecialchars($input['delivery-location'] ?? ''),
        '{totalEstimado}'   => htmlspecialchars($input['TotalFinalEstimado'] ?? ''),
        '{emailEmpresa}'    => EMAIL_EMPRESA,
    ];
    $body_cliente = str_replace(array_keys($placeholders), array_values($placeholders), $template);

    $mail_cliente->isHTML(true);
    $mail_cliente->Subject = 'Confirmación de tu Solicitud de Reserva en ' . NOMBRE_EMPRESA;
    $mail_cliente->Body = $body_cliente;
    $mail_cliente->addEmbeddedImage('templates/logo.png', 'logo');
    $mail_cliente->send();

    // ==========================================================
    // == 3. DEVOLVER RESPUESTA DE ÉXITO AL FRONTEND           ==
    // ==========================================================
    http_response_code(200);
    echo json_encode(['status' => 'success', 'message' => 'Reserva procesada exitosamente.']);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error', 
        'message' => 'No se pudo procesar la solicitud.',
        'error_details' => $e->getMessage()
    ]);
}