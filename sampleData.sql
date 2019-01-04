-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 04, 2019 at 12:33 PM
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
CREATE DATABASE IF NOT EXISTS `leafletDB` DEFAULT CHARACTER SET latin1 COLLATE latin1_spanish_ci;
USE `leafletDB`;

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
(75, '2018-12-22 15:50:11', 'sdfa', 51.0483016968, -1.3774110079, 'bad', 'asdfa', 'asdf', 0),
(77, '2018-12-22 21:47:40', 'New Forrest', 50.8354301453, -1.4804079533, 'good', 'Theres a lovely walk here', 'It doesnt really need improvement ', 0),
(80, '2019-01-02 22:49:02', 'Fill', 50.9566955566, -1.3856509924, 'good', 'Test working message', '', 0),
(82, '2019-01-04 12:23:01', 'Redbridge Flyover', 50.9174842834, -1.4563510418, 'bad', 'There is lots of traffic on the western approach. It\'s hard to breathe and I get chest pains when cycling there.', 'I would reduce the traffic on the road or add trees between the road and cycle lane.', 0),
(83, '2019-01-04 12:23:01', 'Southampton Common', 50.9284019470, -1.4105240107, 'good', 'The common is a great place to relax in. Even though it\'s right next to the avenue the air seems much cleaner.', 'I think it could be improved by reducing the speed limit on the avenue or controlling the amount of ships in port.', 0);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
