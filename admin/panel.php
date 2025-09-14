<?php
session_start();
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header('Location: index.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de Control - Exclusiva Renta Autos</title>
    <link rel="stylesheet" href="panel.css">
</head>
<body>
    <header class="panel-header">
        <div class="container">
            <img src="../img/exclusiva.png" alt="Logo" class="panel-logo">
            <nav class="panel-nav">
                <span>Bienvenido, <?php echo htmlspecialchars($_SESSION['username']); ?></span>
                <a href="logout.php" class="logout-link">Cerrar Sesión</a>
            </nav>
        </div>
    </header>

    <main class="panel-main">
        <div class="container">
            <div class="panel-title-bar">
                <h1>Panel de Control de Vehículos</h1>
                <button id="add-vehicle-btn" class="panel-button-primary">Añadir Auto</button>
            </div>
            
            <div id="vehicle-grid" class="panel-grid">
            </div>
        </div>

        <div class="container">
            <div class="panel-title-bar">
                <h1>Configuración General</h1>
            </div>
            <div class="config-form-container">
                <div class="form-group">
                    <label for="dias-minimos-input">Días mínimos de alquiler:</label>
                    <input type="number" id="dias-minimos-input" min="1">
                </div>
                <button id="guardar-config-btn" class="panel-button-primary">Guardar Configuración</button>
            </div>
        </div>
        </main>

    <div id="vehicle-modal" class="modal-overlay" style="display: none;">
        <div class="modal-content">
            <button class="modal-close-btn" id="modal-close-btn">&times;</button>
            <h2 id="modal-title">Añadir Nuevo Vehículo</h2>
            <form id="vehicle-form" enctype="multipart/form-data">
                <input type="hidden" id="vehicle-id" name="id">
                <input type="hidden" id="url_imagen_actual" name="url_imagen_actual">
                
                <div class="form-grid">
                    <div class="form-group">
                        <label for="nombre">Nombre del Vehículo</label>
                        <input type="text" id="nombre" name="nombre" required>
                    </div>
                    <div class="form-group">
                        <label for="categoria">Categoría</label>
                        <select id="categoria" name="categoria" required>
                            <option value="Microbuses">Microbuses</option>
                            <option value="Pick-ups">Pick-ups</option>
                            <option value="SUVs">SUVs</option>
                            <option value="Sedanes">Sedanes</option>
                            <option value="Crossovers">Crossovers</option>
                        </select>
                    </div>
                    <div class="form-group price-group">
                        <label class="price-group-main-label">Precios por Rango de Días</label>
                        <div class="price-group-inputs">
                            <div class="price-input-container">
                                <label for="precio_1_2_dias">Precio 1 - 2 días</label>
                                <input type="number" id="precio_1_2_dias" step="0.01" name="precio_1_2_dias" required>
                            </div>
                            <div class="price-input-container">
                                <label for="precio_3_4_dias">Precio 3 - 4 días</label>
                                <input type="number" id="precio_3_4_dias" step="0.01" name="precio_3_4_dias" required>
                            </div>
                            <div class="price-input-container">
                                <label for="precio_5_6_dias">Precio 5 - 6 días</label>
                                <input type="number" id="precio_5_6_dias" step="0.01" name="precio_5_6_dias" required>
                            </div>
                            <div class="price-input-container">
                                <label for="precio_semana">Precio 7 - 14 días</label>
                                <input type="number" id="precio_semana" step="0.01" name="precio_semana" required>
                            </div>
                            <div class="price-input-container">
                                <label for="precio_15_dias">Precio 15 - 29 días</label>
                                <input type="number" id="precio_15_dias" step="0.01" name="precio_15_dias" required>
                            </div>
                            <div class="price-input-container">
                                <label for="precio_mes">Precio 30+ días</label>
                                <input type="number" id="precio_mes" step="0.01" name="precio_mes" required>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="imagen_archivo">Subir Imagen del Vehículo</label>
                        <input type="file" id="imagen_archivo" name="imagen_archivo" accept="image/jpeg, image/png, image/webp">
                    </div>
                    <div class="form-group">
                        <label for="espec_ac">Aire Aconidicionado</label>
                        <select id="espec_ac" name="espec_ac" required>
                            <option value="Sí">Sí</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="espec_combustible">Combustible</label>
                        <select id="espec_combustible" name="espec_combustible" required>
                            <option value="Gasolina">Gasolina</option>
                            <option value="Diesel">Diesel</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="espec_transmision">Transmisión</label>
                        <select id="espec_transmision" name="espec_transmision" required>
                            <option value="Automático">Automático</option>
                            <option value="Manual">Manual</option>
                            <option value="Manual/automático">Manual/Automático</option>
                        </select>
                    </div>
                </div>
                <div class="modal-actions">
                    <button type="submit" class="panel-button-primary">Guardar Cambios</button>
                </div>
            </form>
        </div>
    </div>

    <script src="panel.js?v=<?php echo filemtime('panel.js'); ?>"></script>
</body>
</html>