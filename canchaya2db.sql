/*
 Navicat Premium Data Transfer

 Source Server         : root
 Source Server Type    : MySQL
 Source Server Version : 80034 (8.0.34)
 Source Host           : localhost:3306
 Source Schema         : canchaya2db

 Target Server Type    : MySQL
 Target Server Version : 80034 (8.0.34)
 File Encoding         : 65001

 Date: 14/05/2024 19:17:00
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for auth
-- ----------------------------
DROP TABLE IF EXISTS `auth`;
CREATE TABLE `auth`  (
  `id` int NOT NULL,
  `nombreUsuario` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pass` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of auth
-- ----------------------------
INSERT INTO `auth` VALUES (1, 'admin', 'admin');
INSERT INTO `auth` VALUES (27, 'fulano123', '$2b$05$nsRWzBALYZ0B7U0O5tElFOM93JKyYG4jPydmeTmnBa8ZE6HqO0FG.');
INSERT INTO `auth` VALUES (28, 'santiago123', '$2b$05$GQZwS0SLBeEB7laXJnj2leIWLDWKGO9nWdQ7oNLqzuLTLy/aMIPkK');

-- ----------------------------
-- Table structure for cancha
-- ----------------------------
DROP TABLE IF EXISTS `cancha`;
CREATE TABLE `cancha`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `tarifaNoche` float NOT NULL,
  `tarifaDia` float NOT NULL,
  `tipo` char(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '1',
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE,
  CONSTRAINT `cancha_chk_1` CHECK (`tipo` in (_utf8mb4'f11',_utf8mb4'f8',_utf8mb4'f5',_utf8mb4'v',_utf8mb4'b')),
  CONSTRAINT `cancha_chk_2` CHECK (`estado` in (1,0))
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cancha
-- ----------------------------
INSERT INTO `cancha` VALUES (1, 'cancha futbol 11', 2000, 1000, 'f11', 1);

-- ----------------------------
-- Table structure for pago
-- ----------------------------
DROP TABLE IF EXISTS `pago`;
CREATE TABLE `pago`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `importe` float NOT NULL,
  `numTransaccion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `idReserva` int NOT NULL,
  `idUsuario` int NOT NULL,
  `tipo` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_pago_usuario`(`idUsuario` ASC) USING BTREE,
  INDEX `fk_pago_reserva`(`idReserva` ASC) USING BTREE,
  CONSTRAINT `fk_pago_reserva` FOREIGN KEY (`idReserva`) REFERENCES `reserva` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_pago_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `pago_chk_1` CHECK (`tipo` in (_utf8mb4'o',_utf8mb4'l'))
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pago
-- ----------------------------
INSERT INTO `pago` VALUES (5, 1000, '123456', 2, 1, 'l');

-- ----------------------------
-- Table structure for reserva
-- ----------------------------
DROP TABLE IF EXISTS `reserva`;
CREATE TABLE `reserva`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `fechaReserva` date NOT NULL,
  `horaInicio` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `horaFin` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `confirmado` tinyint(1) NOT NULL DEFAULT 0,
  `idCancha` int NOT NULL,
  `idUsuario` int NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_reserva_usuario`(`idUsuario` ASC) USING BTREE,
  INDEX `fk_reserva_cancha`(`idCancha` ASC) USING BTREE,
  CONSTRAINT `fk_reserva_cancha` FOREIGN KEY (`idCancha`) REFERENCES `cancha` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_reserva_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of reserva
-- ----------------------------
INSERT INTO `reserva` VALUES (2, '2024-05-06', '17:00', '18:00', 1, 1, 1, 1);

-- ----------------------------
-- Table structure for telefono
-- ----------------------------
DROP TABLE IF EXISTS `telefono`;
CREATE TABLE `telefono`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `numero` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'sin numero',
  `idUsuario` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_telefono_usuario`(`idUsuario` ASC) USING BTREE,
  CONSTRAINT `fk_telefono_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of telefono
-- ----------------------------

-- ----------------------------
-- Table structure for usuario
-- ----------------------------
DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `apellido` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `tipo` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'u',
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE,
  CONSTRAINT `usuario_chk_1` CHECK (`tipo` in (_utf8mb4'a',_utf8mb4'u',_utf8mb4's')),
  CONSTRAINT `usuario_chk_2` CHECK (`estado` in (1,0))
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of usuario
-- ----------------------------
INSERT INTO `usuario` VALUES (1, 'Mariano', 'Leturia', 'a', 1);
INSERT INTO `usuario` VALUES (27, 'fulanito', 'fulanin', 'u', 1);
INSERT INTO `usuario` VALUES (28, 'santiago', 'arango', 'u', 1);

-- ----------------------------
-- View structure for canchas_disponibles
-- ----------------------------
DROP VIEW IF EXISTS `canchas_disponibles`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `canchas_disponibles` AS select `cancha`.`id` AS `id`,`cancha`.`nombre` AS `nombre`,`cancha`.`tipo` AS `tipo` from `cancha` where (`cancha`.`estado` = 1);

-- ----------------------------
-- View structure for mostrar_reservas
-- ----------------------------
DROP VIEW IF EXISTS `mostrar_reservas`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `mostrar_reservas` AS select `reserva`.`id` AS `id`,`usuario`.`nombre` AS `nombre`,`usuario`.`apellido` AS `apellido`,`pago`.`importe` AS `importe`,`reserva`.`fechaReserva` AS `fechaReserva`,`reserva`.`horaInicio` AS `horaInicio`,`reserva`.`horaFin` AS `horaFin`,`reserva`.`confirmado` AS `confirmado` from (((`reserva` join `pago` on(((`reserva`.`idPago` = `pago`.`id`) and (`reserva`.`id` = `pago`.`idReserva`)))) join `usuario` on(((`pago`.`idUsuario` = `usuario`.`id`) and (`reserva`.`idUsuario` = `usuario`.`id`)))) join `cancha` on((`reserva`.`idCancha` = `cancha`.`id`)));

-- ----------------------------
-- View structure for mostrar_usuarios
-- ----------------------------
DROP VIEW IF EXISTS `mostrar_usuarios`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `mostrar_usuarios` AS select `usuario`.`id` AS `id`,`usuario`.`nombre` AS `nombre`,`usuario`.`apellido` AS `apellido`,`usuario`.`usuario` AS `usuario`,`usuario`.`contraseña` AS `contraseña`,`usuario`.`email` AS `email`,`usuario`.`tipo` AS `tipo`,`usuario`.`estado` AS `estado` from `usuario` where (`usuario`.`tipo` = 'u');

SET FOREIGN_KEY_CHECKS = 1;
