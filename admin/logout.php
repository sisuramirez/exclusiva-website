<?php
// Iniciamos la sesión para poder acceder a ella.
session_start();

// session_unset() elimina todas las variables de la sesión (como 'loggedin' y 'username').
session_unset();

// session_destroy() destruye la sesión por completo.
session_destroy();

// Redirigimos al usuario a la página de login.
header('Location: index.php');
exit;
?>