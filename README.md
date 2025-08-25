Proyecto: Sitio Web y Cotizador - Exclusiva Renta Autos
1. Descripción General
Este proyecto es un sitio web corporativo y una herramienta de cotización para la empresa de alquiler de vehículos "Exclusiva Renta Autos". El frontend está construido con HTML5, CSS3 y JavaScript (Vanilla JS), sin depender de frameworks. El backend consiste en una API de un solo endpoint desarrollada en PHP para gestionar las solicitudes de reserva.

La arquitectura del frontend se basa en la carga dinámica de componentes reutilizables (header y footer) mediante la API fetch de JavaScript. El backend utiliza la librería PHPMailer para el envío de correos electrónicos transaccionales.

2. Estructura del Proyecto
El proyecto se organiza en las siguientes carpetas y archivos principales:

.
├── ABOUT/                # Contiene la página "Sobre Nosotros"
│   ├── index.html        #
│   ├── doc.css           #
│   └── doc.js            #
├── COTIZACION/           # Contiene la aplicación de cotización y reserva
│   ├── index.html        # (Archivo principal del cotizador)
│   ├── quotation.css      #
│   └── quotation.js      #
├── api/                  # Backend para procesar reservas
│   ├── vendor/           # Dependencias de Composer (generada)
│   ├── templates/
│   │   └── email_template_cliente.html #
│   ├── config.php        #
│   ├── reservar.php      #
│   └── composer.json     #
├── css/                  # (No provisto, pero asumido para estilos comunes si existiera)
├── img/                  # (No provisto, pero contiene todas las imágenes)
├── js/                   # (No provisto, pero asumido para scripts comunes si existiera)
├── .htaccess             #
├── header.html           # 
├── footer.html           #
├── header-footer.css     #
├── index.html            # Página de inicio (Landing Page)
├── main.js               #
└── style.css             # (No provisto en la última carga, pero existente)
3. Dependencias
Frontend
No requiere un gestor de paquetes como npm o yarn.

Utiliza la librería flatpickr para los selectores de fecha y hora en el cotizador, que debe estar enlazada en el HTML correspondiente.

Backend
PHP 7.4 o superior.

Composer para la gestión de dependencias.

PHPMailer: La única dependencia PHP, definida en api/composer.json.

4. Configuración
Para que el proyecto funcione correctamente, es crucial configurar los siguientes archivos:

a) Configuración del Backend (SMTP)
El archivo api/config.php contiene las credenciales para conectarse al servidor de correo SMTP. Es imperativo completar estos datos para que el sistema de reservas pueda enviar correos.

api/config.php

PHP

<?php

define('SMTP_HOST', 'tu_servidor_smtp.com'); // Host de tu proveedor de correo
define('SMTP_PORT', 465);                    // Puerto (465 para SSL)
define('SMTP_USER', 'tu_usuario@tudominio.com'); // Usuario SMTP
define('SMTP_PASS', 'tu_contraseña_smtp');       // Contraseña de la aplicación o del usuario
define('SMTP_SECURE', 'ssl');                // Protocolo de seguridad (ssl o tls)

define('EMAIL_EMPRESA', 'notificaciones@tudominio.com'); // Email que recibe las notificaciones
define('NOMBRE_EMPRESA', 'Exclusiva Renta Autos');
b) Configuración de Orígenes Cruzados (CORS)
El endpoint de la API en api/reservar.php tiene un origen permitido hardcodeado para aceptar peticiones solo desde el dominio del frontend. Si el dominio cambia, esta línea debe ser actualizada.

api/reservar.php

PHP

// --- CONFIGURACIÓN DE CORS ---
$origen_permitido = 'https://tu-dominio-frontend.com'; // <-- ACTUALIZAR ESTE DOMINIO
c) Configuración del Endpoint en el Frontend
El script del cotizador COTIZACION/quotation.js contiene la URL hardcodeada del endpoint de la API. Si la ubicación de la API cambia, esta URL debe ser actualizada.

COTIZACION/quotation.js

JavaScript

// ...
const response = await fetch('https://tu-dominio.com/api/reservar.php', { // <-- ACTUALIZAR ESTA URL
    method: 'POST', 
    headers: { 'Content-Type': 'application/json' }, 
    body: JSON.stringify(data) 
});
// ...
5. Instalación y Ejecución
Clonar o descargar el proyecto en el directorio raíz de un servidor web (ej. Apache, Nginx).

Asegurarse de que el servidor tiene soporte para PHP.

Navegar al directorio /api a través de la línea de comandos: cd api.

Instalar las dependencias de PHP ejecutando: composer install. Esto creará la carpeta vendor/ y el autoloader.

Configurar las credenciales SMTP en api/config.php.

Ajustar las URLs de CORS y del endpoint si es necesario (ver punto 4).

Acceder al sitio a través del dominio configurado en el servidor web.

6. Flujo de la Aplicación
Carga de Componentes
Cada página principal (index.html, COTIZACION/index.html, ABOUT/index.html) tiene un script (main.js, quotation.js, doc.js) que ejecuta una función para cargar dinámicamente el contenido de header.html y footer.html.

Esta función usa fetch() para obtener el contenido y lo inyecta en los placeholders <header id="header-placeholder"> y <footer id="footer-placeholder">.

Una vez cargados, se inicializan los event listeners para los elementos de estos componentes (menú hamburguesa, modal de contacto, etc.).

Lógica del Cotizador (COTIZACION/quotation.js)
Datos de Vehículos: La lista de vehículos, seguros y sus precios está hardcodeada como un array de objetos JavaScript al inicio del script.

Renderizado: La función displayCars genera dinámicamente las tarjetas de los vehículos en el grid.

Cálculo: La función calculateAndDisplayQuote toma las fechas y horas para calcular el total de días y horas extra, determinando el subtotal de la renta.

Formulario de Cliente: Tras calcular el costo, el usuario avanza a un formulario donde introduce sus datos personales y selecciona seguros opcionales.

Envío a API: Al enviar el formulario, se recopilan todos los datos en un objeto JSON que se envía mediante fetch al endpoint api/reservar.php.

Proceso del Backend (api/reservar.php)
Recepción: El script recibe la petición POST con el cuerpo en formato JSON.

Correo Interno:

Crea una instancia de PHPMailer.

Genera un archivo CSV en memoria con todos los detalles de la reserva.

Envía un correo electrónico a la dirección de la empresa (EMAIL_EMPRESA) con el archivo CSV adjunto.

Correo al Cliente:

Crea una segunda instancia de PHPMailer.

Carga la plantilla HTML de templates/email_template_cliente.html.

Reemplaza los placeholders (ej. {nombreCliente}, {nombreVehiculo}) con los datos recibidos.

Envía el correo de confirmación al email del cliente.

Respuesta: Devuelve una respuesta JSON al frontend con un estado de success o error.

7. Notas del Contribuidor
Datos Hardcodeados: La lista de vehículos y sus precios está definida directamente en COTIZACION/quotation.js. Para facilitar la gestión, se podría refactorizar para que estos datos se carguen desde un archivo JSON externo o una base de datos.

Seguridad de Credenciales: Las credenciales SMTP están en api/config.php. Este archivo no debe ser expuesto públicamente. En un entorno de producción más robusto, se recomienda usar variables de entorno para gestionar estos secretos.

Manejo de Errores: El manejo de errores es básico. Se podría mejorar con un sistema de logging más detallado en el backend y mensajes de error más específicos para el usuario en el frontend.


