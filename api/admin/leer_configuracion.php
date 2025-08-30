<?php
header("Content-Type: application/json; charset=UTF-8");
require_once 'conexion.php';

$sql = "SELECT clave, valor FROM configuracion";
$resultado = $conexion->query($sql);

$config = [];
if ($resultado->num_rows > 0) {
    while($fila = $resultado->fetch_assoc()) {
        $config[$fila['clave']] = $fila['valor'];
    }
}

echo json_encode($config);
$conexion->close();
?>