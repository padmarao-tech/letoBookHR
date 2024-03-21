-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.5.41 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for letosyshr
CREATE DATABASE IF NOT EXISTS `letosyshr` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `letosyshr`;

-- Dumping structure for table letosyshr.adddeductdetail
CREATE TABLE IF NOT EXISTS `adddeductdetail` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `adddeductheader_uid` int(11) NOT NULL,
  `adddeduct_type_uid` int(11) NOT NULL,
  `empmaster_uid` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `notes` varchar(100) DEFAULT NULL,
  `upstatus` varchar(5) DEFAULT 'NEW',
  PRIMARY KEY (`adddeductheader_uid`,`adddeduct_type_uid`,`empmaster_uid`) USING BTREE,
  UNIQUE KEY `UID` (`uid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.adddeductdetail: ~8 rows (approximately)
/*!40000 ALTER TABLE `adddeductdetail` DISABLE KEYS */;
INSERT INTO `adddeductdetail` (`uid`, `adddeductheader_uid`, `adddeduct_type_uid`, `empmaster_uid`, `amount`, `notes`, `upstatus`) VALUES
	(45, 33, 3, 2, 100, 'first', 'NEW'),
	(47, 33, 3, 4, 400, 'jhgjuhk', 'NEW'),
	(41, 34, 3, 2, 500, 'mhgjgj', 'NEW'),
	(42, 34, 4, 4, 200, '7777', 'NEW'),
	(51, 35, 3, 3, 100, 'fgfgf', 'NEW'),
	(52, 35, 3, 4, 50, 'uiiououo', 'NEW'),
	(53, 35, 4, 3, 45, 'jhjkh', 'NEW'),
	(43, 36, 1, 3, 200, 'fghgfh', 'NEW');
/*!40000 ALTER TABLE `adddeductdetail` ENABLE KEYS */;

-- Dumping structure for table letosyshr.adddeductheader
CREATE TABLE IF NOT EXISTS `adddeductheader` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `company_uid` int(11) NOT NULL,
  `tyear` int(11) NOT NULL,
  `tmonth` int(11) NOT NULL,
  `notes` varchar(150) DEFAULT NULL,
  `entry_date` date DEFAULT NULL,
  `ttype` varchar(5) DEFAULT NULL,
  `user_uid` int(10) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `created_on` date DEFAULT NULL,
  `updated_on` date DEFAULT NULL,
  PRIMARY KEY (`uid`,`company_uid`,`tyear`,`tmonth`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.adddeductheader: ~4 rows (approximately)
/*!40000 ALTER TABLE `adddeductheader` DISABLE KEYS */;
INSERT INTO `adddeductheader` (`uid`, `company_uid`, `tyear`, `tmonth`, `notes`, `entry_date`, `ttype`, `user_uid`, `amount`, `created_on`, `updated_on`) VALUES
	(33, 1, 2020, 4, 'updated by ayyappan', '2021-09-28', 'ADD', NULL, 800, NULL, NULL),
	(34, 1, 2023, 3, 'sulaiman', '2021-09-28', 'ADD', NULL, 700, NULL, NULL),
	(35, 1, 2021, 6, 'Other information', NULL, 'ADD', NULL, 195, NULL, NULL),
	(36, 1, 2021, 9, 'fghgfh', NULL, 'DED', NULL, 200, NULL, NULL);
/*!40000 ALTER TABLE `adddeductheader` ENABLE KEYS */;

-- Dumping structure for table letosyshr.adddeductmaster
CREATE TABLE IF NOT EXISTS `adddeductmaster` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `company_uid` int(11) DEFAULT NULL,
  `code` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `Action` double NOT NULL DEFAULT '1',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.adddeductmaster: ~4 rows (approximately)
/*!40000 ALTER TABLE `adddeductmaster` DISABLE KEYS */;
INSERT INTO `adddeductmaster` (`uid`, `company_uid`, `code`, `name`, `Action`) VALUES
	(1, 1, 'RENT', 'HOUSE RENT', -1),
	(2, 1, 'MDUT', 'MONTHLY DEDUCTION', -1),
	(3, 1, 'BON', 'BONUS', 1),
	(4, 1, 'OT', 'OT', 1);
/*!40000 ALTER TABLE `adddeductmaster` ENABLE KEYS */;

-- Dumping structure for table letosyshr.bankmaster
CREATE TABLE IF NOT EXISTS `bankmaster` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `BankCode` varchar(20) NOT NULL,
  `company_uid` int(11) NOT NULL DEFAULT '1',
  `name` varchar(100) DEFAULT NULL,
  `routingcode` varchar(100) DEFAULT NULL,
  `branch` varchar(100) DEFAULT NULL,
  `managername` varchar(100) DEFAULT NULL,
  `phoneno` varchar(50) DEFAULT NULL,
  `mobileno` varchar(50) DEFAULT NULL,
  `address` varchar(300) DEFAULT NULL,
  `email_id` varchar(200) DEFAULT NULL,
  `notes` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.bankmaster: ~1 rows (approximately)
/*!40000 ALTER TABLE `bankmaster` DISABLE KEYS */;
INSERT INTO `bankmaster` (`uid`, `BankCode`, `company_uid`, `name`, `routingcode`, `branch`, `managername`, `phoneno`, `mobileno`, `address`, `email_id`, `notes`) VALUES
	(1, 'AXIS', 1, 'AXIS BANK', 'HJKLKFFR', 'FGHGH', 'FDHGFGH', '565656', '56565656', 'SDFDSFDSF', 'FGFGFGF@HOTMAIL.COM', NULL);
/*!40000 ALTER TABLE `bankmaster` ENABLE KEYS */;

-- Dumping structure for table letosyshr.clientmaster
CREATE TABLE IF NOT EXISTS `clientmaster` (
  `uid` int(11) DEFAULT NULL,
  `company_uid` int(11) NOT NULL,
  `Code` varchar(20) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `user_uid` int(11) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Password` varchar(10) DEFAULT NULL,
  `Supplier_Name` varchar(100) DEFAULT NULL,
  `Confirm_Password` varchar(20) DEFAULT NULL,
  `Contact_name` varchar(100) DEFAULT NULL,
  `PhoneNo` varchar(12) DEFAULT NULL,
  `Panno` varchar(100) DEFAULT NULL,
  `RegNo` varchar(100) DEFAULT NULL,
  `P_address1` varchar(200) DEFAULT NULL,
  `P_Address2` varchar(200) DEFAULT NULL,
  `P_Postalcode` varchar(100) DEFAULT NULL,
  `P_Country` varchar(100) DEFAULT NULL,
  `P_City` varchar(200) DEFAULT NULL,
  `P_Sate` varchar(100) DEFAULT NULL,
  `B_address1` varchar(100) DEFAULT NULL,
  `B_Address2` varchar(100) DEFAULT NULL,
  `B_City` varchar(100) DEFAULT NULL,
  `B_PostalCode` varchar(100) DEFAULT NULL,
  `B_Country` varchar(100) DEFAULT NULL,
  `B_State` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`company_uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.clientmaster: ~0 rows (approximately)
/*!40000 ALTER TABLE `clientmaster` DISABLE KEYS */;
/*!40000 ALTER TABLE `clientmaster` ENABLE KEYS */;

-- Dumping structure for table letosyshr.codegenerate
CREATE TABLE IF NOT EXISTS `codegenerate` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `company_uid` int(11) NOT NULL,
  `startwith` varchar(5) DEFAULT NULL,
  `setnumber` int(10) unsigned zerofill DEFAULT NULL,
  `lastnumber` int(11) DEFAULT NULL,
  `tablename` varchar(25) DEFAULT NULL,
  `notes` varchar(150) DEFAULT NULL,
  UNIQUE KEY `uid` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COMMENT='Generate code for each mater table';

-- Dumping data for table letosyshr.codegenerate: ~5 rows (approximately)
/*!40000 ALTER TABLE `codegenerate` DISABLE KEYS */;
INSERT INTO `codegenerate` (`uid`, `company_uid`, `startwith`, `setnumber`, `lastnumber`, `tablename`, `notes`) VALUES
	(1, 1, 'SM', 0000000000, 2, 'salarymaster', 'loan deduction'),
	(2, 1, 'PR', 0000000000, 2, 'salaryprocessheader', 'payroll process'),
	(3, 1, 'AD', 0000000000, 36, 'adddeductheader', 'Monthly Addition'),
	(4, 1, 'DE', 0000000000, 2, 'MDED', 'Monthly Deduction'),
	(5, 1, 'TS', 0000000000, 2, 'timesheetheader', 'timesheet detail');
/*!40000 ALTER TABLE `codegenerate` ENABLE KEYS */;

-- Dumping structure for table letosyshr.companymaster
CREATE TABLE IF NOT EXISTS `companymaster` (
  `uid` int(11) DEFAULT NULL,
  `comanyname` varchar(150) DEFAULT NULL,
  `Companyaddress` varchar(150) DEFAULT NULL,
  `picode` varchar(100) DEFAULT NULL,
  `Contact_person` varchar(50) DEFAULT NULL,
  `Desingnation` varchar(50) DEFAULT NULL,
  `Person_EmailID` varchar(50) DEFAULT NULL,
  `Contact_no` varchar(50) DEFAULT NULL,
  `Company_emailid` varchar(50) DEFAULT NULL,
  `gstno` varchar(150) DEFAULT NULL,
  `pancardno` varchar(150) DEFAULT NULL,
  `adminid` varchar(10) DEFAULT NULL,
  `password` varchar(10) DEFAULT NULL,
  `PackageType` int(10) DEFAULT NULL,
  `PackageAmount` double DEFAULT NULL,
  `Noofuserallowed` int(11) DEFAULT NULL,
  `Start_date` date DEFAULT NULL,
  `NoofEmployeeAllowed` int(11) DEFAULT '0',
  `End_date` date DEFAULT NULL,
  `Displaystatus` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.companymaster: ~1 rows (approximately)
/*!40000 ALTER TABLE `companymaster` DISABLE KEYS */;
INSERT INTO `companymaster` (`uid`, `comanyname`, `Companyaddress`, `picode`, `Contact_person`, `Desingnation`, `Person_EmailID`, `Contact_no`, `Company_emailid`, `gstno`, `pancardno`, `adminid`, `password`, `PackageType`, `PackageAmount`, `Noofuserallowed`, `Start_date`, `NoofEmployeeAllowed`, `End_date`, `Displaystatus`) VALUES
	(NULL, 'Letosys Pvt. Ltd.', '46, prestige Building', '60006', 'Riyas', 'Owner', NULL, '124658e', NULL, '44t4t4t', 'rtrtrtrt', 'RIYAS', '123', 1, 14000, 14, '2021-07-01', 0, '2021-12-30', 'Y');
/*!40000 ALTER TABLE `companymaster` ENABLE KEYS */;

-- Dumping structure for table letosyshr.dailytimesheetdetails
CREATE TABLE IF NOT EXISTS `dailytimesheetdetails` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `company_uid` int(11) NOT NULL,
  `empmaster_uid` int(11) NOT NULL,
  `leavetype_uid` int(11) DEFAULT NULL,
  `leavetype_code` varchar(20) DEFAULT NULL,
  `dates` date NOT NULL,
  `in_time` time DEFAULT '00:00:00',
  `out_time` time DEFAULT '00:00:00',
  `tyear` int(11) DEFAULT '0',
  `tmonth` int(11) DEFAULT '0',
  `totalhrs` int(11) DEFAULT '0',
  `normalhrs` int(11) DEFAULT '0',
  `othrs` int(11) DEFAULT '0',
  PRIMARY KEY (`company_uid`,`empmaster_uid`,`dates`) USING BTREE,
  UNIQUE KEY `uid` (`uid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=186 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.dailytimesheetdetails: ~180 rows (approximately)
/*!40000 ALTER TABLE `dailytimesheetdetails` DISABLE KEYS */;
INSERT INTO `dailytimesheetdetails` (`uid`, `company_uid`, `empmaster_uid`, `leavetype_uid`, `leavetype_code`, `dates`, `in_time`, `out_time`, `tyear`, `tmonth`, `totalhrs`, `normalhrs`, `othrs`) VALUES
	(1, 1, 1, 1, 'P', '2021-09-01', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(2, 1, 1, 1, 'P', '2021-09-02', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(3, 1, 1, 1, 'P', '2021-09-03', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(4, 1, 1, 1, 'P', '2021-09-04', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(5, 1, 1, 1, 'P', '2021-09-05', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(6, 1, 1, 1, 'P', '2021-09-06', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(7, 1, 1, 1, 'P', '2021-09-07', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(8, 1, 1, 1, 'P', '2021-09-08', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(9, 1, 1, 1, 'P', '2021-09-09', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(10, 1, 1, 1, 'P', '2021-09-10', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(11, 1, 1, 1, 'P', '2021-09-11', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(12, 1, 1, 1, 'P', '2021-09-12', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(13, 1, 1, 1, 'P', '2021-09-13', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(14, 1, 1, 1, 'P', '2021-09-14', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(15, 1, 1, 1, 'P', '2021-09-15', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(16, 1, 1, 1, 'P', '2021-09-16', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(17, 1, 1, 1, 'P', '2021-09-17', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(18, 1, 1, 1, 'P', '2021-09-18', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(19, 1, 1, 1, 'P', '2021-09-19', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(20, 1, 1, 1, 'P', '2021-09-20', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(21, 1, 1, 1, 'P', '2021-09-21', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(22, 1, 1, 1, 'P', '2021-09-22', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(23, 1, 1, 1, 'P', '2021-09-23', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(24, 1, 1, 1, 'P', '2021-09-24', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(25, 1, 1, 1, 'P', '2021-09-25', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(26, 1, 1, 1, 'P', '2021-09-26', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(27, 1, 1, 1, 'P', '2021-09-27', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(28, 1, 1, 1, 'P', '2021-09-28', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(29, 1, 1, 1, 'P', '2021-09-29', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(30, 1, 1, 1, 'P', '2021-09-30', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(32, 1, 2, 1, 'P', '2021-09-01', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(33, 1, 2, 1, 'P', '2021-09-02', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(34, 1, 2, 1, 'P', '2021-09-03', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(35, 1, 2, 1, 'P', '2021-09-04', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(36, 1, 2, 1, 'P', '2021-09-05', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(37, 1, 2, 1, 'P', '2021-09-06', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(38, 1, 2, 1, 'P', '2021-09-07', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(39, 1, 2, 1, 'P', '2021-09-08', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(40, 1, 2, 1, 'P', '2021-09-09', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(41, 1, 2, 1, 'P', '2021-09-10', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(42, 1, 2, 1, 'P', '2021-09-11', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(43, 1, 2, 1, 'P', '2021-09-12', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(44, 1, 2, 1, 'P', '2021-09-13', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(45, 1, 2, 1, 'P', '2021-09-14', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(46, 1, 2, 1, 'P', '2021-09-15', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(47, 1, 2, 1, 'P', '2021-09-16', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(48, 1, 2, 1, 'P', '2021-09-17', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(49, 1, 2, 1, 'P', '2021-09-18', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(50, 1, 2, 1, 'P', '2021-09-19', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(51, 1, 2, 1, 'P', '2021-09-20', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(52, 1, 2, 1, 'P', '2021-09-21', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(53, 1, 2, 1, 'P', '2021-09-22', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(54, 1, 2, 1, 'P', '2021-09-23', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(55, 1, 2, 1, 'P', '2021-09-24', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(56, 1, 2, 1, 'P', '2021-09-25', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(57, 1, 2, 1, 'P', '2021-09-26', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(58, 1, 2, 1, 'P', '2021-09-27', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(59, 1, 2, 1, 'P', '2021-09-28', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(60, 1, 2, 1, 'P', '2021-09-29', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(61, 1, 2, 1, 'P', '2021-09-30', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(63, 1, 3, 1, 'P', '2021-09-01', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(64, 1, 3, 1, 'P', '2021-09-02', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(65, 1, 3, 1, 'P', '2021-09-03', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(66, 1, 3, 1, 'P', '2021-09-04', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(67, 1, 3, 1, 'P', '2021-09-05', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(68, 1, 3, 1, 'P', '2021-09-06', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(69, 1, 3, 1, 'P', '2021-09-07', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(70, 1, 3, 1, 'P', '2021-09-08', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(71, 1, 3, 1, 'P', '2021-09-09', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(72, 1, 3, 1, 'P', '2021-09-10', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(73, 1, 3, 1, 'P', '2021-09-11', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(74, 1, 3, 1, 'P', '2021-09-12', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(75, 1, 3, 1, 'P', '2021-09-13', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(76, 1, 3, 1, 'P', '2021-09-14', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(77, 1, 3, 1, 'P', '2021-09-15', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(78, 1, 3, 1, 'P', '2021-09-16', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(79, 1, 3, 1, 'P', '2021-09-17', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(80, 1, 3, 1, 'P', '2021-09-18', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(81, 1, 3, 1, 'P', '2021-09-19', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(82, 1, 3, 1, 'P', '2021-09-20', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(83, 1, 3, 1, 'P', '2021-09-21', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(84, 1, 3, 1, 'P', '2021-09-22', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(85, 1, 3, 1, 'P', '2021-09-23', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(86, 1, 3, 1, 'P', '2021-09-24', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(87, 1, 3, 1, 'P', '2021-09-25', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(88, 1, 3, 1, 'P', '2021-09-26', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(89, 1, 3, 1, 'P', '2021-09-27', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(90, 1, 3, 1, 'P', '2021-09-28', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(91, 1, 3, 1, 'P', '2021-09-29', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(92, 1, 3, 1, 'P', '2021-09-30', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(94, 1, 4, 1, 'P', '2021-09-01', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(95, 1, 4, 1, 'P', '2021-09-02', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(96, 1, 4, 1, 'P', '2021-09-03', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(97, 1, 4, 1, 'P', '2021-09-04', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(98, 1, 4, 1, 'P', '2021-09-05', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(99, 1, 4, 1, 'P', '2021-09-06', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(100, 1, 4, 1, 'P', '2021-09-07', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(101, 1, 4, 1, 'P', '2021-09-08', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(102, 1, 4, 1, 'P', '2021-09-09', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(103, 1, 4, 1, 'P', '2021-09-10', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(104, 1, 4, 1, 'P', '2021-09-11', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(105, 1, 4, 1, 'P', '2021-09-12', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(106, 1, 4, 1, 'P', '2021-09-13', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(107, 1, 4, 1, 'P', '2021-09-14', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(108, 1, 4, 1, 'P', '2021-09-15', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(109, 1, 4, 1, 'P', '2021-09-16', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(110, 1, 4, 1, 'P', '2021-09-17', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(111, 1, 4, 1, 'P', '2021-09-18', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(112, 1, 4, 1, 'P', '2021-09-19', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(113, 1, 4, 1, 'P', '2021-09-20', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(114, 1, 4, 1, 'P', '2021-09-21', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(115, 1, 4, 1, 'P', '2021-09-22', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(116, 1, 4, 1, 'P', '2021-09-23', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(117, 1, 4, 1, 'P', '2021-09-24', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(118, 1, 4, 1, 'P', '2021-09-25', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(119, 1, 4, 1, 'P', '2021-09-26', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(120, 1, 4, 1, 'P', '2021-09-27', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(121, 1, 4, 1, 'P', '2021-09-28', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(122, 1, 4, 1, 'P', '2021-09-29', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(123, 1, 4, 1, 'P', '2021-09-30', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(125, 1, 5, 1, 'P', '2021-09-01', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(126, 1, 5, 1, 'P', '2021-09-02', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(127, 1, 5, 1, 'P', '2021-09-03', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(128, 1, 5, 1, 'P', '2021-09-04', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(129, 1, 5, 1, 'P', '2021-09-05', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(130, 1, 5, 1, 'P', '2021-09-06', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(131, 1, 5, 1, 'P', '2021-09-07', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(132, 1, 5, 1, 'P', '2021-09-08', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(133, 1, 5, 1, 'P', '2021-09-09', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(134, 1, 5, 1, 'P', '2021-09-10', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(135, 1, 5, 1, 'P', '2021-09-11', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(136, 1, 5, 1, 'P', '2021-09-12', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(137, 1, 5, 1, 'P', '2021-09-13', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(138, 1, 5, 1, 'P', '2021-09-14', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(139, 1, 5, 1, 'P', '2021-09-15', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(140, 1, 5, 1, 'P', '2021-09-16', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(141, 1, 5, 1, 'P', '2021-09-17', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(142, 1, 5, 1, 'P', '2021-09-18', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(143, 1, 5, 1, 'P', '2021-09-19', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(144, 1, 5, 1, 'P', '2021-09-20', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(145, 1, 5, 1, 'P', '2021-09-21', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(146, 1, 5, 1, 'P', '2021-09-22', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(147, 1, 5, 1, 'P', '2021-09-23', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(148, 1, 5, 1, 'P', '2021-09-24', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(149, 1, 5, 1, 'P', '2021-09-25', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(150, 1, 5, 1, 'P', '2021-09-26', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(151, 1, 5, 1, 'P', '2021-09-27', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(152, 1, 5, 1, 'P', '2021-09-28', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(153, 1, 5, 1, 'P', '2021-09-29', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(154, 1, 5, 1, 'P', '2021-09-30', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(156, 1, 6, 1, 'P', '2021-09-01', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(157, 1, 6, 1, 'P', '2021-09-02', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(158, 1, 6, 1, 'P', '2021-09-03', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(159, 1, 6, 1, 'P', '2021-09-04', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(160, 1, 6, 1, 'P', '2021-09-05', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(161, 1, 6, 1, 'P', '2021-09-06', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(162, 1, 6, 1, 'P', '2021-09-07', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(163, 1, 6, 1, 'P', '2021-09-08', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(164, 1, 6, 1, 'P', '2021-09-09', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(165, 1, 6, 1, 'P', '2021-09-10', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(166, 1, 6, 1, 'P', '2021-09-11', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(167, 1, 6, 1, 'P', '2021-09-12', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(168, 1, 6, 1, 'P', '2021-09-13', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(169, 1, 6, 1, 'P', '2021-09-14', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(170, 1, 6, 1, 'P', '2021-09-15', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(171, 1, 6, 1, 'P', '2021-09-16', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(172, 1, 6, 1, 'P', '2021-09-17', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(173, 1, 6, 1, 'P', '2021-09-18', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(174, 1, 6, 1, 'P', '2021-09-19', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(175, 1, 6, 1, 'P', '2021-09-20', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(176, 1, 6, 1, 'P', '2021-09-21', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(177, 1, 6, 1, 'P', '2021-09-22', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(178, 1, 6, 1, 'P', '2021-09-23', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(179, 1, 6, 1, 'P', '2021-09-24', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(180, 1, 6, 1, 'P', '2021-09-25', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(181, 1, 6, 1, 'P', '2021-09-26', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(182, 1, 6, 1, 'P', '2021-09-27', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(183, 1, 6, 1, 'P', '2021-09-28', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(184, 1, 6, 1, 'P', '2021-09-29', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(185, 1, 6, 1, 'P', '2021-09-30', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0);
/*!40000 ALTER TABLE `dailytimesheetdetails` ENABLE KEYS */;

-- Dumping structure for table letosyshr.department
CREATE TABLE IF NOT EXISTS `department` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `Status` varchar(1) NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.department: ~5 rows (approximately)
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` (`uid`, `code`, `name`, `Status`) VALUES
	(1, 'CMP', 'COMPUTER DETP', 'Y'),
	(5, 'MAT', 'Maths Department', 'Y'),
	(6, 'SCI', 'Science Department', 'Y'),
	(9, 'GOV', 'Govindasamy', 'Y'),
	(10, 'CHE', 'CHEMESTRY DEP', 'Y');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;

-- Dumping structure for table letosyshr.designation
CREATE TABLE IF NOT EXISTS `designation` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `department` varchar(50) DEFAULT NULL,
  `status` varchar(1) DEFAULT 'Y',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.designation: ~3 rows (approximately)
/*!40000 ALTER TABLE `designation` DISABLE KEYS */;
INSERT INTO `designation` (`uid`, `code`, `name`, `department`, `status`) VALUES
	(1, 'TTT', 'FGFGFGF', 'Web Development', 'Y'),
	(2, 'PM', 'PROJECT MANAGER', 'Web Development', 'Y'),
	(3, 'PL', 'PROJECT LEADER', 'IT Management', 'Y');
/*!40000 ALTER TABLE `designation` ENABLE KEYS */;

-- Dumping structure for table letosyshr.documentmaster
CREATE TABLE IF NOT EXISTS `documentmaster` (
  `uid` int(11) NOT NULL,
  `code` varchar(20) NOT NULL DEFAULT '',
  `name` varchar(100) NOT NULL,
  `status` varchar(20) NOT NULL,
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.documentmaster: ~0 rows (approximately)
/*!40000 ALTER TABLE `documentmaster` DISABLE KEYS */;
/*!40000 ALTER TABLE `documentmaster` ENABLE KEYS */;

-- Dumping structure for table letosyshr.dts_temp
CREATE TABLE IF NOT EXISTS `dts_temp` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `company_uid` int(11) NOT NULL,
  `empmaster_uid` int(11) NOT NULL,
  `leavetype_uid` int(11) DEFAULT NULL,
  `leavetype_code` varchar(20) DEFAULT NULL,
  `dates` date NOT NULL,
  `in_time` time DEFAULT '00:00:00',
  `out_time` time DEFAULT '00:00:00',
  `tyear` int(11) DEFAULT '0',
  `tmonth` int(11) DEFAULT '0',
  `totalhrs` int(11) DEFAULT '0',
  `normalhrs` int(11) DEFAULT '0',
  `othrs` int(11) DEFAULT '0',
  PRIMARY KEY (`company_uid`,`empmaster_uid`,`dates`) USING BTREE,
  UNIQUE KEY `uid` (`uid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.dts_temp: ~90 rows (approximately)
/*!40000 ALTER TABLE `dts_temp` DISABLE KEYS */;
INSERT INTO `dts_temp` (`uid`, `company_uid`, `empmaster_uid`, `leavetype_uid`, `leavetype_code`, `dates`, `in_time`, `out_time`, `tyear`, `tmonth`, `totalhrs`, `normalhrs`, `othrs`) VALUES
	(1, 1, 1, 1, 'P', '2021-09-01', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(2, 1, 1, 1, 'P', '2021-09-02', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(3, 1, 1, 1, 'P', '2021-09-03', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(4, 1, 1, 1, 'P', '2021-09-04', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(5, 1, 1, 1, 'P', '2021-09-05', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(6, 1, 1, 1, 'P', '2021-09-06', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(7, 1, 1, 1, 'P', '2021-09-07', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(8, 1, 1, 1, 'P', '2021-09-08', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(9, 1, 1, 1, 'P', '2021-09-09', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(10, 1, 1, 1, 'P', '2021-09-10', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(11, 1, 1, 1, 'P', '2021-09-11', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(12, 1, 1, 1, 'P', '2021-09-12', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(13, 1, 1, 1, 'P', '2021-09-13', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(14, 1, 1, 1, 'P', '2021-09-14', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(15, 1, 1, 1, 'P', '2021-09-15', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(16, 1, 1, 1, 'P', '2021-09-16', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(17, 1, 1, 1, 'P', '2021-09-17', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(18, 1, 1, 1, 'P', '2021-09-18', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(19, 1, 1, 1, 'P', '2021-09-19', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(20, 1, 1, 1, 'P', '2021-09-20', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(21, 1, 1, 1, 'P', '2021-09-21', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(22, 1, 1, 1, 'P', '2021-09-22', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(23, 1, 1, 1, 'P', '2021-09-23', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(24, 1, 1, 1, 'P', '2021-09-24', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(25, 1, 1, 1, 'P', '2021-09-25', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(26, 1, 1, 1, 'P', '2021-09-26', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(27, 1, 1, 1, 'P', '2021-09-27', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(28, 1, 1, 1, 'P', '2021-09-28', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(29, 1, 1, 1, 'P', '2021-09-29', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(30, 1, 1, 1, 'P', '2021-09-30', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(32, 1, 2, 1, 'P', '2021-09-01', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(33, 1, 2, 1, 'P', '2021-09-02', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(34, 1, 2, 1, 'P', '2021-09-03', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(35, 1, 2, 1, 'P', '2021-09-04', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(36, 1, 2, 1, 'P', '2021-09-05', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(37, 1, 2, 1, 'P', '2021-09-06', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(38, 1, 2, 1, 'P', '2021-09-07', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(39, 1, 2, 1, 'P', '2021-09-08', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(40, 1, 2, 1, 'P', '2021-09-09', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(41, 1, 2, 1, 'P', '2021-09-10', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(42, 1, 2, 1, 'P', '2021-09-11', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(43, 1, 2, 1, 'P', '2021-09-12', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(44, 1, 2, 1, 'P', '2021-09-13', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(45, 1, 2, 1, 'P', '2021-09-14', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(46, 1, 2, 1, 'P', '2021-09-15', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(47, 1, 2, 1, 'P', '2021-09-16', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(48, 1, 2, 1, 'P', '2021-09-17', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(49, 1, 2, 1, 'P', '2021-09-18', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(50, 1, 2, 1, 'P', '2021-09-19', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(51, 1, 2, 1, 'P', '2021-09-20', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(52, 1, 2, 1, 'P', '2021-09-21', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(53, 1, 2, 1, 'P', '2021-09-22', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(54, 1, 2, 1, 'P', '2021-09-23', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(55, 1, 2, 1, 'P', '2021-09-24', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(56, 1, 2, 1, 'P', '2021-09-25', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(57, 1, 2, 1, 'P', '2021-09-26', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(58, 1, 2, 1, 'P', '2021-09-27', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(59, 1, 2, 1, 'P', '2021-09-28', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(60, 1, 2, 1, 'P', '2021-09-29', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(61, 1, 2, 1, 'P', '2021-09-30', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(63, 1, 3, 1, 'P', '2021-09-01', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(64, 1, 3, 1, 'P', '2021-09-02', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(65, 1, 3, 1, 'P', '2021-09-03', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(66, 1, 3, 1, 'P', '2021-09-04', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(67, 1, 3, 1, 'P', '2021-09-05', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(68, 1, 3, 1, 'P', '2021-09-06', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(69, 1, 3, 1, 'P', '2021-09-07', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(70, 1, 3, 1, 'P', '2021-09-08', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(71, 1, 3, 1, 'P', '2021-09-09', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(72, 1, 3, 1, 'P', '2021-09-10', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(73, 1, 3, 1, 'P', '2021-09-11', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(74, 1, 3, 1, 'P', '2021-09-12', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(75, 1, 3, 1, 'P', '2021-09-13', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(76, 1, 3, 1, 'P', '2021-09-14', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(77, 1, 3, 1, 'P', '2021-09-15', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(78, 1, 3, 1, 'P', '2021-09-16', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(79, 1, 3, 1, 'P', '2021-09-17', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(80, 1, 3, 1, 'P', '2021-09-18', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(81, 1, 3, 1, 'P', '2021-09-19', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(82, 1, 3, 1, 'P', '2021-09-20', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(83, 1, 3, 1, 'P', '2021-09-21', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(84, 1, 3, 1, 'P', '2021-09-22', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(85, 1, 3, 1, 'P', '2021-09-23', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(86, 1, 3, 1, 'P', '2021-09-24', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(87, 1, 3, 1, 'P', '2021-09-25', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(88, 1, 3, 1, 'P', '2021-09-26', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(89, 1, 3, 1, 'P', '2021-09-27', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(90, 1, 3, 1, 'P', '2021-09-28', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(91, 1, 3, 1, 'P', '2021-09-29', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0),
	(92, 1, 3, 1, 'P', '2021-09-30', '00:00:00', '00:00:00', 2021, 9, 8, 8, 0);
/*!40000 ALTER TABLE `dts_temp` ENABLE KEYS */;

-- Dumping structure for table letosyshr.empbankinformation
CREATE TABLE IF NOT EXISTS `empbankinformation` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `company_uid` int(11) DEFAULT NULL,
  `empmaster_uid` int(11) DEFAULT NULL,
  `BankName` varchar(50) DEFAULT NULL,
  `BankAccountName` varchar(50) DEFAULT NULL,
  `BankAccountNo` varchar(50) DEFAULT NULL,
  `IFSCCode` varchar(50) DEFAULT NULL,
  `PANno` varchar(50) DEFAULT NULL,
  `IBANno` varchar(50) DEFAULT NULL,
  UNIQUE KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.empbankinformation: ~0 rows (approximately)
/*!40000 ALTER TABLE `empbankinformation` DISABLE KEYS */;
/*!40000 ALTER TABLE `empbankinformation` ENABLE KEYS */;

-- Dumping structure for table letosyshr.empdocument
CREATE TABLE IF NOT EXISTS `empdocument` (
  `uid` int(11) DEFAULT NULL,
  `emp_uid` int(11) NOT NULL,
  `Documentmaster_uid` int(11) NOT NULL,
  `Start_date` date DEFAULT NULL,
  `Renewaldate` date DEFAULT NULL,
  `notes` text,
  PRIMARY KEY (`emp_uid`,`Documentmaster_uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.empdocument: ~0 rows (approximately)
/*!40000 ALTER TABLE `empdocument` DISABLE KEYS */;
/*!40000 ALTER TABLE `empdocument` ENABLE KEYS */;

-- Dumping structure for table letosyshr.empemergencydetails
CREATE TABLE IF NOT EXISTS `empemergencydetails` (
  `uid` int(11) DEFAULT NULL,
  `empmaster_uid` int(11) DEFAULT NULL,
  `company_uid` int(11) DEFAULT NULL,
  `ContactName` varchar(50) DEFAULT NULL,
  `Relationship` varchar(50) DEFAULT NULL,
  `ContactNumber` varchar(50) DEFAULT NULL,
  `ContactEmailID` varchar(50) DEFAULT NULL,
  `Notes` varchar(500) DEFAULT NULL,
  UNIQUE KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.empemergencydetails: ~0 rows (approximately)
/*!40000 ALTER TABLE `empemergencydetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `empemergencydetails` ENABLE KEYS */;

-- Dumping structure for table letosyshr.empmaster
CREATE TABLE IF NOT EXISTS `empmaster` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `company_uid` int(11) NOT NULL DEFAULT '0',
  `EmpCode` varchar(20) NOT NULL,
  `Firstname` varchar(100) NOT NULL,
  `LastName` varchar(100) NOT NULL,
  `Joiningdate` date NOT NULL,
  `CompanyEmaiID` varchar(100) NOT NULL,
  `EmpStatus` varchar(50) NOT NULL,
  `CmpPhoneNo` varchar(50) NOT NULL,
  `Department_uid` int(11) NOT NULL,
  `Designation_uid` int(11) NOT NULL,
  `Grade_uid` int(11) NOT NULL DEFAULT '0',
  `EmpCurrency` varchar(20) NOT NULL,
  `Salary` decimal(18,2) DEFAULT NULL,
  `loginid` varchar(50) NOT NULL DEFAULT '1',
  `EmpPassword` varchar(10) NOT NULL,
  `sitemaster_uid` int(11) NOT NULL,
  `Supervisor_uid` int(11) NOT NULL,
  `Location_uid` int(11) NOT NULL,
  `EmpActive` varchar(1) NOT NULL DEFAULT 'Y',
  `DateOfBirth` date DEFAULT NULL,
  `MaritalStatus` varchar(10) DEFAULT NULL,
  `Gender` varchar(10) DEFAULT NULL,
  `NoofChildren` int(11) DEFAULT NULL,
  `Nationality` varchar(50) DEFAULT NULL,
  `Religion` varchar(150) DEFAULT NULL,
  `EmpPhoneNo` varchar(50) DEFAULT NULL,
  `EmpEmail` varchar(100) DEFAULT NULL,
  `Employementspouse` varchar(1) DEFAULT NULL,
  `BloodGroup` varchar(20) DEFAULT NULL,
  `Edu_Qualification` varchar(200) DEFAULT NULL,
  `Experience` varchar(200) DEFAULT NULL,
  `Skillset` varchar(200) DEFAULT NULL,
  `ReferenceDetail` varchar(200) DEFAULT NULL,
  `IDProofCode` varchar(200) DEFAULT NULL,
  `IDProofDetail` varchar(200) DEFAULT NULL,
  `PersonalAddress` varchar(300) DEFAULT NULL,
  `TemporaryAddress` varchar(300) DEFAULT NULL,
  `Photo` varchar(200) DEFAULT NULL,
  `Bankmaster_UID` varchar(200) DEFAULT NULL,
  `BankActName` varchar(200) DEFAULT NULL,
  `BankActno` varchar(100) DEFAULT NULL,
  `Bank_ifsc` varchar(100) DEFAULT NULL,
  `PANno` varchar(100) DEFAULT NULL,
  `IBANNo` varchar(100) DEFAULT NULL,
  `PrimaryContact` varchar(100) DEFAULT NULL,
  `ContactRelation` varchar(100) DEFAULT NULL,
  `Notes` varchar(2000) DEFAULT NULL,
  `status` varchar(1) DEFAULT NULL,
  `PersonalPhoneNumber` varchar(100) DEFAULT NULL,
  `PersonalEmailAddress` varchar(200) DEFAULT NULL,
  `EmploymentOfSpouse` varchar(300) DEFAULT NULL,
  `PresentPostal_code` varchar(300) DEFAULT NULL,
  `EducationalQualifications` varchar(200) DEFAULT NULL,
  `WorkExperience` varchar(200) DEFAULT NULL,
  `ReferenceDetails` varchar(200) DEFAULT NULL,
  `IdentityProofName` varchar(200) DEFAULT NULL,
  `IdentityProofDetails` varchar(200) DEFAULT NULL,
  `PresentAddress` varchar(200) DEFAULT NULL,
  `PresentAddress2` varchar(200) DEFAULT NULL,
  `PermanentAddress` varchar(200) DEFAULT NULL,
  `PermanentAddress2` varchar(200) DEFAULT NULL,
  `resentPostal_code` varchar(100) DEFAULT NULL,
  `PresentCityTown` varchar(200) DEFAULT NULL,
  `PermanentCityTown` varchar(200) DEFAULT NULL,
  `PermanentPostal_code` varchar(10) DEFAULT NULL,
  `PresentCountry` varchar(200) DEFAULT NULL,
  `PresentState` varchar(200) DEFAULT NULL,
  `PermanentCountry` varchar(200) DEFAULT NULL,
  `PermanentState` varchar(200) DEFAULT NULL,
  `BankName` varchar(50) DEFAULT NULL,
  `BankAccountName` varchar(50) DEFAULT NULL,
  `BankAccountNo` varchar(50) DEFAULT NULL,
  `IFSCCode` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.empmaster: ~7 rows (approximately)
/*!40000 ALTER TABLE `empmaster` DISABLE KEYS */;
INSERT INTO `empmaster` (`uid`, `company_uid`, `EmpCode`, `Firstname`, `LastName`, `Joiningdate`, `CompanyEmaiID`, `EmpStatus`, `CmpPhoneNo`, `Department_uid`, `Designation_uid`, `Grade_uid`, `EmpCurrency`, `Salary`, `loginid`, `EmpPassword`, `sitemaster_uid`, `Supervisor_uid`, `Location_uid`, `EmpActive`, `DateOfBirth`, `MaritalStatus`, `Gender`, `NoofChildren`, `Nationality`, `Religion`, `EmpPhoneNo`, `EmpEmail`, `Employementspouse`, `BloodGroup`, `Edu_Qualification`, `Experience`, `Skillset`, `ReferenceDetail`, `IDProofCode`, `IDProofDetail`, `PersonalAddress`, `TemporaryAddress`, `Photo`, `Bankmaster_UID`, `BankActName`, `BankActno`, `Bank_ifsc`, `PANno`, `IBANNo`, `PrimaryContact`, `ContactRelation`, `Notes`, `status`, `PersonalPhoneNumber`, `PersonalEmailAddress`, `EmploymentOfSpouse`, `PresentPostal_code`, `EducationalQualifications`, `WorkExperience`, `ReferenceDetails`, `IdentityProofName`, `IdentityProofDetails`, `PresentAddress`, `PresentAddress2`, `PermanentAddress`, `PermanentAddress2`, `resentPostal_code`, `PresentCityTown`, `PermanentCityTown`, `PermanentPostal_code`, `PresentCountry`, `PresentState`, `PermanentCountry`, `PermanentState`, `BankName`, `BankAccountName`, `BankAccountNo`, `IFSCCode`) VALUES
	(1, 1, 'EMP0001', 'Ayyappan', 'Govindsamy', '2021-11-13', 'ayyappan@letosys.com', 'Permanent', '454545', 5, 1, 0, 'INR', 2500.00, '1', 'ayya', 1, 1, 1, 'Y', '2021-11-29', 'Single', 'Male', 44, 'Costa Rican', 'African Diaspora Religions', NULL, NULL, NULL, 'O-', NULL, NULL, 'fgfgfg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Axis Bank', '123456', '3456345', '12345456777', '67543212354', NULL, NULL, NULL, NULL, '4444', 'myivision@gmail.com', 'true', '454545', 'bsc', '12 year', 'rgfgfg', 'Passport', '4545', 'fgfg', 'fgfg', 'fgf', 'gf', NULL, 'dgf', 'gf', 'gf', 'gf', 'gf', 'gf', 'gf', 'Indian Bank', 'Ayyappan', '834954257', '11111'),
	(2, 1, 'EMP0002', 'Raju', 'Vasu', '2021-11-13', 'myivision@gmail.com', 'Permanent', '9524705362', 1, 2, 0, 'INR', 2500.00, '1', '123456', 1, 1, 1, 'Y', '2021-11-14', 'Single', 'Male', 3, 'Chilean', 'African Diaspora Religions', NULL, NULL, NULL, 'B+', NULL, NULL, 'A', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '5656565656', 'govindayyan@hotmail.com', 'te', '54545', 'msc', '13 years', 'B', 'Passport', 'C', 'D', 'E', 'H', 'I', NULL, 'F', 'J', 'H', 'J', 'K', 'L', 'M', NULL, NULL, NULL, NULL),
	(3, 1, 'EMP0003', 'Nirmala', ' Mani', '1976-11-03', 'ayyappan@letosys.com', 'W', '454545', 1, 1, 0, 'INR', 2500.00, '1', 'pwd', 1, 1, 1, 'Y', '1973-06-30', 'Y', 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(4, 1, 'EMP0004', 'Vasanthi', 'Balu', '2021-11-03', 'ayyappan@letosys.com', 'W', '454545', 1, 1, 0, 'INR', 2500.00, '1', 'pwd', 1, 1, 1, 'Y', '1973-06-30', 'Y', 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '4555555555', '56565', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'ICICI', 'ghgh', '556', 'gh'),
	(5, 1, 'EMP0005', 'Arumai', 'Govind', '2021-11-03', 'ayyappan@letosys.com', 'W', '454545', 1, 1, 0, 'INR', 2500.00, '1', 'pwd', 1, 1, 1, 'Y', '1973-06-30', 'Y', 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(6, 1, 'EMP0006', 'Kumar', 'Packri', '2021-11-03', 'ayyappan@letosys.com', 'W', '454545', 1, 1, 0, 'INR', 2500.00, '1', 'pwd', 1, 1, 1, 'Y', '1973-06-30', 'Y', 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(10, 1, 'uuu', 'Sowmiya Sri', 'Ayyan', '2021-11-03', 'uyyyyyy', 'Consultant', '87987987', 10, 2, 0, 'AED', 12000.00, '7777', '78788', 2, 3, 1, 'Y', NULL, NULL, 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
/*!40000 ALTER TABLE `empmaster` ENABLE KEYS */;

-- Dumping structure for table letosyshr.emppersonaldetails
CREATE TABLE IF NOT EXISTS `emppersonaldetails` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `company_uid` int(11) NOT NULL DEFAULT '0',
  `empmaster_uid` int(11) NOT NULL DEFAULT '0',
  `Genter` varchar(10) DEFAULT NULL,
  `Religion` varchar(100) DEFAULT NULL,
  `Maritalstatus` varchar(5) DEFAULT NULL,
  `NoofChildren` int(11) DEFAULT NULL,
  `DateOfBirth` date DEFAULT NULL,
  `Nationality` varchar(100) DEFAULT NULL,
  `PersonalPhoneNumber` varchar(100) DEFAULT NULL,
  `PersonalEmailAddress` varchar(200) DEFAULT NULL,
  `EmploymentOfSpouse` varchar(300) DEFAULT NULL,
  `BloodGroup` varchar(25) DEFAULT NULL,
  `EducationalQualifications` varchar(200) DEFAULT NULL,
  `WorkExperience` varchar(200) DEFAULT NULL,
  `SkillSet` varchar(200) DEFAULT NULL,
  `ReferenceDetails` varchar(200) DEFAULT NULL,
  `IdentityProofName` varchar(200) DEFAULT NULL,
  `IdentityProofDetails` varchar(200) DEFAULT NULL,
  `PresentAddress` varchar(200) DEFAULT NULL,
  `PresentAddress2` varchar(200) DEFAULT NULL,
  `PermanentAddress` varchar(200) DEFAULT NULL,
  `PermanentAddress2` varchar(200) DEFAULT NULL,
  `resentPostal_code` varchar(100) DEFAULT NULL,
  `PresentCityTown` varchar(200) DEFAULT NULL,
  `PermanentCityTown` varchar(200) DEFAULT NULL,
  `PermanentPostal_code` varchar(10) DEFAULT NULL,
  `PresentCountry` varchar(200) DEFAULT NULL,
  `PresentState` varchar(200) DEFAULT NULL,
  `PermanentCountry` varchar(200) DEFAULT NULL,
  `PermanentState` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.emppersonaldetails: ~0 rows (approximately)
/*!40000 ALTER TABLE `emppersonaldetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `emppersonaldetails` ENABLE KEYS */;

-- Dumping structure for function letosyshr.get_empname
DELIMITER //
CREATE FUNCTION `get_empname`(
    `empid` INT
) RETURNS varchar(255) CHARSET utf8mb4
READS SQL DATA
BEGIN 
    DECLARE empname VARCHAR(250);
    SELECT p.firstname INTO empname FROM empmaster p WHERE p.uid = empid;
    RETURN empname;
END//
DELIMITER ;

-- Dumping structure for table letosyshr.grade
CREATE TABLE IF NOT EXISTS `grade` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.grade: ~2 rows (approximately)
/*!40000 ALTER TABLE `grade` DISABLE KEYS */;
INSERT INTO `grade` (`uid`, `code`, `name`) VALUES
	(1, 'FST', 'FIRST GRADE'),
	(2, 'SND', 'SECOND GRADE');
/*!40000 ALTER TABLE `grade` ENABLE KEYS */;

-- Dumping structure for table letosyshr.holidaysetting
CREATE TABLE IF NOT EXISTS `holidaysetting` (
  `UID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `company_uid` int(10) NOT NULL DEFAULT '0',
  `HolidayType` varchar(20) NOT NULL DEFAULT '0',
  `leavetype_uid` varchar(20) NOT NULL DEFAULT '0',
  `HolidayName` varchar(50) NOT NULL,
  `HolidayDate` date NOT NULL,
  `Notes` varchar(205) NOT NULL DEFAULT '',
  PRIMARY KEY (`UID`),
  UNIQUE KEY `company_uid_HolidayDate` (`company_uid`,`HolidayDate`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.holidaysetting: ~3 rows (approximately)
/*!40000 ALTER TABLE `holidaysetting` DISABLE KEYS */;
INSERT INTO `holidaysetting` (`UID`, `company_uid`, `HolidayType`, `leavetype_uid`, `HolidayName`, `HolidayDate`, `Notes`) VALUES
	(1, 1, 'H', '8', 'Deepawali', '2021-08-02', 'uuu'),
	(2, 1, 'H', '8', 'PONGAL', '2021-08-10', 'aaa'),
	(3, 1, 'H', '8', 'no no no', '2021-08-06', 'undefined');
/*!40000 ALTER TABLE `holidaysetting` ENABLE KEYS */;

-- Dumping structure for table letosyshr.leaverequest
CREATE TABLE IF NOT EXISTS `leaverequest` (
  `Uid` int(11) NOT NULL AUTO_INCREMENT,
  `Company_uid` int(11) NOT NULL,
  `Empmaster_uid` int(11) NOT NULL,
  `Entry_date` date DEFAULT NULL,
  `User_uid` int(11) DEFAULT NULL,
  `Leave_from` date NOT NULL,
  `Leave_upto` date DEFAULT NULL,
  `Leavetype_uid` int(11) DEFAULT NULL,
  `Updated_on` datetime DEFAULT NULL,
  `Updated_by` int(11) DEFAULT NULL,
  `Nofdays` int(11) DEFAULT NULL,
  `Created_on` datetime DEFAULT NULL,
  `Approved_uid` int(11) DEFAULT NULL,
  `Approved_on` datetime DEFAULT NULL,
  `notes` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`Company_uid`,`Empmaster_uid`,`Leave_from`) USING BTREE,
  UNIQUE KEY `uid` (`Uid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.leaverequest: ~5 rows (approximately)
/*!40000 ALTER TABLE `leaverequest` DISABLE KEYS */;
INSERT INTO `leaverequest` (`Uid`, `Company_uid`, `Empmaster_uid`, `Entry_date`, `User_uid`, `Leave_from`, `Leave_upto`, `Leavetype_uid`, `Updated_on`, `Updated_by`, `Nofdays`, `Created_on`, `Approved_uid`, `Approved_on`, `notes`) VALUES
	(1, 1, 1, '2021-06-02', 1, '2021-01-06', '2021-09-06', 1, '2021-06-04 20:53:40', 1, 244, '2021-06-04 20:53:48', 1, '2021-06-04 20:54:01', 'yyuy45555'),
	(2, 1, 3, '2021-06-04', 1, '2021-09-06', '2021-06-16', 3, '2021-06-04 20:55:30', 1, -81, '2021-06-04 20:55:34', 1, '2021-06-04 20:55:41', 'Reason nirmala'),
	(4, 1, 4, '2021-08-14', NULL, '2021-08-01', '2021-08-03', 4, NULL, NULL, 3, NULL, 0, NULL, 'ayyappan'),
	(7, 1, 4, '2021-08-04', NULL, '2021-08-08', '2021-08-11', 3, NULL, NULL, 5, NULL, 0, NULL, NULL),
	(6, 1, 5, '2021-08-28', NULL, '2021-08-03', '2021-08-07', 4, NULL, NULL, 6, NULL, 0, NULL, NULL);
/*!40000 ALTER TABLE `leaverequest` ENABLE KEYS */;

-- Dumping structure for table letosyshr.leavetype
CREATE TABLE IF NOT EXISTS `leavetype` (
  `Uid` int(11) NOT NULL AUTO_INCREMENT,
  `Company_uid` int(11) NOT NULL,
  `Code` varchar(20) NOT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `Allocate_hours` double DEFAULT NULL,
  PRIMARY KEY (`Uid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.leavetype: ~9 rows (approximately)
/*!40000 ALTER TABLE `leavetype` DISABLE KEYS */;
INSERT INTO `leavetype` (`Uid`, `Company_uid`, `Code`, `Name`, `Allocate_hours`) VALUES
	(1, 1, 'P', 'Presents', 8),
	(2, 1, 'A', 'Absent', 0),
	(3, 1, 'SL', 'Sick Leave', 8),
	(4, 1, 'SH', 'Sick Leave Half Day', 4),
	(5, 1, 'HD', 'Half Day', 4),
	(6, 1, 'LWP', 'Leave With pay', 8),
	(7, 1, 'WP', 'Without Pay', 0),
	(8, 1, 'H', 'Public Holiday', 8),
	(9, 1, 'WH', 'Weekly Holiday', 8);
/*!40000 ALTER TABLE `leavetype` ENABLE KEYS */;

-- Dumping structure for table letosyshr.loandetail
CREATE TABLE IF NOT EXISTS `loandetail` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `loanheader_uid` int(11) NOT NULL,
  `empmaster_uid` int(11) NOT NULL,
  `LoanSettings_uid` int(11) NOT NULL,
  `Sno` int(11) NOT NULL,
  `Loantype_uid` int(11) NOT NULL,
  `Amount` double NOT NULL DEFAULT '0',
  UNIQUE KEY `uid` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.loandetail: ~2 rows (approximately)
/*!40000 ALTER TABLE `loandetail` DISABLE KEYS */;
INSERT INTO `loandetail` (`uid`, `loanheader_uid`, `empmaster_uid`, `LoanSettings_uid`, `Sno`, `Loantype_uid`, `Amount`) VALUES
	(1, 1, 1, 1, 1, 1, 200),
	(2, 1, 4, 2, 2, 2, 200);
/*!40000 ALTER TABLE `loandetail` ENABLE KEYS */;

-- Dumping structure for table letosyshr.loanheader
CREATE TABLE IF NOT EXISTS `loanheader` (
  `UID` int(11) NOT NULL AUTO_INCREMENT,
  `Company_uid` int(11) NOT NULL DEFAULT '0',
  `EntryDate` date NOT NULL,
  `Tyear` int(11) NOT NULL DEFAULT '0',
  `Tmonth` int(11) NOT NULL DEFAULT '0',
  `TotalAmount` int(11) NOT NULL DEFAULT '0',
  `user_uid` int(11) NOT NULL DEFAULT '0',
  `created_on` datetime DEFAULT NULL,
  `Updated_on` datetime DEFAULT NULL,
  PRIMARY KEY (`UID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.loanheader: ~1 rows (approximately)
/*!40000 ALTER TABLE `loanheader` DISABLE KEYS */;
INSERT INTO `loanheader` (`UID`, `Company_uid`, `EntryDate`, `Tyear`, `Tmonth`, `TotalAmount`, `user_uid`, `created_on`, `Updated_on`) VALUES
	(1, 1, '2021-05-01', 2021, 6, 400, 1, '2021-05-01 10:12:15', '2021-05-01 10:12:28');
/*!40000 ALTER TABLE `loanheader` ENABLE KEYS */;

-- Dumping structure for table letosyshr.loansettings
CREATE TABLE IF NOT EXISTS `loansettings` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `Company_uid` int(11) NOT NULL,
  `Empmaster_uid` int(11) NOT NULL,
  `Activestatus` varchar(1) NOT NULL DEFAULT 'Y',
  `Loantype_uid` int(10) DEFAULT '0',
  `Req_date` date DEFAULT NULL,
  `Apr_Date` date DEFAULT NULL,
  `Apr_uid` int(11) DEFAULT NULL,
  `Apr_status` varchar(20) DEFAULT NULL,
  `Amount` double DEFAULT '0',
  `Noofintallment` int(11) DEFAULT '0',
  `Balannce` double DEFAULT '0',
  `Monthly_deduction` double DEFAULT '0',
  `Reason` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`uid`,`Company_uid`,`Empmaster_uid`,`Activestatus`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.loansettings: ~3 rows (approximately)
/*!40000 ALTER TABLE `loansettings` DISABLE KEYS */;
INSERT INTO `loansettings` (`uid`, `Company_uid`, `Empmaster_uid`, `Activestatus`, `Loantype_uid`, `Req_date`, `Apr_Date`, `Apr_uid`, `Apr_status`, `Amount`, `Noofintallment`, `Balannce`, `Monthly_deduction`, `Reason`) VALUES
	(1, 1, 1, 'Y', 1, '2021-01-06', '2021-06-02', 2, 'Y', 1000, 5, 1000, 200, 'for medical uuuu'),
	(2, 1, 4, 'Y', 2, '2021-06-11', '2021-06-11', 2, 'Y', 1200, 6, 1200, 200, 'None 11111'),
	(4, 1, 6, 'Y', 1, '2021-07-06', '2021-07-17', 2, 'NEW', 1200, 6, 0, 200, 'Ayyappan');
/*!40000 ALTER TABLE `loansettings` ENABLE KEYS */;

-- Dumping structure for table letosyshr.loantype
CREATE TABLE IF NOT EXISTS `loantype` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `company_uid` int(11) NOT NULL DEFAULT '0',
  `code` varchar(20) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.loantype: ~2 rows (approximately)
/*!40000 ALTER TABLE `loantype` DISABLE KEYS */;
INSERT INTO `loantype` (`uid`, `company_uid`, `code`, `name`) VALUES
	(1, 1, 'HLOAN', 'HOUSE LOAN'),
	(2, 1, 'VISA', 'VISA');
/*!40000 ALTER TABLE `loantype` ENABLE KEYS */;

-- Dumping structure for table letosyshr.location
CREATE TABLE IF NOT EXISTS `location` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `Sitemaster_uid` int(11) NOT NULL DEFAULT '0',
  `code` varchar(20) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.location: ~1 rows (approximately)
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` (`uid`, `Sitemaster_uid`, `code`, `name`) VALUES
	(1, 0, 'LOC', 'DUBAI');
/*!40000 ALTER TABLE `location` ENABLE KEYS */;

-- Dumping structure for table letosyshr.menulistmaster
CREATE TABLE IF NOT EXISTS `menulistmaster` (
  `Uid` int(11) NOT NULL AUTO_INCREMENT,
  `MenuName` varchar(250) DEFAULT NULL,
  `UrlName` varchar(250) DEFAULT NULL,
  `Package1_Status` varchar(1) DEFAULT 'N',
  `Package2_Status` varchar(1) DEFAULT 'N',
  `Package3_Status` varchar(1) DEFAULT 'N',
  `Package4_Status` varchar(1) DEFAULT 'N',
  UNIQUE KEY `Uid` (`Uid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.menulistmaster: ~3 rows (approximately)
/*!40000 ALTER TABLE `menulistmaster` DISABLE KEYS */;
INSERT INTO `menulistmaster` (`Uid`, `MenuName`, `UrlName`, `Package1_Status`, `Package2_Status`, `Package3_Status`, `Package4_Status`) VALUES
	(1, 'Employee', '\\employee\\employee\\employee.html', 'Y', 'Y', 'Y', 'Y'),
	(2, 'Holiday', '\\employee\\employee\\holIday.html', 'Y', 'Y', 'Y', 'Y'),
	(3, 'Salary Master', '\\employee\\employee\\SalaryMaster.html', 'Y', 'N', 'N', 'Y');
/*!40000 ALTER TABLE `menulistmaster` ENABLE KEYS */;

-- Dumping structure for table letosyshr.monthlydatestemp
CREATE TABLE IF NOT EXISTS `monthlydatestemp` (
  `dates` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.monthlydatestemp: ~30 rows (approximately)
/*!40000 ALTER TABLE `monthlydatestemp` DISABLE KEYS */;
INSERT INTO `monthlydatestemp` (`dates`) VALUES
	('2021-09-01'),
	('2021-09-02'),
	('2021-09-03'),
	('2021-09-04'),
	('2021-09-05'),
	('2021-09-06'),
	('2021-09-07'),
	('2021-09-08'),
	('2021-09-09'),
	('2021-09-10'),
	('2021-09-11'),
	('2021-09-12'),
	('2021-09-13'),
	('2021-09-14'),
	('2021-09-15'),
	('2021-09-16'),
	('2021-09-17'),
	('2021-09-18'),
	('2021-09-19'),
	('2021-09-20'),
	('2021-09-21'),
	('2021-09-22'),
	('2021-09-23'),
	('2021-09-24'),
	('2021-09-25'),
	('2021-09-26'),
	('2021-09-27'),
	('2021-09-28'),
	('2021-09-29'),
	('2021-09-30');
/*!40000 ALTER TABLE `monthlydatestemp` ENABLE KEYS */;

-- Dumping structure for table letosyshr.montlyovertine
CREATE TABLE IF NOT EXISTS `montlyovertine` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `company_uid` int(11) NOT NULL,
  `empmaster_uid` int(11) NOT NULL,
  `dates` date NOT NULL,
  `overtimemaster_uid` int(11) DEFAULT NULL,
  `hrs` double DEFAULT NULL,
  `rate` double DEFAULT NULL,
  `notes` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`company_uid`,`empmaster_uid`,`dates`),
  UNIQUE KEY `uid` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.montlyovertine: ~2 rows (approximately)
/*!40000 ALTER TABLE `montlyovertine` DISABLE KEYS */;
INSERT INTO `montlyovertine` (`uid`, `company_uid`, `empmaster_uid`, `dates`, `overtimemaster_uid`, `hrs`, `rate`, `notes`) VALUES
	(1, 1, 1, '2021-09-01', 2, 2, 1.25, 'fgfg'),
	(2, 1, 2, '2021-09-01', 3, 2, 1.5, 'fgfgfg');
/*!40000 ALTER TABLE `montlyovertine` ENABLE KEYS */;

-- Dumping structure for table letosyshr.ottype
CREATE TABLE IF NOT EXISTS `ottype` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.ottype: ~0 rows (approximately)
/*!40000 ALTER TABLE `ottype` DISABLE KEYS */;
/*!40000 ALTER TABLE `ottype` ENABLE KEYS */;

-- Dumping structure for table letosyshr.overtimemaster
CREATE TABLE IF NOT EXISTS `overtimemaster` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `company_uid` int(11) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `rateperhr` double DEFAULT NULL,
  UNIQUE KEY `uid` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.overtimemaster: ~3 rows (approximately)
/*!40000 ALTER TABLE `overtimemaster` DISABLE KEYS */;
INSERT INTO `overtimemaster` (`uid`, `company_uid`, `name`, `rateperhr`) VALUES
	(1, 1, 'NOT', 1.25),
	(2, 1, 'HOT', 2),
	(3, 1, 'WOT', 1.5);
/*!40000 ALTER TABLE `overtimemaster` ENABLE KEYS */;

-- Dumping structure for table letosyshr.packagemaster
CREATE TABLE IF NOT EXISTS `packagemaster` (
  `Uid` int(11) NOT NULL AUTO_INCREMENT,
  `Code` varchar(50) DEFAULT NULL,
  `Name` varchar(50) DEFAULT NULL,
  `Amount` double DEFAULT NULL,
  `NoofUsers` int(11) DEFAULT NULL,
  `NoofEmployee` int(11) DEFAULT NULL,
  UNIQUE KEY `Uid` (`Uid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.packagemaster: ~4 rows (approximately)
/*!40000 ALTER TABLE `packagemaster` DISABLE KEYS */;
INSERT INTO `packagemaster` (`Uid`, `Code`, `Name`, `Amount`, `NoofUsers`, `NoofEmployee`) VALUES
	(1, 'Package1', 'Golden', 1200, 40, NULL),
	(2, 'Package2', 'Silver', 1300, 30, NULL),
	(3, 'Package3', 'Free', 0, 1, NULL),
	(4, 'Package4', 'Unlimited', 45000, 20000, NULL);
/*!40000 ALTER TABLE `packagemaster` ENABLE KEYS */;

-- Dumping structure for table letosyshr.projectmaster
CREATE TABLE IF NOT EXISTS `projectmaster` (
  `UID` int(11) DEFAULT NULL,
  `code` varchar(20) DEFAULT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `client` varchar(100) DEFAULT NULL,
  `Startdate` date DEFAULT NULL,
  `Enddate` date DEFAULT NULL,
  `rate` double DEFAULT NULL,
  `Periority` varchar(50) DEFAULT NULL,
  `ProjectLeader` varchar(100) DEFAULT NULL,
  `TeamLeader` varchar(100) DEFAULT NULL,
  `ProjectAmount` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.projectmaster: ~0 rows (approximately)
/*!40000 ALTER TABLE `projectmaster` DISABLE KEYS */;
/*!40000 ALTER TABLE `projectmaster` ENABLE KEYS */;

-- Dumping structure for table letosyshr.salarymaster
CREATE TABLE IF NOT EXISTS `salarymaster` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `company_uid` int(11) NOT NULL,
  `empmaster_uid` int(11) NOT NULL,
  `effect_year` int(11) NOT NULL DEFAULT '0',
  `effect_month` int(11) NOT NULL DEFAULT '0',
  `effect_from_date` date NOT NULL,
  `Entrydate` date DEFAULT NULL,
  `basic` double DEFAULT '0',
  `hra` double DEFAULT '0',
  `Da` double DEFAULT '0',
  `Conveyance` double DEFAULT '0',
  `Allowance` double DEFAULT '0',
  `MedicalAllowance` double DEFAULT '0',
  `Others` double DEFAULT '0',
  `TdsAllowed` varchar(1) DEFAULT '0',
  `EsiAllowed` varchar(1) DEFAULT '0',
  `Pfallowed` varchar(1) DEFAULT '0',
  `TDS` double DEFAULT '0',
  `ESI` double DEFAULT '0',
  `PF` double DEFAULT '0',
  `Gross_Salary` double DEFAULT '0',
  `net_salary` double DEFAULT '0',
  `total_Deduction` double DEFAULT '0',
  `Created_on` datetime DEFAULT NULL,
  `total_earning` double DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `Created_by` int(11) DEFAULT NULL,
  `notes` varchar(500) DEFAULT NULL,
  UNIQUE KEY `unique_Key` (`company_uid`,`empmaster_uid`,`effect_year`,`effect_month`) USING BTREE,
  KEY `uid` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.salarymaster: ~4 rows (approximately)
/*!40000 ALTER TABLE `salarymaster` DISABLE KEYS */;
INSERT INTO `salarymaster` (`uid`, `company_uid`, `empmaster_uid`, `effect_year`, `effect_month`, `effect_from_date`, `Entrydate`, `basic`, `hra`, `Da`, `Conveyance`, `Allowance`, `MedicalAllowance`, `Others`, `TdsAllowed`, `EsiAllowed`, `Pfallowed`, `TDS`, `ESI`, `PF`, `Gross_Salary`, `net_salary`, `total_Deduction`, `Created_on`, `total_earning`, `updated_on`, `updated_by`, `Created_by`, `notes`) VALUES
	(6, 1, 1, 2021, 5, '2021-05-01', '2021-05-01', 3500, 1000, 200, 400, 300, 200, 100, 'N', 'Y', 'N', 100, 200, 200, 5700, 5900, 200, NULL, 0, NULL, 0, NULL, NULL),
	(1, 1, 1, 2021, 6, '2021-06-01', '2021-05-01', 2500, 1500, 1000, 500, 100, 300, 1000, 'Y', 'Y', 'N', 1200, 200, 1201, 1202, 1000, 1203, NULL, 0, NULL, 0, NULL, NULL),
	(10, 1, 3, 2021, 6, '2021-06-01', '2021-06-01', 2500, 1200, 1000, 500, 400, 200, 150, 'Y', 'Y', 'Y', 0, 150, 500, 5950, 6600, 650, NULL, 0, NULL, 0, NULL, NULL),
	(7, 1, 4, 2021, 6, '2021-06-15', '2021-01-06', 4500, 2000, 300, 500, 200, 600, 250, 'N', 'Y', 'Y', 0, 450, 200, 8350, 8650, 300, NULL, 0, NULL, 0, NULL, NULL);
/*!40000 ALTER TABLE `salarymaster` ENABLE KEYS */;

-- Dumping structure for table letosyshr.salaryprocessdetail
CREATE TABLE IF NOT EXISTS `salaryprocessdetail` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `company_uid` int(11) NOT NULL DEFAULT '0',
  `tyear` int(11) NOT NULL DEFAULT '0',
  `tmonth` int(11) NOT NULL DEFAULT '0',
  `empmaster_uid` int(11) DEFAULT '0',
  `empname` varchar(150) DEFAULT 'nil',
  `totalhrs` double(12,2) DEFAULT NULL,
  `normalhrs` double DEFAULT '0',
  `othrs` double DEFAULT '0',
  `grosssalary` double DEFAULT '0',
  `salarydeduct` double DEFAULT '0',
  `perhrrate` double DEFAULT '0',
  `basic` double DEFAULT '0',
  `hra` double DEFAULT '0',
  `da` double DEFAULT '0',
  `conveyance` double DEFAULT '0',
  `allowance` double DEFAULT '0',
  `medicalallowance` double DEFAULT '0',
  `others` double DEFAULT '0',
  `cbasic` double DEFAULT '0',
  `chra` double DEFAULT '0',
  `cda` double DEFAULT '0',
  `cconveyance` double DEFAULT '0',
  `callowance` double DEFAULT '0',
  `cmedicalallowance` double DEFAULT '0',
  `cothers` double DEFAULT '0',
  `tds` double DEFAULT '0',
  `esi` double DEFAULT '0',
  `pf` double DEFAULT '0',
  `loanAmount` double DEFAULT '0',
  `addition` double DEFAULT '0',
  `deduction` double DEFAULT '0',
  `totalsalary` double DEFAULT '0',
  `netdeduction` double DEFAULT '0',
  `netsalary` double DEFAULT '0',
  PRIMARY KEY (`uid`,`company_uid`,`tyear`,`tmonth`),
  UNIQUE KEY `uid` (`uid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.salaryprocessdetail: ~3 rows (approximately)
/*!40000 ALTER TABLE `salaryprocessdetail` DISABLE KEYS */;
INSERT INTO `salaryprocessdetail` (`uid`, `company_uid`, `tyear`, `tmonth`, `empmaster_uid`, `empname`, `totalhrs`, `normalhrs`, `othrs`, `grosssalary`, `salarydeduct`, `perhrrate`, `basic`, `hra`, `da`, `conveyance`, `allowance`, `medicalallowance`, `others`, `cbasic`, `chra`, `cda`, `cconveyance`, `callowance`, `cmedicalallowance`, `cothers`, `tds`, `esi`, `pf`, `loanAmount`, `addition`, `deduction`, `totalsalary`, `netdeduction`, `netsalary`) VALUES
	(4, 1, 2021, 8, 1, 'Ayyappan', 240.00, 240, 0, 7300, 2601, 30.416666666666668, 2500, 1500, 1000, 500, 500, 300, 1000, 2500, 1500, 1000, 500, 500, 300, 1000, 1200, 200, 1201, 0, 0, 0, 7300, 2601, 4699),
	(5, 1, 2021, 8, 3, 'Nirmala', 240.00, 240, 0, 5950, 650, 24.791666666666668, 2500, 1200, 1000, 500, 400, 200, 150, 2500, 1200, 1000, 500, 400, 200, 150, 0, 150, 500, 0, 0, 0, 5950, 650, 5300),
	(6, 1, 2021, 8, 4, 'Vasanthi', 240.00, 240, 0, 8350, 300, 34.791666666666664, 4500, 2000, 300, 500, 200, 600, 250, 4500, 2000, 300, 500, 200, 600, 250, 0, 100, 200, 0, 0, 0, 8350, 300, 8050);
/*!40000 ALTER TABLE `salaryprocessdetail` ENABLE KEYS */;

-- Dumping structure for table letosyshr.salaryprocessheader
CREATE TABLE IF NOT EXISTS `salaryprocessheader` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `Tyear` int(11) DEFAULT NULL,
  `Tmonth` int(11) DEFAULT NULL,
  `Notes` int(11) DEFAULT NULL,
  `created_on` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_on` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.salaryprocessheader: ~0 rows (approximately)
/*!40000 ALTER TABLE `salaryprocessheader` DISABLE KEYS */;
/*!40000 ALTER TABLE `salaryprocessheader` ENABLE KEYS */;

-- Dumping structure for table letosyshr.salaryprocess_temp
CREATE TABLE IF NOT EXISTS `salaryprocess_temp` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `company_uid` int(11) DEFAULT '0',
  `empmaster_uid` int(11) DEFAULT '0',
  `empname` varchar(150) DEFAULT '0',
  `totalhrs` double(12,2) DEFAULT '0.00',
  `normalhrs` double DEFAULT '0',
  `othrs` double DEFAULT '0',
  `grosssalary` double DEFAULT '0',
  `salarydeduct` double DEFAULT '0',
  `perhrrate` double DEFAULT '0',
  `basic` double DEFAULT '0',
  `hra` double DEFAULT '0',
  `da` double DEFAULT '0',
  `conveyance` double DEFAULT '0',
  `allowance` double DEFAULT '0',
  `medicalallowance` double DEFAULT '0',
  `others` double DEFAULT '0',
  `cbasic` double DEFAULT '0',
  `chra` double DEFAULT '0',
  `cda` double DEFAULT '0',
  `cconveyance` double DEFAULT '0',
  `callowance` double DEFAULT '0',
  `cmedicalallowance` double DEFAULT '0',
  `cothers` double DEFAULT '0',
  `tds` double DEFAULT '0',
  `esi` double DEFAULT '0',
  `pf` double DEFAULT '0',
  `loanAmount` double DEFAULT '0',
  `addition` double DEFAULT '0',
  `deduction` double DEFAULT '0',
  `totalsalary` double DEFAULT '0',
  `netdeduction` double DEFAULT '0',
  `netsalary` double DEFAULT '0',
  UNIQUE KEY `uid` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.salaryprocess_temp: ~3 rows (approximately)
/*!40000 ALTER TABLE `salaryprocess_temp` DISABLE KEYS */;
INSERT INTO `salaryprocess_temp` (`uid`, `company_uid`, `empmaster_uid`, `empname`, `totalhrs`, `normalhrs`, `othrs`, `grosssalary`, `salarydeduct`, `perhrrate`, `basic`, `hra`, `da`, `conveyance`, `allowance`, `medicalallowance`, `others`, `cbasic`, `chra`, `cda`, `cconveyance`, `callowance`, `cmedicalallowance`, `cothers`, `tds`, `esi`, `pf`, `loanAmount`, `addition`, `deduction`, `totalsalary`, `netdeduction`, `netsalary`) VALUES
	(1, 1, 1, 'Ayyappan', 240.00, 240, 0, 7300, 2601, 30.416666666666668, 2500, 1500, 1000, 500, 500, 300, 1000, 2500, 1500, 1000, 500, 500, 300, 1000, 1200, 200, 1201, 0, 0, 0, 7300, 2601, 4699),
	(2, 1, 3, 'Nirmala', 240.00, 240, 0, 5950, 650, 24.791666666666668, 2500, 1200, 1000, 500, 400, 200, 150, 2500, 1200, 1000, 500, 400, 200, 150, 0, 150, 500, 0, 0, 0, 5950, 650, 5300),
	(3, 1, 4, 'Vasanthi', 240.00, 240, 0, 8350, 300, 34.791666666666664, 4500, 2000, 300, 500, 200, 600, 250, 4500, 2000, 300, 500, 200, 600, 250, 0, 100, 200, 0, 0, 0, 8350, 300, 8050);
/*!40000 ALTER TABLE `salaryprocess_temp` ENABLE KEYS */;

-- Dumping structure for table letosyshr.salarysettings
CREATE TABLE IF NOT EXISTS `salarysettings` (
  `UID` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `company_uid` int(11) NOT NULL,
  `dahr_yn` char(1) NOT NULL DEFAULT 'N',
  `dahr_da_Per` decimal(20,6) NOT NULL DEFAULT '0.000000',
  `dahr_hr_per` decimal(20,6) NOT NULL DEFAULT '0.000000',
  `PS_Emp_Share` decimal(20,6) NOT NULL DEFAULT '0.000000',
  `Ps_org_share` decimal(20,6) NOT NULL DEFAULT '0.000000',
  `ps_yn` varchar(1) NOT NULL DEFAULT '0',
  `es_emp_share` decimal(20,6) NOT NULL DEFAULT '0.000000',
  `es_org_share` decimal(20,6) NOT NULL DEFAULT '0.000000',
  `es_yn` varchar(1) NOT NULL DEFAULT '0',
  `tds_sal_from` double NOT NULL DEFAULT '0',
  `tds_sal_to` double NOT NULL DEFAULT '0',
  `tds_per` decimal(20,6) NOT NULL DEFAULT '0.000000',
  PRIMARY KEY (`UID`,`company_uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.salarysettings: ~0 rows (approximately)
/*!40000 ALTER TABLE `salarysettings` DISABLE KEYS */;
/*!40000 ALTER TABLE `salarysettings` ENABLE KEYS */;

-- Dumping structure for table letosyshr.sitemaster
CREATE TABLE IF NOT EXISTS `sitemaster` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.sitemaster: ~2 rows (approximately)
/*!40000 ALTER TABLE `sitemaster` DISABLE KEYS */;
INSERT INTO `sitemaster` (`uid`, `code`, `name`) VALUES
	(1, 'MRI', 'MARINA MALL'),
	(2, 'AUX', 'AUBUDHABI');
/*!40000 ALTER TABLE `sitemaster` ENABLE KEYS */;

-- Dumping structure for procedure letosyshr.sp_insert_dts_real
DELIMITER //
CREATE PROCEDURE `sp_insert_dts_real`()
    COMMENT 'insert into daily timesheet details'
BEGIN
INSERT INTO dailytimesheetdetails
SELECT *
from dts_temp ;

END//
DELIMITER ;

-- Dumping structure for procedure letosyshr.sp_insert_sp
DELIMITER //
CREATE PROCEDURE `sp_insert_sp`(
	IN `cmpy_uid` INT,
	IN `ttyear` INT,
	IN `ttmonth` INT
)
BEGIN

insert into salaryprocessdetail (company_uid,empmaster_uid,tyear,tmonth,empname,totalhrs,normalhrs,othrs,
grosssalary,salarydeduct,perhrrate,basic,hra,da,conveyance,allowance,
medicalallowance,others,cbasic,chra,cda,cconveyance,callowance,
cmedicalallowance,cothers,tds,esi,pf,loanAmount,addition,deduction,totalsalary,netdeduction,netsalary)

SELECT cmpy_uid,empmaster_uid,ttyear,ttmonth,empname,totalhrs,normalhrs,othrs,
grosssalary,salarydeduct,perhrrate,basic,hra,da,conveyance,allowance,
medicalallowance,others,cbasic,chra,cda,cconveyance,callowance,
cmedicalallowance,cothers,tds,esi,pf,loanAmount,addition,deduction,totalsalary,netdeduction,netsalary
 FROM salaryprocess_temp;

END//
DELIMITER ;

-- Dumping structure for procedure letosyshr.sp_insert_timesheet_temp
DELIMITER //
CREATE PROCEDURE `sp_insert_timesheet_temp`(
	IN `cmpy_uid` INT,
	IN `ttyear` INT,
	IN `ttmonth` INT
)
BEGIN
DECLARE Startdate DATE;
DECLARE Enddate DATE;
declare StartDay INT;
DECLARE lastday INT;
DECLARE counter INT;
DECLARE emp_uid INT;
 DECLARE finished BOOLEAN DEFAULT FALSE;
 DECLARE cur1 CURSOR FOR SELECT uid from empmaster
  WHERE company_uid=cmpy_uid AND empactive='Y' 
   AND uid NOT IN   (SELECT empmaster_uid FROM dailytimesheetdetails 
	WHERE tyear=ttyear AND tmonth=ttmonth AND   company_uid=cmpy_uid);
 DECLARE CONTINUE HANDLER FOR NOT FOUND SET finished = true;
SET @Startdate=    DATE_FORMAT(concat(REPLACE(ttyear,',',''),'-', REPLACE(ttmonth,',',''),'-','01'),'%Y-%m-%d') ;
SET @Enddate=LAST_DAY(@startdate);
SET @lastday=DAY(@enddate);

TRUNCATE TABLE monthlydatestemp;
TRUNCATE TABLE dts_temp;
-- DELETE FROM  dailytimesheetdetails WHERE company_uid=cmpy_uid AND tyear=ttyear AND tmonth=ttmonth;
OPEN cur1;
SET @counter=0;

  WHILE  @counter < @lastday DO
    SELECT @counter;
    INSERT INTO monthlydatestemp (dates)
    VALUES( @Startdate);
    SET @Startdate=DATE_ADD(@Startdate, INTERVAL 1 DAY); 
    SET @counter=@counter+1;
   END WHILE;
 
 SET @Startdate=DATE_ADD(@Startdate, INTERVAL 1 DAY); 
read_loop: LOOP
FETCH  cur1 INTO emp_uid;


   IF finished THEN
     LEAVE read_loop;
   END IF;
 -- default time sheet insert into temparary table
    INSERT INTO dts_temp (company_uid,empmaster_uid,leavetype_uid,dates,tyear,tmonth,normalhrs,totalhrs,leavetype_code)
    SELECT  cmpy_uid,emp_uid,1, dates,ttyear,ttmonth,8,8,'P' FROM monthlydatestemp;
   
 
 END LOOP;

close cur1;

-- update leave detail and holiday details

UPDATE dts_temp a   inner JOIN holidaysetting b ON a.company_uid=b.company_uid 
SET a.normalhrs =8 , a.leavetype_uid =b.leavetype_uid  , a.leavetype_code=b.HolidayType
WHERE b.company_uid=cmpy_uid
AND year(b.holidaydate)=ttyear AND month(b.holidaydate)=ttmonth  AND a.dates=b.holidaydate  ;

 UPDATE dts_temp a   inner JOIN vw_empleave b ON a.company_uid=b.company_uid 
 AND a.Empmaster_uid=b.Empmaster_uid 
 SET a.normalhrs =B.Al_hrs , a.leavetype_uid =b.leavetype_uid  , a.leavetype_code=b.leavecode
 WHERE b.company_uid=cmpy_uid  and b.empmaster_uid =a.empmaster_uid 
 AND (year(b.leave_from)=ttyear OR year(b.leave_upto)=ttyear)
 AND (month(b.leave_from)=ttmonth  OR  month(b.leave_upto)=ttmonth)
-- AND 1 between DAY(b.leave_from)  and  DAY(b.leave_upto) AND b.empmaster_uid =emp_uid ;
   AND a.dates between b.leave_from  and  b.leave_upto  ;
  
END//
DELIMITER ;

-- Dumping structure for procedure letosyshr.sp_SalaryProcess
DELIMITER //
CREATE PROCEDURE `sp_SalaryProcess`(
	IN `cmpy_uid` VARCHAR(20),
	IN `TTyear` VARCHAR(5),
	IN `TTmonth` VARCHAR(2)
)
BEGIN
DECLARE Startdate DATE;
DECLARE Enddate DATE;
declare StartDay INT;
DECLARE lastday INT;
SET @Startdate=    DATE_FORMAT(concat(REPLACE(ttyear,',',''),'-', REPLACE(ttmonth,',',''),'-','01'),'%Y-%m-%d') ;
SET @Enddate=LAST_DAY(@startdate);
SET @lastday=DAY(@enddate);
TRUNCATE TABLE salaryprocess_temp;
INSERT INTO salaryprocess_temp(
 company_uid,empmaster_uid,empname,totalhrs,normalhrs,othrs,grosssalary,salarydeduct,perhrrate,basic,hra,da,conveyance,
allowance,medicalallowance,others,cbasic,chra,cda,cconveyance,callowance,cmedicalallowance,cothers,tds,esi,pf,loanAmount,
addition,deduction)
SELECT e.company_uid,e.uid empmaster_uid, get_empname(e.uid) empname,ts.totalhrs,ts.normalhrs,ts.othrs,s.grosssalary,s.salarydeduct,
 (s.grosssalary/ts.totalhrs) perhrrate,
s.basic,s.hra,da,s.conveyance,s.allowance,s.medicalallowance,s.others, 
(case when ts.totalhrs=ts.normalhrs then s.basic ELSE (s.basic/ts.totalhrs) * ts.normalhrs END) cbasic,
(case when ts.totalhrs=ts.normalhrs then s.hra ELSE (s.hra/ts.totalhrs) * ts.normalhrs END) chra,
(case when ts.totalhrs=ts.normalhrs then s.da ELSE (s.da/ts.totalhrs) * ts.normalhrs END) cda,
(case when ts.totalhrs=ts.normalhrs then s.conveyance ELSE (s.conveyance/ts.totalhrs) * ts.normalhrs END) cconveyance,
(case when ts.totalhrs=ts.normalhrs then s.allowance ELSE (s.allowance/ts.totalhrs) * ts.normalhrs END) callowance,
(case when ts.totalhrs=ts.normalhrs then s.medicalallowance ELSE (s.medicalallowance/ts.totalhrs) * ts.normalhrs END) cmedicalallowance,
(case when ts.totalhrs=ts.normalhrs then s.others ELSE (s.others/ts.totalhrs) * ts.normalhrs END) cothers,

	s.tds ,s.esi, s.pf, ifnull(l.amount,0) loanAmount, ifnull(ma.addition,0) addition, ifnull(md.deduction,0) deduction 
	  FROM empmaster e 
INNER JOIN (SELECT company_uid,empmaster_uid,tyear,tmonth,sum(totalhrs) totalhrs , sum(normalhrs) normalhrs , sum(othrs) othrs
 FROM dailytimesheetdetails WHERE company_uid=cmpy_uid AND tyear=TTyear AND tmonth=TTmonth
  GROUP BY company_uid,empmaster_uid,tyear,tmonth) ts
 ON e.uid=ts.empmaster_uid 	     
INNER JOIN  -- find out the maximum slary
   (SELECT s.company_uid, s.empmaster_uid,
	IFNULL(s.basic,0)+IFNULL(s.hra,0)+IFNULL(s.da,0)+IFNULL(s.conveyance,0)+ ifnull(s.allowance,0)
	+ifnull(s.medicalallowance,0)+IFNULL(s.others,0) grosssalary,
	IFNULL( s.tds,0)+IFNULL(s.esi,0)+IFNULL(s.pf,0) salarydeduct,
	IFNULL(s.basic,0) basic ,IFNULL(s.hra,0) hra,
	IFNULL(s.da,0) da, IFNULL(s.conveyance,0) conveyance, ifnull(s.allowance,0) allowance,
	ifnull(s.medicalallowance,0) medicalallowance, IFNULL(s.others,0) others,
	IFNULL( s.tds,0) tds ,IFNULL(s.esi,0) esi , IFNULL(s.pf,0) pf FROM salarymaster s 
	INNER JOIN
	(SELECT MAX(effect_from_date) effect_from_date , company_uid,empmaster_uid FROM salarymaster 
	WHERE effect_year<=ttyear AND effect_month<=ttmonth
	GROUP BY company_uid,empmaster_uid ) sm
	on s.company_uid =sm.company_uid AND s.empmaster_uid =sm.empmaster_uid 
	AND s.effect_from_date=sm.effect_from_date
	WHERE effect_year<=ttyear AND effect_month<=ttmonth) s ON e.company_uid=s.company_uid AND e.uid=s.empmaster_uid
LEFT outer JOIN  -- find out the loan poid data for this month
   (SELECT  company_uid,Tyear,Tmonth,empmaster_uid,amount FROM  vw_monthly_loan_deducted 
   WHERE  tyear=ttyear AND tmonth=ttmonth) l ON  l.company_uid =e.company_uid AND l.empmaster_uid =e.uid 
LEFT outer JOIN  -- find out the monthly deduction amount
   ( SELECT  company_uid, empmaster_uid,Tyear,Tmonth, amount deduction
		 FROM  vw_monthlydeduction 
   WHERE  tyear=ttyear AND tmonth=ttmonth) md ON e.company_uid= md.company_uid  AND e.uid =md.empmaster_uid 
LEFT outer JOIN  -- find out the monthly Addition amount
   ( SELECT  company_uid, empmaster_uid,Tyear,Tmonth, amount addition
		 FROM  vw_monthlyaddition
   WHERE  tyear=ttyear AND tmonth=ttmonth) ma ON e.company_uid= ma.company_uid  AND e.uid =ma.empmaster_uid 
WHERE e.company_uid=cmpy_uid;

UPDATE salaryprocess_temp SET totalsalary= (cbasic+chra+cda+cconveyance+
 callowance+cmedicalallowance+cothers+addition)  , 
 netdeduction=(salarydeduct+loanAmount+deduction),
netsalary=(cbasic+chra+cda+cconveyance+callowance+cmedicalallowance+
cothers+addition) -(salarydeduct+loanAmount+deduction);
END//
DELIMITER ;

-- Dumping structure for table letosyshr.superusers
CREATE TABLE IF NOT EXISTS `superusers` (
  `Uid` int(11) NOT NULL AUTO_INCREMENT,
  `UserCode` varchar(10) DEFAULT NULL,
  `UserName` varchar(50) DEFAULT NULL,
  `Password` varchar(10) DEFAULT NULL,
  UNIQUE KEY `Uid` (`Uid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.superusers: ~1 rows (approximately)
/*!40000 ALTER TABLE `superusers` DISABLE KEYS */;
INSERT INTO `superusers` (`Uid`, `UserCode`, `UserName`, `Password`) VALUES
	(1, 'AYYA', 'AYYAPPAN', '1234');
/*!40000 ALTER TABLE `superusers` ENABLE KEYS */;

-- Dumping structure for table letosyshr.timesheetdetail
CREATE TABLE IF NOT EXISTS `timesheetdetail` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `timesheetheader_uid` int(11) NOT NULL,
  `Emp_uid` int(11) NOT NULL,
  `Attendance_Date` date NOT NULL,
  `Leavetype_uid` int(11) DEFAULT NULL,
  `OverTimeHours` int(11) DEFAULT NULL,
  `Notes` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`timesheetheader_uid`,`Emp_uid`,`Attendance_Date`),
  UNIQUE KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.timesheetdetail: ~0 rows (approximately)
/*!40000 ALTER TABLE `timesheetdetail` DISABLE KEYS */;
/*!40000 ALTER TABLE `timesheetdetail` ENABLE KEYS */;

-- Dumping structure for table letosyshr.timesheetheader
CREATE TABLE IF NOT EXISTS `timesheetheader` (
  `Uid` int(11) NOT NULL AUTO_INCREMENT,
  `company_uid` int(11) NOT NULL,
  `Tyear` int(11) NOT NULL,
  `Tmonth` int(11) NOT NULL,
  `Reportee_Uid` int(11) NOT NULL,
  `user_uid` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `Created_on` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`company_uid`,`Tyear`,`Tmonth`,`Reportee_Uid`),
  UNIQUE KEY `Uid` (`Uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.timesheetheader: ~0 rows (approximately)
/*!40000 ALTER TABLE `timesheetheader` DISABLE KEYS */;
/*!40000 ALTER TABLE `timesheetheader` ENABLE KEYS */;

-- Dumping structure for table letosyshr.user
CREATE TABLE IF NOT EXISTS `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(50) NOT NULL DEFAULT '0',
  `userid` int(11) DEFAULT '0',
  `username` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `userid` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table letosyshr.user: ~2 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`uid`, `password`, `userid`, `username`) VALUES
	(1, '123', 1, 'anbu'),
	(2, '1234', 2, 'ramya');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

-- Dumping structure for view letosyshr.vw_dts_detail
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `vw_dts_detail` (
	`company_uid` INT(11) NOT NULL,
	`tyear` INT(11) NULL,
	`tmonth` INT(11) NULL,
	`empmaster_uid` INT(11) NOT NULL,
	`day1_nrhrs` BIGINT(11) NOT NULL,
	`day1_othrs` BIGINT(11) NOT NULL,
	`day2_nrhrs` BIGINT(11) NOT NULL,
	`day2_othrs` BIGINT(11) NOT NULL,
	`day3_nrhrs` BIGINT(11) NOT NULL,
	`day3_othrs` BIGINT(11) NOT NULL,
	`day4_nrhrs` BIGINT(11) NOT NULL,
	`day4_othrs` BIGINT(11) NOT NULL,
	`day5_nrhrs` BIGINT(11) NOT NULL,
	`day5_othrs` BIGINT(11) NOT NULL,
	`day6_nrhrs` BIGINT(11) NOT NULL,
	`day6_othrs` BIGINT(11) NOT NULL,
	`day7_nrhrs` BIGINT(11) NOT NULL,
	`day7_othrs` BIGINT(11) NOT NULL,
	`day8_nrhrs` BIGINT(11) NOT NULL,
	`day8_othrs` BIGINT(11) NOT NULL,
	`day9_nrhrs` BIGINT(11) NOT NULL,
	`day9_othrs` BIGINT(11) NOT NULL,
	`day10_nrhrs` BIGINT(11) NOT NULL,
	`day10_othrs` BIGINT(11) NOT NULL,
	`day11_nrhrs` BIGINT(11) NOT NULL,
	`day11_othrs` BIGINT(11) NOT NULL,
	`day12_nrhrs` BIGINT(11) NOT NULL,
	`day12_othrs` BIGINT(11) NOT NULL,
	`day13_nrhrs` BIGINT(11) NOT NULL,
	`day13_othrs` BIGINT(11) NOT NULL,
	`day14_nrhrs` BIGINT(11) NOT NULL,
	`day14_othrs` BIGINT(11) NOT NULL,
	`day15_nrhrs` BIGINT(11) NOT NULL,
	`day15_othrs` BIGINT(11) NOT NULL,
	`day16_nrhrs` BIGINT(11) NOT NULL,
	`day16_othrs` BIGINT(11) NOT NULL,
	`day17_nrhrs` BIGINT(11) NOT NULL,
	`day17_othrs` BIGINT(11) NOT NULL,
	`day18_nrhrs` BIGINT(11) NOT NULL,
	`day18_othrs` BIGINT(11) NOT NULL,
	`day19_nrhrs` BIGINT(11) NOT NULL,
	`day19_othrs` BIGINT(11) NOT NULL,
	`day20_nrhrs` BIGINT(11) NOT NULL,
	`day20_othrs` BIGINT(11) NOT NULL,
	`day21_nrhrs` BIGINT(11) NOT NULL,
	`day21_othrs` BIGINT(11) NOT NULL,
	`day22_nrhrs` BIGINT(11) NOT NULL,
	`day22_othrs` BIGINT(11) NOT NULL,
	`day23_nrhrs` BIGINT(11) NOT NULL,
	`day23_othrs` BIGINT(11) NOT NULL,
	`day24_nrhrs` BIGINT(11) NOT NULL,
	`day24_othrs` BIGINT(11) NOT NULL,
	`day25_nrhrs` BIGINT(11) NOT NULL,
	`day25_othrs` BIGINT(11) NOT NULL,
	`day26_nrhrs` BIGINT(11) NOT NULL,
	`day26_othrs` BIGINT(11) NOT NULL,
	`day27_nrhrs` BIGINT(11) NOT NULL,
	`day27_othrs` BIGINT(11) NOT NULL,
	`day28_nrhrs` BIGINT(11) NOT NULL,
	`day28_othrs` BIGINT(11) NOT NULL,
	`day29_nrhrs` BIGINT(11) NOT NULL,
	`day29_othrs` BIGINT(11) NOT NULL,
	`day30_nrhrs` BIGINT(11) NOT NULL,
	`day30_othrs` BIGINT(11) NOT NULL,
	`day31_nrhrs` BIGINT(11) NOT NULL,
	`day31_othrs` BIGINT(11) NOT NULL
) ENGINE=MyISAM;

-- Dumping structure for view letosyshr.vw_dts_detail_temp
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `vw_dts_detail_temp` (
	`empmaster_uid` INT(11) NOT NULL,
	`day1_nrhrs` BIGINT(11) NOT NULL,
	`day1_othrs` BIGINT(11) NOT NULL,
	`day2_nrhrs` BIGINT(11) NOT NULL,
	`day2_othrs` BIGINT(11) NOT NULL,
	`day3_nrhrs` BIGINT(11) NOT NULL,
	`day3_othrs` BIGINT(11) NOT NULL,
	`day4_nrhrs` BIGINT(11) NOT NULL,
	`day4_othrs` BIGINT(11) NOT NULL,
	`day5_nrhrs` BIGINT(11) NOT NULL,
	`day5_othrs` BIGINT(11) NOT NULL,
	`day6_nrhrs` BIGINT(11) NOT NULL,
	`day6_othrs` BIGINT(11) NOT NULL,
	`day7_nrhrs` BIGINT(11) NOT NULL,
	`day7_othrs` BIGINT(11) NOT NULL,
	`day8_nrhrs` BIGINT(11) NOT NULL,
	`day8_othrs` BIGINT(11) NOT NULL,
	`day9_nrhrs` BIGINT(11) NOT NULL,
	`day9_othrs` BIGINT(11) NOT NULL,
	`day10_nrhrs` BIGINT(11) NOT NULL,
	`day10_othrs` BIGINT(11) NOT NULL,
	`day11_nrhrs` BIGINT(11) NOT NULL,
	`day11_othrs` BIGINT(11) NOT NULL,
	`day12_nrhrs` BIGINT(11) NOT NULL,
	`day12_othrs` BIGINT(11) NOT NULL,
	`day13_nrhrs` BIGINT(11) NOT NULL,
	`day13_othrs` BIGINT(11) NOT NULL,
	`day14_nrhrs` BIGINT(11) NOT NULL,
	`day14_othrs` BIGINT(11) NOT NULL,
	`day15_nrhrs` BIGINT(11) NOT NULL,
	`day15_othrs` BIGINT(11) NOT NULL,
	`day16_nrhrs` BIGINT(11) NOT NULL,
	`day16_othrs` BIGINT(11) NOT NULL,
	`day17_nrhrs` BIGINT(11) NOT NULL,
	`day17_othrs` BIGINT(11) NOT NULL,
	`day18_nrhrs` BIGINT(11) NOT NULL,
	`day18_othrs` BIGINT(11) NOT NULL,
	`day19_nrhrs` BIGINT(11) NOT NULL,
	`day19_othrs` BIGINT(11) NOT NULL,
	`day20_nrhrs` BIGINT(11) NOT NULL,
	`day20_othrs` BIGINT(11) NOT NULL,
	`day21_nrhrs` BIGINT(11) NOT NULL,
	`day21_othrs` BIGINT(11) NOT NULL,
	`day22_nrhrs` BIGINT(11) NOT NULL,
	`day22_othrs` BIGINT(11) NOT NULL,
	`day23_nrhrs` BIGINT(11) NOT NULL,
	`day23_othrs` BIGINT(11) NOT NULL,
	`day24_nrhrs` BIGINT(11) NOT NULL,
	`day24_othrs` BIGINT(11) NOT NULL,
	`day25_nrhrs` BIGINT(11) NOT NULL,
	`day25_othrs` BIGINT(11) NOT NULL,
	`day26_nrhrs` BIGINT(11) NOT NULL,
	`day26_othrs` BIGINT(11) NOT NULL,
	`day27_nrhrs` BIGINT(11) NOT NULL,
	`day27_othrs` BIGINT(11) NOT NULL,
	`day28_nrhrs` BIGINT(11) NOT NULL,
	`day28_othrs` BIGINT(11) NOT NULL,
	`day29_nrhrs` BIGINT(11) NOT NULL,
	`day29_othrs` BIGINT(11) NOT NULL,
	`day30_nrhrs` BIGINT(11) NOT NULL,
	`day30_othrs` BIGINT(11) NOT NULL,
	`day31_nrhrs` BIGINT(11) NOT NULL,
	`day31_othrs` BIGINT(11) NOT NULL
) ENGINE=MyISAM;

-- Dumping structure for view letosyshr.vw_dts_summary
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `vw_dts_summary` (
	`company_uid` INT(11) NOT NULL,
	`tyear` INT(11) NULL,
	`tmonth` INT(11) NULL,
	`empmaster_uid` INT(11) NOT NULL,
	`empname` VARCHAR(255) NULL COLLATE 'utf8mb4_general_ci',
	`DAY1_nrhrs` DECIMAL(41,0) NULL,
	`DAY2_nrhrs` DECIMAL(41,0) NULL,
	`DAY3_nrhrs` DECIMAL(41,0) NULL,
	`DAY4_nrhrs` DECIMAL(41,0) NULL,
	`DAY5_nrhrs` DECIMAL(41,0) NULL,
	`DAY6_nrhrs` DECIMAL(41,0) NULL,
	`DAY7_nrhrs` DECIMAL(41,0) NULL,
	`DAY8_nrhrs` DECIMAL(41,0) NULL,
	`DAY9_nrhrs` DECIMAL(41,0) NULL,
	`DAY10_nrhrs` DECIMAL(41,0) NULL,
	`DAY11_nrhrs` DECIMAL(41,0) NULL,
	`DAY12_nrhrs` DECIMAL(41,0) NULL,
	`DAY13_nrhrs` DECIMAL(41,0) NULL,
	`DAY14_nrhrs` DECIMAL(41,0) NULL,
	`DAY15_nrhrs` DECIMAL(41,0) NULL,
	`DAY16_nrhrs` DECIMAL(41,0) NULL,
	`DAY17_nrhrs` DECIMAL(41,0) NULL,
	`DAY18_nrhrs` DECIMAL(41,0) NULL,
	`DAY19_nrhrs` DECIMAL(41,0) NULL,
	`DAY20_nrhrs` DECIMAL(41,0) NULL,
	`DAY21_nrhrs` DECIMAL(41,0) NULL,
	`DAY22_nrhrs` DECIMAL(41,0) NULL,
	`DAY23_nrhrs` DECIMAL(41,0) NULL,
	`DAY24_nrhrs` DECIMAL(41,0) NULL,
	`DAY25_nrhrs` DECIMAL(41,0) NULL,
	`DAY26_nrhrs` DECIMAL(41,0) NULL,
	`DAY27_nrhrs` DECIMAL(41,0) NULL,
	`DAY28_nrhrs` DECIMAL(41,0) NULL,
	`DAY29_nrhrs` DECIMAL(41,0) NULL,
	`DAY30_nrhrs` DECIMAL(41,0) NULL,
	`DAY31_nrhrs` DECIMAL(41,0) NULL,
	`totalhrs` DECIMAL(65,0) NULL,
	`totalothrs` DECIMAL(65,0) NULL
) ENGINE=MyISAM;

-- Dumping structure for view letosyshr.vw_dts_summary_temp
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `vw_dts_summary_temp` (
	`empmaster_uid` INT(11) NOT NULL,
	`empname` VARCHAR(255) NULL COLLATE 'utf8mb4_general_ci',
	`DAY1_nrhrs` DECIMAL(41,0) NULL,
	`DAY2_nrhrs` DECIMAL(41,0) NULL,
	`DAY3_nrhrs` DECIMAL(41,0) NULL,
	`DAY4_nrhrs` DECIMAL(41,0) NULL,
	`DAY5_nrhrs` DECIMAL(41,0) NULL,
	`DAY6_nrhrs` DECIMAL(41,0) NULL,
	`DAY7_nrhrs` DECIMAL(41,0) NULL,
	`DAY8_nrhrs` DECIMAL(41,0) NULL,
	`DAY9_nrhrs` DECIMAL(41,0) NULL,
	`DAY10_nrhrs` DECIMAL(41,0) NULL,
	`DAY11_nrhrs` DECIMAL(41,0) NULL,
	`DAY12_nrhrs` DECIMAL(41,0) NULL,
	`DAY13_nrhrs` DECIMAL(41,0) NULL,
	`DAY14_nrhrs` DECIMAL(41,0) NULL,
	`DAY15_nrhrs` DECIMAL(41,0) NULL,
	`DAY16_nrhrs` DECIMAL(41,0) NULL,
	`DAY17_nrhrs` DECIMAL(41,0) NULL,
	`DAY18_nrhrs` DECIMAL(41,0) NULL,
	`DAY19_nrhrs` DECIMAL(41,0) NULL,
	`DAY20_nrhrs` DECIMAL(41,0) NULL,
	`DAY21_nrhrs` DECIMAL(41,0) NULL,
	`DAY22_nrhrs` DECIMAL(41,0) NULL,
	`DAY23_nrhrs` DECIMAL(41,0) NULL,
	`DAY24_nrhrs` DECIMAL(41,0) NULL,
	`DAY25_nrhrs` DECIMAL(41,0) NULL,
	`DAY26_nrhrs` DECIMAL(41,0) NULL,
	`DAY27_nrhrs` DECIMAL(41,0) NULL,
	`DAY28_nrhrs` DECIMAL(41,0) NULL,
	`DAY29_nrhrs` DECIMAL(41,0) NULL,
	`DAY30_nrhrs` DECIMAL(41,0) NULL,
	`DAY31_nrhrs` DECIMAL(41,0) NULL,
	`totalhrs` DECIMAL(65,0) NULL,
	`totalothrs` DECIMAL(65,0) NULL
) ENGINE=MyISAM;

-- Dumping structure for view letosyshr.vw_empleave
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `vw_empleave` (
	`company_uid` INT(11) NOT NULL,
	`empmaster_uid` INT(11) NOT NULL,
	`empcode` VARCHAR(20) NOT NULL COLLATE 'utf8mb4_general_ci',
	`firstname` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_general_ci',
	`leavecode` VARCHAR(20) NOT NULL COLLATE 'utf8mb4_general_ci',
	`leavetype_uid` INT(11) NOT NULL,
	`leave_from` DATE NOT NULL,
	`leave_upto` DATE NULL,
	`Al_hrs` DOUBLE NULL
) ENGINE=MyISAM;

-- Dumping structure for view letosyshr.vw_loanpaidamount
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `vw_loanpaidamount` (
	`loansettings_uid` INT(11) NOT NULL,
	`empmaster_uid` INT(11) NOT NULL,
	`Total_Paidamount` DOUBLE NULL
) ENGINE=MyISAM;

-- Dumping structure for view letosyshr.vw_loan_tobe_paid
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `vw_loan_tobe_paid` (
	`uid` INT(11) NOT NULL,
	`company_uid` INT(11) NOT NULL,
	`empmaster_uid` INT(11) NOT NULL,
	`loantype_uid` INT(10) NULL,
	`loanamount` DOUBLE NULL,
	`total_paidamount` DOUBLE NULL,
	`monthly_deduction` DOUBLE NULL,
	`still_tobe_paid` DOUBLE NULL,
	`thismonth_due` DOUBLE NULL
) ENGINE=MyISAM;

-- Dumping structure for view letosyshr.vw_monthlyaddition
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `vw_monthlyaddition` (
	`Company_UID` INT(11) NOT NULL,
	`Tyear` INT(11) NOT NULL,
	`Tmonth` INT(11) NOT NULL,
	`Empmaster_UID` INT(11) NOT NULL,
	`AddDeduct_type_uid` INT(11) NOT NULL,
	`amount` INT(11) NOT NULL
) ENGINE=MyISAM;

-- Dumping structure for view letosyshr.vw_monthlydeduction
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `vw_monthlydeduction` (
	`Company_UID` INT(11) NOT NULL,
	`Tyear` INT(11) NOT NULL,
	`Tmonth` INT(11) NOT NULL,
	`Empmaster_UID` INT(11) NOT NULL,
	`AddDeduct_type_uid` INT(11) NOT NULL,
	`amount` INT(11) NOT NULL
) ENGINE=MyISAM;

-- Dumping structure for view letosyshr.vw_monthly_loan_deducted
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `vw_monthly_loan_deducted` (
	`Company_uid` INT(11) NOT NULL,
	`Tyear` INT(11) NOT NULL,
	`Tmonth` INT(11) NOT NULL,
	`empmaster_uid` INT(11) NOT NULL,
	`Amount` DOUBLE NOT NULL
) ENGINE=MyISAM;

-- Dumping structure for view letosyshr.vw_dts_detail
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `vw_dts_detail`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `vw_dts_detail` AS SELECT company_uid,tyear,tmonth,empmaster_uid,
IFNULL((case when  DAY(dates)=1 then normalhrs END ),0) day1_nrhrs,
IFNULL((case when  DAY(dates)=1 then othrs END ),0) day1_othrs,
IFNULL((case when  DAY(dates)=2 then normalhrs END ),0) day2_nrhrs,
IFNULL((case when  DAY(dates)=2 then othrs END ),0) day2_othrs ,
IFNULL((case when  DAY(dates)=3 then normalhrs END ),0) day3_nrhrs,
IFNULL((case when  DAY(dates)=3 then othrs END ),0) day3_othrs,
IFNULL((case when  DAY(dates)=4 then normalhrs END ),0) day4_nrhrs,
IFNULL((case when  DAY(dates)=4 then othrs END ),0) day4_othrs,
IFNULL((case when  DAY(dates)=5 then normalhrs END ),0) day5_nrhrs,
IFNULL((case when  DAY(dates)=5 then othrs END ),0) day5_othrs,
IFNULL((case when  DAY(dates)=6 then normalhrs END ),0) day6_nrhrs,
IFNULL((case when  DAY(dates)=6 then othrs END ),0) day6_othrs,
IFNULL((case when  DAY(dates)=7 then normalhrs END ),0) day7_nrhrs,
IFNULL((case when  DAY(dates)=7 then othrs END ),0) day7_othrs,
IFNULL((case when  DAY(dates)=8 then normalhrs END ),0) day8_nrhrs,
IFNULL((case when  DAY(dates)=8 then othrs END ),0) day8_othrs,
IFNULL((case when  DAY(dates)=9 then normalhrs END ),0) day9_nrhrs,
IFNULL((case when  DAY(dates)=9 then othrs END ),0) day9_othrs,
IFNULL((case when  DAY(dates)=10 then normalhrs END ),0) day10_nrhrs, 
IFNULL((case when  DAY(dates)=10 then othrs END ),0) day10_othrs,
IFNULL((case when  DAY(dates)=11 then normalhrs END ),0) day11_nrhrs,
IFNULL((case when  DAY(dates)=11 then othrs END ),0) day11_othrs,
IFNULL((case when  DAY(dates)=12 then normalhrs END ),0) day12_nrhrs,
IFNULL((case when  DAY(dates)=12 then othrs END ),0) day12_othrs,
IFNULL((case when  DAY(dates)=13 then normalhrs END ),0) day13_nrhrs,
IFNULL((case when  DAY(dates)=13 then othrs END ),0) day13_othrs,
IFNULL((case when  DAY(dates)=14 then normalhrs END ),0) day14_nrhrs,
IFNULL((case when  DAY(dates)=14 then othrs END ),0) day14_othrs,
IFNULL((case when  DAY(dates)=15 then normalhrs END ),0) day15_nrhrs,
IFNULL((case when  DAY(dates)=15 then othrs END ),0) day15_othrs,
IFNULL((case when  DAY(dates)=16 then normalhrs END ),0) day16_nrhrs,
IFNULL((case when  DAY(dates)=16 then othrs END ),0) day16_othrs,
IFNULL((case when  DAY(dates)=17 then normalhrs END ),0) day17_nrhrs,
IFNULL((case when  DAY(dates)=17 then othrs END ),0) day17_othrs,
IFNULL((case when  DAY(dates)=18 then normalhrs END ),0) day18_nrhrs,
IFNULL((case when  DAY(dates)=18 then othrs END ),0) day18_othrs,
IFNULL((case when  DAY(dates)=19 then normalhrs END ),0) day19_nrhrs,
IFNULL((case when  DAY(dates)=19 then othrs END ),0) day19_othrs,
IFNULL((case when  DAY(dates)=20 then normalhrs END ),0) day20_nrhrs,
IFNULL((case when  DAY(dates)=20 then othrs END ),0) day20_othrs,
IFNULL((case when  DAY(dates)=21 then normalhrs END ),0) day21_nrhrs,
IFNULL((case when  DAY(dates)=21 then othrs END ),0) day21_othrs,
IFNULL((case when  DAY(dates)=22 then normalhrs END ),0) day22_nrhrs,
IFNULL((case when  DAY(dates)=22 then othrs END ),0) day22_othrs,
IFNULL((case when  DAY(dates)=23 then normalhrs END ),0) day23_nrhrs,
IFNULL((case when  DAY(dates)=23 then othrs END ),0) day23_othrs,
IFNULL((case when  DAY(dates)=24 then normalhrs END ),0) day24_nrhrs,
IFNULL((case when  DAY(dates)=24 then othrs END ),0) day24_othrs,
IFNULL((case when  DAY(dates)=25 then normalhrs END ),0) day25_nrhrs,
IFNULL((case when  DAY(dates)=25 then othrs END ),0) day25_othrs,
IFNULL((case when  DAY(dates)=26 then normalhrs END ),0) day26_nrhrs,
IFNULL((case when  DAY(dates)=26 then othrs END ),0) day26_othrs,
IFNULL((case when  DAY(dates)=27 then normalhrs END ),0) day27_nrhrs,
IFNULL((case when  DAY(dates)=27 then othrs END ),0) day27_othrs,
IFNULL((case when  DAY(dates)=28 then normalhrs END ),0) day28_nrhrs,
IFNULL((case when  DAY(dates)=28 then othrs END ),0) day28_othrs,
IFNULL((case when  DAY(dates)=29 then normalhrs END ),0) day29_nrhrs,
IFNULL((case when  DAY(dates)=29 then othrs END ),0) day29_othrs,
IFNULL((case when  DAY(dates)=30 then normalhrs END ),0) day30_nrhrs,
IFNULL((case when  DAY(dates)=30 then othrs END ),0) day30_othrs,
IFNULL((case when  DAY(dates)=31 then normalhrs END ),0) day31_nrhrs,
IFNULL((case when  DAY(dates)=31 then othrs END ),0) day31_othrs
FROM dailytimesheetdetails ;

-- Dumping structure for view letosyshr.vw_dts_detail_temp
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `vw_dts_detail_temp`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `vw_dts_detail_temp` AS SELECT empmaster_uid,
IFNULL((case when  DAY(dates)=1 then normalhrs END ),0) day1_nrhrs,
IFNULL((case when  DAY(dates)=1 then othrs END ),0) day1_othrs,
IFNULL((case when  DAY(dates)=2 then normalhrs END ),0) day2_nrhrs,
IFNULL((case when  DAY(dates)=2 then othrs END ),0) day2_othrs ,
IFNULL((case when  DAY(dates)=3 then normalhrs END ),0) day3_nrhrs,
IFNULL((case when  DAY(dates)=3 then othrs END ),0) day3_othrs,
IFNULL((case when  DAY(dates)=4 then normalhrs END ),0) day4_nrhrs,
IFNULL((case when  DAY(dates)=4 then othrs END ),0) day4_othrs,
IFNULL((case when  DAY(dates)=5 then normalhrs END ),0) day5_nrhrs,
IFNULL((case when  DAY(dates)=5 then othrs END ),0) day5_othrs,
IFNULL((case when  DAY(dates)=6 then normalhrs END ),0) day6_nrhrs,
IFNULL((case when  DAY(dates)=6 then othrs END ),0) day6_othrs,
IFNULL((case when  DAY(dates)=7 then normalhrs END ),0) day7_nrhrs,
IFNULL((case when  DAY(dates)=7 then othrs END ),0) day7_othrs,
IFNULL((case when  DAY(dates)=8 then normalhrs END ),0) day8_nrhrs,
IFNULL((case when  DAY(dates)=8 then othrs END ),0) day8_othrs,
IFNULL((case when  DAY(dates)=9 then normalhrs END ),0) day9_nrhrs,
IFNULL((case when  DAY(dates)=9 then othrs END ),0) day9_othrs,
IFNULL((case when  DAY(dates)=10 then normalhrs END ),0) day10_nrhrs, 
IFNULL((case when  DAY(dates)=10 then othrs END ),0) day10_othrs,
IFNULL((case when  DAY(dates)=11 then normalhrs END ),0) day11_nrhrs,
IFNULL((case when  DAY(dates)=11 then othrs END ),0) day11_othrs,
IFNULL((case when  DAY(dates)=12 then normalhrs END ),0) day12_nrhrs,
IFNULL((case when  DAY(dates)=12 then othrs END ),0) day12_othrs,
IFNULL((case when  DAY(dates)=13 then normalhrs END ),0) day13_nrhrs,
IFNULL((case when  DAY(dates)=13 then othrs END ),0) day13_othrs,
IFNULL((case when  DAY(dates)=14 then normalhrs END ),0) day14_nrhrs,
IFNULL((case when  DAY(dates)=14 then othrs END ),0) day14_othrs,
IFNULL((case when  DAY(dates)=15 then normalhrs END ),0) day15_nrhrs,
IFNULL((case when  DAY(dates)=15 then othrs END ),0) day15_othrs,
IFNULL((case when  DAY(dates)=16 then normalhrs END ),0) day16_nrhrs,
IFNULL((case when  DAY(dates)=16 then othrs END ),0) day16_othrs,
IFNULL((case when  DAY(dates)=17 then normalhrs END ),0) day17_nrhrs,
IFNULL((case when  DAY(dates)=17 then othrs END ),0) day17_othrs,
IFNULL((case when  DAY(dates)=18 then normalhrs END ),0) day18_nrhrs,
IFNULL((case when  DAY(dates)=18 then othrs END ),0) day18_othrs,
IFNULL((case when  DAY(dates)=19 then normalhrs END ),0) day19_nrhrs,
IFNULL((case when  DAY(dates)=19 then othrs END ),0) day19_othrs,
IFNULL((case when  DAY(dates)=20 then normalhrs END ),0) day20_nrhrs,
IFNULL((case when  DAY(dates)=20 then othrs END ),0) day20_othrs,
IFNULL((case when  DAY(dates)=21 then normalhrs END ),0) day21_nrhrs,
IFNULL((case when  DAY(dates)=21 then othrs END ),0) day21_othrs,
IFNULL((case when  DAY(dates)=22 then normalhrs END ),0) day22_nrhrs,
IFNULL((case when  DAY(dates)=22 then othrs END ),0) day22_othrs,
IFNULL((case when  DAY(dates)=23 then normalhrs END ),0) day23_nrhrs,
IFNULL((case when  DAY(dates)=23 then othrs END ),0) day23_othrs,
IFNULL((case when  DAY(dates)=24 then normalhrs END ),0) day24_nrhrs,
IFNULL((case when  DAY(dates)=24 then othrs END ),0) day24_othrs,
IFNULL((case when  DAY(dates)=25 then normalhrs END ),0) day25_nrhrs,
IFNULL((case when  DAY(dates)=25 then othrs END ),0) day25_othrs,
IFNULL((case when  DAY(dates)=26 then normalhrs END ),0) day26_nrhrs,
IFNULL((case when  DAY(dates)=26 then othrs END ),0) day26_othrs,
IFNULL((case when  DAY(dates)=27 then normalhrs END ),0) day27_nrhrs,
IFNULL((case when  DAY(dates)=27 then othrs END ),0) day27_othrs,
IFNULL((case when  DAY(dates)=28 then normalhrs END ),0) day28_nrhrs,
IFNULL((case when  DAY(dates)=28 then othrs END ),0) day28_othrs,
IFNULL((case when  DAY(dates)=29 then normalhrs END ),0) day29_nrhrs,
IFNULL((case when  DAY(dates)=29 then othrs END ),0) day29_othrs,
IFNULL((case when  DAY(dates)=30 then normalhrs END ),0) day30_nrhrs,
IFNULL((case when  DAY(dates)=30 then othrs END ),0) day30_othrs,
IFNULL((case when  DAY(dates)=31 then normalhrs END ),0) day31_nrhrs,
IFNULL((case when  DAY(dates)=31 then othrs END ),0) day31_othrs
FROM dts_temp ;

-- Dumping structure for view letosyshr.vw_dts_summary
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `vw_dts_summary`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `vw_dts_summary` AS SELECT a.company_uid, a.tyear,a.tmonth,a.empmaster_uid,get_empname(a.empmaster_uid) empname,sum(a.day1_nrhrs) DAY1_nrhrs,sum(a.day2_nrhrs) DAY2_nrhrs,
sum(a.day3_nrhrs) DAY3_nrhrs, sum(a.day4_nrhrs) DAY4_nrhrs,
sum(a.day5_nrhrs) DAY5_nrhrs,
sum(a.day6_nrhrs) DAY6_nrhrs, sum(a.day7_nrhrs) DAY7_nrhrs, sum(a.day8_nrhrs) DAY8_nrhrs,
sum(a.day9_nrhrs) DAY9_nrhrs, sum(a.day10_nrhrs) DAY10_nrhrs,
sum(a.day11_nrhrs) DAY11_nrhrs, sum(a.day12_nrhrs) DAY12_nrhrs,sum(a.day13_nrhrs) DAY13_nrhrs,
sum(a.day14_nrhrs) DAY14_nrhrs, sum(a.day15_nrhrs) DAY15_nrhrs,
sum(a.day16_nrhrs) DAY16_nrhrs, sum(a.day17_nrhrs) DAY17_nrhrs,
sum(a.day18_nrhrs) DAY18_nrhrs, sum(a.day19_nrhrs) DAY19_nrhrs,
sum(a.day20_nrhrs) DAY20_nrhrs, sum(a.day21_nrhrs) DAY21_nrhrs,
sum(a.day22_nrhrs) DAY22_nrhrs, sum(a.day23_nrhrs) DAY23_nrhrs,
sum(a.day24_nrhrs) DAY24_nrhrs, sum(a.day25_nrhrs) DAY25_nrhrs,
sum(a.day26_nrhrs) DAY26_nrhrs,sum(a.day27_nrhrs) DAY27_nrhrs,
sum(a.day28_nrhrs) DAY28_nrhrs,sum(a.day29_nrhrs) DAY29_nrhrs,
sum(a.day30_nrhrs) DAY30_nrhrs,sum(a.day31_nrhrs) DAY31_nrhrs ,
sum(a.day1_nrhrs)+sum(a.day2_nrhrs)+sum(a.day3_nrhrs) + sum(a.day4_nrhrs)+
sum(a.day5_nrhrs) +sum(a.day6_nrhrs) + sum(a.day7_nrhrs) +sum(a.day8_nrhrs) +
sum(a.day9_nrhrs) + sum(a.day10_nrhrs) +sum(a.day11_nrhrs) + 
sum(a.day12_nrhrs) + sum(a.day12_nrhrs) +sum(a.day14_nrhrs) + 
sum(a.day15_nrhrs)+sum(a.day16_nrhrs) + sum(a.day17_nrhrs) +
sum(a.day18_nrhrs) + sum(a.day19_nrhrs)+sum(a.day20_nrhrs) + sum(a.day21_nrhrs) +
sum(a.day22_nrhrs) + sum(a.day23_nrhrs) +sum(a.day24_nrhrs) + sum(a.day25_nrhrs) +
sum(a.day26_nrhrs)+ sum(a.day27_nrhrs) +sum(a.day28_nrhrs) +sum(a.day29_nrhrs) +
sum(a.day30_nrhrs) +sum(a.day31_nrhrs) totalhrs ,

sum(a.day1_othrs)+sum(a.day2_othrs)+sum(a.day3_othrs) + sum(a.day4_othrs)+
sum(a.day5_othrs) +sum(a.day6_othrs) + sum(a.day7_othrs) +sum(a.day8_othrs) +
sum(a.day9_othrs) + sum(a.day10_othrs) +sum(a.day11_othrs) + 
sum(a.day12_othrs) + sum(a.day12_othrs) +sum(a.day14_othrs) + 
sum(a.day15_othrs)+sum(a.day16_othrs) + sum(a.day17_othrs) +
sum(a.day18_othrs) + sum(a.day19_othrs)+sum(a.day20_othrs) + sum(a.day21_othrs) +
sum(a.day22_othrs) + sum(a.day23_othrs) +sum(a.day24_othrs) + sum(a.day25_othrs) +
sum(a.day26_othrs)+ sum(a.day27_othrs) +sum(a.day28_othrs) +sum(a.day29_othrs) +
sum(a.day30_othrs) +sum(a.day31_othrs) totalothrs
 FROM vw_dts_detail a GROUP BY a.company_uid, a.tyear,a.tmonth,a.empmaster_uid ;

-- Dumping structure for view letosyshr.vw_dts_summary_temp
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `vw_dts_summary_temp`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `vw_dts_summary_temp` AS SELECT a.empmaster_uid,get_empname(a.empmaster_uid) empname,sum(a.day1_nrhrs) DAY1_nrhrs,sum(a.day2_nrhrs) DAY2_nrhrs,
sum(a.day3_nrhrs) DAY3_nrhrs, sum(a.day4_nrhrs) DAY4_nrhrs,
sum(a.day5_nrhrs) DAY5_nrhrs,
sum(a.day6_nrhrs) DAY6_nrhrs, sum(a.day7_nrhrs) DAY7_nrhrs, sum(a.day8_nrhrs) DAY8_nrhrs,
sum(a.day9_nrhrs) DAY9_nrhrs, sum(a.day10_nrhrs) DAY10_nrhrs,
sum(a.day11_nrhrs) DAY11_nrhrs, sum(a.day12_nrhrs) DAY12_nrhrs,sum(a.day13_nrhrs) DAY13_nrhrs,
sum(a.day14_nrhrs) DAY14_nrhrs, sum(a.day15_nrhrs) DAY15_nrhrs,
sum(a.day16_nrhrs) DAY16_nrhrs, sum(a.day17_nrhrs) DAY17_nrhrs,
sum(a.day18_nrhrs) DAY18_nrhrs, sum(a.day19_nrhrs) DAY19_nrhrs,
sum(a.day20_nrhrs) DAY20_nrhrs, sum(a.day21_nrhrs) DAY21_nrhrs,
sum(a.day22_nrhrs) DAY22_nrhrs, sum(a.day23_nrhrs) DAY23_nrhrs,
sum(a.day24_nrhrs) DAY24_nrhrs, sum(a.day25_nrhrs) DAY25_nrhrs,
sum(a.day26_nrhrs) DAY26_nrhrs,sum(a.day27_nrhrs) DAY27_nrhrs,
sum(a.day28_nrhrs) DAY28_nrhrs,sum(a.day29_nrhrs) DAY29_nrhrs,
sum(a.day30_nrhrs) DAY30_nrhrs,sum(a.day31_nrhrs) DAY31_nrhrs ,
sum(a.day1_nrhrs)+sum(a.day2_nrhrs)+sum(a.day3_nrhrs) + sum(a.day4_nrhrs)+
sum(a.day5_nrhrs) +sum(a.day6_nrhrs) + sum(a.day7_nrhrs) +sum(a.day8_nrhrs) +
sum(a.day9_nrhrs) + sum(a.day10_nrhrs) +sum(a.day11_nrhrs) + 
sum(a.day12_nrhrs) + sum(a.day12_nrhrs) +sum(a.day14_nrhrs) + 
sum(a.day15_nrhrs)+sum(a.day16_nrhrs) + sum(a.day17_nrhrs) +
sum(a.day18_nrhrs) + sum(a.day19_nrhrs)+sum(a.day20_nrhrs) + sum(a.day21_nrhrs) +
sum(a.day22_nrhrs) + sum(a.day23_nrhrs) +sum(a.day24_nrhrs) + sum(a.day25_nrhrs) +
sum(a.day26_nrhrs)+ sum(a.day27_nrhrs) +sum(a.day28_nrhrs) +sum(a.day29_nrhrs) +
sum(a.day30_nrhrs) +sum(a.day31_nrhrs) totalhrs ,

sum(a.day1_othrs)+sum(a.day2_othrs)+sum(a.day3_othrs) + sum(a.day4_othrs)+
sum(a.day5_othrs) +sum(a.day6_othrs) + sum(a.day7_othrs) +sum(a.day8_othrs) +
sum(a.day9_othrs) + sum(a.day10_othrs) +sum(a.day11_othrs) + 
sum(a.day12_othrs) + sum(a.day12_othrs) +sum(a.day14_othrs) + 
sum(a.day15_othrs)+sum(a.day16_othrs) + sum(a.day17_othrs) +
sum(a.day18_othrs) + sum(a.day19_othrs)+sum(a.day20_othrs) + sum(a.day21_othrs) +
sum(a.day22_othrs) + sum(a.day23_othrs) +sum(a.day24_othrs) + sum(a.day25_othrs) +
sum(a.day26_othrs)+ sum(a.day27_othrs) +sum(a.day28_othrs) +sum(a.day29_othrs) +
sum(a.day30_othrs) +sum(a.day31_othrs) totalothrs
 FROM vw_dts_detail_temp a GROUP BY a.empmaster_uid ;

-- Dumping structure for view letosyshr.vw_empleave
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `vw_empleave`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `vw_empleave` AS SELECT e.company_uid, e.uid empmaster_uid, empcode, e.firstname , lt.code leavecode,
lt.uid leavetype_uid ,  lr.leave_from ,lr.leave_upto,lt.Allocate_hours Al_hrs  FROM empmaster e
INNER JOIN leaverequest lr ON e.uid=lr.empmaster_uid 
INNER JOIN leavetype lt ON  lr.leavetype_uid =lt.uid ;

-- Dumping structure for view letosyshr.vw_loanpaidamount
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `vw_loanpaidamount`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `vw_loanpaidamount` AS SELECT  loansettings_uid,empmaster_uid, SUM(amount) Total_Paidamount FROM loandetail
GROUP BY loansettings_uid,empmaster_uid ;

-- Dumping structure for view letosyshr.vw_loan_tobe_paid
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `vw_loan_tobe_paid`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `vw_loan_tobe_paid` AS SELECT ls.uid, ls.company_uid,ls.empmaster_uid,ls.loantype_uid, ls.amount loanamount, d.total_paidamount,
 ls.monthly_deduction, ls.Amount -d.total_paidamount still_tobe_paid,
 case when (ls.Amount -d.total_paidamount) > ls.Monthly_Deduction then ls.Monthly_Deduction ELSE 
  (ls.Amount -d.total_paidamount)  END thismonth_due
    from loansettings ls
INNER JOIN 
 vw_loanpaidamount d ON 
ls.uid = d.loansettings_uid AND ls.Empmaster_uid =d.empmaster_uid
INNER JOIN loantype m ON m.company_uid=ls.company_uid AND   m.uid=ls.loantype_uid 
WHERE ls.Activestatus='Y' ;

-- Dumping structure for view letosyshr.vw_monthlyaddition
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `vw_monthlyaddition`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `vw_monthlyaddition` AS SELECT  h.Company_UID ,h.Tyear ,h.Tmonth , d.Empmaster_UID ,
d.AddDeduct_type_uid, d.amount   FROM adddeductheader h 
INNER JOIN adddeductdetail d ON h.UID =d.AdddeductHeader_UID
INNER JOIN adddeductmaster m ON m.company_uid=h.company_uid AND   m.uid=d.AddDeduct_type_uid 
WHERE m.action=1 ;

-- Dumping structure for view letosyshr.vw_monthlydeduction
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `vw_monthlydeduction`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `vw_monthlydeduction` AS SELECT  h.Company_UID ,h.Tyear ,h.Tmonth , d.Empmaster_UID ,
d.AddDeduct_type_uid, d.amount   FROM adddeductheader h 
INNER JOIN adddeductdetail d ON h.UID =d.AdddeductHeader_UID
INNER JOIN adddeductmaster m ON m.company_uid=h.company_uid AND   m.uid=d.AddDeduct_type_uid 
WHERE m.action=-1 ;

-- Dumping structure for view letosyshr.vw_monthly_loan_deducted
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `vw_monthly_loan_deducted`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `vw_monthly_loan_deducted` AS SELECT h.Company_uid ,h.Tyear ,h.Tmonth ,  d.empmaster_uid, d.Amount  FROM loanheader h 
INNER JOIN loanDetail d ON h.UID =d.loanheader_uid
INNER JOIN loantype m ON m.company_uid=h.company_uid AND   m.uid=d.loantype_uid ;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
