-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 07, 2020 at 07:05 AM
-- Server version: 5.7.24
-- PHP Version: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `week4_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(50) NOT NULL,
  `category_status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`, `category_status`) VALUES
(1, 'Makanan', '1'),
(2, 'Minuman', '1'),
(3, 'Dessert', '1');

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `history_id` int(11) NOT NULL,
  `invoice` int(6) NOT NULL,
  `history_subtotal` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`history_id`, `invoice`, `history_subtotal`, `created_at`) VALUES
(376, 1661718, 66000, '2020-08-28 10:45:54'),
(377, 1178334, 44000, '2020-08-28 10:58:35'),
(378, 1019655, 110000, '2020-08-28 11:01:01'),
(379, 1816459, 94600, '2020-08-29 05:07:29'),
(380, 1244525, 61600, '2020-08-29 06:23:38'),
(381, 1311807, 47300, '2020-08-29 09:29:33'),
(382, 1802303, 121000, '2020-08-29 17:00:48'),
(383, 1125164, 46200, '2020-08-30 12:42:37'),
(384, 1518127, 63800, '2020-08-30 13:23:44'),
(385, 1236167, 82500, '2020-08-30 15:03:55'),
(386, 1668576, 107800, '2020-08-30 16:46:39'),
(387, 1692224, 51700, '2020-08-31 02:05:11'),
(388, 1527982, 88000, '2020-08-31 02:33:41'),
(389, 1737769, 88000, '2020-08-31 02:33:43'),
(390, 1607996, 88000, '2020-08-31 02:33:43'),
(391, 1850221, 88000, '2020-08-31 02:33:43'),
(392, 1824025, 88000, '2020-08-31 02:33:44'),
(393, 1361263, 88000, '2020-08-31 02:33:44'),
(394, 1837388, 88000, '2020-08-31 02:33:45'),
(395, 1556737, 88000, '2020-08-31 02:33:45'),
(396, 1681723, 88000, '2020-08-31 02:33:45'),
(397, 1347609, 88000, '2020-08-31 02:33:46'),
(398, 1054950, 88000, '2020-08-31 02:33:46'),
(399, 1255001, 154000, '2020-08-31 06:45:45');

-- --------------------------------------------------------

--
-- Table structure for table `menu_items`
--

CREATE TABLE `menu_items` (
  `menu_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `menu_name` varchar(50) NOT NULL,
  `menu_price` int(255) NOT NULL,
  `menu_image` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `menu_status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `menu_items`
--

INSERT INTO `menu_items` (`menu_id`, `category_id`, `menu_name`, `menu_price`, `menu_image`, `created_at`, `updated_at`, `menu_status`) VALUES
(7, 3, 'Chocorum', 28000, '', '2020-08-17 05:30:01', '2020-08-17 05:30:01', 1),
(8, 2, 'Cappucino', 28000, '', '2020-08-17 05:30:17', '2020-08-17 05:30:17', 1),
(9, 1, 'Salmon Truffle', 68000, '', '2020-08-17 05:30:49', '2020-08-17 05:30:48', 1),
(10, 2, 'Red Velvet Latte', 28000, '', '2020-08-17 05:31:23', '2020-08-17 05:31:23', 1),
(11, 1, 'Wiener Schnitzel', 60000, '', '2020-08-17 05:32:27', '2020-08-17 05:32:26', 1),
(12, 2, 'Orange juice', 18000, '', '2020-08-25 02:30:35', '2020-08-25 02:30:35', 1),
(13, 1, 'French Fries', 20000, '', '2020-08-26 11:05:52', '2020-08-26 11:05:51', 1),
(14, 1, 'Fried Rice Special', 30000, '', '2020-08-26 11:06:41', '2020-08-26 11:06:40', 1),
(15, 1, 'Fried Rice Seafood', 28000, '', '2020-08-26 11:06:53', '2020-08-26 11:06:53', 1),
(16, 2, 'Avocado Juice', 18000, '', '2020-08-26 11:07:25', '2020-08-26 11:07:24', 1),
(17, 2, 'Ice Tea', 12000, '', '2020-08-26 11:07:37', '2020-08-26 11:07:37', 1),
(18, 2, 'Lemon Tea', 15000, '', '2020-08-26 11:07:49', '2020-08-26 11:07:48', 1),
(19, 1, 'Chicken Wings', 35000, '', '2020-08-26 11:08:46', '2020-08-26 11:08:45', 1),
(20, 1, 'Mc Nuggets', 25000, '', '2020-08-26 11:09:13', '2020-08-26 11:09:13', 1),
(22, 2, 'Coca-cola', 15000, '', '2020-08-26 13:07:01', '2020-08-26 13:07:00', 1),
(23, 2, 'Sprite', 15000, '', '2020-08-26 13:07:12', '2020-08-26 13:07:11', 1),
(25, 1, 'Beef Burger', 28000, '', '2020-08-27 13:58:04', '2020-08-27 13:58:05', 1),
(26, 1, 'Spaghetti Bolognaise', 30000, '', '2020-08-26 13:08:32', '2020-08-26 13:08:32', 1),
(27, 1, 'Hot Dog', 20000, '', '2020-08-26 13:22:51', '2020-08-26 13:22:51', 1),
(28, 2, 'Tuna Sandwich', 20000, '2020-09-06T09-12-58.545Z-www.YTS.LT.jpg', '2020-09-06 09:12:59', '2020-09-06 09:12:58', 1),
(29, 2, 'Tuna Sandwich', 20000, '2020-09-07T03-11-30.359Z-www.YTS.LT.jpg', '2020-09-07 03:11:30', '2020-09-07 03:11:30', 1),
(30, 2, 'Tuna Sandwich', 20000, '2020-09-07T04-08-53.989Z-www.YTS.LT.jpg', '2020-09-07 04:08:54', '2020-09-07 04:08:53', 1),
(32, 2, 'Aqua', 5000, '2020-09-07T06-48-55.862Z-www.YTS.LT.jpg', '2020-09-07 06:48:56', '2020-09-07 06:48:55', 1),
(33, 2, 'Espresso', 30000, '', '2020-09-07 07:03:39', '2020-09-07 07:03:40', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `history_id` int(11) NOT NULL,
  `menu_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total_price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `history_id`, `menu_id`, `qty`, `created_at`, `total_price`) VALUES
