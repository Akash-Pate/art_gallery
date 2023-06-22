-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 22, 2023 at 10:56 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customer_id` int(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email_address` varchar(100) NOT NULL,
  `password` varchar(10) NOT NULL,
  `status` tinyint(1) NOT NULL COMMENT '1=active, 0=delete'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`customer_id`, `name`, `email_address`, `password`, `status`) VALUES
(1, 'luther', 'nkjhhsd.com', '$2a$10$aEu', 1),
(2, 'deigeo', 'oownwd.com', '$2a$10$V6f', 1),
(3, 'Marcus', 'yygskd.com', '$2a$10$PTR', 1),
(4, 'klause', 'yygskd.com', '$2a$10$Dmf', 1),
(5, 'Regge', 'ijjcgs.com', '$2a$10$6hg', 0);

-- --------------------------------------------------------

--
-- Table structure for table `paintings`
--

CREATE TABLE `paintings` (
  `painting_id` int(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  `price` int(100) NOT NULL,
  `image_url` varchar(250) NOT NULL,
  `status` int(100) NOT NULL COMMENT '1=active,2=deactive,0=delete',
  `seller_id` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `paintings`
--

INSERT INTO `paintings` (`painting_id`, `name`, `price`, `image_url`, `status`, `seller_id`) VALUES
(2, 'toolbox', 100, 'https://shop.decoart.com/blog/fathers-day-painted-toolbox/', 1, 2),
(3, 'camera', 500, 'https://images.app.goo.gl/bCyU1bx5qj1E1J749', 1, 1),
(4, 'rainy_day', 200, 'https://images.app.goo.gl/Ncs1nEq3ktWz1jtG8', 1, 4),
(5, 'sunny_day', 300, 'https://images.app.goo.gl/DnHjH4NxyxteAmc26', 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `purchases`
--

CREATE TABLE `purchases` (
  `purchase_id` int(100) NOT NULL,
  `date` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `quantity` int(100) NOT NULL,
  `amount` int(250) NOT NULL,
  `painting_id` int(100) NOT NULL,
  `customer_id` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `purchases`
--

INSERT INTO `purchases` (`purchase_id`, `date`, `quantity`, `amount`, `painting_id`, `customer_id`) VALUES
(1, '2023-06-17 08:25:24.087197', 1, 100, 2, 2),
(2, '2023-06-17 08:32:11.137148', 2, 500, 3, 4),
(3, '2023-06-18 07:52:19.948349', 1, 200, 4, 3);

-- --------------------------------------------------------

--
-- Table structure for table `sellers`
--

CREATE TABLE `sellers` (
  `seller_id` int(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email_address` varchar(100) NOT NULL,
  `password` varchar(10) NOT NULL,
  `status` tinyint(1) NOT NULL COMMENT '1=active , 0=deactive'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sellers`
--

INSERT INTO `sellers` (`seller_id`, `name`, `email_address`, `password`, `status`) VALUES
(1, 'rahul', 'kkjbjhb', ' bbjhbkj', 1),
(2, 'five', 'bkjkklnl', 'allslslsm', 1),
(3, 'kiran', 'mlyhjv.com', ' 1233', 1),
(4, 'dodo', 'uijakm.com', 'knnnnlj', 1),
(5, 'allison', 'uvhyfh.com', 'kil789j', 1),
(6, 'sloane', 'uvsdvh.com', 'kmmfm12j', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `paintings`
--
ALTER TABLE `paintings`
  ADD PRIMARY KEY (`painting_id`);

--
-- Indexes for table `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`purchase_id`);

--
-- Indexes for table `sellers`
--
ALTER TABLE `sellers`
  ADD PRIMARY KEY (`seller_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customer_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `paintings`
--
ALTER TABLE `paintings`
  MODIFY `painting_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `purchases`
--
ALTER TABLE `purchases`
  MODIFY `purchase_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sellers`
--
ALTER TABLE `sellers`
  MODIFY `seller_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `paintings`
--
ALTER TABLE `paintings`
  ADD CONSTRAINT `paintings_ibfk_1` FOREIGN KEY (`seller_id`) REFERENCES `sellers` (`seller_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `purchases`
--
ALTER TABLE `purchases`
  ADD CONSTRAINT `purchases_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `purchases_ibfk_2` FOREIGN KEY (`painting_id`) REFERENCES `paintings` (`painting_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
