<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
require_once 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    $sql = "UPDATE configuracion SET valor = ? WHERE clave = ?";
    $stmt = $conexion->prepare($sql);

    // Este bucle permite actualizar múltiples ajustes a la vez si es necesario
    foreach ($data as $clave => $valor) {
        $stmt->bind_param("ss", $valor, $clave);
        $stmt->execute();
    }

    if ($stmt->error) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Error al actualizar la configuración.']);
    } else {
        echo json_encode(['status' => 'success', 'message' => 'Configuración actualizada exitosamente.']);
    }

    $stmt->close();
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido.']);
}
$conexion->close();
?>