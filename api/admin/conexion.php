<?php
// Incluimos el archivo de configuración que está un nivel arriba
require_once __DIR__ . '/../config.php';

// Creamos la conexión usando las constantes definidas en config.php
$conexion = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Verificamos si la conexión tuvo éxito
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// Establecemos el juego de caracteres a UTF-8
$conexion->set_charset("utf8");

?>