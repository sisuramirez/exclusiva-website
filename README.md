Panel de Administración de Flota - Exclusiva Renta Autos
1. Descripción General
Este proyecto es un sistema web integral para la empresa de alquiler de vehículos "Exclusiva Renta Autos". La arquitectura ha evolucionado para incluir no solo un sitio público dinámico, sino también un panel de administración de contenido (CMS) robusto para la gestión de la flota de vehículos.

El sistema se compone de dos partes principales:

Sitio Público: Construido con HTML5, CSS3 y JavaScript (Vanilla JS). La sección del catálogo de vehículos ahora es completamente dinámica, cargando la información directamente desde una base de datos MySQL. El sistema de reservas original se mantiene, utilizando PHPMailer para las notificaciones por correo.

Panel de Administración (CRUD): Una nueva sección privada y protegida por login que permite al personal de la empresa realizar operaciones de Crear, Leer, Actualizar y Eliminar (CRUD) sobre el catálogo de vehículos, incluyendo la subida de imágenes. Los cambios se reflejan instantáneamente en el sitio público.

El backend se ha expandido a una API RESTful básica en PHP que se comunica con una base de datos MySQL, utilizando sentencias preparadas para garantizar la seguridad.

2. Estructura del Proyecto
La estructura ha sido actualizada para incluir el panel de administración y la carpeta de subidas.

.
├── admin/                  # Interfaz del Panel de Administración (NUEVO)
│   ├── index.php           # Página de login
│   ├── panel.php           # Dashboard principal del CRUD
│   ├── panel.css           # Estilos para el panel
│   ├── panel.js            # Lógica JS del panel
│   ├── auth.php            # Script de autenticación
│   └── logout.php          # Script de cierre de sesión
│
├── api/
│   ├── admin/              # Endpoints del CRUD (NUEVO)
│   │   ├── conexion.php
│   │   ├── crear_auto.php
│   │   ├── leer_autos.php
│   │   ├── actualizar_auto.php
│   │   ├── eliminar_auto.php
│   │   └── sembrar_datos.php # Script para poblar la BD
│   ├── vendor/
│   ├── templates/
│   │   └── email_template_cliente.html
│   ├── config.php
│   ├── reservar.php
│   └── composer.json
│
├── COTIZACION/
│   ├── index.html
│   ├── quotation.css
│   └── quotation.js        # (Ahora es dinámico)
│
├── uploads/                # Carpeta para imágenes de vehículos (NUEVO)
│
├── ABOUT/
├── css/
├── img/
├── js/
├── .htaccess
├── header.html
├── footer.html
├── header-footer.css
├── index.html
├── main.js
└── style.css
3. Dependencias
Frontend
flatpickr: Utilizada para los selectores de fecha/hora. Enlazada vía CDN.

Backend
PHP 7.4 o superior.

Servidor de Base de Datos MySQL.

Composer para la gestión de dependencias de PHP.

PHPMailer: Definida en api/composer.json para el envío de correos.

4. Configuración
Para que el proyecto funcione, es crucial configurar los siguientes archivos:

a) Configuración del Backend (api/config.php)
Este archivo centraliza todas las credenciales. Debes completar:

Credenciales SMTP: Para que el formulario de reserva envíe correos.

Credenciales de Base de Datos (NUEVO): Para que la API y el panel puedan conectarse a MySQL.

PHP

<?php
// SMTP
define('SMTP_HOST', 'tu_host_smtp');
define('SMTP_USER', 'tu_usuario_smtp');
define('SMTP_PASS', 'tu_contraseña_smtp');
// ...etc

// Base de Datos (NUEVO)
define('DB_HOST', '127.0.0.1');      // Generalmente 'localhost' o 127.0.0.1
define('DB_USER', 'tu_usuario_bd');      // ej. 'root'
define('DB_PASS', 'tu_contraseña_bd');
define('DB_NAME', 'renta_autos_db');
b) Configuración de Administrador (admin/auth.php)
Las credenciales para acceder al panel de administración están definidas directamente en este archivo. Se recomienda cambiarlas para un entorno de producción.

PHP

// ...
define('ADMIN_USER', 'admin');
define('ADMIN_PASS', 'renta2025'); // <-- CAMBIAR ESTA CONTRASEÑA
// ...
5. Instalación y Ejecución Local
Clonar el Proyecto: git clone ...

Base de Datos:

Asegúrate de tener un servidor MySQL corriendo.

Crea una base de datos (ej. renta_autos_db).

Configura las credenciales de la base de datos en api/config.php.

Instalar Dependencias PHP:

Navega a la carpeta api/: cd api

Ejecuta composer install.

Poblar la Base de Datos (Siembra):

Para cargar la flota de vehículos inicial, ejecuta el script de siembra. Asegúrate de que tu servidor web PHP esté corriendo (ver paso 5) y luego visita en tu navegador la URL: http://localhost:8000/api/admin/sembrar_datos.php. Esto llenará la tabla vehiculos con los datos iniciales.

Ejecutar el Servidor de Desarrollo:

Este proyecto requiere un servidor que pueda procesar PHP. No funcionará abriendo los index.html directamente.

Desde la raíz del proyecto, ejecuta el servidor de desarrollo integrado de PHP:

Bash

php -S localhost:8000
Mantén esta terminal abierta mientras trabajas.

Acceder a la Aplicación:

Sitio Público: http://localhost:8000/COTIZACION/

Panel de Administración: http://localhost:8000/admin/

6. Flujo de la Aplicación
Sitio Público (COTIZACION/)
Carga de Datos: Al cargar la página, quotation.js ahora hace una petición fetch al endpoint api/admin/leer_autos.php para obtener la lista de vehículos activos desde la base de datos.

Renderizado Dinámico: Las tarjetas de los vehículos se generan dinámicamente a partir de los datos recibidos de la API.

Flujo de Reserva: El resto del flujo (cálculo, formulario de cliente y envío al endpoint reservar.php) permanece igual.

Panel de Administración (admin/)
Autenticación: El acceso está protegido por un sistema de sesiones PHP. El usuario debe iniciar sesión con las credenciales definidas en auth.php.

Dashboard (panel.php): Una vez autenticado, el administrador ve un grid con todos los vehículos de la base de datos (obtenidos de leer_autos.php).

Operaciones CRUD:

Añadir/Editar: Un formulario modal permite crear o modificar vehículos. Al enviar, panel.js utiliza la API fetch para enviar los datos (usando FormData para soportar la subida de imágenes) a crear_auto.php o actualizar_auto.php.

Subida de Imágenes: Los archivos de imagen se suben a la carpeta /uploads del servidor, y la ruta se almacena en la base de datos.

Eliminar: Un botón en cada tarjeta envía una petición a eliminar_auto.php con el ID del vehículo para borrarlo de la base de datos.

7. Notas del Contribuidor
Gestión de Datos: El sistema ha sido refactorizado para ser completamente dinámico. Todos los datos de la flota se gestionan ahora desde una base de datos MySQL a través del panel de administración.

Seguridad de Credenciales: Las credenciales de la BD, SMTP y del admin están en archivos de configuración. Para un entorno de producción de alta seguridad, se recomienda gestionar estos secretos mediante variables de entorno en el servidor.