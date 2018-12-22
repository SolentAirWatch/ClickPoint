-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 22, 2018 at 04:50 PM
-- Server version: 5.7.23
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `leafletDB`
--

-- --------------------------------------------------------

--
-- Table structure for table `geoData`
--

CREATE TABLE `geoData` (
  `id` int(11) NOT NULL,
  `timeStamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `NAME` varchar(25) NOT NULL,
  `LATITUDE` float(13,10) NOT NULL,
  `LONGDITUTE` float(13,10) NOT NULL,
  `type` varchar(5) NOT NULL,
  `reason` varchar(255) NOT NULL,
  `improvement` varchar(255) NOT NULL,
  `reviewed` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `geoData`
--

INSERT INTO `geoData` (`id`, `timeStamp`, `NAME`, `LATITUDE`, `LONGDITUTE`, `type`, `reason`, `improvement`, `reviewed`) VALUES
(68, '2018-12-22 15:20:44', 'Hobbit', -2.2935023308, 50.4722251892, 'bad', 'sandwhich', 'eat it', 0),
(69, '2018-12-22 15:34:11', 'asd', -1.3320920467, 50.9835052490, 'good', 'its great here', 'maybe more ice ceam?', 0),
(70, '2018-12-22 15:44:18', 'placeName', 56.9091796875, 5.9220452309, 'bad', 'its not very good', 'dont know', 0),
(71, '2018-12-22 15:45:38', 'placeName', 5.9220452309, 56.9091796875, 'good', 'its great here', 'dont know', 0),
(72, '2018-12-22 15:45:38', 'London', 51.4577903748, -0.1034469977, 'good', 'its great here', 'dont know', 0),
(73, '2018-12-22 15:45:46', 'placeName', 51.4965019226, -0.2326440066, 'bad', 'its not very good', 'how to improve', 0),
(74, '2018-12-22 15:50:09', 'sadfa', 50.9774513245, -1.4941409826, 'good', 'its great here', 'dfa', 0),
(75, '2018-12-22 15:50:11', 'sdfa', 51.0483016968, -1.3774110079, 'bad', 'its not very good', 'asdf', 0),
(76, '2018-12-22 16:35:01', 'Hobbit', -2.2935023308, 50.4722251892, 'bad', 'sandwhich', 'eat it', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `geoData`
--
ALTER TABLE `geoData`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `geoData`
--
ALTER TABLE `geoData`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
