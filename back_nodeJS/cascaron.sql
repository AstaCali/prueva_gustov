-- Roles
INSERT INTO Roles (name) VALUES ('ADMIN'), ('EMPLEADO');

--- INSERTAR ATOS EN POSTMAN --

{
  "role_id": 1,
  "end_date": "2020-09-10", 
  "email": "admin@gmail.com",
  "password": "admin123",
  "name": "Juan",
  "last_name": "Pérez",
  "ci": "12345678",
  "cellphone": "78901234",
  "gender": "M"
}
{
  "role_id": 2,
  "end_date": "2012-09-10", 
  "email": "pedro@example.com",
  "password": "pedro123",
  "name": "Pedro",
  "last_name": "Gómez",
  "ci": "87654321",
  "cellphone": "65432109",
  "gender": "M"
}
{
  "role_id": 2,
  "end_date": "2017-09-10", 
  "email": "ana@example.com",
  "password": "ana123",
  "name": "Ana",
  "last_name": "Gutiérrez",
  "ci": "87654321",
  "cellphone": "12345678",
  "gender": "F"
}

--  ACTUALIZAR USUARIO--- SI NO SE ACTUALIZ COLOCA EL PASSWOR  SE MANTIENE
{
  "role_id": 2,
  "end_date": "2018-09-10",
  "email": "nuevo_email@example.com",
  "password": "nueva_contraseña",
  "name": "Ana",
  "last_name": "Martínez",
  "ci": "87654322",
  "cellphone": "12345679",
  "gender": "F"
}

---  REGISTRAR VACATIONES----
