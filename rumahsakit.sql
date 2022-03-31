-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 31, 2022 at 09:28 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rumahsakit`
--

-- --------------------------------------------------------

--
-- Table structure for table `data_dokter`
--

CREATE TABLE `data_dokter` (
  `id` int(11) NOT NULL,
  `nama_dokter` varchar(255) NOT NULL,
  `jenis_kelamin` varchar(255) NOT NULL,
  `spesialis` varchar(255) NOT NULL,
  `jam_praktik` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `data_dokter`
--

INSERT INTO `data_dokter` (`id`, `nama_dokter`, `jenis_kelamin`, `spesialis`, `jam_praktik`) VALUES
(200812, 'Hamada Asahi', 'Laki Laki', 'Dokter Bedah', '14.00 - 15.00'),
(200813, 'Nanda Fadillah', 'Perempuan', 'Dokter Anak', '10.00 - 12.00'),
(200814, 'Angela', 'Perempuan', 'Dokter Gigi', '08.00 - 13.00'),
(200815, 'Roseanne Park', 'Perempuan', 'Dokter Kecantikan', '10.00 - 14.00'),
(200816, 'Mark Lee', 'Laki Laki', 'Dokter Mata', '10.00 - 12.00');

-- --------------------------------------------------------

--
-- Table structure for table `data_pasien`
--

CREATE TABLE `data_pasien` (
  `id` int(11) NOT NULL,
  `nama_pasien` varchar(255) NOT NULL,
  `jenis_kelamin` varchar(255) NOT NULL,
  `ruangan` varchar(255) NOT NULL,
  `tgl_masuk` varchar(255) NOT NULL,
  `alamat` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `data_pasien`
--

INSERT INTO `data_pasien` (`id`, `nama_pasien`, `jenis_kelamin`, `ruangan`, `tgl_masuk`, `alamat`) VALUES
(2, 'Fadillah', 'Perempuan', 'Kamboja', '14 Februari 2022', 'Purwokerto Kulon'),
(4, 'Dimas Ezar AR', 'Laki Laki', 'Tulip', '22 Februari 2022', 'Wangon'),
(5, 'Nanda', 'Perempuan', 'Delima', '30 Maret 2022', 'Karawang Timur'),
(6, 'Namira Shifwah K', 'Perempuan', 'Lavender', '31 Maret 2022', 'Jipang, Karanglewas, Purwokerto'),
(7, 'Faeza', 'Laki Laki', 'Mawar', '31 Maret 2022', 'Wangon');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `the_email` varchar(255) NOT NULL,
  `the_password` varchar(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `the_email`, `the_password`, `nama`, `phone`) VALUES
(1, 'nandafadillahw@email.com', '12345', 'nandaaafw', '088888888888'),
(2, 'nandafadillahw@email.com', '12345', 'nanda', '081234567890'),
(3, 'nandafadillah@email.com', '67890', 'nandafw', '088888888888');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `data_dokter`
--
ALTER TABLE `data_dokter`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_pasien`
--
ALTER TABLE `data_pasien`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `data_dokter`
--
ALTER TABLE `data_dokter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=200817;

--
-- AUTO_INCREMENT for table `data_pasien`
--
ALTER TABLE `data_pasien`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
