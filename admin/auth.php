<?php
// Iniciamos la sesión para poder guardar información del usuario.
// session_start() debe ser lo primero en tus scripts que usan sesiones.
session_start();

// --- Credenciales de Administrador ---
// En un sistema real, estas credenciales vendrían de una base de datos y la contraseña estaría encriptada.
// Por ahora, para nuestro aprendizaje, las definimos directamente aquí.
define('ADMIN_USER', 'admin');
define('ADMIN_PASS', 'renta2025'); // ¡Cambia esto por algo más seguro en producción!

// Verificamos si la solicitud viene del formulario (método POST).
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    // Comparamos los datos del formulario con nuestras credenciales definidas.
    if ($username === ADMIN_USER && $password === ADMIN_PASS) {
        // Si las credenciales son correctas, guardamos una variable en la sesión.
        // Esta variable ('loggedin' = true) será nuestra "llave" para acceder a las páginas protegidas.
        $_SESSION['loggedin'] = true;
        $_SESSION['username'] = $username;

        // Redirigimos al usuario al panel principal.
        header('Location: panel.php');
        exit;
    } else {
        // Si las credenciales son incorrectas, lo devolvemos a la página de login
        // con un mensaje de error. Usamos un parámetro GET en la URL.
        header('Location: index.php?error=1');
        exit;
    }
} else {
    // Si alguien intenta acceder a auth.php directamente, lo redirigimos al login.
    header('Location: index.php');
    exit;
}
?>