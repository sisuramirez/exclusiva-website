<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'] ?? '';
    $categoria = $_POST['categoria'] ?? '';
    $precio_1_2_dias = $_POST['precio_1_2_dias'] ?? 0;
    // ... Obtener todos los demás campos de $_POST ...
    
    $image_path = ''; // Inicializamos la ruta de la imagen

    // Verificamos si se subió un archivo
    if (isset($_FILES['imagen_archivo']) && $_FILES['imagen_archivo']['error'] == 0) {
        $upload_dir = '../../uploads/'; // La ruta a nuestra carpeta de subidas (sube dos niveles desde api/admin/)
        $file_name = uniqid() . '-' . basename($_FILES['imagen_archivo']['name']);
        $target_file = $upload_dir . $file_name;
        $db_path = 'uploads/' . $file_name; // Esta es la ruta que guardaremos en la BD

        // Mover el archivo subido a nuestro directorio de uploads
        if (move_uploaded_file($_FILES['imagen_archivo']['tmp_name'], $target_file)) {
            $image_path = $db_path;
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Error al mover el archivo subido.']);
            exit;
        }
    } else {
        // Si no se subió imagen, podemos asignar una por defecto o simplemente dejarlo vacío
        $image_path = 'path/to/default/image.jpg'; // Opcional: cambia esto a una imagen por defecto
    }

    // Ahora insertamos en la base de datos, usando la variable $image_path
    $sql = "INSERT INTO vehiculos (nombre, categoria, precio_1_2_dias, precio_3_6_dias, precio_semana, precio_15_dias, precio_mes, url_imagen, espec_ac, espec_combustible, espec_transmision) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $conexion->prepare($sql);
    
    $stmt->bind_param(
        "ssddddsssss", 
        $_POST['nombre'],
        $_POST['categoria'],
        $_POST['precio_1_2_dias'],
        $_POST['precio_3_6_dias'],
        $_POST['precio_semana'],
        $_POST['precio_15_dias'],
        $_POST['precio_mes'],
        $image_path, // Usamos la ruta del archivo que procesamos
        $_POST['espec_ac'],
        $_POST['espec_combustible'],
        $_POST['espec_transmision']
    );
    
    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(['status' => 'success', 'message' => 'Vehículo creado exitosamente.']);
    } else {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Error al crear el vehículo: ' . $stmt->error]);
    }
    
    $stmt->close();
    
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido.']);
}

$conexion->close();
?>