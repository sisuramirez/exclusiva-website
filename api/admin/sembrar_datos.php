<?php
// Incluimos la conexión a la base de datos
require_once 'conexion.php';

echo "<h1>Iniciando siembra de datos...</h1>";

try {
    // PRECAUCIÓN: Esta línea borrará TODOS los datos existentes en la tabla 'vehiculos'.
    // Esto es útil para poder ejecutar el script varias veces sin duplicar datos.
    // Si ya tienes datos importantes, comenta o elimina la siguiente línea.
    $conexion->query("TRUNCATE TABLE vehiculos");
    echo "<p>Tabla 'vehiculos' vaciada correctamente.</p>";

    // Este es tu array 'carsData' de JavaScript, traducido a un array asociativo de PHP.
    // He ajustado los nombres de las claves para que coincidan con las columnas de tu base de datos.
    $vehiculos_a_insertar = [
        ["nombre" => "Toyota Hiace", "categoria" => "Microbuses", "precio_1_2_dias" => 94.05, "precio_3_6_dias" => 70.24, "precio_semana" => 58.33, "precio_15_dias" => 52.38, "precio_mes" => 41.67, "url_imagen" => "uploads/hiace.png", "espec_ac" => "Sí", "espec_combustible" => "Diésel", "espec_transmision" => "Manual"],
        ["nombre" => "Nissan Urvan", "categoria" => "Microbuses", "precio_1_2_dias" => 94.05, "precio_3_6_dias" => 70.24, "precio_semana" => 58.33, "precio_15_dias" => 52.38, "precio_mes" => 41.67, "url_imagen" => "uploads/urvan.png", "espec_ac" => "Sí", "espec_combustible" => "Diésel", "espec_transmision" => "Manual"],
        ["nombre" => "Hyundai H1", "categoria" => "Microbuses", "precio_1_2_dias" => 70.24, "precio_3_6_dias" => 58.33, "precio_semana" => 52.38, "precio_15_dias" => 46.43, "precio_mes" => 34.52, "url_imagen" => "uploads/h1.png", "espec_ac" => "Sí", "espec_combustible" => "Diésel", "espec_transmision" => "Automático/Manual"],
        ["nombre" => "Hyundai Staria", "categoria" => "Microbuses", "precio_1_2_dias" => 82.14, "precio_3_6_dias" => 70.24, "precio_semana" => 58.33, "precio_15_dias" => 52.38, "precio_mes" => 40.48, "url_imagen" => "uploads/staria.png", "espec_ac" => "Sí", "espec_combustible" => "Diésel", "espec_transmision" => "Automático/Manual"],
        ["nombre" => "Toyota Fortuner", "categoria" => "SUVs", "precio_1_2_dias" => 97.62, "precio_3_6_dias" => 82.14, "precio_semana" => 70.24, "precio_15_dias" => 58.33, "precio_mes" => 46.43, "url_imagen" => "uploads/fortuner.png", "espec_ac" => "Sí", "espec_combustible" => "Diésel", "espec_transmision" => "Automático"],
        ["nombre" => "Mitsubishi Montero", "categoria" => "SUVs", "precio_1_2_dias" => 82.14, "precio_3_6_dias" => 70.24, "precio_semana" => 58.33, "precio_15_dias" => 52.38, "precio_mes" => 40.48, "url_imagen" => "uploads/montero.png", "espec_ac" => "Sí", "espec_combustible" => "Diésel", "espec_transmision" => "Automático"],
        ["nombre" => "Hyundai Santa Fe", "categoria" => "SUVs", "precio_1_2_dias" => 70.24, "precio_3_6_dias" => 58.33, "precio_semana" => 52.38, "precio_15_dias" => 46.43, "precio_mes" => 34.52, "url_imagen" => "uploads/santafe.png", "espec_ac" => "Sí", "espec_combustible" => "Gasolina", "espec_transmision" => "Automático"],
        ["nombre" => "Mitsubishi Outlander", "categoria" => "SUVs", "precio_1_2_dias" => 70.24, "precio_3_6_dias" => 58.33, "precio_semana" => 52.38, "precio_15_dias" => 46.43, "precio_mes" => 34.52, "url_imagen" => "uploads/outlander.png", "espec_ac" => "Sí", "espec_combustible" => "Gasolina", "espec_transmision" => "Automático"],
        ["nombre" => "Toyota Hilux", "categoria" => "Pick-ups", "precio_1_2_dias" => 82.14, "precio_3_6_dias" => 70.24, "precio_semana" => 64.29, "precio_15_dias" => 58.33, "precio_mes" => 46.43, "url_imagen" => "uploads/hilux.png", "espec_ac" => "Sí", "espec_combustible" => "Diésel", "espec_transmision" => "Automático/Manual"],
        ["nombre" => "Mitsubishi L200", "categoria" => "Pick-ups", "precio_1_2_dias" => 82.14, "precio_3_6_dias" => 70.24, "precio_semana" => 64.29, "precio_15_dias" => 58.33, "precio_mes" => 46.43, "url_imagen" => "uploads/l200.png", "espec_ac" => "Sí", "espec_combustible" => "Diésel", "espec_transmision" => "Manual/Automático"],
        ["nombre" => "Nissan Frontier", "categoria" => "Pick-ups", "precio_1_2_dias" => 82.14, "precio_3_6_dias" => 70.24, "precio_semana" => 64.29, "precio_15_dias" => 58.33, "precio_mes" => 46.43, "url_imagen" => "uploads/frontier.png", "espec_ac" => "Sí", "espec_combustible" => "Diésel", "espec_transmision" => "Automático/Manual"],
        ["nombre" => "Hyundai Creta", "categoria" => "Crossovers", "precio_1_2_dias" => 58.33, "precio_3_6_dias" => 46.43, "precio_semana" => 40.48, "precio_15_dias" => 34.52, "precio_mes" => 28.57, "url_imagen" => "uploads/creta.png", "espec_ac" => "Sí", "espec_combustible" => "Gasolina", "espec_transmision" => "Automático"],
        ["nombre" => "Nissan Kicks", "categoria" => "Crossovers", "precio_1_2_dias" => 46.43, "precio_3_6_dias" => 40.48, "precio_semana" => 34.52, "precio_15_dias" => 28.57, "precio_mes" => 22.62, "url_imagen" => "uploads/kicks.png", "espec_ac" => "Sí", "espec_combustible" => "Gasolina", "espec_transmision" => "Automático"],
        ["nombre" => "Kia Sonet", "categoria" => "Crossovers", "precio_1_2_dias" => 46.43, "precio_3_6_dias" => 40.48, "precio_semana" => 34.52, "precio_15_dias" => 28.57, "precio_mes" => 22.62, "url_imagen" => "uploads/sonet.png", "espec_ac" => "Sí", "espec_combustible" => "Gasolina", "espec_transmision" => "Automático"],
        ["nombre" => "Kia Rio", "categoria" => "Sedanes", "precio_1_2_dias" => 40.48, "precio_3_6_dias" => 34.52, "precio_semana" => 28.57, "precio_15_dias" => 22.62, "precio_mes" => 20.24, "url_imagen" => "uploads/rio.png", "espec_ac" => "Sí", "espec_combustible" => "Gasolina", "espec_transmision" => "Automático"],
        ["nombre" => "Hyundai Verna", "categoria" => "Sedanes", "precio_1_2_dias" => 40.48, "precio_3_6_dias" => 34.52, "precio_semana" => 28.57, "precio_15_dias" => 22.62, "precio_mes" => 20.24, "url_imagen" => "uploads/verna.png", "espec_ac" => "Sí", "espec_combustible" => "Gasolina", "espec_transmision" => "Automático"],
        ["nombre" => "Kia Soluto", "categoria" => "Sedanes", "precio_1_2_dias" => 35.12, "precio_3_6_dias" => 29.17, "precio_semana" => 23.81, "precio_15_dias" => 20.24, "precio_mes" => 17.26, "url_imagen" => "uploads/soluto.png", "espec_ac" => "Sí", "espec_combustible" => "Gasolina", "espec_transmision" => "Automático"],
        ["nombre" => "Hyundai Stargazer", "categoria" => "Crossovers", "precio_1_2_dias" => 52.38, "precio_3_6_dias" => 40.48, "precio_semana" => 34.52, "precio_15_dias" => 28.57, "precio_mes" => 22.62, "url_imagen" => "uploads/stargazer.png", "espec_ac" => "Sí", "espec_combustible" => "Gasolina", "espec_transmision" => "Automático"]
    ];

    
    $sql = "INSERT INTO vehiculos (nombre, categoria, precio_1_2_dias, precio_3_6_dias, precio_semana, precio_15_dias, precio_mes, url_imagen, espec_ac, espec_combustible, espec_transmision, activo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conexion->prepare($sql);

    // Verificamos si la preparación de la consulta fue exitosa
    if ($stmt === false) {
        throw new Exception("Error al preparar la consulta: " . $conexion->error);
    }
    
    $activo_default = true; // Todos los vehículos se insertarán como activos

    // Recorremos cada vehículo del array
    foreach ($vehiculos_a_insertar as $vehiculo) {
        echo "<p>Insertando: " . htmlspecialchars($vehiculo['nombre']) . "... ";

        // Vinculamos los parámetros para cada vehículo.
        $stmt->bind_param(
            "ssddddsssssi",
            $vehiculo['nombre'],
            $vehiculo['categoria'],
            $vehiculo['precio_1_2_dias'],
            $vehiculo['precio_3_6_dias'],
            $vehiculo['precio_semana'],
            $vehiculo['precio_15_dias'],
            $vehiculo['precio_mes'],
            $vehiculo['url_imagen'],
            $vehiculo['espec_ac'],
            $vehiculo['espec_combustible'],
            $vehiculo['espec_transmision'],
            $activo_default
        );
        
        // Ejecutamos la inserción
        if ($stmt->execute()) {
            echo "<span style='color:green;'>¡Éxito!</span></p>";
        } else {
            echo "<span style='color:red;'>Error: " . htmlspecialchars($stmt->error) . "</span></p>";
        }
    }

    echo "<h2>¡Proceso de siembra completado!</h2>";
    
    // Cerramos la sentencia y la conexión
    $stmt->close();
    $conexion->close();

} catch (Exception $e) {
    // Capturamos cualquier error y lo mostramos
    echo "<h2 style='color:red;'>Ha ocurrido un error fatal: " . htmlspecialchars($e->getMessage()) . "</h2>";
}
?>