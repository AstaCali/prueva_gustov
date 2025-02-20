-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-02-2025 a las 04:50:28
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `restaurantgustov`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalleventas`
--

CREATE TABLE `detalleventas` (
  `id` int(11) NOT NULL,
  `venta_id` int(11) NOT NULL,
  `plato_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalleventas`
--

INSERT INTO `detalleventas` (`id`, `venta_id`, `plato_id`, `cantidad`, `subtotal`, `createdAt`, `updatedAt`) VALUES
(3, 2, 8, 2, 50.00, '2025-02-18 19:31:00', '2025-02-18 19:31:00'),
(4, 2, 11, 1, 55.00, '2025-02-18 19:31:00', '2025-02-18 19:31:00'),
(5, 3, 9, 2, 66.00, '2025-02-18 20:59:40', '2025-02-18 20:59:40'),
(6, 3, 11, 1, 55.00, '2025-02-18 20:59:40', '2025-02-18 20:59:40'),
(7, 4, 10, 2, 100.00, '2025-02-19 01:31:55', '2025-02-19 01:31:55'),
(8, 5, 9, 2, 66.00, '2025-02-19 12:40:58', '2025-02-19 12:40:58'),
(13, 8, 8, 2, 50.00, '2025-02-19 21:28:19', '2025-02-19 21:28:19'),
(22, 9, 11, 4, 220.00, '2025-02-19 22:41:03', '2025-02-19 22:41:03'),
(23, 9, 8, 1, 25.00, '2025-02-19 22:41:03', '2025-02-19 22:41:03'),
(24, 10, 9, 1, 33.00, '2025-02-19 23:33:25', '2025-02-19 23:33:25');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persons`
--

CREATE TABLE `persons` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `ci` int(11) NOT NULL,
  `cellphone` int(11) NOT NULL,
  `gender` varchar(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `persons`
--

INSERT INTO `persons` (`id`, `name`, `last_name`, `ci`, `cellphone`, `gender`, `createdAt`, `updatedAt`) VALUES
(1, 'Rodrigues', 'Pérez', 1234567, 98765432, 'M', '2025-02-17 17:23:48', '2025-02-17 17:23:48'),
(2, 'Joel He', 'Castillo Mamani', 569832, 58996625, 'M', '2025-02-17 23:05:37', '2025-02-19 22:56:48');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `platos`
--

CREATE TABLE `platos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `estado` tinyint(1) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `platos`
--

INSERT INTO `platos` (`id`, `nombre`, `precio`, `imagen`, `estado`, `createdAt`, `updatedAt`) VALUES
(8, 'Charque', 25.00, 'img/04charque.jpg', 1, '2025-02-18 02:44:17', '2025-02-19 15:42:07'),
(9, 'Picante de Pollo', 33.00, 'img/picante-de-pollo.jpg', 1, '2025-02-18 02:57:21', '2025-02-18 02:57:21'),
(10, 'Pique macho', 50.00, 'img/pique-Bolivia-1-715x400.jpg', 1, '2025-02-18 13:19:25', '2025-02-18 13:19:25'),
(11, 'Pailita', 55.00, 'img/PAILITA-DE-RES.jpg', 1, '2025-02-18 14:18:38', '2025-02-19 19:05:23'),
(17, 'Pizza', 99.00, 'img/pizza_uno.jpg', 0, '2025-02-19 22:57:27', '2025-02-20 01:11:11');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'ADMINISTRADOR', '2025-02-17 18:15:46', '2025-02-17 18:15:46'),
(2, 'SECRETARIA', '2025-02-17 18:15:46', '2025-02-17 18:15:46'),
(3, 'CAJERO', '2025-02-17 18:15:46', '2025-02-17 18:15:46');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `person_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `state` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `role_id`, `person_id`, `email`, `password`, `state`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 'admin@gmail.com', '$2a$10$G97BpoaH.wt33DFmpILOTum0o3emU7rjmHRi/NWy05xeSjH860h2.', 1, '2025-02-17 17:23:48', '2025-02-17 17:23:48'),
(2, 3, 2, 'joel@gmail.com', '$2a$10$FQBaPql4bEGEWiJDVF5KgO8Cnrbj5Z0A2T/4ozO9eXo1gBFvwATPO', 1, '2025-02-17 23:05:37', '2025-02-17 23:05:37');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id` int(11) NOT NULL,
  `fecha` datetime DEFAULT NULL,
  `total` decimal(10,2) NOT NULL,
  `user_id` int(11) NOT NULL,
  `person_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`id`, `fecha`, `total`, `user_id`, `person_id`, `createdAt`, `updatedAt`) VALUES
(2, '2025-02-18 19:31:00', 105.00, 1, NULL, '2025-02-18 19:31:00', '2025-02-18 19:31:00'),
(3, '2025-02-18 20:59:40', 121.00, 1, NULL, '2025-02-18 20:59:40', '2025-02-18 20:59:40'),
(4, '2025-02-19 01:31:55', 100.00, 1, NULL, '2025-02-19 01:31:55', '2025-02-19 01:31:55'),
(5, '2025-02-19 12:40:58', 66.00, 1, NULL, '2025-02-19 12:40:58', '2025-02-19 12:40:58'),
(8, '2025-02-19 21:22:39', 50.00, 1, NULL, '2025-02-19 21:22:39', '2025-02-19 21:28:19'),
(9, '2025-02-19 22:19:14', 245.00, 1, NULL, '2025-02-19 22:19:14', '2025-02-19 22:41:03'),
(10, '2025-02-19 23:33:25', 33.00, 2, NULL, '2025-02-19 23:33:25', '2025-02-19 23:33:25');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `detalleventas`
--
ALTER TABLE `detalleventas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `venta_id` (`venta_id`),
  ADD KEY `plato_id` (`plato_id`);

--
-- Indices de la tabla `persons`
--
ALTER TABLE `persons`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `platos`
--
ALTER TABLE `platos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `role_id` (`role_id`),
  ADD KEY `person_id` (`person_id`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `person_id` (`person_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `detalleventas`
--
ALTER TABLE `detalleventas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `persons`
--
ALTER TABLE `persons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `platos`
--
ALTER TABLE `platos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalleventas`
--
ALTER TABLE `detalleventas`
  ADD CONSTRAINT `detalleventas_ibfk_1` FOREIGN KEY (`venta_id`) REFERENCES `ventas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detalleventas_ibfk_2` FOREIGN KEY (`plato_id`) REFERENCES `platos` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`person_id`) REFERENCES `persons` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `ventas_ibfk_2` FOREIGN KEY (`person_id`) REFERENCES `persons` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
