-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : sam. 03 oct. 2020 à 17:43
-- Version du serveur :  5.7.24
-- Version de PHP : 7.2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--
CREATE DATABASE IF NOT EXISTS `groupomania` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `groupomania`;

-- --------------------------------------------------------

--
-- Structure de la table `publications`
--

CREATE TABLE `publications` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `UserId` smallint(5) UNSIGNED NOT NULL,
  `content` text NOT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `publications`
--

INSERT INTO `publications` (`id`, `UserId`, `content`, `imageUrl`, `createdAt`, `updatedAt`) VALUES
(1, 15, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', NULL, '2020-09-04 20:40:48', '2020-09-08 10:38:16'),
(25, 27, 'Salut collègues amateurs de sensations fortes  !\r\nJ\'ai trouvé un super site de notation de sauces piquantes. Huit ont attiré mon attention et je vous propose une dégustation à la cafèt\' chaque jeudi à 12:30.\r\nOn commencera avec \"The Force\" : \"Dans chaque cellules de ton corps, une douce brûlure tu ressentiras.\"\r\n\r\n', 'http://localhost:3000/images/lazerpepper.jpg1601047796434.jpg', '2020-09-25 15:29:56', '2020-09-25 15:29:56'),
(90, 57, 'Bonjour !', NULL, '2020-10-01 14:14:07', '2020-10-01 14:14:07'),
(136, 66, 'Bonjour à tous,\r\nje vous présente Luna.', 'http://localhost:3000/images/2015-10-31_12.12.10.jpg1601744043288.jpg', '2020-10-03 16:54:03', '2020-10-03 16:54:03');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `moderator` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `moderator`, `createdAt`, `updatedAt`) VALUES
(6, 'admin', 'admin@groupomania.mail', '$2b$10$/JtcVjuN7zRgNHsC1s/9cOvDlc0ribxu8lxm5O91HiaSlQlKVv7Lm', 1, '2020-09-16 15:23:59', '2020-09-16 15:23:59'),
(15, 'Camilladelacompta', 'camilla@groupomania.mail', '$2b$10$QQGsEuCfqQc3ZI3/eRI9TeNbujCSkCg05npPE1RPw5ZByV0sheWDi', 0, '2020-09-20 20:39:19', '2020-09-20 20:39:19'),
(16, 'Grégoire', 'greg@groupomania.mail', '$2b$10$hBtEHYsQFzGja/Kv.1vy1Our1HW4nkUZ0u0BHVdTNuTGUlLplZJCi', 0, '2020-09-21 09:19:35', '2020-09-21 09:19:35'),
(27, 'Amateur de sauces piquantes', 'so@pekoc.ko', '$2b$10$bK1kmYpY1EaBTui93EZP.OXMnf4zXy.MTSmzOaCmaD3Lj0uF7kuEi', 0, '2020-09-24 17:29:56', '2020-09-24 17:29:56'),
(57, 'TrandBer le roi des affaires', 'bertrand@commerce.groupomania.test', '$2b$10$fDpACUgoFb2mCJLDaItrC.DNAM7PdO7TYF25Tjy7o8H1g2ZV7rs1u', 0, '2020-10-01 14:12:17', '2020-10-01 14:12:17'),
(66, 'Michel', 'michel@groupomania.mail', '$2b$10$REVRM5YUyucFMg22kVnaMO/Gyxr3PO.iSF0GXWED8qFzOOKsrq3Ge', 0, '2020-10-03 16:42:10', '2020-10-03 16:42:10');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `publications`
--
ALTER TABLE `publications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`,`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `publications`
--
ALTER TABLE `publications`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=137;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `publications`
--
ALTER TABLE `publications`
  ADD CONSTRAINT `Utilisateur` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
