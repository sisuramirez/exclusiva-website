-- Paso 1: Crea la base de datos SI NO EXISTE. Esto es clave.
CREATE DATABASE IF NOT EXISTS renta_autos_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Paso 2: Le decimos a MySQL que use esta base de datos para las siguientes instrucciones.
USE renta_autos_db;

-- Paso 3: Creamos la tabla 'vehiculos' con la estructura CORRECTA.
CREATE TABLE IF NOT EXISTS vehiculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    
    -- Las columnas de precios que reflejan tu lógica de negocio
    precio_1_2_dias DECIMAL(10, 2) NOT NULL,
    precio_3_6_dias DECIMAL(10, 2) NOT NULL,
    precio_semana DECIMAL(10, 2) NOT NULL,
    precio_15_dias DECIMAL(10, 2) NOT NULL,
    precio_mes DECIMAL(10, 2) NOT NULL,
    
    url_imagen VARCHAR(255) NOT NULL,
    espec_ac VARCHAR(50) NOT NULL,
    espec_combustible VARCHAR(100) NOT NULL,
    espec_transmision VARCHAR(100) NOT NULL,
    activo BOOLEAN DEFAULT TRUE NOT NULL
);