(432, 376, 6, 1, '2020-08-28 10:45:54', 60000),
(433, 377, 4, 1, '2020-08-28 10:58:35', 20000),
(434, 377, 4, 1, '2020-08-28 10:58:35', 20000),
(435, 378, 3, 2, '2020-08-28 11:01:01', 60000),
(436, 378, 4, 2, '2020-08-28 11:01:01', 40000),
(437, 379, 10, 1, '2020-08-29 05:07:29', 28000),
(438, 379, 12, 1, '2020-08-29 05:07:29', 18000),
(439, 379, 13, 2, '2020-08-29 05:07:29', 40000),
(440, 380, 8, 2, '2020-08-29 06:23:39', 56000),
(441, 381, 25, 1, '2020-08-29 09:29:33', 28000),
(442, 381, 22, 1, '2020-08-29 09:29:33', 15000),
(443, 382, 11, 1, '2020-08-29 17:00:48', 60000),
(444, 382, 18, 1, '2020-08-29 17:00:48', 15000),
(445, 382, 19, 1, '2020-08-29 17:00:48', 35000),
(446, 383, 14, 1, '2020-08-30 12:42:37', 30000),
(447, 383, 17, 1, '2020-08-30 12:42:37', 12000),
(448, 384, 13, 1, '2020-08-30 13:23:44', 20000),
(449, 384, 12, 1, '2020-08-30 13:23:44', 18000),
(450, 384, 4, 1, '2020-08-30 13:23:44', 20000),
(451, 385, 11, 1, '2020-08-30 15:03:56', 60000),
(452, 385, 22, 1, '2020-08-30 15:03:56', 15000),
(453, 386, 22, 2, '2020-08-30 16:46:39', 30000),
(454, 386, 9, 1, '2020-08-30 16:46:39', 68000),
(455, 387, 19, 1, '2020-08-31 02:05:11', 35000),
(456, 387, 17, 1, '2020-08-31 02:05:11', 12000),
(457, 388, 4, 1, '2020-08-31 02:33:41', 20000),
(458, 388, 6, 1, '2020-08-31 02:33:41', 60000),
(459, 389, 4, 1, '2020-08-31 02:33:43', 20000),
(460, 389, 6, 1, '2020-08-31 02:33:43', 60000),
(461, 390, 4, 1, '2020-08-31 02:33:43', 20000),
(462, 390, 6, 1, '2020-08-31 02:33:43', 60000),
(463, 391, 4, 1, '2020-08-31 02:33:43', 20000),
(464, 391, 6, 1, '2020-08-31 02:33:43', 60000),
(465, 392, 4, 1, '2020-08-31 02:33:44', 20000),
(466, 392, 6, 1, '2020-08-31 02:33:44', 60000),
(467, 393, 4, 1, '2020-08-31 02:33:44', 20000),
(468, 393, 6, 1, '2020-08-31 02:33:44', 60000),
(469, 394, 4, 1, '2020-08-31 02:33:45', 20000),
(470, 394, 6, 1, '2020-08-31 02:33:45', 60000),
(471, 395, 4, 1, '2020-08-31 02:33:45', 20000),
(472, 395, 6, 1, '2020-08-31 02:33:45', 60000),
(473, 396, 4, 1, '2020-08-31 02:33:46', 20000),
(474, 396, 6, 1, '2020-08-31 02:33:46', 60000),
(475, 397, 4, 1, '2020-08-31 02:33:46', 20000),
(476, 397, 6, 1, '2020-08-31 02:33:46', 60000),
(477, 398, 4, 1, '2020-08-31 02:33:46', 20000),
(478, 398, 6, 1, '2020-08-31 02:33:46', 60000),
(479, 399, 6, 2, '2020-08-31 06:45:45', 120000),
(480, 399, 4, 1, '2020-08-31 06:45:45', 20000);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_email` varchar(150) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `user_role` int(1) NOT NULL,
  `user_status` int(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_email`, `user_password`, `user_name`, `user_role`, `user_status`, `created_at`, `updated_at`) VALUES
