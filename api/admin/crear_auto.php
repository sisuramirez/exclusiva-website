<?php
// Indicamos que la respuesta será en formato JSON
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *"); // Permite recibir solicitudes desde cualquier origen. Para producción, deberías restringirlo a tu dominio.
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Incluimos nuestro archivo de conexión
require_once 'conexion.php';

// Verificamos que la solicitud sea por el método POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Obtenemos el cuerpo de la solicitud (que debería ser JSON)
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    // Verificamos que los datos necesarios no estén vacíos
    if (!empty($data['nombre']) && !empty($data['categoria']) && isset($data['precio_1_2_dias'])) {
        
        // Preparamos la consulta SQL para insertar los datos
        // Usamos '?' como marcadores de posición para prevenir inyección SQL
        $sql = "INSERT INTO vehiculos (nombre, categoria, precio_1_2_dias, precio_3_6_dias, precio_semana, precio_15_dias, precio_mes, url_imagen, espec_ac, espec_combustible, espec_transmision) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        // Preparamos la sentencia
        $stmt = $conexion->prepare($sql);
        
        // Vinculamos los parámetros
        // La cadena 'ssddddsssss' especifica el tipo de cada variable:
        // s = string (texto)
        // d = double (número decimal)
        $stmt->bind_param(
            "ssddddsssss", 
            $data['nombre'],
            $data['categoria'],
            $data['precio_1_2_dias'],
            $data['precio_3_6_dias'],
            $data['precio_semana'],
            $data['precio_15_dias'],
            $data['precio_mes'],
            $data['url_imagen'],
            $data['espec_ac'],
            $data['espec_combustible'],
            $data['espec_transmision']
        );
        
        // Ejecutamos la sentencia
        if ($stmt->execute()) {
            // Si la ejecución fue exitosa, enviamos una respuesta de éxito
            http_response_code(201); // 201 Created
            echo json_encode(['status' => 'success', 'message' => 'Vehículo creado exitosamente.']);
        } else {
            // Si hubo un error en la ejecución
            http_response_code(500); // 500 Internal Server Error
            echo json_encode(['status' => 'error', 'message' => 'Error al crear el vehículo: ' . $stmt->error]);
        }
        
        // Cerramos la sentencia
        $stmt->close();
        
    } else {
        // Si faltan datos en la solicitud
        http_response_code(400); // 400 Bad Request
        echo json_encode(['status' => 'error', 'message' => 'Datos incompletos. Por favor, verifica la información.']);
    }
    
} else {
    // Si el método no es POST
    http_response_code(405); // 405 Method Not Allowed
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido.']);
}

// Cerramos la conexión a la base de datos
$conexion->close();

?>