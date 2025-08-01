<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Manejar solicitud OPTIONS (pre-flight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Cargar dependencias y configuración
require 'vendor/autoload.php';
require 'config.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Verificar que la solicitud sea POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido.']);
    exit();
}

$response = ['status' => 'error', 'message' => 'Ocurrió un error inesperado.'];

try {
    // Leer el cuerpo de la solicitud JSON
    $input = json_decode(file_get_contents('php://input'), true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Error al decodificar JSON. Asegúrate de que el formato es correcto.");
    }
    
    // --- 1. PROCESAR DATOS Y ENVIAR CORREO INTERNO A LA EMPRESA ---
    
    // Configurar PHPMailer para el correo interno
    $mail_empresa = new PHPMailer(true);
    $mail_empresa->isSMTP();
    $mail_empresa->Host       = SMTP_HOST;
    $mail_empresa->SMTPAuth   = true;
    $mail_empresa->Username   = SMTP_USER;
    $mail_empresa->Password   = SMTP_PASS;
    $mail_empresa->SMTPSecure = SMTP_SECURE;
    $mail_empresa->Port       = SMTP_PORT;
    $mail_empresa->CharSet    = 'UTF-8';

    // Remitente y Destinatario
    $mail_empresa->setFrom(SMTP_USER, NOMBRE_EMPRESA);
    $mail_empresa->addAddress(EMAIL_EMPRESA); 
    $mail_empresa->addReplyTo($input['customerEmail'] ?? SMTP_USER, $input['customerName'] ?? 'Cliente');

    // Asunto y Cuerpo
    $vehiculo = $input['VehiculoSeleccionado'] ?? 'No especificado';
    $cliente = $input['customerName'] ?? 'No especificado';
    $mail_empresa->Subject = "Nueva Solicitud de Reserva: {$vehiculo} para {$cliente}";
    
    $cuerpo_html_empresa = "<h1>Nueva Solicitud de Reserva</h1>";
    $cuerpo_html_empresa .= "<p>Se ha recibido una nueva solicitud de reserva a través del cotizador web.</p>";
    $cuerpo_html_empresa .= "<ul>";
    foreach ($input as $key => $value) {
        if (is_array($value)) {
             $cuerpo_html_empresa .= "<li><strong>" . htmlspecialchars($key) . ":</strong> " . htmlspecialchars(implode(', ', $value)) . "</li>";
        } else {
             $cuerpo_html_empresa .= "<li><strong>" . htmlspecialchars($key) . ":</strong> " . htmlspecialchars($value) . "</li>";
        }
    }
    $cuerpo_html_empresa .= "</ul><p>Se adjunta un archivo CSV con los datos para el registro.</p>";
    $mail_empresa->Body = $cuerpo_html_empresa;
    $mail_empresa->isHTML(true);

    // Generar y adjuntar CSV
    $csv_header = ['FechaReserva', 'NombreCliente', 'EmailCliente', 'TelefonoCliente', 'DocumentoID', 'Licencia', 'OrigenLicencia', 'Vehiculo', 'DiasRenta', 'FechaRecogida', 'HoraRecogida', 'FechaDevolucion', 'HoraDevolucion', 'LugarEntrega', 'TotalEstimado', 'SeguroDeducible', 'SeguroAccidentes', 'Aerolinea', 'NumeroVuelo'];
    
    $seguros = $input['segurosSeleccionados'] ?? [];

    $csv_data = [
        date('Y-m-d H:i:s'),
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
        in_array('Cobertura Deducible por Pérdida y Daño', $seguros) ? 'Sí' : 'No',
        in_array('Seguro Personal de Accidente', $seguros) ? 'Sí' : 'No',
        $input['airlineName'] ?? '',
        $input['flightNumber'] ?? ''
    ];

    $csv_filename = "Reserva-{$vehiculo}-" . date('Y-m-d') . ".csv";
    
    $stream = fopen('php://memory', 'w');
    fputcsv($stream, $csv_header);
    fputcsv($stream, $csv_data);
    rewind($stream);
    $csv_content = stream_get_contents($stream);
    fclose($stream);

    $mail_empresa->addStringAttachment($csv_content, $csv_filename, 'base64', 'text/csv');

    // Enviar correo a la empresa
    $mail_empresa->send();

    // --- 2. ENVIAR CORREO DE CONFIRMACIÓN AL CLIENTE ---
    
    $mail_cliente = new PHPMailer(true);
    $mail_cliente->isSMTP();
    $mail_cliente->Host       = SMTP_HOST;
    $mail_cliente->SMTPAuth   = true;
    $mail_cliente->Username   = SMTP_USER;
    $mail_cliente->Password   = SMTP_PASS;
    $mail_cliente->SMTPSecure = SMTP_SECURE;
    $mail_cliente->Port       = SMTP_PORT;
    $mail_cliente->CharSet    = 'UTF-8';

    // Remitente y Destinatario
    $mail_cliente->setFrom(SMTP_USER, NOMBRE_EMPRESA);
    $mail_cliente->addAddress($input['customerEmail'], $input['customerName']);

    // Cargar y personalizar plantilla HTML
    $template = file_get_contents('templates/email_template_cliente.html');
    $template = str_replace('{nombreCliente}', htmlspecialchars($input['customerName'] ?? 'Cliente'), $template);
    $template = str_replace('{nombreVehiculo}', htmlspecialchars($input['VehiculoSeleccionado'] ?? ''), $template);
    $template = str_replace('{fechaRecogida}', htmlspecialchars($input['fechaRecogida'] ?? ''), $template);
    $template = str_replace('{horaRecogida}', htmlspecialchars($input['horaRecogida'] ?? ''), $template);
    $template = str_replace('{fechaDevolucion}', htmlspecialchars($input['fechaDevolucion'] ?? ''), $template);
    $template = str_replace('{horaDevolucion}', htmlspecialchars($input['horaDevolucion'] ?? ''), $template);
    $template = str_replace('{lugarEntrega}', htmlspecialchars($input['delivery-location'] ?? ''), $template);
    $template = str_replace('{totalEstimado}', htmlspecialchars($input['TotalFinalEstimado'] ?? ''), $template);
    $template = str_replace('{emailEmpresa}', EMAIL_EMPRESA, $template);

    $mail_cliente->isHTML(true);
    $mail_cliente->Subject = 'Confirmación de tu Solicitud de Reserva en ' . NOMBRE_EMPRESA;
    $mail_cliente->Body = $template;
    $mail_cliente->addEmbeddedImage('templates/logo.png', 'logo');

    // Enviar correo al cliente
    $mail_cliente->send();


    // --- 3. DEVOLVER RESPUESTA DE ÉXITO ---

    http_response_code(200);
    $response = ['status' => 'success', 'message' => 'Reserva procesada exitosamente.'];

} catch (Exception $e) {
    http_response_code(500);
    // Para depuración: $response['error_details'] = $e->getMessage();
    $response['message'] = "No se pudo procesar la solicitud. Error: {$e->getMessage()}";
}

echo json_encode($response);