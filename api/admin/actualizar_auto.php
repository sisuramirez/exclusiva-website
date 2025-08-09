<?php
// Headers para permitir el acceso y definir el tipo de contenido
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Incluimos la conexión
require_once 'conexion.php';

// Verificamos que sea una solicitud POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Obtenemos los datos del cuerpo de la solicitud
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    // Es FUNDAMENTAL verificar que tengamos un ID para saber qué actualizar
    if (!empty($data['id'])) {
        
        // La consulta SQL para actualizar. Fíjate en el "WHERE id = ?" al final.
        $sql = "UPDATE vehiculos SET 
                    nombre = ?, 
                    categoria = ?, 
                    precio_1_2_dias = ?, 
                    precio_3_6_dias = ?, 
                    precio_semana = ?, 
                    precio_15_dias = ?, 
                    precio_mes = ?, 
                    url_imagen = ?, 
                    espec_ac = ?, 
                    espec_combustible = ?, 
                    espec_transmision = ?
                WHERE id = ?";
        
        $stmt = $conexion->prepare($sql);

        // Vinculamos todos los parámetros, incluyendo el ID al final.
        // La 'i' al final corresponde al tipo integer del id.
        $stmt->bind_param(
            "ssddddsssssi",
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
            $data['espec_transmision'],
            $data['id'] // El ID para el WHERE
        );

        // Ejecutamos la consulta
        if ($stmt->execute()) {
            // Verificamos si alguna fila fue realmente afectada
            if ($stmt->affected_rows > 0) {
                http_response_code(200); // OK
                echo json_encode(['status' => 'success', 'message' => 'Vehículo actualizado exitosamente.']);
            } else {
                // Se ejecutó bien, pero no se encontró el ID o los datos eran los mismos
                http_response_code(200); // Todavía es una solicitud exitosa
                echo json_encode(['status' => 'info', 'message' => 'No se encontraron cambios o el vehículo no existe.']);
            }
        } else {
            // Error en la ejecución
            http_response_code(500); // Internal Server Error
            echo json_encode(['status' => 'error', 'message' => 'Error al actualizar el vehículo: ' . $stmt->error]);
        }
        
        $stmt->close();
        
    } else {
        // Si no se envió un ID
        http_response_code(400); // Bad Request
        echo json_encode(['status' => 'error', 'message' => 'ID del vehículo no proporcionado.']);
    }

} else {
    // Si el método no es POST
    http_response_code(405); // Method Not Allowed
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido.']);
}

$conexion->close();
?>