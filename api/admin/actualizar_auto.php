<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $id = $_POST['id'] ?? null;

    if ($id) {
        $image_path = $_POST['url_imagen_actual'] ?? '';

        if (isset($_FILES['imagen_archivo']) && $_FILES['imagen_archivo']['error'] == 0) {
            $upload_dir = '../../uploads/';
            $file_name = uniqid() . '-' . basename($_FILES['imagen_archivo']['name']);
            $target_file = $upload_dir . $file_name;
            $db_path = 'uploads/' . $file_name;

            if (move_uploaded_file($_FILES['imagen_archivo']['tmp_name'], $target_file)) {
                $image_path = $db_path;
            } else {
                http_response_code(500);
                echo json_encode(['status' => 'error', 'message' => 'Error al mover el nuevo archivo de imagen.']);
                exit;
            }
        }
        
        $sql = "UPDATE vehiculos SET nombre = ?, categoria = ?, precio_1_2_dias = ?, precio_3_4_dias = ?, precio_5_6_dias = ?, precio_semana = ?, precio_15_dias = ?, precio_mes = ?, url_imagen = ?, espec_ac = ?, espec_combustible = ?, espec_transmision = ? WHERE id = ?";
        
        $stmt = $conexion->prepare($sql);

        $stmt->bind_param(
            "ssddddddssssi",
            $_POST['nombre'],
            $_POST['categoria'],
            $_POST['precio_1_2_dias'],
            $_POST['precio_3_4_dias'],
            $_POST['precio_5_6_dias'],
            $_POST['precio_semana'],
            $_POST['precio_15_dias'],
            $_POST['precio_mes'],
            $image_path,
            $_POST['espec_ac'],
            $_POST['espec_combustible'],
            $_POST['espec_transmision'],
            $id
        );

        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Vehículo actualizado exitosamente.']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Error al actualizar el vehículo: ' . $stmt->error]);
        }
        
        $stmt->close();
        
    } else {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'ID del vehículo no proporcionado.']);
    }

} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido.']);
}

$conexion->close();
?>