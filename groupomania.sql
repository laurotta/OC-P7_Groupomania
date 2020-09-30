-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mer. 30 sep. 2020 à 07:14
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
(28, 30, 'xtfhdtgxdgrdgfxdrfwdsrwrdgvwrdv', NULL, '2020-09-29 10:13:07', '2020-09-29 10:13:07'),
(42, 35, 'thrsthrstyserer', NULL, '2020-09-29 17:53:39', '2020-09-29 17:53:39'),
(43, 35, 'rsthsrthgfdgh', 'http://localhost:3000/images/enm.jpg1601402030196.jpg', '2020-09-29 17:53:50', '2020-09-29 17:53:50');

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
(10, 'test', 'test@test.test', '$2b$10$Z8PZ7CjIkrlY.w51uVC0cOo3F/zPAmKuB2uIVtSj3sA.Tq5Oa2Mwi', 0, '2020-09-16 13:24:31', '2020-09-16 13:24:31'),
(15, 'Camilladelacompta', 'camilla@groupomania.mail', '$2b$10$QQGsEuCfqQc3ZI3/eRI9TeNbujCSkCg05npPE1RPw5ZByV0sheWDi', 0, '2020-09-20 20:39:19', '2020-09-20 20:39:19'),
(16, 'Grégoire', 'greg@groupomania.mail', '$2b$10$hBtEHYsQFzGja/Kv.1vy1Our1HW4nkUZ0u0BHVdTNuTGUlLplZJCi', 1, '2020-09-21 09:19:35', '2020-09-21 09:19:35'),
(27, 'Amateur de sauces piquantes', 'so@pekoc.co', '$2b$10$bK1kmYpY1EaBTui93EZP.OXMnf4zXy.MTSmzOaCmaD3Lj0uF7kuEi', 0, '2020-09-24 17:29:56', '2020-09-24 17:29:56'),
(30, 'TrandBer le roi des affaires', 'bertrand@commerce.groupomania.test', '$2b$10$lMs88vwNrr9/BcukgOFFEesHgLcMChpjkMmNpfDHjy7ly8RUs6nkq', 0, '2020-09-25 15:32:57', '2020-09-25 15:32:57'),
(35, 'cvb', 'cvb@cvb.cvb', '$2b$10$5p9S2QyovIIQSJoo5BEYzeSYSNKV8X02jOXjt3P6CWbgg1w/WXUW.', 0, '2020-09-29 17:53:13', '2020-09-29 17:53:13'),
(36, 'machin', 'po@po.po', '$2b$10$hwgbpUbRLxBEQUHHoKCCIOv.rXO5F/tgzlezspv/QkzmJg0UZ2qsm', 0, '2020-09-29 21:47:58', '2020-09-29 21:47:58');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `publications`
--
ALTER TABLE `publications`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
