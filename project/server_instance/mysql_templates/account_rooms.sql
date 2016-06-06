-- MySQL dump 10.13  Distrib 5.1.73, for redhat-linux-gnu (x86_64)
--
-- Host: localhost    Database: maxmysql
-- ------------------------------------------------------
-- Server version	5.1.73

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts` (
  `email` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(15) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `token` varchar(100) NOT NULL,
  `online` varchar(3) NOT NULL DEFAULT 'no',
  `active` varchar(3) NOT NULL DEFAULT 'no',
  `nickname` varchar(10) NOT NULL DEFAULT 'nonickname',
  `rank` varchar(15) NOT NULL DEFAULT 'beginner',
  `balance` varchar(15) NOT NULL DEFAULT '1000',
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `id` (`created`),
  UNIQUE KEY `created` (`created`),
  UNIQUE KEY `created_2` (`created`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES ('zlatnaspirala@yahoo.com','indexoigz161lyh','2015-12-14 23:06:39','indexard856zjmhnwb3xrghbtcgxf7lyuv7vi','yes','yes','noname','beginner','261');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `level1`
--

DROP TABLE IF EXISTS `level1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `level1` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `link` varchar(50) NOT NULL DEFAULT 'games/level1',
  `nickname` varchar(22) NOT NULL,
  `stack_balance` varchar(22) NOT NULL,
  `email` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `nickname` (`nickname`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=150 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `level1`
--

LOCK TABLES `level1` WRITE;
/*!40000 ALTER TABLE `level1` DISABLE KEYS */;
INSERT INTO `level1` VALUES (140,'games/level1','nonickname','1000','hhh@mailinator.com'),(142,'games/level1','noname','739','zlatnaspirala@yahoo.com');
/*!40000 ALTER TABLE `level1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rooms` (
  `id` int(20) NOT NULL,
  `game` varchar(20) NOT NULL DEFAULT 'roulette',
  `accesstoken` varchar(100) DEFAULT NULL,
  `wager` float NOT NULL DEFAULT '1',
  `maxbet` int(50) NOT NULL DEFAULT '50',
  `link` varchar(55) NOT NULL DEFAULT 'games/level1/',
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (0,'low level room','uqopcl6r8jjorv21htop9r2lz0k9',0.1,50,'games/level1/');
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-12-15  5:09:49
