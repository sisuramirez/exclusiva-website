<?php
// Indicamos que la respuesta será en formato JSON
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *"); // Ojo, en producción cambiar por el dominio real

// Incluimos el archivo de conexión
require_once 'conexion.php';

// Preparamos la consulta SQL para seleccionar todos los vehículos
// ORDER BY id ASC asegura que los resultados vengan siempre en el mismo orden
$sql = "SELECT * FROM vehiculos ORDER BY id ASC";

// Ejecutamos la consulta y obtenemos el resultado
$resultado = $conexion->query($sql);

// Creamos un array vacío para almacenar los vehículos
$vehiculos = [];

// Verificamos si la consulta devolvió filas
if ($resultado->num_rows > 0) {
    // Recorremos cada fila del resultado
    while($fila = $resultado->fetch_assoc()) {
        // Añadimos la fila (que es un array asociativo) a nuestro array de vehículos
        $vehiculos[] = $fila;
    }
}

// Convertimos el array de vehículos a formato JSON y lo imprimimos
echo json_encode($vehiculos);

// Cerramos la conexión a la base de datos
$conexion->close();

?>