-- --------------------------------------------------------
-- Hôte:                         172.22.123.172
-- Version du serveur:           10.6.5-MariaDB-1:10.6.5+maria~focal - mariadb.org binary distribution
-- SE du serveur:                debian-linux-gnu
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour groupomania
CREATE DATABASE IF NOT EXISTS `groupomania` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `groupomania`;

-- Listage de la structure de la table groupomania. comments
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `postId` int(11) NOT NULL,
  `posterId` int(11) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `datePublished` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `postId` (`postId`),
  KEY `posterId` (`posterId`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`posterId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Listage des données de la table groupomania.comments : ~0 rows (environ)
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;

-- Listage de la structure de la table groupomania. posts
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `posterId` int(11) NOT NULL,
  `message` varchar(255) DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `datePublished` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `posterId` (`posterId`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`posterId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Listage des données de la table groupomania.posts : ~0 rows (environ)
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;

-- Listage de la structure de la table groupomania. users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `pictureUrl` varchar(255) NOT NULL DEFAULT 'user-default.png',
  `isAdmin` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Listage des données de la table groupomania.users : ~2 rows (environ)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT IGNORE INTO `users` (`id`, `firstname`, `surname`, `email`, `password`, `pictureUrl`, `isAdmin`) VALUES
	(1, 'Stéphanie', 'Roupomania', 'admin@groupomania.fr', '$2b$10$hGh7KgdfK5aH/VjS6smcn.nV3tny6iVhOPyQVul35PHvw4MC/GPCC', 'user-default.png', 1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
