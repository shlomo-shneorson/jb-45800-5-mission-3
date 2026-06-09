-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Jun 09, 2026 at 06:49 AM
-- Server version: 9.7.0
-- PHP Version: 8.3.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `meetFlow`
--

-- --------------------------------------------------------

--
-- Table structure for table `dev_groups`
--

CREATE TABLE `dev_groups` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `dev_groups`
--

INSERT INTO `dev_groups` (`id`, `name`, `created_at`, `updated_at`) VALUES
('083e998f-63ce-11f1-a04f-4e0bdc31629a', 'react_team', '2026-06-09 06:39:02', '2026-06-09 06:39:02'),
('083ec30b-63ce-11f1-a04f-4e0bdc31629a', 'ui_team', '2026-06-09 06:39:02', '2026-06-09 06:39:02'),
('083ed42d-63ce-11f1-a04f-4e0bdc31629a', 'mobile_team', '2026-06-09 06:39:02', '2026-06-09 06:39:02');

-- --------------------------------------------------------

--
-- Table structure for table `meets`
--

CREATE TABLE `meets` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `dev_group_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `start_time` datetime NOT NULL,
  `finish_time` datetime NOT NULL,
  `description` varchar(255) NOT NULL,
  `room` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `meets`
--

INSERT INTO `meets` (`id`, `dev_group_id`, `start_time`, `finish_time`, `description`, `room`, `created_at`, `updated_at`) VALUES
('3c3ffaf9-63cf-11f1-a04f-4e0bdc31629a', '083e998f-63ce-11f1-a04f-4e0bdc31629a', '2026-06-09 06:40:11', '2026-06-09 10:40:11', '\'very very importent meat\'', '\'the purple room\'', '2026-06-09 06:40:11', '2026-06-09 06:40:11'),
('3c4042b8-63cf-11f1-a04f-4e0bdc31629a', '083e998f-63ce-11f1-a04f-4e0bdc31629a', '2026-06-03 09:40:11', '2026-06-09 18:40:11', '\'very very long meat\'', '\'the Boardrooms\'', '2026-06-09 06:40:11', '2026-06-09 06:40:11'),
('3c40679e-63cf-11f1-a04f-4e0bdc31629a', '083ec30b-63ce-11f1-a04f-4e0bdc31629a', '2026-06-10 09:45:12', '2026-06-09 09:46:12', '\'very very useless meat\'', '\'the Brainstorming Rooms\'', '2026-06-09 06:40:11', '2026-06-09 06:40:11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dev_groups`
--
ALTER TABLE `dev_groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `meets`
--
ALTER TABLE `meets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dev_group_id` (`dev_group_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `meets`
--
ALTER TABLE `meets`
  ADD CONSTRAINT `meets_ibfk_1` FOREIGN KEY (`dev_group_id`) REFERENCES `dev_groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
