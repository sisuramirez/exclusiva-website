<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - Exclusiva Renta Autos</title>
    <link rel="stylesheet" href="panel.css">
</head>
<body class="login-body">
    <div class="login-container">
        <div class="login-box">
            <img src="../img/exclusiva.png" alt="Logo" class="login-logo">
            <h2>Panel de Administración</h2>
            <form action="auth.php" method="POST">
                <div class="input-group">
                    <label for="username">Usuario</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="input-group">
                    <label for="password">Contraseña</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <?php
                    if (isset($_GET['error'])) {
                        echo '<p class="error-message">Usuario o contraseña incorrectos.</p>';
                    }
                ?>
                <button type="submit" class="login-button">Ingresar</button>
            </form>
        </div>
    </div>
</body>
</html>