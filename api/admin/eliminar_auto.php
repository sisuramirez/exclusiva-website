<?php
// Headers
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Incluimos la conexión
require_once 'conexion.php';

// Verificamos que sea una solicitud POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Obtenemos los datos (solo necesitamos el id)
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    // Verificamos que se haya proporcionado un ID
    if (!empty($data['id'])) {
        
        // La consulta es simple: borrar de la tabla donde el ID coincida
        $sql = "DELETE FROM vehiculos WHERE id = ?";
        
        $stmt = $conexion->prepare($sql);
        
        // Vinculamos el único parámetro que necesitamos: el ID.
        // "i" significa que el tipo de dato es un entero (integer).
        $stmt->bind_param("i", $data['id']);
        
        // Ejecutamos la sentencia
        if ($stmt->execute()) {
            // Verificamos si realmente se eliminó una fila
            if ($stmt->affected_rows > 0) {
                http_response_code(200); // OK
                echo json_encode(['status' => 'success', 'message' => 'Vehículo eliminado exitosamente.']);
            } else {
                // La consulta se ejecutó, pero no se encontró un vehículo con ese ID
                http_response_code(404); // Not Found
                echo json_encode(['status' => 'error', 'message' => 'No se encontró ningún vehículo con el ID proporcionado.']);
            }
        } else {
            // Error en la ejecución de la consulta
            http_response_code(500); // Internal Server Error
            echo json_encode(['status' => 'error', 'message' => 'Error al eliminar el vehículo: ' . $stmt->error]);
        }
        
        $stmt->close();

    } else {
        // Si no se proporcionó un ID en la solicitud
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