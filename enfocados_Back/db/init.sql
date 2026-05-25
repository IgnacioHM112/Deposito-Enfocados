-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: deposito_enfocadosmza
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `articulos`
--

DROP TABLE IF EXISTS `articulos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articulos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sku` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nombre` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_general_ci,
  `tipo` enum('materia_prima','producto_terminado') COLLATE utf8mb4_general_ci NOT NULL,
  `stock_actual` int DEFAULT '0',
  `stock_minimo` int DEFAULT '5',
  `ubicacion` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `precio_costo` decimal(10,2) DEFAULT '0.00',
  `ultima_actualizacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sku` (`sku`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articulos`
--

LOCK TABLES `articulos` WRITE;
/*!40000 ALTER TABLE `articulos` DISABLE KEYS */;
INSERT INTO `articulos` VALUES (1,'A','Estuche para Copas','','materia_prima',15,5,'Cajas Izquierda',0.00,'2026-05-07 20:31:18'),(2,'B','Estuche Asador Comun','','materia_prima',15,5,'Cajas Medio',0.00,'2026-05-07 20:32:06'),(6,'C','Estuche Asador Premium','','materia_prima',15,5,'Cajas Medio',0.00,'2026-05-07 20:33:36'),(7,'Cuchillos','Cuchillos','','materia_prima',15,5,'Estante',0.00,'2026-05-07 20:35:39'),(8,'Tenedores','Tenedores','','materia_prima',15,5,'Estante',0.00,'2026-05-07 20:35:54'),(9,'Tabla Madera A','Tabla Madera A','','materia_prima',20,5,'Estante',0.00,'2026-05-07 20:36:20'),(10,'Bolsita ','Bolsita','','materia_prima',15,5,'Estante',0.00,'2026-05-07 20:36:36'),(11,'Caja Truco','Caja Truco','','materia_prima',15,5,'Bolsa Piso',0.00,'2026-05-07 20:37:03'),(12,'Saca Corcho','Saca Corcho','','materia_prima',15,5,'Caja Cubiertos',0.00,'2026-05-07 20:37:26'),(13,'Copas','Copas','','materia_prima',50,15,'Cajas ',0.00,'2026-05-07 20:38:25'),(14,'D','Estuche para copas','','producto_terminado',10,5,'',0.00,'2026-05-07 20:39:09'),(15,'1','Estuche Asador Comun','','producto_terminado',10,5,'',0.00,'2026-05-07 20:40:59');
/*!40000 ALTER TABLE `articulos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `composicion_kits`
--

DROP TABLE IF EXISTS `composicion_kits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `composicion_kits` (
  `id_kit` int NOT NULL,
  `id_componente` int NOT NULL,
  `cantidad_necesaria` int NOT NULL,
  PRIMARY KEY (`id_kit`,`id_componente`),
  KEY `id_componente` (`id_componente`),
  CONSTRAINT `composicion_kits_ibfk_1` FOREIGN KEY (`id_kit`) REFERENCES `articulos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `composicion_kits_ibfk_2` FOREIGN KEY (`id_componente`) REFERENCES `articulos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `composicion_kits`
--

LOCK TABLES `composicion_kits` WRITE;
/*!40000 ALTER TABLE `composicion_kits` DISABLE KEYS */;
INSERT INTO `composicion_kits` VALUES (14,13,2),(15,7,1),(15,8,1),(15,9,1),(15,10,1),(15,13,2);
/*!40000 ALTER TABLE `composicion_kits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movimientos`
--

DROP TABLE IF EXISTS `movimientos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movimientos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_articulo` int DEFAULT NULL,
  `tipo_movimiento` enum('entrada','salida','ensamblaje','ajuste') COLLATE utf8mb4_general_ci NOT NULL,
  `cantidad` int NOT NULL,
  `motivo` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_articulo` (`id_articulo`),
  CONSTRAINT `movimientos_ibfk_1` FOREIGN KEY (`id_articulo`) REFERENCES `articulos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movimientos`
--

LOCK TABLES `movimientos` WRITE;
/*!40000 ALTER TABLE `movimientos` DISABLE KEYS */;
/*!40000 ALTER TABLE `movimientos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'ignacio mello','ignacio@gmail.com','$2b$10$JZu0ERDTCl2fCz/Gl7Vk6.Zqs1on5HUbaJyuFWmhsyNDhqq3QueRi','2026-05-07 00:37:17');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
