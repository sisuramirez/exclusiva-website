Proyecto: Sitio Web y Cotizador - Exclusiva Renta Autos
1. Descripción General
Este proyecto es un sitio web corporativo y una herramienta de cotización para la empresa de alquiler de vehículos "Exclusiva Renta Autos". El frontend está construido con HTML5, CSS3 y JavaScript (Vanilla JS), sin depender de frameworks. El backend consiste en una API de un solo endpoint desarrollada en PHP para gestionar las solicitudes de reserva.

La arquitectura del frontend se basa en la carga dinámica de componentes reutilizables (header y footer) mediante la API fetch de JavaScript. El backend utiliza la librería PHPMailer para el envío de correos electrónicos transaccionales.

2. Estructura del Proyecto
El proyecto se organiza en las siguientes carpetas y archivos principales:

.
├── .htaccess             # Reglas del servidor Apache.
├── .gitignore            # Archivos y carpetas ignorados por Git (muy importante).
├── README.md             # Documentación actualizada del proyecto.
├── header.html           # Componente de cabecera reutilizable.
├── footer.html           # Componente de pie de página reutilizable.
├── header-footer.css     # Estilos para la cabecera y pie de página.
├── index.html            # Página de inicio (Landing Page).
├── main.js               # Lógica principal de la página de inicio.
└── style.css             # Estilos principales de la página de inicio.
|
├── ABOUT/                # Carpeta para la página "Sobre Nosotros".
│   ├── index.html
│   ├── doc.css
│   └── doc.js
|
├── admin/                # [NUEVO] Panel de administración del CRUD (Frontend).
│   ├── index.php         # Página de login para administradores.
│   ├── auth.php          # Lógica para verificar el login contra la base de datos.
│   ├── panel.php         # Panel principal para ver, crear, editar y eliminar vehículos.
│   ├── panel.js          # Lógica JavaScript para las operaciones del panel.
│   ├── panel.css         # Estilos para el panel de administración.
│   └── logout.php        # Script para cerrar la sesión del administrador.
|
├── api/                  # Carpeta para toda la lógica del backend.
│   ├── composer.json     # Define las dependencias de PHP (PHPMailer).
│   ├── config.php        # [MODIFICADO] Configuración de SMTP y Base de Datos.
│   ├── reservar.php      # API original para procesar las reservas de los clientes.
│   │
│   ├── admin/            # [NUEVO] API para las funciones del CRUD.
│   │   ├── conexion.php
│   │   ├── crear_auto.php
│   │   ├── leer_autos.php
│   │   ├── actualizar_auto.php
│   │   └── eliminar_auto.php
│   │
│   ├── templates/
│   │   └── email_template_cliente.html
│   │
│   └── vendor/           # Carpeta generada por Composer con las librerías (ej. PHPMailer).
|
├── COTIZACION/           # Aplicación de cotización para clientes.
│   ├── index.html
│   ├── quotation.css
│   └── quotation.js      # [MODIFICADO] Ahora carga los vehículos desde la API.
|
└── uploads/              # [NUEVO] Carpeta donde se guardan las imágenes de los vehículos subidas desde el panel.
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

a) Configuración del Backend (SMTP y Base de Datos)
El archivo api/config.php ahora contiene las credenciales tanto para el servidor de correo SMTP como para la conexión a la base de datos MySQL. Es imperativo completar estos datos.

b) Configuración de Orígenes Cruzados (CORS)
El endpoint de la API en api/reservar.php tiene un origen permitido hardcodeado para aceptar peticiones solo desde el dominio del frontend. Si el dominio cambia, esta línea debe ser actualizada.

c) Configuración del Endpoint en el Frontend
El script del cotizador COTIZACION/quotation.js contiene la URL hardcodeada del endpoint de la API. Si la ubicación de la API cambia, esta URL debe ser actualizada.

5. Flujo de la Aplicación
Carga de Componentes
Cada página principal (index.html, COTIZACION/index.html, ABOUT/index.html) tiene un script (main.js, quotation.js, doc.js) que ejecuta una función para cargar dinámicamente el contenido de header.html y footer.html.

Lógica del Cotizador (COTIZACION/quotation.js)

Datos de Vehículos: La lista de vehículos ahora se carga dinámicamente mediante una llamada fetch al endpoint /api/admin/leer_autos.php.

Renderizado: La función displayCars genera las tarjetas de los vehículos en el grid a partir de los datos recibidos de la API.

Resto del flujo: El cálculo de la cotización y el envío del formulario de reserva al endpoint api/reservar.php continúan sin cambios.

Proceso del Backend (api/reservar.php)
El flujo de este archivo para procesar una reserva y enviar correos no ha cambiado.

8. Actualización: Implementación de CRUD y Mantenimiento
Esta sección detalla las mejoras implementadas para convertir la lista de vehículos de un dato estático a un sistema dinámico gestionado por un panel de administración (CRUD).

Resumen de Cambios
Base de Datos MySQL: Se ha migrado toda la información de los vehículos a una base de datos MySQL. Esto permite una gestión centralizada y escalable del inventario.

Panel de Administración (CRUD): Se ha creado un panel de control protegido por contraseña en la ruta /admin. Este panel permite:

Crear nuevos vehículos.

Leer (visualizar) todos los vehículos existentes.

Actualizar la información y precios de cualquier vehículo.

Eliminar vehículos del inventario.

Cotizador Dinámico: El cotizador público en la sección COTIZACION/ ya no usa una lista manual en JavaScript. Ahora carga la información de los vehículos directamente desde la base de datos a través de una API, mostrando únicamente los vehículos marcados como "activos".

Seguridad Mejorada: El acceso al panel de administración se realiza a través de una tabla usuarios en la base de datos, con contraseñas almacenadas de forma segura mediante hashing.

Cómo Mantener el Inventario de Vehículos
Toda la gestión de tu flota de vehículos se realiza ahora a través del panel de administración.

Acceso: Ingresa a https://tudominio.com/admin.

Login: Utiliza el usuario y la contraseña que creaste en la tabla usuarios.

Gestión:

Para añadir un auto, usa el botón "Añadir Auto".

Para editar o eliminar un auto, utiliza los botones correspondientes en la tarjeta de cada vehículo.

Los cambios que guardes se reflejarán inmediatamente en la página pública del cotizador.

Instalación y Configuración (Versión con CRUD)
El proceso de configuración ahora incluye la base de datos:

Base de Datos: Crea una base de datos MySQL y ejecuta los scripts SQL para crear las tablas vehiculos y usuarios.

Crear Admin: Inserta al menos un usuario en la tabla usuarios, asegurándote de usar password_hash() para generar una contraseña segura.

Archivo api/config.php: Este archivo ahora es más importante que nunca. Debes rellenar tanto las credenciales SMTP como las credenciales de la base de datos: DB_HOST, DB_NAME, DB_USER, DB_PASS.

Control de Versiones: Es fundamental añadir api/config.php y la carpeta /uploads/ al archivo .gitignore para no subir información sensible a repositorios como GitHub.

Mejoras de Seguridad Implementadas
Autenticación Basada en Base de Datos: Las credenciales de acceso al panel ya no están en el código.

Hashing de Contraseñas: Se utiliza password_hash() y password_verify() de PHP, el estándar actual para el manejo seguro de contraseñas.

Prevención de Inyección SQL: Las consultas a la base de datos en la API del CRUD utilizan sentencias preparadas para evitar ataques de inyección SQL.