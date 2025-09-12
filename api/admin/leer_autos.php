<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

require_once 'conexion.php';

$sql = "SELECT id, nombre, categoria, precio_1_2_dias, precio_3_4_dias, precio_5_6_dias, precio_semana, precio_15_dias, precio_mes, url_imagen, espec_ac, espec_combustible, espec_transmision, activo FROM vehiculos ORDER BY id ASC";

$resultado = $conexion->query($sql);

$vehiculos = [];

if ($resultado->num_rows > 0) {
    while($fila = $resultado->fetch_assoc()) {
        $vehiculos[] = $fila;
    }
}

echo json_encode($vehiculos);

$conexion->close();

?>