(6, 'admin@gmail.com', '$2b$10$jYXPyi3l.xdaMb5FLeMCOekHPC87at53tPHUTh8leBP0HiPNA2Lym', 'ADMIN', 1, 1, '2020-09-07 02:41:32', '2020-09-03 23:41:56'),
(8, 'naldi@yahoo.com', '$2b$10$6d6RTDQOC6e5HlolblIPQO0Z/hhGI0TuBleRhhOqNrExXcEzMpV5m', 'naldi', 2, 0, '2020-09-06 09:29:57', '2020-09-06 16:17:02'),
(9, 'mhd.naldi@yahoo.com', '$2b$10$GIfx6xSNONm2miwKGeeQHOKDz9dufKrz1iaGhC.KT0NsZZdXIzbDm', 'mhdnaldi', 2, 1, '2020-09-07 02:46:34', '2020-09-07 09:45:38'),
(10, 'test1@yahoo.com', '$2b$10$JF8TkwPt2dRBq47O1WzRyuXDmdRV.kcUo5gvST8BciAwXI/qf56ZK', 'test', 2, 1, '2020-09-07 07:10:53', '2020-09-07 13:40:59');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`history_id`);

--
-- Indexes for table `menu_items`
--
ALTER TABLE `menu_items`
  ADD PRIMARY KEY (`menu_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=400;

--
-- AUTO_INCREMENT for table `menu_items`
--
ALTER TABLE `menu_items`
  MODIFY `menu_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=481;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
