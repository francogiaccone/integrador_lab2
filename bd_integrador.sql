-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-06-2024 a las 04:24:44
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
-- Base de datos: `bd_integrador`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id`, `descripcion`) VALUES
(11, 'Aparato digestivo'),
(12, 'Nutriología'),
(13, 'Cardiovascular'),
(14, 'Neurología'),
(15, 'Oncología'),
(16, 'Dermatología'),
(17, 'Endocrinología'),
(18, 'Ginecología'),
(19, 'Urología'),
(20, 'Oftalmología');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidad`
--

CREATE TABLE `especialidad` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `especialidad`
--

INSERT INTO `especialidad` (`id`, `descripcion`) VALUES
(1, 'Cardiología'),
(2, 'Dermatología'),
(3, 'Gastroenterología'),
(4, 'Neurología'),
(5, 'Pediatría'),
(6, 'Oftalmología'),
(7, 'Oncología'),
(8, 'Psiquiatría'),
(9, 'Traumatología'),
(10, 'Medicina Interna');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `familia`
--

CREATE TABLE `familia` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `familia`
--

INSERT INTO `familia` (`id`, `descripcion`) VALUES
(1, 'Analgésicos'),
(2, 'Antibióticos'),
(3, 'Antipiréticos'),
(4, 'Antiinflamatorios'),
(5, 'Antihistamínicos'),
(6, 'Antidepresivos'),
(7, 'Antieméticos'),
(8, 'Anticoagulantes'),
(9, 'Antiespasmódicos'),
(10, 'Antisépticos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formafarmaceutica`
--

CREATE TABLE `formafarmaceutica` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `formafarmaceutica`
--

INSERT INTO `formafarmaceutica` (`id`, `descripcion`) VALUES
(1, 'Tableta'),
(2, 'Cápsula'),
(3, 'Jarabe'),
(4, 'Suspensión'),
(5, 'Crema'),
(6, 'Gel'),
(7, 'Parche'),
(8, 'Óvulo'),
(9, 'Inyectable'),
(10, 'Gotas'),
(11, 'Aerosol'),
(12, 'Supositorio'),
(13, 'Emulsión'),
(14, 'Solución'),
(15, 'Polvo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicamento`
--

CREATE TABLE `medicamento` (
  `id` int(11) NOT NULL,
  `nombreGenerico` varchar(255) NOT NULL,
  `nombreComercial` varchar(255) DEFAULT NULL,
  `idCategoria` int(11) NOT NULL,
  `idFamilia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `medicamento`
--

INSERT INTO `medicamento` (`id`, `nombreGenerico`, `nombreComercial`, `idCategoria`, `idFamilia`) VALUES
(41, 'Paracetamol', 'Panadol', 11, 1),
(42, 'Ibuprofeno', 'Advil', 11, 1),
(43, 'Loratadina', 'Claritin', 15, 2),
(44, 'Omeprazol', 'Losec', 11, 3),
(45, 'Metformina', 'Glucophage', 12, 10),
(46, 'Atorvastatina', 'Lipitor', 13, 6),
(47, 'Amoxicilina', 'Amoxil', 11, 2),
(48, 'Enalapril', 'Renitec', 13, 8),
(49, 'Alprazolam', 'Xanax', 17, 9),
(50, 'Insulina', 'Humulin', 12, 10),
(51, 'Diazepam', 'Valium', 17, 9),
(52, 'Levotiroxina', 'Eutirox', 16, 5),
(53, 'Tramadol', 'Tramacet', 11, 1),
(54, 'Ranitidina', 'Zantac', 11, 3),
(55, 'Sildenafil', 'Viagra', 13, 6),
(56, 'Cetirizina', 'Zyrtec', 15, 2),
(57, 'Warfarina', 'Coumadin', 13, 6),
(58, 'Eritromicina', 'Erythromycin', 12, 7),
(59, 'Furosemida', 'Lasix', 11, 4),
(60, 'Pantoprazol', 'Pantoloc', 11, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicamento_formafarmaceutica`
--

CREATE TABLE `medicamento_formafarmaceutica` (
  `idMedicamento` int(11) NOT NULL,
  `idFormaFarmaceutica` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `medicamento_formafarmaceutica`
--

INSERT INTO `medicamento_formafarmaceutica` (`idMedicamento`, `idFormaFarmaceutica`) VALUES
(41, 1),
(42, 1),
(43, 2),
(44, 6),
(45, 9),
(46, 1),
(47, 2),
(48, 1),
(49, 2),
(50, 9),
(51, 2),
(52, 1),
(53, 10),
(54, 1),
(55, 6),
(56, 1),
(57, 1),
(58, 2),
(59, 8),
(60, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicamento_monodroga`
--

CREATE TABLE `medicamento_monodroga` (
  `idMedicamento` int(11) NOT NULL,
  `idMonodroga` int(11) NOT NULL,
  `concentracion` float NOT NULL,
  `idUnidadMedida` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `medicamento_monodroga`
--

INSERT INTO `medicamento_monodroga` (`idMedicamento`, `idMonodroga`, `concentracion`, `idUnidadMedida`) VALUES
(41, 1, 500, 5),
(42, 2, 400, 5),
(43, 3, 10, 4),
(44, 4, 10, 1),
(45, 5, 100, 5),
(46, 6, 20, 5),
(47, 7, 1, 1),
(48, 8, 10, 5),
(49, 9, 0.5, 6),
(50, 10, 1, 1),
(51, 11, 5, 6),
(52, 12, 50, 5),
(53, 13, 50, 7),
(54, 14, 150, 5),
(55, 15, 1, 1),
(56, 3, 10, 4),
(57, 16, 2, 4),
(58, 17, 250, 5),
(59, 18, 40, 9),
(60, 4, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `monodroga`
--

CREATE TABLE `monodroga` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `monodroga`
--

INSERT INTO `monodroga` (`id`, `descripcion`) VALUES
(1, 'Paracetamol'),
(2, 'Ibuprofeno'),
(3, 'Loratadina'),
(4, 'Omeprazol'),
(5, 'Metformina'),
(6, 'Atorvastatina'),
(7, 'Amoxicilina'),
(8, 'Enalapril'),
(9, 'Alprazolam'),
(10, 'Insulina'),
(11, 'Diazepam'),
(12, 'Levotiroxina'),
(13, 'Tramadol'),
(14, 'Ranitidina'),
(15, 'Sildenafil'),
(16, 'Cetirizina'),
(17, 'Warfarina'),
(18, 'Eritromicina'),
(19, 'Furosemida'),
(20, 'Pantoprazol');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `obrasocial`
--

CREATE TABLE `obrasocial` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `obrasocial`
--

INSERT INTO `obrasocial` (`id`, `nombre`) VALUES
(1, 'OSDE'),
(2, 'Swiss Medical'),
(3, 'Galeno'),
(4, 'Medicus'),
(5, 'Federada Salud'),
(6, 'IAPOS'),
(7, 'PAMI'),
(8, 'OSECAC'),
(9, 'OSPLAD'),
(10, 'Sancor Salud'),
(11, 'OSDEPYM'),
(12, 'Medifé'),
(13, 'OSUNLa'),
(14, 'OSPOCE'),
(15, 'Union Personal'),
(16, 'OSDE Binario'),
(17, 'OMINT'),
(18, 'OSPACA'),
(19, 'OSBA'),
(20, 'OSMATA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `obrasocial_planobrasocial`
--

CREATE TABLE `obrasocial_planobrasocial` (
  `idObraSocial` int(11) NOT NULL,
  `idPlanObraSocial` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente`
--

CREATE TABLE `paciente` (
  `id` int(11) NOT NULL,
  `idPersona` int(11) NOT NULL,
  `idPlanObraSocial` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paciente`
--

INSERT INTO `paciente` (`id`, `idPersona`, `idPlanObraSocial`) VALUES
(1, 4, 2),
(2, 5, 10),
(3, 6, 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `documento` varchar(50) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `domicilio` varchar(255) NOT NULL,
  `sexo` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`id`, `nombre`, `apellido`, `documento`, `fechaNacimiento`, `domicilio`, `sexo`) VALUES
(1, 'María', 'González', '30567890', '1990-05-15', 'Calle 123, Ciudad', 'F'),
(2, 'Juan', 'Pérez', '25678901', '1985-08-20', 'Av. Principal 456, Pueblo', 'M'),
(3, 'Ana', 'Martínez', '39876543', '1982-03-10', 'Ruta 22, Villa Nueva', 'F'),
(4, 'Pedro', 'López', '18765432', '1975-11-25', 'Plaza Mayor 789, Capital', 'M'),
(5, 'Laura', 'Rodríguez', '45236789', '1995-07-12', 'Avenida Central 567, Pueblo Nuevo', 'F'),
(6, 'Carlos', 'Gómez', '56321478', '1988-01-30', 'Calle del Sol 234, Ciudad Vieja', 'M');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plan_obrasocial`
--

CREATE TABLE `plan_obrasocial` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `idObraSocial` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `plan_obrasocial`
--

INSERT INTO `plan_obrasocial` (`id`, `nombre`, `idObraSocial`) VALUES
(1, 'OSDE 210', 1),
(2, 'OSDE 310', 1),
(3, 'Swiss Medical Plan 210', 2),
(4, 'Swiss Medical Plan 310', 2),
(5, 'Galeno Plan Azul', 3),
(6, 'Galeno Plan Dorado', 3),
(7, 'Medicus Classic', 4),
(8, 'Medicus Premium', 4),
(9, 'Federada Salud Plan 10', 5),
(10, 'Federada Salud Plan 20', 5),
(11, 'IAPOS Plan Único', 6),
(12, 'PAMI Programa Integral Médico', 7),
(13, 'OSECAC Plan 1', 8),
(14, 'OSPLAD Plan A', 9),
(15, 'Sancor Salud Plan Azul', 10),
(16, 'OSDEPYM Plan A', 11),
(17, 'Medifé Plan 310', 12),
(18, 'OSUNLa Plan A', 13),
(19, 'Union Personal Plan 01', 15),
(20, 'OMINT Plan 210', 17);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prescripcion`
--

CREATE TABLE `prescripcion` (
  `id` int(11) NOT NULL,
  `idProfesional` int(11) NOT NULL,
  `idPaciente` int(11) NOT NULL,
  `diagnostico` varchar(255) NOT NULL,
  `fechaPrescripcion` date NOT NULL,
  `vigencia` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prescripcion_medicamento`
--

CREATE TABLE `prescripcion_medicamento` (
  `idPrescripcion` int(11) NOT NULL,
  `idMedicamento` int(11) NOT NULL,
  `frecuencia` varchar(255) NOT NULL,
  `duracion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prescripcion_prestacion`
--

CREATE TABLE `prescripcion_prestacion` (
  `idPrescripcion` int(11) NOT NULL,
  `idPrestacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prestacion`
--

CREATE TABLE `prestacion` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `lado` varchar(255) NOT NULL,
  `indicacion` varchar(255) NOT NULL,
  `justificacion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `prestacion`
--

INSERT INTO `prestacion` (`id`, `nombre`, `lado`, `indicacion`, `justificacion`) VALUES
(1, 'Radiografía de tórax', 'Derecho', 'Evaluación de patologías pulmonares y cardíacas.', 'Necesaria para diagnosticar condiciones como neumonía o insuficiencia cardíaca.'),
(2, 'Ecografía abdominal', 'Derecho', 'Visualización de órganos abdominales como hígado, riñones y vesícula biliar.', 'Ayuda en el diagnóstico de enfermedades como cálculos biliares o tumores.'),
(3, 'Electrocardiograma', 'Derecho', 'Evaluación de la actividad eléctrica del corazón.', 'Fundamental para diagnosticar arritmias y problemas cardíacos.'),
(4, 'Colonoscopía', 'Izquierdo', 'Exploración del intestino grueso.', 'Esencial para la detección precoz de cáncer colorrectal y otras enfermedades intestinales.'),
(5, 'Tomografía computarizada (TC) cerebral', 'Izquierdo', 'Evaluación detallada de estructuras cerebrales.', 'Indispensable para diagnosticar accidentes cerebrovasculares y tumores cerebrales.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesional`
--

CREATE TABLE `profesional` (
  `id` int(11) NOT NULL,
  `idPersona` int(11) NOT NULL,
  `profesion` varchar(255) NOT NULL,
  `idREFEPS` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `profesional`
--

INSERT INTO `profesional` (`id`, `idPersona`, `profesion`, `idREFEPS`) VALUES
(1, 1, 'Médico', 988),
(2, 2, 'Enfermero', 778),
(3, 3, 'Psicólogo', 344);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesional_especialidad`
--

CREATE TABLE `profesional_especialidad` (
  `idProfesional` int(11) NOT NULL,
  `idEspecialidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `profesional_especialidad`
--

INSERT INTO `profesional_especialidad` (`idProfesional`, `idEspecialidad`) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(3, 5),
(3, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `unidadmedida`
--

CREATE TABLE `unidadmedida` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `abreviatura` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `unidadmedida`
--

INSERT INTO `unidadmedida` (`id`, `nombre`, `abreviatura`) VALUES
(1, 'Miligramo', 'mg'),
(2, 'Microgramo', 'mcg'),
(3, 'Unidad', 'U'),
(4, 'Mililitro', 'mL'),
(5, 'Centímetro cúbico', 'cc'),
(6, 'Tableta', 'tab'),
(7, 'Cápsula', 'cap'),
(8, 'Gotas', 'gotas'),
(9, 'Supositorio', 'sup'),
(10, 'UI', 'UI');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `contrasena` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `especialidad`
--
ALTER TABLE `especialidad`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `familia`
--
ALTER TABLE `familia`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `formafarmaceutica`
--
ALTER TABLE `formafarmaceutica`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `medicamento`
--
ALTER TABLE `medicamento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_categoria` (`idCategoria`),
  ADD KEY `fk_familia` (`idFamilia`);

--
-- Indices de la tabla `medicamento_formafarmaceutica`
--
ALTER TABLE `medicamento_formafarmaceutica`
  ADD PRIMARY KEY (`idMedicamento`,`idFormaFarmaceutica`),
  ADD KEY `fk_formaFarmaceutica` (`idFormaFarmaceutica`);

--
-- Indices de la tabla `medicamento_monodroga`
--
ALTER TABLE `medicamento_monodroga`
  ADD PRIMARY KEY (`idMedicamento`,`idMonodroga`),
  ADD KEY `fk_monodroga` (`idMonodroga`),
  ADD KEY `fk_unidadMedida` (`idUnidadMedida`);

--
-- Indices de la tabla `monodroga`
--
ALTER TABLE `monodroga`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `obrasocial`
--
ALTER TABLE `obrasocial`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `obrasocial_planobrasocial`
--
ALTER TABLE `obrasocial_planobrasocial`
  ADD PRIMARY KEY (`idObraSocial`,`idPlanObraSocial`),
  ADD KEY `idPlanObraSocial` (`idPlanObraSocial`);

--
-- Indices de la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_persona` (`idPersona`),
  ADD KEY `fk_planObraSocial` (`idPlanObraSocial`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `plan_obrasocial`
--
ALTER TABLE `plan_obrasocial`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_obraSocial` (`idObraSocial`);

--
-- Indices de la tabla `prescripcion`
--
ALTER TABLE `prescripcion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk2_profesional` (`idProfesional`),
  ADD KEY `fk2_paciente` (`idPaciente`);

--
-- Indices de la tabla `prescripcion_medicamento`
--
ALTER TABLE `prescripcion_medicamento`
  ADD PRIMARY KEY (`idPrescripcion`,`idMedicamento`),
  ADD KEY `fk4_medicamento` (`idMedicamento`);

--
-- Indices de la tabla `prescripcion_prestacion`
--
ALTER TABLE `prescripcion_prestacion`
  ADD PRIMARY KEY (`idPrescripcion`,`idPrestacion`),
  ADD KEY `fk_prestacion` (`idPrestacion`);

--
-- Indices de la tabla `prestacion`
--
ALTER TABLE `prestacion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `profesional`
--
ALTER TABLE `profesional`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk2_persona` (`idPersona`);

--
-- Indices de la tabla `profesional_especialidad`
--
ALTER TABLE `profesional_especialidad`
  ADD PRIMARY KEY (`idProfesional`,`idEspecialidad`),
  ADD KEY `fk_especialidad` (`idEspecialidad`);

--
-- Indices de la tabla `unidadmedida`
--
ALTER TABLE `unidadmedida`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `especialidad`
--
ALTER TABLE `especialidad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `familia`
--
ALTER TABLE `familia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `formafarmaceutica`
--
ALTER TABLE `formafarmaceutica`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `medicamento`
--
ALTER TABLE `medicamento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT de la tabla `monodroga`
--
ALTER TABLE `monodroga`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `obrasocial`
--
ALTER TABLE `obrasocial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `paciente`
--
ALTER TABLE `paciente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `persona`
--
ALTER TABLE `persona`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `plan_obrasocial`
--
ALTER TABLE `plan_obrasocial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `prescripcion`
--
ALTER TABLE `prescripcion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `prestacion`
--
ALTER TABLE `prestacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `profesional`
--
ALTER TABLE `profesional`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `unidadmedida`
--
ALTER TABLE `unidadmedida`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `medicamento`
--
ALTER TABLE `medicamento`
  ADD CONSTRAINT `fk_categoria` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`id`),
  ADD CONSTRAINT `fk_familia` FOREIGN KEY (`idFamilia`) REFERENCES `familia` (`id`);

--
-- Filtros para la tabla `medicamento_formafarmaceutica`
--
ALTER TABLE `medicamento_formafarmaceutica`
  ADD CONSTRAINT `fk_formaFarmaceutica` FOREIGN KEY (`idFormaFarmaceutica`) REFERENCES `formafarmaceutica` (`id`),
  ADD CONSTRAINT `fk_medicamento` FOREIGN KEY (`idMedicamento`) REFERENCES `medicamento` (`id`);

--
-- Filtros para la tabla `medicamento_monodroga`
--
ALTER TABLE `medicamento_monodroga`
  ADD CONSTRAINT `fk2_medicamento` FOREIGN KEY (`idMedicamento`) REFERENCES `medicamento` (`id`),
  ADD CONSTRAINT `fk_monodroga` FOREIGN KEY (`idMonodroga`) REFERENCES `monodroga` (`id`),
  ADD CONSTRAINT `fk_unidadMedida` FOREIGN KEY (`idUnidadMedida`) REFERENCES `unidadmedida` (`id`);

--
-- Filtros para la tabla `obrasocial_planobrasocial`
--
ALTER TABLE `obrasocial_planobrasocial`
  ADD CONSTRAINT `obrasocial_planobrasocial_ibfk_1` FOREIGN KEY (`idObraSocial`) REFERENCES `obrasocial` (`id`),
  ADD CONSTRAINT `obrasocial_planobrasocial_ibfk_2` FOREIGN KEY (`idPlanObraSocial`) REFERENCES `plan_obrasocial` (`id`);

--
-- Filtros para la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD CONSTRAINT `fk_persona` FOREIGN KEY (`idPersona`) REFERENCES `persona` (`id`),
  ADD CONSTRAINT `fk_planObraSocial` FOREIGN KEY (`idPlanObraSocial`) REFERENCES `plan_obrasocial` (`id`);

--
-- Filtros para la tabla `plan_obrasocial`
--
ALTER TABLE `plan_obrasocial`
  ADD CONSTRAINT `fk_obraSocial` FOREIGN KEY (`idObraSocial`) REFERENCES `obrasocial` (`id`);

--
-- Filtros para la tabla `prescripcion`
--
ALTER TABLE `prescripcion`
  ADD CONSTRAINT `fk2_paciente` FOREIGN KEY (`idPaciente`) REFERENCES `paciente` (`id`),
  ADD CONSTRAINT `fk2_profesional` FOREIGN KEY (`idProfesional`) REFERENCES `profesional` (`id`);

--
-- Filtros para la tabla `prescripcion_medicamento`
--
ALTER TABLE `prescripcion_medicamento`
  ADD CONSTRAINT `fk2_prescripcion` FOREIGN KEY (`idPrescripcion`) REFERENCES `prescripcion` (`id`),
  ADD CONSTRAINT `fk4_medicamento` FOREIGN KEY (`idMedicamento`) REFERENCES `medicamento` (`id`);

--
-- Filtros para la tabla `prescripcion_prestacion`
--
ALTER TABLE `prescripcion_prestacion`
  ADD CONSTRAINT `fk_prescripcion` FOREIGN KEY (`idPrescripcion`) REFERENCES `prescripcion` (`id`),
  ADD CONSTRAINT `fk_prestacion` FOREIGN KEY (`idPrestacion`) REFERENCES `prestacion` (`id`);

--
-- Filtros para la tabla `profesional`
--
ALTER TABLE `profesional`
  ADD CONSTRAINT `fk2_persona` FOREIGN KEY (`idPersona`) REFERENCES `persona` (`id`);

--
-- Filtros para la tabla `profesional_especialidad`
--
ALTER TABLE `profesional_especialidad`
  ADD CONSTRAINT `fk_especialidad` FOREIGN KEY (`idEspecialidad`) REFERENCES `especialidad` (`id`),
  ADD CONSTRAINT `fk_profesional` FOREIGN KEY (`idProfesional`) REFERENCES `profesional` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
