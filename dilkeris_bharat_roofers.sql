-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 26, 2024 at 07:03 PM
-- Server version: 10.5.22-MariaDB-cll-lve
-- PHP Version: 8.1.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dilkeris_bharat_roofers`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `email`, `phone`, `password`) VALUES
(1, 'mohit', 'mohit@gmail.com', '5678904', '$2b$10$3wVmtdSLWu3pvbKhqHjwt.vVBWLLH30U7E/fhulTe7AoDISjahnEO'),
(2, 'rahul', 'rahul@gmail.com', '9806324244', '$2a$10$Rhv2bb5x9khAN4gIVR.JKewQTkz/eaM./GqYhgYwMksBfN4UutSeq'),
(3, 'dev', 'dev@gmail.com', '9806324244', '$2a$10$Yl90ER3M4dXuHD/zAFSD7uSfwineEL9V.1t5XIrA8WixnquJ.oaCO'),
(4, 'Mohit Sahu', 'mohitsahu1993@gmail.com', '9806324244', '$2a$10$9a4nDXn7DNAx8foTLjViOufuRRlg4uVVi2PnlSX8lBLJTm2jmcJ86'),
(5, 'Anil Rajak', '1999anilrajak@gmail.com', '8839280515', '$2a$10$zvuIQ5PiaLivimxOTdpnh.vexZC3X/B/r6IWKxy4D3nAylpIBotwa');

-- --------------------------------------------------------

--
-- Table structure for table `contacted_user`
--

CREATE TABLE `contacted_user` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `message` varchar(1000) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contacted_user`
--

INSERT INTO `contacted_user` (`id`, `name`, `email`, `phone`, `message`, `created_at`) VALUES
(1, 'rahul', 'rahul@gmail.com', '9856325698', 'ok', '2023-12-22 10:57:12');

-- --------------------------------------------------------

--
-- Table structure for table `intrestedusers`
--

