
create database pagina_web;
use pagina_web;
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    primer_nombre VARCHAR(50) NOT NULL,
    segundo_nombre VARCHAR(50),
    primer_apellido VARCHAR(50) NOT NULL,
    segundo_apellido VARCHAR(50),
    telefono VARCHAR(15),
    fecha_nacimiento DATE,
    rh VARCHAR(3),
    direccion VARCHAR(100),
    correo VARCHAR(100) UNIQUE NOT NULL,
    ciudad VARCHAR(50),
    identificacion VARCHAR(20) UNIQUE NOT NULL,
    ocupacion VARCHAR(50),
    contraseña VARCHAR(255) NOT NULL
);

SELECT * FROM usuarios;
INSERT INTO usuarios (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, telefono, fecha_nacimiento, rh, direccion, correo, ciudad, identificacion, ocupacion, contraseña) 
VALUES ('Juan', 'Davia', 'Blanco', 'Perez', '3102433783', STR_TO_DATE('12-11-2006', '%d-%m-%Y'), 'A+', 'mi casa', 'juandbp1206@gmail.com', 'tame', '1117132755', 'Estudiante', '1117132755');
SELECT * FROM usuarios WHERE id = 1;
INSERT INTO usuarios (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, telefono, fecha_nacimiento, rh, direccion, correo, ciudad, identificacion, ocupacion, contraseña) 
VALUES ('Jhuliet', 'Anghelica', 'Tibasosa', 'Suescun', '3224125100', STR_TO_DATE('07-06-2003', '%d-%m-%Y'), 'O+', 'Calle 16 # 31-36', 'JhulietTibasosa30@gmail.com', 'tame', '1010150914', 'Estudiante', '1010150914');