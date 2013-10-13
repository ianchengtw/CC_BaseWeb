-- phpMyAdmin SQL Dump
-- version 3.5.7
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 13, 2013 at 07:10 PM
-- Server version: 5.5.29
-- PHP Version: 5.4.10

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `ianproject`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `ID` int(32) NOT NULL AUTO_INCREMENT,
  `username` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `enable` tinyint(1) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=15 ;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`ID`, `username`, `password`, `enable`) VALUES
(10, 'ian ', '81dc9bdb52d04dc20036dbd8313ed055', 1),
(11, 'winky', '81dc9bdb52d04dc20036dbd8313ed055', 1),
(12, 'mary', '81dc9bdb52d04dc20036dbd8313ed055', 1),
(13, 'syliva', '81dc9bdb52d04dc20036dbd8313ed055', 1),
(14, 'george', '81dc9bdb52d04dc20036dbd8313ed055', 1);

-- --------------------------------------------------------

--
-- Table structure for table `msg`
--

CREATE TABLE `msg` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `from_id` int(32) NOT NULL,
  `to_id` int(32) NOT NULL,
  `msg` text COLLATE utf8_unicode_ci NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=151 ;

-- --------------------------------------------------------

--
-- Table structure for table `readed_msg`
--

CREATE TABLE `readed_msg` (
  `msg_id` int(32) NOT NULL,
  `receiver_id` int(32) NOT NULL,
  `is_readed` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_data`
--

CREATE TABLE `user_data` (
  `id` int(16) NOT NULL AUTO_INCREMENT,
  `account_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `nick_name` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `registered_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=11 ;

--
-- Dumping data for table `user_data`
--

INSERT INTO `user_data` (`id`, `account_id`, `nick_name`, `phone`, `address`, `email`, `registered_time`) VALUES
(6, '10', '伊恩', '0912345678', '天龍國天龍路1號', 'ian@ian.com', '2013-10-08 01:55:04'),
(7, '11', '溫奇', '0912345678', '台南市天龍路1號', 'winky@winky.com', '2013-10-08 02:55:26'),
(8, '12', 'Mary', '12345678', '好佳在', 'mary@mary.com', '2013-10-12 14:56:56'),
(9, '13', 'Syliva', '123456', '123', 'syliva@syliva.com', '2013-10-12 14:58:37'),
(10, '14', 'George', '123456', '123', 'george@george.com', '2013-10-12 15:08:44');

-- --------------------------------------------------------

--
-- Table structure for table `user_online_list`
--

CREATE TABLE `user_online_list` (
  `user_id` int(32) NOT NULL,
  `is_online` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