CREATE TABLE `intrestedusers` (
  `id` int(11) NOT NULL,
  `property_id` varchar(50) DEFAULT NULL,
  `PropertyName` varchar(1000) DEFAULT NULL,
  `userName` varchar(50) DEFAULT NULL,
  `userEmail` varchar(100) DEFAULT NULL,
  `userPhone` varchar(50) DEFAULT NULL,
  `message` varchar(1000) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `intrestedusers`
--

INSERT INTO `intrestedusers` (`id`, `property_id`, `PropertyName`, `userName`, `userEmail`, `userPhone`, `message`, `created_at`) VALUES
(1, '41', 'Mohit Apartment ', 'mohit', 'mohit@gmail.com', '9806324244', 'sdacas', '2023-12-27 11:44:36');

-- --------------------------------------------------------

--
-- Table structure for table `properties`
--

CREATE TABLE `properties` (
  `id` int(11) NOT NULL,
  `property_name` varchar(255) DEFAULT NULL,
  `property_location` varchar(1000) DEFAULT NULL,
  `property_address` varchar(255) DEFAULT NULL,
  `property_city` varchar(255) DEFAULT NULL,
  `property_description` varchar(1000) DEFAULT NULL,
  `property_type` varchar(50) DEFAULT NULL,
  `commercial_property_type` varchar(50) DEFAULT NULL,
  `tncp` varchar(255) DEFAULT NULL,
  `property_for` varchar(255) DEFAULT NULL,
  `property_video` varchar(1000) DEFAULT NULL,
  `rera` varchar(255) DEFAULT NULL,
  `bhk` varchar(10) DEFAULT NULL,
  `new_resale` varchar(10) DEFAULT NULL,
  `structure` varchar(50) DEFAULT NULL,
  `price` varchar(20) DEFAULT NULL,
  `square_ft` varchar(20) DEFAULT NULL,
  `dimension` varchar(20) DEFAULT NULL,
  `car_parking` varchar(50) DEFAULT NULL,
  `year_built` varchar(10) DEFAULT NULL,
  `facing` varchar(50) DEFAULT NULL,
  `furnishing` varchar(50) DEFAULT NULL,
  `carpet_area` varchar(20) DEFAULT NULL,
  `bathroom` varchar(10) DEFAULT NULL,
  `property_on_floor` varchar(10) DEFAULT NULL,
  `flooring` varchar(50) DEFAULT NULL,
  `age_of_property` varchar(10) DEFAULT NULL,
  `parking` varchar(50) DEFAULT NULL,
  `lift` varchar(50) DEFAULT NULL,
  `fall_ceiling` varchar(5) DEFAULT '0',
  `wallpaper` varchar(5) DEFAULT '0',
  `lights` varchar(5) DEFAULT '0',
  `fans` varchar(5) DEFAULT '0',
  `modularKitchen` varchar(15) DEFAULT '0',
  `road` varchar(5) DEFAULT '0',
  `drainage` varchar(5) DEFAULT '0',
  `roadLight` varchar(5) DEFAULT '0',
  `service_lift_available` varchar(5) DEFAULT '0',
  `common_visitor_parking` varchar(5) DEFAULT '0',
  `main_road_facing` varchar(5) DEFAULT '0',
  `working_24_7` varchar(5) DEFAULT '0',
  `good_ceiling_height` varchar(5) DEFAULT '0',
  `good_natural_light` varchar(5) DEFAULT '0',
  `attractive_entrance_gate` varchar(5) DEFAULT '0',
  `gated_community` varchar(5) DEFAULT '0',
  `immediate_possession` varchar(5) DEFAULT '0',
  `landscape_garden` varchar(5) DEFAULT '0',
  `water_supply_24_7` varchar(5) DEFAULT '0',
  `bore_well_water_24_7` varchar(5) DEFAULT '0',
  `environment_clearance_available` varchar(5) DEFAULT '0',
  `swimming_pool` varchar(5) DEFAULT '0',
  `terrace` varchar(5) DEFAULT '0',
  `air_conditioning` varchar(5) DEFAULT '0',
  `internet` varchar(5) DEFAULT '0',
  `balcony` varchar(5) DEFAULT '0',
  `cable_tv` varchar(5) DEFAULT '0',
  `computer` varchar(5) DEFAULT '0',
  `dishwasher` varchar(5) DEFAULT '0',
  `near_green_zone` varchar(5) DEFAULT '0',
  `near_temple` varchar(5) DEFAULT '0',
  `entry_gate` varchar(5) DEFAULT '0',
  `activity_area` varchar(5) DEFAULT '0',
  `security_24_7` varchar(5) DEFAULT '0',
  `long_term_investment` varchar(5) DEFAULT '0',
  `own_purpose` varchar(5) DEFAULT '0',
  `investment` varchar(5) DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `youtube_link` varchar(1000) DEFAULT NULL,
  `visits` int(255) DEFAULT 0,
  `isSold` varchar(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `properties`
--

INSERT INTO `properties` (`id`, `property_name`, `property_location`, `property_address`, `property_city`, `property_description`, `property_type`, `commercial_property_type`, `tncp`, `property_for`, `property_video`, `rera`, `bhk`, `new_resale`, `structure`, `price`, `square_ft`, `dimension`, `car_parking`, `year_built`, `facing`, `furnishing`, `carpet_area`, `bathroom`, `property_on_floor`, `flooring`, `age_of_property`, `parking`, `lift`, `fall_ceiling`, `wallpaper`, `lights`, `fans`, `modularKitchen`, `road`, `drainage`, `roadLight`, `service_lift_available`, `common_visitor_parking`, `main_road_facing`, `working_24_7`, `good_ceiling_height`, `good_natural_light`, `attractive_entrance_gate`, `gated_community`, `immediate_possession`, `landscape_garden`, `water_supply_24_7`, `bore_well_water_24_7`, `environment_clearance_available`, `swimming_pool`, `terrace`, `air_conditioning`, `internet`, `balcony`, `cable_tv`, `computer`, `dishwasher`, `near_green_zone`, `near_temple`, `entry_gate`, `activity_area`, `security_24_7`, `long_term_investment`, `own_purpose`, `investment`, `created_at`, `youtube_link`, `visits`, `isSold`) VALUES
(59, 'Shree Krishna Residency', NULL, 'Sanjeevani Nagar', 'jabalpur', 'Residential Colony  all sizes plots available ', 'plot', '', 'no', 'sale', '', 'no', '', 'new', '', '2000', '1000', '25*40', '', '2024', 'east', '', '', '', '', '', '', '', '', '0', '0', '0', '0', '0', '0', '1', '1', '0', '0', '1', '0', '0', '1', '0', '1', '1', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '2024-01-14 07:28:24', NULL, 16, '0'),
(60, 'Residential Plot ', NULL, 'behind Adi Plaza vijay nagar', 'jabalpur', 'TNCP approved property in near adiplaza jabalpur', 'plot', '', 'yes', 'sale', '', '', '', 'new', '', '4800  Per Square fee', '800', '20*40', '', '2024', 'east', '', '', '', '', '', '', '', '', '0', '0', '0', '0', '0', '1', '1', '1', '0', '0', '0', '0', '0', '1', '0', '1', '1', '1', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '1', '1', '1', '1', '2024-01-16 15:25:52', NULL, 8, '0'),
(61, '3bhk Duplex(Ready to move)', NULL, '1.5 km away from RTO office', 'jabalpur', '3bhk duplex plot area-672 sqft price-40 lakh   3bhk duplex plot area-712 sqft price-45 lakh  3bhk duplex plot area 840 sqft price-50 lakh  3bhk duplex plot area -876 sqft 52 lakh   3bhk duplex plot area- 1017 sqft price-55 lakh-', 'house', '', 'no', 'sale', '', 'no', '3', 'new', 'Duplex', '4000000', '672', 'no', 'yes', '2024', 'east', 'Semi Furnished', 'no', '3', 'no', 'no', 'no', '1', 'no', '1', '0', '1', '0', 'Semi Modular', '1', '1', '0', '0', '1', '0', '0', '1', '1', '1', '1', '1', '1', '0', '1', '1', '0', '1', '0', '0', '1', '0', '0', '1', '1', '1', '0', '1', '1', '1', '1', '1', '2024-01-17 13:33:34', NULL, 15, '0'),
(62, 'diverted plots', NULL, '1km away from sanjeevani nagar nabbe quarter', 'jabalpur', 'all sizes plots singlex duplex available ', 'plot', '', 'no', 'sale', '', 'no', '', 'new', '', '850', '1000', '25*40', '', '2024', 'east', '', '', '', '', '', '', '', '', '0', '0', '0', '0', '0', '1', '1', '0', '0', '0', '0', '0', '0', '1', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '1', '1', '1', '2024-01-17 14:45:15', NULL, 4, '0'),
(64, 'Gopal Vihar(tncp Approoved)', NULL, 'Panagar', 'jabalpur', 'Tncp Approoved side ,government bank finance available ,', 'plot', '', 'yes', 'sale', '', 'no', '', 'new', '', '800', '1000', '25*40', '', '', 'east', '', '', '', '', '', '', '', '', '0', '0', '0', '0', '0', '1', '1', '1', '0', '0', '0', '0', '0', '1', '0', '1', '1', '1', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '1', '1', '1', '1', '2024-01-20 13:08:51', NULL, 8, '0');

-- --------------------------------------------------------

--
-- Table structure for table `properties_images`
--

CREATE TABLE `properties_images` (
  `id` int(11) NOT NULL,
  `property_id` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `properties_images`
--

INSERT INTO `properties_images` (`id`, `property_id`, `image`, `created_at`) VALUES
(58, '41', 'http://localhost:4000/uploads/1701417690617-2150799681.jpg', '2023-12-01 08:01:30'),
(59, '41', 'http://localhost:4000/uploads/1701417690700-2150799725.jpg', '2023-12-01 08:01:30'),
(61, '41', 'http://localhost:4000/uploads/1701417893260-tidy-hall-with-two-pictures-wall.jpg', '2023-12-01 08:04:53'),
(62, '41', 'http://localhost:4000/uploads/1701417893271-tidy-hall-with-white-couch.jpg', '2023-12-01 08:04:53'),
(63, '41', 'http://localhost:4000/uploads/1701417893279-3d-rendering-modern-dining-room-living-room-with-luxury-decor.jpg', '2023-12-01 08:04:53'),
(141, '43', 'http://localhost:4000/uploads/1703077640933-pexels-pixabay-280229.jpg', '2023-12-20 13:07:20'),
(142, '43', 'http://localhost:4000/uploads/1703077640953-pexels-vecislavas-popa-1643383.jpg', '2023-12-20 13:07:20'),
(144, '53', 'http://localhost:4000/uploads/1703077735673-pexels-terry-magallanes-2988860.jpg', '2023-12-20 13:08:56'),
(145, '53', 'http://localhost:4000/uploads/1703077735688-pexels-pixabay-209296.jpg', '2023-12-20 13:08:56'),
(147, '53', 'http://localhost:4000/uploads/1703077762626-pexels-curtis-adams-8031899.jpg', '2023-12-20 13:09:22'),
(148, '54', 'http://localhost:4000/uploads/1703077816211-pexels-terry-magallanes-2988860.jpg', '2023-12-20 13:10:16'),
(149, '54', 'http://localhost:4000/uploads/1703077816225-pexels-expect-best-323780.jpg', '2023-12-20 13:10:16'),
(150, '54', 'http://localhost:4000/uploads/1703077816232-pexels-mark-2724749.jpg', '2023-12-20 13:10:16'),
(151, '45', 'http://localhost:4000/uploads/1703077883564-pexels-rahul-pandit-2834211.jpg', '2023-12-20 13:11:24'),
(152, '45', 'http://localhost:4000/uploads/1703077883570-pexels-vecislavas-popa-1643383.jpg', '2023-12-20 13:11:24'),
(153, '45', 'http://localhost:4000/uploads/1703077883575-pexels-curtis-adams-8031899.jpg', '2023-12-20 13:11:24'),
(154, '45', 'http://localhost:4000/uploads/1703077883588-pexels-christa-grover-2121121.jpg', '2023-12-20 13:11:24'),
(170, '56', 'http://localhost:4000/uploads/1703774505424-WhatsApp Image 2023-12-28 at 7.43.21 PM.jpeg', '2023-12-28 14:41:45'),
(171, '56', 'http://localhost:4000/uploads/1703774591560-WhatsApp Image 2023-12-28 at 7.43.30 PM.jpeg', '2023-12-28 14:43:11'),
(174, '56', 'http://localhost:4000/uploads/1703774618305-WhatsApp Image 2023-12-28 at 7.43.28 PM.jpeg', '2023-12-28 14:43:38'),
(175, '56', 'http://localhost:4000/uploads/1703774618305-WhatsApp Image 2023-12-28 at 7.43.27 PM (1).jpeg', '2023-12-28 14:43:38'),
(176, '56', 'http://localhost:4000/uploads/1703774618307-WhatsApp Image 2023-12-28 at 7.43.27 PM.jpeg', '2023-12-28 14:43:38'),
(177, '56', 'http://localhost:4000/uploads/1703774618307-WhatsApp Image 2023-12-28 at 7.43.26 PM.jpeg', '2023-12-28 14:43:38'),
(178, '56', 'http://localhost:4000/uploads/1703774618309-WhatsApp Image 2023-12-28 at 7.43.25 PM.jpeg', '2023-12-28 14:43:38'),
(179, '56', 'http://localhost:4000/uploads/1703774618309-WhatsApp Image 2023-12-28 at 7.43.24 PM.jpeg', '2023-12-28 14:43:38'),
(180, '56', 'http://localhost:4000/uploads/1703774618309-WhatsApp Image 2023-12-28 at 7.43.23 PM (1).jpeg', '2023-12-28 14:43:38'),
(181, '56', 'http://localhost:4000/uploads/1703774618309-WhatsApp Image 2023-12-28 at 7.43.23 PM.jpeg', '2023-12-28 14:43:38'),
(182, '56', 'http://localhost:4000/uploads/1703774618312-WhatsApp Image 2023-12-28 at 7.43.22 PM (1).jpeg', '2023-12-28 14:43:38'),
(183, '56', 'http://localhost:4000/uploads/1703774618312-WhatsApp Image 2023-12-28 at 7.43.22 PM.jpeg', '2023-12-28 14:43:38'),
(184, '59', 'http://localhost:4000/uploads/1705217326812-WhatsApp Image 2023-12-07 at 13.33.00_46bc5608.jpg', '2024-01-14 07:28:46'),
(185, '60', 'http://localhost:4000/uploads/1705419032995-WhatsApp Image 2024-01-16 at 8.49.41 PM (2).jpeg', '2024-01-16 15:30:33'),
(186, '60', 'http://localhost:4000/uploads/1705419095830-WhatsApp Image 2024-01-16 at 8.49.42 PM.jpeg', '2024-01-16 15:31:35'),
(187, '60', 'http://localhost:4000/uploads/1705419095831-WhatsApp Image 2024-01-16 at 8.49.41 PM (1).jpeg', '2024-01-16 15:31:35'),
(188, '60', 'http://localhost:4000/uploads/1705419095835-WhatsApp Image 2024-01-16 at 8.49.41 PM.jpeg', '2024-01-16 15:31:35'),
(189, '60', 'http://localhost:4000/uploads/1705419095836-WhatsApp Image 2024-01-16 at 8.49.40 PM (2).jpeg', '2024-01-16 15:31:35'),
(190, '60', 'http://localhost:4000/uploads/1705419095838-WhatsApp Image 2024-01-16 at 8.49.40 PM (1).jpeg', '2024-01-16 15:31:35'),
(191, '60', 'http://localhost:4000/uploads/1705419095841-WhatsApp Image 2024-01-16 at 8.49.40 PM.jpeg', '2024-01-16 15:31:35'),
(192, '60', 'http://localhost:4000/uploads/1705419095843-WhatsApp Image 2024-01-16 at 8.49.39 PM (2).jpeg', '2024-01-16 15:31:35'),
(193, '60', 'http://localhost:4000/uploads/1705419095844-WhatsApp Image 2024-01-16 at 8.49.39 PM (1).jpeg', '2024-01-16 15:31:35'),
(194, '60', 'http://localhost:4000/uploads/1705419095847-WhatsApp Image 2024-01-16 at 8.49.39 PM.jpeg', '2024-01-16 15:31:35'),
(195, '60', 'http://localhost:4000/uploads/1705419095850-WhatsApp Image 2024-01-16 at 8.49.38 PM (1).jpeg', '2024-01-16 15:31:35'),
(196, '60', 'http://localhost:4000/uploads/1705419095852-WhatsApp Image 2024-01-16 at 8.49.38 PM.jpeg', '2024-01-16 15:31:35'),
(197, '60', 'http://localhost:4000/uploads/1705419095854-WhatsApp Image 2024-01-16 at 8.49.37 PM (2).jpeg', '2024-01-16 15:31:35'),
(198, '60', 'http://localhost:4000/uploads/1705419116965-WhatsApp Image 2024-01-16 at 8.49.37 PM (1).jpeg', '2024-01-16 15:31:56'),
(199, '60', 'http://localhost:4000/uploads/1705419116966-WhatsApp Image 2024-01-16 at 8.49.37 PM.jpeg', '2024-01-16 15:31:56'),
(200, '60', 'http://localhost:4000/uploads/1705419116967-WhatsApp Image 2024-01-16 at 8.49.36 PM (1).jpeg', '2024-01-16 15:31:56'),
(201, '60', 'http://localhost:4000/uploads/1705419116968-WhatsApp Image 2024-01-16 at 8.49.36 PM.jpeg', '2024-01-16 15:31:56'),
(202, '60', 'http://localhost:4000/uploads/1705419116970-WhatsApp Image 2024-01-16 at 8.49.35 PM (1).jpeg', '2024-01-16 15:31:56'),
(203, '60', 'http://localhost:4000/uploads/1705419116972-WhatsApp Image 2024-01-16 at 8.49.35 PM.jpeg', '2024-01-16 15:31:56'),
(204, '60', 'http://localhost:4000/uploads/1705419116975-WhatsApp Image 2024-01-16 at 8.49.34 PM.jpeg', '2024-01-16 15:31:56'),
(205, '60', 'http://localhost:4000/uploads/1705419116978-WhatsApp Image 2024-01-16 at 8.49.32 PM.jpeg', '2024-01-16 15:31:56'),
(206, '60', 'http://localhost:4000/uploads/1705419116981-WhatsApp Image 2024-01-16 at 8.49.31 PM (2).jpeg', '2024-01-16 15:31:56'),
(207, '60', 'http://localhost:4000/uploads/1705419116984-WhatsApp Image 2024-01-16 at 8.49.31 PM (1).jpeg', '2024-01-16 15:31:56'),
(208, '60', 'http://localhost:4000/uploads/1705419116986-WhatsApp Image 2024-01-16 at 8.49.31 PM.jpeg', '2024-01-16 15:31:56'),
(209, '60', 'http://localhost:4000/uploads/1705419116988-WhatsApp Image 2024-01-16 at 8.49.30 PM (1).jpeg', '2024-01-16 15:31:57'),
(210, '60', 'http://localhost:4000/uploads/1705419116989-WhatsApp Image 2024-01-16 at 8.49.30 PM.jpeg', '2024-01-16 15:31:57'),
(211, '60', 'http://localhost:4000/uploads/1705419128596-WhatsApp Image 2024-01-16 at 8.49.29 PM.jpeg', '2024-01-16 15:32:08'),
(212, '60', 'http://localhost:4000/uploads/1705419128597-WhatsApp Image 2024-01-16 at 8.49.27 PM (1).jpeg', '2024-01-16 15:32:08'),
(213, '60', 'http://localhost:4000/uploads/1705419128599-WhatsApp Image 2024-01-16 at 8.49.27 PM.jpeg', '2024-01-16 15:32:08'),
(215, '61', 'http://localhost:4000/uploads/1705498832355-WhatsApp Image 2024-01-17 at 16.43.13_bfac4a56.jpg', '2024-01-17 13:40:32'),
(216, '61', 'http://localhost:4000/uploads/1705498848932-WhatsApp Image 2024-01-17 at 16.43.15_6d9dbb59.jpg', '2024-01-17 13:40:48'),
(217, '61', 'http://localhost:4000/uploads/1705498865957-WhatsApp Image 2024-01-17 at 16.43.14_50703e1f.jpg', '2024-01-17 13:41:05'),
(218, '61', 'http://localhost:4000/uploads/1705498885990-WhatsApp Image 2024-01-17 at 16.43.17_85922b24.jpg', '2024-01-17 13:41:25'),
(220, '62', 'http://localhost:4000/uploads/1705502790735-WhatsApp Image 2024-01-17 at 19.21.44_992dc593.jpg', '2024-01-17 14:46:30'),
(221, '62', 'http://localhost:4000/uploads/1705502790737-WhatsApp Image 2024-01-17 at 19.21.45_5c2939b7.jpg', '2024-01-17 14:46:30'),
(222, '62', 'http://localhost:4000/uploads/1705502790739-WhatsApp Image 2024-01-17 at 19.21.45_fe3856dc.jpg', '2024-01-17 14:46:30'),
(223, '62', 'http://localhost:4000/uploads/1705502790741-WhatsApp Image 2024-01-17 at 19.21.46_a50bc300.jpg', '2024-01-17 14:46:30'),
(224, '62', 'http://localhost:4000/uploads/1705502790743-WhatsApp Image 2024-01-17 at 19.21.47_48ecda16.jpg', '2024-01-17 14:46:30'),
(225, '62', 'http://localhost:4000/uploads/1705502790745-WhatsApp Image 2024-01-17 at 19.21.49_dcc10b5b.jpg', '2024-01-17 14:46:30'),
(226, '62', 'http://localhost:4000/uploads/1705502790747-WhatsApp Image 2024-01-17 at 19.21.50_2c55c59e.jpg', '2024-01-17 14:46:30'),
(227, '62', 'http://localhost:4000/uploads/1705502790749-WhatsApp Image 2024-01-17 at 19.21.50_4e83d081.jpg', '2024-01-17 14:46:30'),
(228, '62', 'http://localhost:4000/uploads/1705502790750-WhatsApp Image 2024-01-17 at 19.21.50_740da0d3.jpg', '2024-01-17 14:46:30'),
(229, '62', 'http://localhost:4000/uploads/1705502790752-WhatsApp Image 2024-01-17 at 19.21.51_2acef3eb.jpg', '2024-01-17 14:46:30'),
(230, '62', 'http://localhost:4000/uploads/1705502790754-WhatsApp Image 2024-01-17 at 19.21.52_1dbbe050.jpg', '2024-01-17 14:46:30'),
(231, '62', 'http://localhost:4000/uploads/1705502794060-WhatsApp Image 2024-01-17 at 19.21.44_992dc593.jpg', '2024-01-17 14:46:34'),
(232, '62', 'http://localhost:4000/uploads/1705502794061-WhatsApp Image 2024-01-17 at 19.21.45_5c2939b7.jpg', '2024-01-17 14:46:34'),
(233, '62', 'http://localhost:4000/uploads/1705502794064-WhatsApp Image 2024-01-17 at 19.21.45_fe3856dc.jpg', '2024-01-17 14:46:34'),
(234, '62', 'http://localhost:4000/uploads/1705502794066-WhatsApp Image 2024-01-17 at 19.21.46_a50bc300.jpg', '2024-01-17 14:46:34'),
(235, '62', 'http://localhost:4000/uploads/1705502794068-WhatsApp Image 2024-01-17 at 19.21.47_48ecda16.jpg', '2024-01-17 14:46:34'),
(236, '62', 'http://localhost:4000/uploads/1705502794069-WhatsApp Image 2024-01-17 at 19.21.49_dcc10b5b.jpg', '2024-01-17 14:46:34'),
(237, '62', 'http://localhost:4000/uploads/1705502794071-WhatsApp Image 2024-01-17 at 19.21.50_2c55c59e.jpg', '2024-01-17 14:46:34'),
(238, '62', 'http://localhost:4000/uploads/1705502794073-WhatsApp Image 2024-01-17 at 19.21.50_4e83d081.jpg', '2024-01-17 14:46:34'),
(239, '62', 'http://localhost:4000/uploads/1705502794074-WhatsApp Image 2024-01-17 at 19.21.50_740da0d3.jpg', '2024-01-17 14:46:34'),
(240, '62', 'http://localhost:4000/uploads/1705502794076-WhatsApp Image 2024-01-17 at 19.21.51_2acef3eb.jpg', '2024-01-17 14:46:34'),
(241, '62', 'http://localhost:4000/uploads/1705502794078-WhatsApp Image 2024-01-17 at 19.21.52_1dbbe050.jpg', '2024-01-17 14:46:34'),
(243, '64', 'http://localhost:4000/uploads/1705756268280-WhatsApp Image 2024-01-20 at 16.20.48_2ec167ed.jpg', '2024-01-20 13:11:08'),
(244, '64', 'http://localhost:4000/uploads/1705756284488-WhatsApp Image 2024-01-20 at 16.20.57_ee847ef4.jpg', '2024-01-20 13:11:24'),
(245, '64', 'http://localhost:4000/uploads/1705756297619-WhatsApp Image 2024-01-20 at 16.20.57_91582263.jpg', '2024-01-20 13:11:37'),
(246, '64', 'http://localhost:4000/uploads/1705756313187-WhatsApp Image 2024-01-20 at 16.20.52_9158817c.jpg', '2024-01-20 13:11:53'),
(247, '64', 'http://localhost:4000/uploads/1705756330691-WhatsApp Image 2024-01-20 at 16.20.56_36a26aa2.jpg', '2024-01-20 13:12:10'),
(248, '64', 'http://localhost:4000/uploads/1705756347344-WhatsApp Image 2024-01-20 at 16.20.52_9158817c.jpg', '2024-01-20 13:12:27'),
(249, '64', 'http://localhost:4000/uploads/1705756407869-WhatsApp Image 2024-01-20 at 16.20.56_5c3e84ac.jpg', '2024-01-20 13:13:27'),
(250, '64', 'http://localhost:4000/uploads/1705756411941-WhatsApp Image 2024-01-20 at 16.20.56_5c3e84ac.jpg', '2024-01-20 13:13:31'),
(251, '64', 'http://localhost:4000/uploads/1705756413310-WhatsApp Image 2024-01-20 at 16.20.56_5c3e84ac.jpg', '2024-01-20 13:13:33');

-- --------------------------------------------------------

--
-- Table structure for table `suggestions`
--

CREATE TABLE `suggestions` (
  `id` int(11) NOT NULL,
  `property_id` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `suggestions`
--

INSERT INTO `suggestions` (`id`, `property_id`, `created_at`) VALUES
(23, '53', '2024-01-02 05:47:31'),
(25, '56', '2024-01-14 07:30:56'),
(26, '60', '2024-01-16 15:35:19'),
(27, '59', '2024-01-16 15:35:23');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `uid` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uid`, `name`, `email`, `phone`, `password`, `created_at`) VALUES
(1, 'mohit', 'mohit@gmail.com', '9806324244', '$2b$10$kpNBAp3ZpTK/0NquAN1/g.UswxKFnCA85Rg..bGI4FfKxbNqZQFIm', '2023-12-27 11:48:31');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contacted_user`
--
ALTER TABLE `contacted_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `intrestedusers`
--
ALTER TABLE `intrestedusers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `properties`
--
ALTER TABLE `properties`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `properties_images`
--
ALTER TABLE `properties_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `suggestions`
--
ALTER TABLE `suggestions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `contacted_user`
--
ALTER TABLE `contacted_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `intrestedusers`
--
ALTER TABLE `intrestedusers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `properties`
--
ALTER TABLE `properties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `properties_images`
--
ALTER TABLE `properties_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=252;

--
-- AUTO_INCREMENT for table `suggestions`
--
ALTER TABLE `suggestions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
