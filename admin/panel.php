<?php
// Iniciamos la sesión para poder leer la variable 'loggedin'.
session_start();

// Verificamos si el usuario ha iniciado sesión.
// Si la variable de sesión 'loggedin' no existe o no es 'true',
// significa que no está autenticado.
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    // Si no está autenticado, lo redirigimos a la página de login.
    header('Location: index.php');
    // 'exit' detiene la ejecución del script para que no se muestre el HTML de abajo.
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
        <div class="panel-header-container">
            <img src="../img/logo-exclusiva-renta-autos.png" alt="Logo" class="panel-logo">
            <nav class="panel-nav">
                <span>Bienvenido, <?php echo htmlspecialchars($_SESSION['username']); ?></span>
                <a href="logout.php" class="logout-link">Cerrar Sesión</a>
            </nav>
        </div>
    </header>

    <main class="panel-main">
        <div class="panel-container">
            <div class="panel-title-bar">
                <h1>Panel de Control de Vehículos</h1>
                <button id="add-vehicle-btn" class="panel-button-primary">Añadir Vehículo</button>
            </div>
            
            <div id="vehicle-grid" class="panel-grid">
                </div>
        </div>
    </main>

    <div id="vehicle-modal" class="modal-overlay" style="display: none;">
        <div class="modal-content">
            <button class="modal-close-btn" id="modal-close-btn">&times;</button>
            <h2 id="modal-title">Añadir Nuevo Vehículo</h2>
            <form id="vehicle-form">
                <input type="hidden" id="vehicle-id" name="id">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="nombre">Nombre del Vehículo</label>
                        <input type="text" id="nombre" name="nombre" required>
                    </div>
                    <div class="form-group">
                        <label for="categoria">Categoría</label>
                        <input type="text" id="categoria" name="categoria" required>
                    </div>
                    <div class="form-group price-group">
                        <label>Precios por Rango de Días</label>
                        <input type="number" step="0.01" name="precio_1_2_dias" placeholder="Precio 1-2 días" required>
                        <input type="number" step="0.01" name="precio_3_6_dias" placeholder="Precio 3-6 días" required>
                        <input type="number" step="0.01" name="precio_semana" placeholder="Precio 1 semana" required>
                        <input type="number" step="0.01" name="precio_15_dias" placeholder="Precio 15 días" required>
                        <input type="number" step="0.01" name="precio_mes" placeholder="Precio 1 mes" required>
                    </div>
                    <div class="form-group">
                        <label for="url_imagen">URL de la Imagen</label>
                        <input type="text" id="url_imagen" name="url_imagen" required>
                    </div>
                    <div class="form-group">
                        <label for="espec_ac">Aire Acondicionado</label>
                        <input type="text" id="espec_ac" name="espec_ac" required>
                    </div>
                    <div class="form-group">
                        <label for="espec_combustible">Combustible</label>
                        <input type="text" id="espec_combustible" name="espec_combustible" required>
                    </div>
                    <div class="form-group">
                        <label for="espec_transmision">Transmisión</label>
                        <input type="text" id="espec_transmision" name="espec_transmision" required>
                    </div>
                </div>
                <div class="modal-actions">
                    <button type="submit" class="panel-button-primary">Guardar Cambios</button>
                </div>
            </form>
        </div>
    </div>

    <script src="panel.js"></script>
</body>
</html>