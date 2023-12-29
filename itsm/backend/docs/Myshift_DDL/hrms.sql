-- MariaDB dump 10.19  Distrib 10.4.25-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: hrms
-- ------------------------------------------------------
-- Server version	10.4.25-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `hrms`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `hrms` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `hrms`;

--
-- Table structure for table `360questionnaire`
--

DROP TABLE IF EXISTS `360questionnaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `360questionnaire` (
  `quesid` int(11) NOT NULL AUTO_INCREMENT,
  `question` text NOT NULL,
  `typeid` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`quesid`)
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `360questionnarie1`
--

DROP TABLE IF EXISTS `360questionnarie1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `360questionnarie1` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empname` varchar(50) NOT NULL,
  `empcode` varchar(50) NOT NULL,
  `mobilenumber` varchar(50) NOT NULL,
  `department` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `salaryrelated` text NOT NULL,
  `worklifebalance` text NOT NULL,
  `reportingmanager` text NOT NULL,
  `hrrelated` text NOT NULL,
  `companyculture` text NOT NULL,
  `rolerelated` text NOT NULL,
  `facilitiesrelated` text NOT NULL,
  `others` text NOT NULL,
  `threelikes` text NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `360questiontypes`
--

DROP TABLE IF EXISTS `360questiontypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `360questiontypes` (
  `typeid` int(11) NOT NULL AUTO_INCREMENT,
  `type` text NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`typeid`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `360reviewer`
--

DROP TABLE IF EXISTS `360reviewer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `360reviewer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reviewerid` int(11) NOT NULL,
  `empid` int(11) NOT NULL,
  `teamid` int(11) NOT NULL,
  `deptid` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  `review` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `360reviewrating`
--

DROP TABLE IF EXISTS `360reviewrating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `360reviewrating` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `360reviewid` int(11) NOT NULL,
  `rating` varchar(30) NOT NULL,
  `questionid` int(11) NOT NULL,
  `reviewerid` int(11) NOT NULL,
  `empcode` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Sheet1`
--

DROP TABLE IF EXISTS `Sheet1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Sheet1` (
  `A` varchar(44) DEFAULT NULL,
  `B` decimal(10,2) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Sheet2`
--

DROP TABLE IF EXISTS `Sheet2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Sheet2` (
  `A` int(2) DEFAULT NULL,
  `B` varchar(24) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `account_bill_status`
--

DROP TABLE IF EXISTS `account_bill_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_bill_status` (
  `statusid` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `bill_level_slug` varchar(255) COLLATE latin1_general_ci NOT NULL,
  `display_order` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('1','0') COLLATE latin1_general_ci NOT NULL,
  PRIMARY KEY (`statusid`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `account_bill_status_new`
--

DROP TABLE IF EXISTS `account_bill_status_new`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_bill_status_new` (
  `statusid` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('1','0') COLLATE latin1_general_ci NOT NULL,
  PRIMARY KEY (`statusid`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `account_managerdetails`
--

DROP TABLE IF EXISTS `account_managerdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_managerdetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company` int(11) DEFAULT NULL,
  `managerid` int(11) DEFAULT NULL,
  `createdon` varchar(100) DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `record_status` enum('1','0') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `account_project_types`
--

DROP TABLE IF EXISTS `account_project_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_project_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_title` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` enum('1','0') COLLATE latin1_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `account_tasks`
--

DROP TABLE IF EXISTS `account_tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task` text NOT NULL,
  `empcode` varchar(256) NOT NULL,
  `task_status` enum('0','1') NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `reminder_count` int(11) NOT NULL,
  `task_id` varchar(256) NOT NULL,
  `bcc_email` varchar(256) NOT NULL,
  `start_date` varchar(256) NOT NULL,
  `end_date` varchar(256) NOT NULL,
  `task_subject` varchar(256) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `accountmanagers`
--

DROP TABLE IF EXISTS `accountmanagers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accountmanagers` (
  `mngrid` int(11) NOT NULL AUTO_INCREMENT,
  `empcode` int(11) DEFAULT NULL,
  `catid` int(11) DEFAULT NULL,
  `companyid` int(11) NOT NULL,
  `createdon` int(11) DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  PRIMARY KEY (`mngrid`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `accounts_idm`
--

DROP TABLE IF EXISTS `accounts_idm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts_idm` (
  `idm_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(100) NOT NULL,
  `batchno` varchar(11) COLLATE latin1_general_ci NOT NULL,
  `fileno` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `batch_value` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `createdby` int(100) NOT NULL,
  `createdon` int(100) NOT NULL,
  `record_status` enum('1','0') COLLATE latin1_general_ci NOT NULL,
  `idm_no` varchar(256) COLLATE latin1_general_ci NOT NULL,
  PRIMARY KEY (`idm_id`)
) ENGINE=InnoDB AUTO_INCREMENT=194 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `accounts_manager`
--

DROP TABLE IF EXISTS `accounts_manager`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts_manager` (
  `acc_id` int(100) NOT NULL AUTO_INCREMENT,
  `company_id` int(100) NOT NULL,
  `account_manager` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `createdby` int(100) NOT NULL,
  `createdon` int(100) NOT NULL,
  `record_status` enum('0','1') COLLATE latin1_general_ci NOT NULL,
  PRIMARY KEY (`acc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=175 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `accounts_po`
--

DROP TABLE IF EXISTS `accounts_po`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts_po` (
  `po_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(100) NOT NULL,
  `po_no` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `po_date` int(100) NOT NULL,
  `customer` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `po_expiry_date` int(100) NOT NULL,
  `account_manager` int(100) NOT NULL,
  `po_value` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('1','0') COLLATE latin1_general_ci NOT NULL,
  `accpo_no` varchar(256) COLLATE latin1_general_ci NOT NULL,
  PRIMARY KEY (`po_id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `accounts_storage_status`
--

DROP TABLE IF EXISTS `accounts_storage_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts_storage_status` (
  `statusid` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('1','0') COLLATE latin1_general_ci NOT NULL,
  PRIMARY KEY (`statusid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `accounts_subproject`
--

DROP TABLE IF EXISTS `accounts_subproject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts_subproject` (
  `subid` int(11) NOT NULL AUTO_INCREMENT,
  `projectid` int(11) NOT NULL,
  `project_type` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` enum('1','0') COLLATE latin1_general_ci NOT NULL,
  PRIMARY KEY (`subid`)
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `accunt_bill_types`
--

DROP TABLE IF EXISTS `accunt_bill_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accunt_bill_types` (
  `bill_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `bill_title` varchar(255) NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  PRIMARY KEY (`bill_type_id`),
  KEY `bill_type` (`bill_title`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `advance`
--

DROP TABLE IF EXISTS `advance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `advance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `record_status` enum('0','1') NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=141 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `advance_log`
--

DROP TABLE IF EXISTS `advance_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `advance_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `amount` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` int(11) NOT NULL,
  `advanceid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=368 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `advance_old`
--

DROP TABLE IF EXISTS `advance_old`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `advance_old` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) DEFAULT NULL,
  `amount` int(17) DEFAULT NULL,
  `email` varchar(29) DEFAULT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `advances`
--

DROP TABLE IF EXISTS `advances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `advances` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `mobilenumber` varchar(20) NOT NULL,
  `amount` float NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=49 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `anlday_atndees`
--

DROP TABLE IF EXISTS `anlday_atndees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `anlday_atndees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empcode` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=268 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `anlday_atndees_relations`
--

DROP TABLE IF EXISTS `anlday_atndees_relations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `anlday_atndees_relations` (
  `relid` int(11) NOT NULL AUTO_INCREMENT,
  `empcode` int(11) DEFAULT NULL,
  `relationname` varchar(255) DEFAULT NULL,
  `relationtype` varchar(255) DEFAULT NULL,
  `age` int(11) NOT NULL,
  PRIMARY KEY (`relid`)
) ENGINE=InnoDB AUTO_INCREMENT=439 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `answers`
--

DROP TABLE IF EXISTS `answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `answers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL,
  `answer` varchar(200) NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `attendance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empcode` int(11) NOT NULL,
  `dateline` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `actualdatetime` date NOT NULL,
  `attenddate` int(11) NOT NULL,
  `timetype` enum('in','out') NOT NULL,
  `recordtype` enum('biometric','manual','cron') NOT NULL,
  `status` enum('approved','pending','rejected') NOT NULL,
  `createddate` int(11) NOT NULL,
  `modifieddate` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=307 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `attendance_old`
--

DROP TABLE IF EXISTS `attendance_old`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `attendance_old` (
  `attend_id` int(11) NOT NULL AUTO_INCREMENT,
  `empid` int(11) DEFAULT NULL,
  `empcode` int(11) DEFAULT NULL,
  `intime` int(11) DEFAULT NULL,
  `outtime` int(11) DEFAULT NULL,
  `atnd_date` int(11) DEFAULT NULL,
  `createddate` int(11) DEFAULT NULL,
  `modifieddate` int(11) NOT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  `atnd_type` enum('manual','biometric') DEFAULT NULL,
  `atnd_status` enum('pending','approved','rejected') DEFAULT NULL,
  `reason` text DEFAULT NULL,
  PRIMARY KEY (`attend_id`)
) ENGINE=InnoDB AUTO_INCREMENT=47073 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `backup_billregistration`
--

DROP TABLE IF EXISTS `backup_billregistration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `backup_billregistration` (
  `regid` int(11) NOT NULL AUTO_INCREMENT,
  `inwardno` varchar(220) NOT NULL,
  `party` varchar(225) NOT NULL,
  `billtype` int(11) DEFAULT NULL,
  `empcode` varchar(250) DEFAULT NULL,
  `receivedon` int(11) DEFAULT NULL,
  `amount` float(50,2) DEFAULT NULL,
  `tds` float(10,2) NOT NULL,
  `netamount` float(50,2) NOT NULL,
  `remarks` text DEFAULT NULL,
  `status` int(11) NOT NULL,
  `account_mngr` int(11) NOT NULL,
  `invoiceno` varchar(250) NOT NULL,
  `chequeno` varchar(224) NOT NULL,
  `resolution` text NOT NULL,
  `createdon` int(11) DEFAULT NULL,
  `lastupdatedon` int(11) NOT NULL,
  `createdby` int(11) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  `company` int(11) NOT NULL,
  `po_no` varchar(256) NOT NULL,
  `cheque_deliverytype` enum('handover','courier','deposit','RTGS/NEFT') NOT NULL,
  `billcategory` int(11) NOT NULL,
  `partyemail` varchar(100) NOT NULL,
  `dclocation` varchar(100) NOT NULL,
  `emp_mobile` varchar(256) NOT NULL,
  `courier_POD` varchar(256) NOT NULL,
  `courier_date` int(11) NOT NULL,
  `deposit_acc_no` varchar(256) NOT NULL,
  `deposit_bank_name` varchar(256) NOT NULL,
  `deposit_date` int(11) NOT NULL,
  `handover_name` varchar(256) NOT NULL,
  `handover_mobile` varchar(256) NOT NULL,
  `handover_date` int(11) NOT NULL,
  `rtgs_ref_no` int(11) NOT NULL,
  `rtgs_date` int(11) NOT NULL,
  `transaction_mode` varchar(256) NOT NULL,
  `transaction_value` int(11) NOT NULL,
  `party_mobile` varchar(256) NOT NULL,
  `type_bill` varchar(256) NOT NULL,
  `desc` text NOT NULL,
  `deductions` int(11) NOT NULL,
  `invest_amount` int(11) NOT NULL,
  `transaction_date` int(11) NOT NULL,
  `payment_released` varchar(256) NOT NULL,
  `currency_type` varchar(256) NOT NULL,
  `dlgroupid` int(11) NOT NULL,
  `auditor_status` int(11) NOT NULL DEFAULT 1,
  `expected_date` int(11) NOT NULL,
  `bill_subcat` int(11) NOT NULL,
  `approval_status` int(11) NOT NULL,
  `invoice_date` int(11) NOT NULL,
  `vendor_in` int(11) NOT NULL,
  `vendor_out` int(11) NOT NULL,
  `vendor_name` varchar(256) NOT NULL,
  `project_in` int(11) NOT NULL,
  `project_out` int(11) NOT NULL,
  `project_name` varchar(256) NOT NULL,
  `qs_in` int(11) NOT NULL,
  `qs_out` int(11) NOT NULL,
  `qs_name` varchar(256) NOT NULL,
  `inward_in` int(11) NOT NULL,
  `inward_out` int(11) NOT NULL,
  `inward_name` varchar(256) NOT NULL,
  `accounts_in` int(11) NOT NULL,
  `accounts_out` int(11) NOT NULL,
  `accounts_name` varchar(256) NOT NULL,
  `batch_no` varchar(256) NOT NULL,
  `email_status` int(11) NOT NULL,
  `project_bills` varchar(256) NOT NULL,
  `bill_classify` int(11) NOT NULL,
  `update_email` varchar(256) NOT NULL,
  `project_id` varchar(256) NOT NULL,
  `re_amount` varchar(256) NOT NULL,
  `internal_ticketid` varchar(256) NOT NULL,
  `period` varchar(256) NOT NULL,
  `urgency` enum('1','2') NOT NULL,
  PRIMARY KEY (`regid`),
  KEY `empcode` (`empcode`)
) ENGINE=InnoDB AUTO_INCREMENT=16331 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bank_attachment`
--

DROP TABLE IF EXISTS `bank_attachment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bank_attachment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bankid` int(11) NOT NULL,
  `attachment` varchar(100) NOT NULL,
  `display` varchar(100) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bankdetails`
--

DROP TABLE IF EXISTS `bankdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bankdetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `expirydate` int(11) NOT NULL,
  `partyname` text NOT NULL,
  `bgno` varchar(255) NOT NULL,
  `bankname` text NOT NULL,
  `bgvalue` varchar(255) NOT NULL,
  `extended` int(11) NOT NULL,
  `bgdate` int(11) NOT NULL,
  `suppliername` text NOT NULL,
  `bgtype` varchar(255) NOT NULL,
  `fromdate` int(11) NOT NULL,
  `todate` int(11) NOT NULL,
  `mobileno` varchar(255) NOT NULL,
  `remarks1` text NOT NULL,
  `landline` varchar(255) NOT NULL,
  `remarks2` text NOT NULL,
  `orderno` varchar(200) NOT NULL,
  `date` int(11) NOT NULL,
  `povalue` varchar(11) NOT NULL,
  `supplieraddress` text NOT NULL,
  `bankaddress` text NOT NULL,
  `email` varchar(255) NOT NULL,
  `podate` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=404 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bgvchecks`
--

DROP TABLE IF EXISTS `bgvchecks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bgvchecks` (
  `checkid` int(11) NOT NULL AUTO_INCREMENT,
  `bgvid` int(11) NOT NULL,
  `empcode` int(11) NOT NULL,
  `checks` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`checkid`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bgvchecks_docs`
--

DROP TABLE IF EXISTS `bgvchecks_docs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bgvchecks_docs` (
  `doc_id` int(11) NOT NULL AUTO_INCREMENT,
  `bgvid` int(11) NOT NULL,
  `empcode` int(11) NOT NULL,
  `filename` varchar(224) NOT NULL,
  `file_title` varchar(224) NOT NULL,
  `uploaded_by` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`doc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bgvcheckslist`
--

DROP TABLE IF EXISTS `bgvcheckslist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bgvcheckslist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `checksname` varchar(224) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  `created_by` int(11) NOT NULL,
  `createddate` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bill_approval_status`
--

DROP TABLE IF EXISTS `bill_approval_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bill_approval_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `approval_status` int(11) NOT NULL,
  `remarks` text COLLATE latin1_general_ci NOT NULL,
  `billid` int(11) NOT NULL,
  `record_status` enum('1','0') COLLATE latin1_general_ci NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL DEFAULT 0,
  `bill_status` int(11) NOT NULL,
  `fileno` varchar(256) COLLATE latin1_general_ci DEFAULT NULL,
  `batchno` varchar(256) COLLATE latin1_general_ci DEFAULT NULL,
  `primaryid` int(11) NOT NULL,
  `approved_status` int(11) NOT NULL,
  `ack_details` longtext COLLATE latin1_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `approval_status` (`approval_status`),
  KEY `billid` (`billid`)
) ENGINE=MyISAM AUTO_INCREMENT=140607 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bill_approval_status_copy_10_08_2022`
--

DROP TABLE IF EXISTS `bill_approval_status_copy_10_08_2022`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bill_approval_status_copy_10_08_2022` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `approval_status` int(11) NOT NULL,
  `remarks` text COLLATE latin1_general_ci NOT NULL,
  `billid` int(11) NOT NULL,
  `record_status` enum('1','0') COLLATE latin1_general_ci NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `bill_status` int(11) NOT NULL,
  `fileno` varchar(256) COLLATE latin1_general_ci DEFAULT NULL,
  `batchno` varchar(256) COLLATE latin1_general_ci DEFAULT NULL,
  `primaryid` int(11) NOT NULL,
  `approved_status` int(11) NOT NULL,
  `ack_details` longtext COLLATE latin1_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `approval_status` (`approval_status`) USING BTREE,
  KEY `billid` (`billid`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=124920 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bill_attatchments`
--

DROP TABLE IF EXISTS `bill_attatchments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bill_attatchments` (
  `attatchment_id` int(11) NOT NULL AUTO_INCREMENT,
  `bill_primary_id` int(11) NOT NULL,
  `attachment` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `display` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `attachment_link` text COLLATE latin1_general_ci NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` enum('1','0') COLLATE latin1_general_ci NOT NULL,
  PRIMARY KEY (`attatchment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bill_attatchments_old`
--

DROP TABLE IF EXISTS `bill_attatchments_old`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bill_attatchments_old` (
  `attatchment_id` int(11) NOT NULL AUTO_INCREMENT,
  `bill_primary_id` int(11) NOT NULL,
  `attachment` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `display` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `attachment_link` text COLLATE latin1_general_ci NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` enum('1','0') COLLATE latin1_general_ci NOT NULL,
  PRIMARY KEY (`attatchment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1250 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bill_category`
--

DROP TABLE IF EXISTS `bill_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bill_category` (
  `catid` int(11) NOT NULL AUTO_INCREMENT,
  `category` text NOT NULL,
  `parentcategoryid` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`catid`)
) ENGINE=MyISAM AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bill_classification`
--

DROP TABLE IF EXISTS `bill_classification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bill_classification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `classify` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('1','0') COLLATE latin1_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bill_level_manager`
--

DROP TABLE IF EXISTS `bill_level_manager`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bill_level_manager` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bill_status_id` int(11) NOT NULL,
  `empcode` int(11) NOT NULL,
  `empid` int(255) DEFAULT NULL,
  `createdon` varchar(100) DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `record_status` enum('1','0') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=123 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bill_level_manager_logs`
--

DROP TABLE IF EXISTS `bill_level_manager_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bill_level_manager_logs` (
  `logs_id` int(11) NOT NULL AUTO_INCREMENT,
  `action_type` int(11) NOT NULL COMMENT '0=> Deleted, 1 => Add, 2 => update',
  `record_id` int(11) NOT NULL,
  `bill_status_id` int(11) NOT NULL,
  `empcode` int(11) NOT NULL,
  `empid` int(255) DEFAULT NULL,
  `createdon` varchar(100) DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `record_status` enum('1','0') NOT NULL,
  PRIMARY KEY (`logs_id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bill_particulars`
--

DROP TABLE IF EXISTS `bill_particulars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bill_particulars` (
  `particularid` int(11) NOT NULL AUTO_INCREMENT,
  `particular` varchar(256) NOT NULL,
  `code` varchar(256) NOT NULL,
  `description` text NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  PRIMARY KEY (`particularid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bill_planning`
--

DROP TABLE IF EXISTS `bill_planning`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bill_planning` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `month` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `particularid` int(11) NOT NULL,
  `budjet` varchar(256) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bill_primary_process`
--

DROP TABLE IF EXISTS `bill_primary_process`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bill_primary_process` (
  `bill_primary_id` int(11) NOT NULL AUTO_INCREMENT,
  `bill_process_id` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `billtype` int(11) NOT NULL,
  `project_bill_type` smallint(6) NOT NULL,
  `project_type` int(11) NOT NULL,
  `project_name` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `party_name` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `po_no` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `inv_no` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `bg_no` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `dc_no` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `mrn_no` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `per_bg_value` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `bg_issue_date` int(11) NOT NULL,
  `po_wo_date` int(11) NOT NULL,
  `certified_amount` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `credit_amount` int(11) NOT NULL DEFAULT 0,
  `net_payamount` int(11) NOT NULL DEFAULT 0,
  `request_amount` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `currency` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `currency_transaction` varchar(11) COLLATE latin1_general_ci DEFAULT NULL,
  `period` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `emp_name` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `location` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `process_sheet` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `project_location` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `po_address` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `po_value` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `inv_value` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `inv_date` int(11) NOT NULL,
  `bg_value` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `dc_date` int(11) NOT NULL,
  `mrn_date` int(11) NOT NULL,
  `po_validity` int(11) NOT NULL,
  `bg_expiry_date` int(11) NOT NULL,
  `process_sheet_date` int(11) NOT NULL,
  `emp_amount` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `license_payment` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `desc` text COLLATE latin1_general_ci NOT NULL,
  `is_billcertification` varchar(255) COLLATE latin1_general_ci NOT NULL DEFAULT 'No',
  `is_invoice` varchar(255) COLLATE latin1_general_ci NOT NULL DEFAULT 'No',
  `is_billconsolidated` varchar(255) COLLATE latin1_general_ci NOT NULL DEFAULT 'No',
  `is_jointsheet` varchar(255) COLLATE latin1_general_ci NOT NULL DEFAULT 'No',
  `is_deliverychallan` varchar(255) COLLATE latin1_general_ci NOT NULL DEFAULT 'No',
  `is_mrn` varchar(255) COLLATE latin1_general_ci NOT NULL DEFAULT 'No',
  `is_completioncert` varchar(255) COLLATE latin1_general_ci NOT NULL DEFAULT 'No',
  `is_duecertificate` varchar(255) COLLATE latin1_general_ci DEFAULT 'No',
  `is_singed_copy` varchar(255) COLLATE latin1_general_ci NOT NULL DEFAULT 'No',
  `is_budget_approve` varchar(255) COLLATE latin1_general_ci NOT NULL DEFAULT 'No',
  `is_contractsinged_copy` varchar(255) COLLATE latin1_general_ci NOT NULL DEFAULT 'No',
  `is_creditnote` varchar(255) COLLATE latin1_general_ci NOT NULL DEFAULT 'No',
  `is_transport` varchar(255) COLLATE latin1_general_ci NOT NULL DEFAULT 'No',
  `is_daily_dary` varchar(255) COLLATE latin1_general_ci NOT NULL DEFAULT 'No',
  `bill_pe` varchar(255) COLLATE latin1_general_ci NOT NULL,
  `bill_pm` varchar(255) COLLATE latin1_general_ci NOT NULL,
  `bill_ph` varchar(255) COLLATE latin1_general_ci NOT NULL,
  `bill_hod_buhead` varchar(255) COLLATE latin1_general_ci NOT NULL,
  `bill_qs` varchar(255) COLLATE latin1_general_ci NOT NULL,
  `bill_qshod` varchar(255) COLLATE latin1_general_ci NOT NULL,
  `createdon` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` enum('1','0') COLLATE latin1_general_ci NOT NULL,
  `approval_status` int(11) NOT NULL,
  PRIMARY KEY (`bill_primary_id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bill_primary_process_old`
--

DROP TABLE IF EXISTS `bill_primary_process_old`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bill_primary_process_old` (
  `bill_primary_id` int(11) NOT NULL AUTO_INCREMENT,
  `bill_process_id` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `billtype` int(11) NOT NULL,
  `project_bill_type` smallint(6) NOT NULL,
  `project_type` int(11) NOT NULL,
  `project_name` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `party_name` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `po_no` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `inv_no` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `bg_no` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `dc_no` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `mrn_no` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `per_bg_value` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `bg_issue_date` int(11) NOT NULL,
  `po_wo_date` int(11) NOT NULL,
  `certified_amount` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `credit_amount` int(11) NOT NULL DEFAULT 0,
  `net_payamount` int(11) NOT NULL DEFAULT 0,
  `request_amount` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `currency` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `currency_transaction` varchar(11) COLLATE latin1_general_ci DEFAULT NULL,
  `period` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `emp_name` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `location` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `process_sheet` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `project_location` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `po_address` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `po_value` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `inv_value` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `inv_date` int(11) NOT NULL,
  `bg_value` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `dc_date` int(11) NOT NULL,
  `mrn_date` int(11) NOT NULL,
  `po_validity` int(11) NOT NULL,
  `bg_expiry_date` int(11) NOT NULL,
  `process_sheet_date` int(11) NOT NULL,
  `emp_amount` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `license_payment` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `desc` text COLLATE latin1_general_ci NOT NULL,
  `is_billcertification` varchar(255) COLLATE latin1_general_ci NOT NULL DEFAULT 'No',
  `is_invoice` varchar(255) COLLATE latin1_general_ci NOT NULL DEFAULT 'No',
  `is_billconsolidated` varchar(255) COLLATE latin1_general_ci NOT NULL DEFAULT 'No',
  `is_jointsheet` varchar(255) COLLATE latin1_general_ci NOT NULL DEFAULT 'No',
  `is_deliverychallan` varchar(255) COLLATE latin1_general_ci NOT NULL DEFAULT 'No',
  `is_mrn` varchar(255) COLLATE latin1_general_ci NOT NULL DEFAULT 'No',
  `is_completioncert` varchar(255) COLLATE latin1_general_ci NOT NULL DEFAULT 'No',
  `is_duecertificate` varchar(255) COLLATE latin1_general_ci DEFAULT 'No',
  `is_singed_copy` varchar(255) COLLATE latin1_general_ci NOT NULL DEFAULT 'No',
  `is_budget_approve` varchar(255) COLLATE latin1_general_ci NOT NULL DEFAULT 'No',
  `is_contractsinged_copy` varchar(255) COLLATE latin1_general_ci NOT NULL DEFAULT 'No',
  `is_creditnote` varchar(255) COLLATE latin1_general_ci NOT NULL DEFAULT 'No',
  `is_transport` varchar(255) COLLATE latin1_general_ci NOT NULL DEFAULT 'No',
  `is_daily_dary` varchar(255) COLLATE latin1_general_ci NOT NULL DEFAULT 'No',
  `bill_pe` varchar(255) COLLATE latin1_general_ci NOT NULL,
  `bill_pm` varchar(255) COLLATE latin1_general_ci NOT NULL,
  `bill_ph` varchar(255) COLLATE latin1_general_ci NOT NULL,
  `bill_hod_buhead` varchar(255) COLLATE latin1_general_ci NOT NULL,
  `bill_qs` varchar(255) COLLATE latin1_general_ci NOT NULL,
  `bill_qshod` varchar(255) COLLATE latin1_general_ci NOT NULL,
  `createdon` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` enum('1','0') COLLATE latin1_general_ci NOT NULL,
  `approval_status` int(11) NOT NULL,
  PRIMARY KEY (`bill_primary_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1523 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bill_procedure`
--

DROP TABLE IF EXISTS `bill_procedure`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bill_procedure` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `expenditure` varchar(256) NOT NULL,
  `particularid` int(11) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `month` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `remaining` varchar(256) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bill_reg_dup`
--

DROP TABLE IF EXISTS `bill_reg_dup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bill_reg_dup` (
  `regid` int(11) NOT NULL AUTO_INCREMENT,
  `inwardno` varchar(220) NOT NULL,
  `party` varchar(225) NOT NULL,
  `billtype` int(11) DEFAULT NULL,
  `empcode` varchar(250) DEFAULT NULL,
  `receivedon` int(11) DEFAULT NULL,
  `amount` float(50,2) DEFAULT NULL,
  `tds` float(10,2) NOT NULL,
  `netamount` float(50,2) NOT NULL,
  `remarks` text DEFAULT NULL,
  `status` int(11) NOT NULL,
  `account_mngr` int(11) NOT NULL,
  `invoiceno` varchar(250) NOT NULL,
  `chequeno` varchar(224) NOT NULL,
  `resolution` text NOT NULL,
  `createdon` int(11) DEFAULT NULL,
  `lastupdatedon` int(11) NOT NULL,
  `createdby` int(11) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  `company` int(11) NOT NULL,
  `po_no` varchar(256) NOT NULL,
  `cheque_deliverytype` enum('handover','courier','deposit','RTGS/NEFT') NOT NULL,
  `billcategory` int(11) NOT NULL,
  `partyemail` varchar(100) NOT NULL,
  `dclocation` varchar(100) NOT NULL,
  `emp_mobile` varchar(256) NOT NULL,
  `courier_POD` varchar(256) NOT NULL,
  `courier_date` int(11) NOT NULL,
  `deposit_acc_no` varchar(256) NOT NULL,
  `deposit_bank_name` varchar(256) NOT NULL,
  `deposit_date` int(11) NOT NULL,
  `handover_name` varchar(256) NOT NULL,
  `handover_mobile` varchar(256) NOT NULL,
  `handover_date` int(11) NOT NULL,
  `rtgs_ref_no` int(11) NOT NULL,
  `rtgs_date` int(11) NOT NULL,
  `transaction_mode` varchar(256) NOT NULL,
  `transaction_value` int(11) NOT NULL,
  `party_mobile` varchar(256) NOT NULL,
  `type_bill` varchar(256) NOT NULL,
  `desc` text NOT NULL,
  `deductions` int(11) NOT NULL,
  `invest_amount` int(11) NOT NULL,
  `transaction_date` int(11) NOT NULL,
  `payment_released` varchar(256) NOT NULL,
  `currency_type` varchar(256) NOT NULL,
  `dlgroupid` int(11) NOT NULL,
  `auditor_status` int(11) NOT NULL DEFAULT 1,
  `expected_date` int(11) NOT NULL,
  `bill_subcat` int(11) NOT NULL,
  `approval_status` int(11) NOT NULL,
  `invoice_date` int(11) NOT NULL,
  `vendor_in` int(11) NOT NULL,
  `vendor_out` int(11) NOT NULL,
  `vendor_name` varchar(256) NOT NULL,
  `project_in` int(11) NOT NULL,
  `project_out` int(11) NOT NULL,
  `project_name` varchar(256) NOT NULL,
  `qs_in` int(11) NOT NULL,
  `qs_out` int(11) NOT NULL,
  `qs_name` varchar(256) NOT NULL,
  `inward_in` int(11) NOT NULL,
  `inward_out` int(11) NOT NULL,
  `inward_name` varchar(256) NOT NULL,
  `accounts_in` int(11) NOT NULL,
  `accounts_out` int(11) NOT NULL,
  `accounts_name` varchar(256) NOT NULL,
  `batch_no` varchar(256) NOT NULL,
  `email_status` int(11) NOT NULL,
  `project_bills` varchar(256) NOT NULL,
  `bill_classify` int(11) NOT NULL,
  `update_email` varchar(256) NOT NULL,
  `project_id` varchar(256) NOT NULL,
  `re_amount` varchar(256) NOT NULL,
  `internal_ticketid` varchar(256) NOT NULL,
  `period` varchar(256) NOT NULL,
  `urgency` enum('1','2') NOT NULL,
  PRIMARY KEY (`regid`),
  UNIQUE KEY `inwardno` (`inwardno`,`regid`),
  KEY `empcode` (`empcode`)
) ENGINE=InnoDB AUTO_INCREMENT=16530 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bill_reg_emails`
--

DROP TABLE IF EXISTS `bill_reg_emails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bill_reg_emails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `inwardno` varchar(256) NOT NULL,
  `email_to` varchar(256) NOT NULL,
  `email_bcc` text NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12978 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bill_registrations`
--

DROP TABLE IF EXISTS `bill_registrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bill_registrations` (
  `regid` int(11) NOT NULL AUTO_INCREMENT,
  `inwardno` varchar(220) NOT NULL,
  `party` varchar(225) NOT NULL,
  `billtype` int(11) DEFAULT NULL,
  `type_category` int(11) DEFAULT NULL,
  `empcode` varchar(250) DEFAULT NULL,
  `receivedon` int(11) DEFAULT NULL,
  `amount` float(50,2) DEFAULT NULL,
  `tds` float(10,2) NOT NULL,
  `netamount` float(50,2) NOT NULL,
  `remarks` text DEFAULT NULL,
  `status` int(11) NOT NULL,
  `account_mngr` int(11) NOT NULL,
  `invoiceno` varchar(250) NOT NULL,
  `chequeno` varchar(224) NOT NULL,
  `resolution` text NOT NULL,
  `createdon` int(11) DEFAULT NULL,
  `lastupdatedon` int(11) NOT NULL,
  `createdby` int(11) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  `company` int(11) NOT NULL,
  `po_no` varchar(256) NOT NULL,
  `cheque_deliverytype` enum('handover','courier','deposit','RTGS/NEFT') NOT NULL,
  `billcategory` int(11) NOT NULL,
  `partyemail` varchar(100) NOT NULL,
  `dclocation` varchar(100) NOT NULL,
  `emp_mobile` varchar(256) NOT NULL,
  `courier_POD` varchar(256) NOT NULL,
  `courier_date` int(11) NOT NULL,
  `deposit_acc_no` varchar(256) NOT NULL,
  `deposit_bank_name` varchar(256) NOT NULL,
  `deposit_date` int(11) NOT NULL,
  `handover_name` varchar(256) NOT NULL,
  `handover_mobile` varchar(256) NOT NULL,
  `handover_date` int(11) NOT NULL,
  `rtgs_ref_no` int(11) NOT NULL,
  `rtgs_date` int(11) NOT NULL,
  `transaction_mode` varchar(256) NOT NULL,
  `transaction_value` int(11) NOT NULL,
  `party_mobile` varchar(256) NOT NULL,
  `type_bill` varchar(256) NOT NULL,
  `desc` text NOT NULL,
  `deductions` int(11) NOT NULL,
  `invest_amount` int(11) NOT NULL,
  `transaction_date` int(11) NOT NULL,
  `payment_released` varchar(256) NOT NULL,
  `currency_type` varchar(256) NOT NULL,
  `dlgroupid` int(11) NOT NULL,
  `auditor_status` int(11) NOT NULL DEFAULT 1,
  `expected_date` int(11) NOT NULL,
  `bill_subcat` int(11) NOT NULL,
  `approval_status` int(11) NOT NULL,
  `invoice_date` int(11) NOT NULL,
  `vendor_in` int(11) NOT NULL,
  `vendor_out` int(11) NOT NULL,
  `vendor_name` varchar(256) NOT NULL,
  `project_in` int(11) NOT NULL,
  `project_out` int(11) NOT NULL,
  `project_name` varchar(256) NOT NULL,
  `qs_in` int(11) NOT NULL,
  `qs_out` int(11) NOT NULL,
  `qs_name` varchar(256) NOT NULL,
  `inward_in` int(11) NOT NULL,
  `inward_out` int(11) NOT NULL,
  `inward_name` varchar(256) NOT NULL,
  `accounts_in` int(11) NOT NULL,
  `accounts_out` int(11) NOT NULL,
  `accounts_name` varchar(256) NOT NULL,
  `batch_no` varchar(256) NOT NULL,
  `email_status` int(11) NOT NULL,
  `project_bills` varchar(256) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `bill_classify` int(11) NOT NULL,
  `update_email` varchar(256) NOT NULL,
  `project_id` varchar(256) NOT NULL,
  `re_amount` varchar(256) NOT NULL,
  `internal_ticketid` varchar(256) NOT NULL,
  `period` varchar(256) NOT NULL,
  `urgency` enum('1','2') NOT NULL,
  PRIMARY KEY (`regid`),
  KEY `empcode` (`empcode`),
  KEY `inwardno` (`inwardno`),
  KEY `status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=331145 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bill_registrations_copy_10_08_2022`
--

DROP TABLE IF EXISTS `bill_registrations_copy_10_08_2022`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bill_registrations_copy_10_08_2022` (
  `regid` int(11) NOT NULL AUTO_INCREMENT,
  `inwardno` varchar(220) NOT NULL,
  `party` varchar(225) NOT NULL,
  `billtype` int(11) DEFAULT NULL,
  `type_category` int(11) DEFAULT NULL,
  `empcode` varchar(250) DEFAULT NULL,
  `receivedon` int(11) DEFAULT NULL,
  `amount` float(50,2) DEFAULT NULL,
  `tds` float(10,2) NOT NULL,
  `netamount` float(50,2) NOT NULL,
  `remarks` text DEFAULT NULL,
  `status` int(11) NOT NULL,
  `account_mngr` int(11) NOT NULL,
  `invoiceno` varchar(250) NOT NULL,
  `chequeno` varchar(224) NOT NULL,
  `resolution` text NOT NULL,
  `createdon` int(11) DEFAULT NULL,
  `lastupdatedon` int(11) NOT NULL,
  `createdby` int(11) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  `company` int(11) NOT NULL,
  `po_no` varchar(256) NOT NULL,
  `cheque_deliverytype` enum('handover','courier','deposit','RTGS/NEFT') NOT NULL,
  `billcategory` int(11) NOT NULL,
  `partyemail` varchar(100) NOT NULL,
  `dclocation` varchar(100) NOT NULL,
  `emp_mobile` varchar(256) NOT NULL,
  `courier_POD` varchar(256) NOT NULL,
  `courier_date` int(11) NOT NULL,
  `deposit_acc_no` varchar(256) NOT NULL,
  `deposit_bank_name` varchar(256) NOT NULL,
  `deposit_date` int(11) NOT NULL,
  `handover_name` varchar(256) NOT NULL,
  `handover_mobile` varchar(256) NOT NULL,
  `handover_date` int(11) NOT NULL,
  `rtgs_ref_no` int(11) NOT NULL,
  `rtgs_date` int(11) NOT NULL,
  `transaction_mode` varchar(256) NOT NULL,
  `transaction_value` int(11) NOT NULL,
  `party_mobile` varchar(256) NOT NULL,
  `type_bill` varchar(256) NOT NULL,
  `desc` text NOT NULL,
  `deductions` int(11) NOT NULL,
  `invest_amount` int(11) NOT NULL,
  `transaction_date` int(11) NOT NULL,
  `payment_released` varchar(256) NOT NULL,
  `currency_type` varchar(256) NOT NULL,
  `dlgroupid` int(11) NOT NULL,
  `auditor_status` int(11) NOT NULL DEFAULT 1,
  `expected_date` int(11) NOT NULL,
  `bill_subcat` int(11) NOT NULL,
  `approval_status` int(11) NOT NULL,
  `invoice_date` int(11) NOT NULL,
  `vendor_in` int(11) NOT NULL,
  `vendor_out` int(11) NOT NULL,
  `vendor_name` varchar(256) NOT NULL,
  `project_in` int(11) NOT NULL,
  `project_out` int(11) NOT NULL,
  `project_name` varchar(256) NOT NULL,
  `qs_in` int(11) NOT NULL,
  `qs_out` int(11) NOT NULL,
  `qs_name` varchar(256) NOT NULL,
  `inward_in` int(11) NOT NULL,
  `inward_out` int(11) NOT NULL,
  `inward_name` varchar(256) NOT NULL,
  `accounts_in` int(11) NOT NULL,
  `accounts_out` int(11) NOT NULL,
  `accounts_name` varchar(256) NOT NULL,
  `batch_no` varchar(256) NOT NULL,
  `email_status` int(11) NOT NULL,
  `project_bills` varchar(256) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `bill_classify` int(11) NOT NULL,
  `update_email` varchar(256) NOT NULL,
  `project_id` varchar(256) NOT NULL,
  `re_amount` varchar(256) NOT NULL,
  `internal_ticketid` varchar(256) NOT NULL,
  `period` varchar(256) NOT NULL,
  `urgency` enum('1','2') NOT NULL,
  PRIMARY KEY (`regid`) USING BTREE,
  KEY `empcode` (`empcode`) USING BTREE,
  KEY `inwardno` (`inwardno`) USING BTREE,
  KEY `status` (`status`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=315480 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bill_registrations_mapping`
--

DROP TABLE IF EXISTS `bill_registrations_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bill_registrations_mapping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `regid` int(11) DEFAULT NULL,
  `inwardno` varchar(30) DEFAULT NULL,
  `manager_empcode` int(10) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=476 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bill_registrations_new`
--

DROP TABLE IF EXISTS `bill_registrations_new`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bill_registrations_new` (
  `regid` int(11) NOT NULL AUTO_INCREMENT,
  `inwardno` varchar(220) NOT NULL,
  `party` varchar(225) NOT NULL,
  `billtype` int(11) DEFAULT NULL,
  `type_category` int(11) DEFAULT NULL,
  `empcode` varchar(250) DEFAULT NULL,
  `receivedon` int(11) DEFAULT NULL,
  `amount` float(50,2) DEFAULT NULL,
  `tds` float(10,2) NOT NULL,
  `netamount` float(50,2) NOT NULL,
  `remarks` text DEFAULT NULL,
  `status` int(11) NOT NULL,
  `account_mngr` int(11) NOT NULL,
  `invoiceno` varchar(250) NOT NULL,
  `chequeno` varchar(224) NOT NULL,
  `resolution` text NOT NULL,
  `createdon` int(11) DEFAULT NULL,
  `lastupdatedon` int(11) NOT NULL,
  `createdby` int(11) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  `company` int(11) NOT NULL,
  `po_no` varchar(256) NOT NULL,
  `cheque_deliverytype` enum('handover','courier','deposit','RTGS/NEFT') NOT NULL,
  `billcategory` int(11) NOT NULL,
  `partyemail` varchar(100) NOT NULL,
  `dclocation` varchar(100) NOT NULL,
  `emp_mobile` varchar(256) NOT NULL,
  `courier_POD` varchar(256) NOT NULL,
  `courier_date` int(11) NOT NULL,
  `deposit_acc_no` varchar(256) NOT NULL,
  `deposit_bank_name` varchar(256) NOT NULL,
  `deposit_date` int(11) NOT NULL,
  `handover_name` varchar(256) NOT NULL,
  `handover_mobile` varchar(256) NOT NULL,
  `handover_date` int(11) NOT NULL,
  `rtgs_ref_no` int(11) NOT NULL,
  `rtgs_date` int(11) NOT NULL,
  `transaction_mode` varchar(256) NOT NULL,
  `transaction_value` int(11) NOT NULL,
  `party_mobile` varchar(256) NOT NULL,
  `type_bill` varchar(256) NOT NULL,
  `desc` text NOT NULL,
  `deductions` int(11) NOT NULL,
  `invest_amount` int(11) NOT NULL,
  `transaction_date` int(11) NOT NULL,
  `payment_released` varchar(256) NOT NULL,
  `currency_type` varchar(256) NOT NULL,
  `dlgroupid` int(11) NOT NULL,
  `auditor_status` int(11) NOT NULL DEFAULT 1,
  `expected_date` int(11) NOT NULL,
  `bill_subcat` int(11) NOT NULL,
  `approval_status` int(11) NOT NULL,
  `invoice_date` int(11) NOT NULL,
  `vendor_in` int(11) NOT NULL,
  `vendor_out` int(11) NOT NULL,
  `vendor_name` varchar(256) NOT NULL,
  `project_in` int(11) NOT NULL,
  `project_out` int(11) NOT NULL,
  `project_name` varchar(256) NOT NULL,
  `qs_in` int(11) NOT NULL,
  `qs_out` int(11) NOT NULL,
  `qs_name` varchar(256) NOT NULL,
  `inward_in` int(11) NOT NULL,
  `inward_out` int(11) NOT NULL,
  `inward_name` varchar(256) NOT NULL,
  `accounts_in` int(11) NOT NULL,
  `accounts_out` int(11) NOT NULL,
  `accounts_name` varchar(256) NOT NULL,
  `batch_no` varchar(256) NOT NULL,
  `email_status` int(11) NOT NULL,
  `project_bills` varchar(256) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `bill_classify` int(11) NOT NULL,
  `update_email` varchar(256) NOT NULL,
  `project_id` varchar(256) NOT NULL,
  `re_amount` varchar(256) NOT NULL,
  `internal_ticketid` varchar(256) NOT NULL,
  `period` varchar(256) NOT NULL,
  `urgency` enum('1','2') NOT NULL,
  PRIMARY KEY (`regid`),
  KEY `empcode` (`empcode`),
  KEY `inwardno` (`inwardno`),
  KEY `status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bill_scanned_details`
--

DROP TABLE IF EXISTS `bill_scanned_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bill_scanned_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `regid` int(11) DEFAULT NULL,
  `scanneddetails` text DEFAULT NULL,
  `scanneddate` int(11) DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `createdon` int(11) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bill_stores`
--

DROP TABLE IF EXISTS `bill_stores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bill_stores` (
  `store_id` int(11) NOT NULL AUTO_INCREMENT,
  `store_tktnumber` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `date` int(11) NOT NULL,
  `warehouse` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `bill_location` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `mrno` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `party_name` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `currency` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `net_amount` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `invoice_no` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `invoice_date` int(11) NOT NULL,
  `purchase_order_no` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `purchase_order_date` int(11) NOT NULL,
  `remarks` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `item_description` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `pending_on_status` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `created_by` varchar(11) COLLATE latin1_general_ci NOT NULL,
  `created_on` int(11) NOT NULL,
  `record_status` int(11) NOT NULL,
  PRIMARY KEY (`store_id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bill_subcategories`
--

DROP TABLE IF EXISTS `bill_subcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bill_subcategories` (
  `subcatid` int(11) NOT NULL AUTO_INCREMENT,
  `subcatname` varchar(256) NOT NULL,
  `parentcatid` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  PRIMARY KEY (`subcatid`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `billbook`
--

DROP TABLE IF EXISTS `billbook`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `billbook` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Inwardno` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `Employee` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `BillType` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `InvoiceNo` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `record_status` int(11) NOT NULL DEFAULT 1,
  `createdon` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `billcategories`
--

DROP TABLE IF EXISTS `billcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `billcategories` (
  `catid` int(11) NOT NULL AUTO_INCREMENT,
  `catname` varchar(224) DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `createdon` int(11) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  `parenttype` int(11) NOT NULL,
  `No_ofdays` int(11) NOT NULL,
  PRIMARY KEY (`catid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `billregistrations_auditlogs`
--

DROP TABLE IF EXISTS `billregistrations_auditlogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `billregistrations_auditlogs` (
  `logid` int(11) NOT NULL AUTO_INCREMENT,
  `regid` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `inwardno` varchar(225) NOT NULL,
  `createddate` int(11) NOT NULL,
  `empcode` varchar(200) NOT NULL,
  `createdby` int(11) NOT NULL,
  `primaryid` int(11) NOT NULL,
  `primary_processid` varchar(256) NOT NULL,
  `app_status_logs` int(11) DEFAULT NULL,
  PRIMARY KEY (`logid`),
  KEY `regid` (`regid`),
  KEY `status` (`status`)
) ENGINE=MyISAM AUTO_INCREMENT=154425 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `billregistrations_auditlogs_copy_10_08_2022`
--

DROP TABLE IF EXISTS `billregistrations_auditlogs_copy_10_08_2022`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `billregistrations_auditlogs_copy_10_08_2022` (
  `logid` int(11) NOT NULL AUTO_INCREMENT,
  `regid` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `inwardno` varchar(225) NOT NULL,
  `createddate` int(11) NOT NULL,
  `empcode` varchar(200) NOT NULL,
  `createdby` int(11) NOT NULL,
  `primaryid` int(11) NOT NULL,
  `primary_processid` varchar(256) NOT NULL,
  `app_status_logs` int(11) DEFAULT NULL,
  PRIMARY KEY (`logid`) USING BTREE,
  KEY `regid` (`regid`) USING BTREE,
  KEY `status` (`status`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=139102 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `billstatus`
--

DROP TABLE IF EXISTS `billstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `billstatus` (
  `statusid` int(11) NOT NULL AUTO_INCREMENT,
  `statusname` varchar(224) DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `createdon` int(11) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  PRIMARY KEY (`statusid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `billtransactions`
--

DROP TABLE IF EXISTS `billtransactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `billtransactions` (
  `transid` int(11) NOT NULL AUTO_INCREMENT,
  `regid` int(11) DEFAULT NULL,
  `empcode` int(11) DEFAULT NULL,
  `action` text DEFAULT NULL,
  `createdon` int(11) DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  PRIMARY KEY (`transid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `billtypes`
--

DROP TABLE IF EXISTS `billtypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `billtypes` (
  `typeid` int(11) NOT NULL AUTO_INCREMENT,
  `typename` varchar(224) DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `createdon` int(11) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  PRIMARY KEY (`typeid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `buddy_feedback`
--

DROP TABLE IF EXISTS `buddy_feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `buddy_feedback` (
  `id` int(11) NOT NULL,
  `questions` text NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  `empcode` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `buddy_feedback_details`
--

DROP TABLE IF EXISTS `buddy_feedback_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `buddy_feedback_details` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `q1` set('Yes','No','','') NOT NULL,
  `q2` set('Yes','No','','') NOT NULL,
  `q3` text NOT NULL,
  `q4` text NOT NULL,
  `q5` set('Yes','No','','') NOT NULL,
  `q6` set('Yes','No','','') NOT NULL,
  `q7` set('Yes','No','','') NOT NULL,
  `q8` set('Yes','No','','') NOT NULL,
  `q9` set('Yes','No','','') NOT NULL,
  `q10` set('Yes','No','','') NOT NULL,
  `q11` set('Yes','No','','') NOT NULL,
  `q12` set('Yes','No','','') NOT NULL,
  `empcode` int(11) NOT NULL,
  `q13` set('Yes','No','','') NOT NULL,
  `c1` text NOT NULL,
  `c2` text NOT NULL,
  `c3` text NOT NULL,
  `c4` text NOT NULL,
  `c5` text NOT NULL,
  `c6` text NOT NULL,
  `c7` text NOT NULL,
  `c8` text NOT NULL,
  `c9` text NOT NULL,
  `c10` text NOT NULL,
  `c11` text NOT NULL,
  `c12` text NOT NULL,
  `c13` text NOT NULL,
  `c14` text DEFAULT NULL,
  `c15` text DEFAULT NULL,
  `dept` varchar(200) DEFAULT NULL,
  `buddy` varchar(200) DEFAULT NULL,
  `empname` varchar(200) DEFAULT NULL,
  `startdate` varchar(100) DEFAULT NULL,
  `createdon` varchar(100) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bumaster`
--

DROP TABLE IF EXISTS `bumaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bumaster` (
  `buid` int(11) NOT NULL AUTO_INCREMENT,
  `buname` varchar(200) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  `createdby` int(11) NOT NULL DEFAULT 0,
  `createddate` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`buid`)
) ENGINE=MyISAM AUTO_INCREMENT=86 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bumaster_june4`
--

DROP TABLE IF EXISTS `bumaster_june4`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bumaster_june4` (
  `buid` int(11) NOT NULL AUTO_INCREMENT,
  `buname` varchar(200) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  `createdby` int(11) NOT NULL,
  `createddate` int(11) NOT NULL,
  PRIMARY KEY (`buid`)
) ENGINE=MyISAM AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cab_calendar`
--

DROP TABLE IF EXISTS `cab_calendar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cab_calendar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(256) NOT NULL,
  `startdate` varchar(256) NOT NULL,
  `enddate` varchar(256) NOT NULL,
  `allDay` varchar(256) NOT NULL,
  `cabid` int(11) NOT NULL,
  `empcode` int(11) NOT NULL,
  `cabservice_status` varchar(256) NOT NULL,
  `color` varchar(245) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cabregistrations`
--

DROP TABLE IF EXISTS `cabregistrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cabregistrations` (
  `regid` int(11) NOT NULL AUTO_INCREMENT,
  `empcode` int(11) DEFAULT NULL,
  `department` varchar(225) DEFAULT NULL,
  `mobileno` bigint(11) DEFAULT NULL,
  `email` varchar(225) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `landmark` varchar(225) DEFAULT NULL,
  `shift` varchar(225) DEFAULT NULL,
  `location` varchar(225) DEFAULT NULL,
  `gender` enum('m','f') DEFAULT NULL,
  `comment` text DEFAULT NULL,
  `createdon` int(11) NOT NULL,
  `pick_date` int(11) NOT NULL,
  `pick_time` text NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  `cab_status` enum('1','2','3','4') NOT NULL,
  `pick_type` varchar(250) NOT NULL,
  `altphone` varchar(256) NOT NULL,
  `accnt_mngr_email` varchar(256) NOT NULL,
  `accnt_mngr_name` varchar(256) NOT NULL,
  `accnt_mngr_phone` varchar(256) NOT NULL,
  `empname` varchar(256) NOT NULL,
  PRIMARY KEY (`regid`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `checklist`
--

DROP TABLE IF EXISTS `checklist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `checklist` (
  `checklistid` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(200) DEFAULT NULL,
  `category` int(11) NOT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `createddate` int(11) DEFAULT NULL,
  PRIMARY KEY (`checklistid`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `checklistcategories`
--

DROP TABLE IF EXISTS `checklistcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `checklistcategories` (
  `catid` int(11) NOT NULL AUTO_INCREMENT,
  `catname` varchar(224) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  PRIMARY KEY (`catid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `checklistoptions`
--

DROP TABLE IF EXISTS `checklistoptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `checklistoptions` (
  `checkoptionid` int(11) NOT NULL AUTO_INCREMENT,
  `checklistid` int(11) NOT NULL,
  `inputtype` varchar(200) DEFAULT NULL,
  `inputcount` int(11) NOT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `createddate` int(11) DEFAULT NULL,
  PRIMARY KEY (`checkoptionid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companies` (
  `companyid` int(11) NOT NULL AUTO_INCREMENT,
  `companyname` varchar(200) DEFAULT NULL,
  `compemail` varchar(256) NOT NULL,
  `compphone` bigint(20) NOT NULL,
  `compphone2` bigint(20) NOT NULL,
  `compfax` bigint(20) NOT NULL,
  `compaddress` text NOT NULL,
  `compaddress1` text NOT NULL,
  `compaddress2` text NOT NULL,
  `city` varchar(256) NOT NULL,
  `state` varchar(256) NOT NULL,
  `zip` varchar(256) NOT NULL,
  `url` varchar(256) NOT NULL,
  `staff` int(11) NOT NULL,
  `dept` int(11) NOT NULL,
  `companytype` int(11) NOT NULL,
  `compdesc` text NOT NULL,
  `product` varchar(256) NOT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  PRIMARY KEY (`companyid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_bill_level_mapping`
--

DROP TABLE IF EXISTS `company_bill_level_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_bill_level_mapping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `companyid` int(11) DEFAULT NULL,
  `levelid` int(11) DEFAULT NULL,
  `empcode` int(11) DEFAULT NULL,
  `createdon` int(11) DEFAULT NULL,
  `updatedon` int(11) DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `updatedby` int(11) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_type`
--

DROP TABLE IF EXISTS `company_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_type` (
  `comptypeid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  PRIMARY KEY (`comptypeid`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `companymaster`
--

DROP TABLE IF EXISTS `companymaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companymaster` (
  `companyid` int(11) NOT NULL AUTO_INCREMENT,
  `companyname` varchar(200) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  `createdby` int(11) NOT NULL,
  `createddate` int(11) NOT NULL,
  PRIMARY KEY (`companyid`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `coursemaster`
--

DROP TABLE IF EXISTS `coursemaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `coursemaster` (
  `courseid` int(11) NOT NULL AUTO_INCREMENT,
  `qualificationid` int(11) NOT NULL,
  `coursename` varchar(200) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  `createdby` int(11) NOT NULL,
  `createddate` int(11) NOT NULL,
  PRIMARY KEY (`courseid`)
) ENGINE=MyISAM AUTO_INCREMENT=60 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cron_feedback_list`
--

DROP TABLE IF EXISTS `cron_feedback_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cron_feedback_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `no_days` int(11) NOT NULL,
  `feedabck_url` text NOT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `date_added` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ctrls_feedback`
--

DROP TABLE IF EXISTS `ctrls_feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ctrls_feedback` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `emailid` varchar(100) NOT NULL,
  `question` int(11) NOT NULL,
  `answer` int(11) NOT NULL,
  `suggestion` longtext NOT NULL,
  `comment` longtext NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ctrls_feedback_cloud`
--

DROP TABLE IF EXISTS `ctrls_feedback_cloud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ctrls_feedback_cloud` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `emailid` varchar(100) NOT NULL,
  `question` int(11) NOT NULL,
  `answer` int(11) NOT NULL,
  `suggestion` longtext NOT NULL,
  `suggestion2` longtext DEFAULT NULL,
  `suggestion3` longtext DEFAULT NULL,
  `comment` longtext NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ctrls_feedback_ctrls`
--

DROP TABLE IF EXISTS `ctrls_feedback_ctrls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ctrls_feedback_ctrls` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `emailid` varchar(100) NOT NULL,
  `question` int(11) NOT NULL,
  `answer` int(11) NOT NULL,
  `suggestion` longtext NOT NULL,
  `suggestion2` longtext DEFAULT NULL,
  `suggestion3` longtext DEFAULT NULL,
  `comment` longtext NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `currency`
--

DROP TABLE IF EXISTS `currency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `currency` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `currency` varchar(255) NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `customer_details`
--

DROP TABLE IF EXISTS `customer_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer_details` (
  `customer_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `customer_details_cloud`
--

DROP TABLE IF EXISTS `customer_details_cloud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer_details_cloud` (
  `customer_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=MyISAM AUTO_INCREMENT=310 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `customer_details_ctrls`
--

DROP TABLE IF EXISTS `customer_details_ctrls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer_details_ctrls` (
  `customer_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=MyISAM AUTO_INCREMENT=1794 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `customer_email_que`
--

DROP TABLE IF EXISTS `customer_email_que`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer_email_que` (
  `emailcount_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(256) NOT NULL,
  `senddate` int(11) NOT NULL,
  `reminder_count` int(11) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  `customername` varchar(256) NOT NULL,
  `reminder1` int(11) NOT NULL,
  `reminder2` int(11) NOT NULL,
  `reminder3` int(11) NOT NULL,
  PRIMARY KEY (`emailcount_id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `customer_email_que_cloud`
--

DROP TABLE IF EXISTS `customer_email_que_cloud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer_email_que_cloud` (
  `emailcount_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(256) NOT NULL,
  `senddate` int(11) NOT NULL,
  `reminder_count` int(11) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  `customername` varchar(256) NOT NULL,
  `reminder1` int(11) NOT NULL,
  `reminder2` int(11) NOT NULL,
  `reminder3` int(11) NOT NULL,
  PRIMARY KEY (`emailcount_id`)
) ENGINE=MyISAM AUTO_INCREMENT=121 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `customer_email_que_ctrls`
--

DROP TABLE IF EXISTS `customer_email_que_ctrls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer_email_que_ctrls` (
  `emailcount_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(256) NOT NULL,
  `senddate` int(11) NOT NULL,
  `reminder_count` int(11) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  `customername` varchar(256) NOT NULL,
  `reminder1` int(11) NOT NULL,
  `reminder2` int(11) NOT NULL,
  `reminder3` int(11) NOT NULL,
  PRIMARY KEY (`emailcount_id`)
) ENGINE=MyISAM AUTO_INCREMENT=152 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `customer_email_que_latest`
--

DROP TABLE IF EXISTS `customer_email_que_latest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer_email_que_latest` (
  `emailcount_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(256) NOT NULL,
  `senddate` int(11) NOT NULL,
  `reminder_count` int(11) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  `customername` varchar(256) NOT NULL,
  `reminder1` int(11) NOT NULL,
  `reminder2` int(11) NOT NULL,
  `reminder3` int(11) NOT NULL,
  PRIMARY KEY (`emailcount_id`)
) ENGINE=MyISAM AUTO_INCREMENT=409 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dclocation_details`
--

DROP TABLE IF EXISTS `dclocation_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dclocation_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company` int(11) DEFAULT NULL,
  `dclocation` varchar(200) DEFAULT NULL,
  `createdon` varchar(100) DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `record_status` enum('1','0') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `debitbalance`
--

DROP TABLE IF EXISTS `debitbalance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `debitbalance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `particular` varchar(250) NOT NULL,
  `amount` decimal(10,0) NOT NULL,
  `note` text NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  `po_no` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=103 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `debitbalemails`
--

DROP TABLE IF EXISTS `debitbalemails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `debitbalemails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dbid` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `empcode` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=216 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `departmentmaster`
--

DROP TABLE IF EXISTS `departmentmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `departmentmaster` (
  `deptid` int(11) NOT NULL AUTO_INCREMENT,
  `departmentname` varchar(100) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  `createdby` int(11) NOT NULL DEFAULT 0,
  `createddate` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`deptid`)
) ENGINE=InnoDB AUTO_INCREMENT=514 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `designationmaster`
--

DROP TABLE IF EXISTS `designationmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `designationmaster` (
  `desgid` int(11) NOT NULL AUTO_INCREMENT,
  `designationname` varchar(200) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT '1',
  `createdby` int(11) NOT NULL DEFAULT 0,
  `createdon` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`desgid`)
) ENGINE=InnoDB AUTO_INCREMENT=6630 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dlgroups`
--

DROP TABLE IF EXISTS `dlgroups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dlgroups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dlname` varchar(256) NOT NULL,
  `dlemail` varchar(256) NOT NULL,
  `record_status` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dummy`
--

DROP TABLE IF EXISTS `dummy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dummy` (
  `empcode` varchar(200) DEFAULT NULL,
  `fullname` varchar(220) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elabsdata`
--

DROP TABLE IF EXISTS `elabsdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `elabsdata` (
  `ecode` int(11) DEFAULT NULL,
  `name` varchar(224) DEFAULT NULL,
  `dob` varchar(224) DEFAULT NULL,
  `doj` varchar(224) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emp_attachment`
--

DROP TABLE IF EXISTS `emp_attachment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emp_attachment` (
  `doc_id` int(11) NOT NULL AUTO_INCREMENT,
  `empid` int(11) NOT NULL,
  `empcode` int(11) NOT NULL,
  `filename` varchar(256) NOT NULL,
  `file_title` varchar(256) NOT NULL,
  `uploaded_by` varchar(256) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  PRIMARY KEY (`doc_id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emp_attachments`
--

DROP TABLE IF EXISTS `emp_attachments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emp_attachments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empbillid` int(11) NOT NULL,
  `attachments` text NOT NULL,
  `display_name` varchar(30) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=54 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emp_bgv`
--

DROP TABLE IF EXISTS `emp_bgv`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emp_bgv` (
  `bgvid` int(11) NOT NULL AUTO_INCREMENT,
  `empcode` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `comment` varchar(224) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`bgvid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emp_bills`
--

DROP TABLE IF EXISTS `emp_bills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emp_bills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `period` int(11) NOT NULL,
  `category` int(11) NOT NULL,
  `subcategory` int(11) NOT NULL,
  `referencenumber` varchar(100) NOT NULL,
  `reference_no` varchar(50) NOT NULL,
  `employee_amount` int(11) NOT NULL,
  `advance_amount` int(11) NOT NULL,
  `manager_amount` int(11) NOT NULL,
  `employee_remarks` text NOT NULL,
  `emp_bankdetails` text NOT NULL,
  `party` varchar(60) NOT NULL,
  `project_code` varchar(100) NOT NULL,
  `approvalstatus` tinyint(1) NOT NULL,
  `manager_remarks` text NOT NULL,
  `accountmanager` int(11) NOT NULL,
  `accmanager_amount` int(11) NOT NULL,
  `acc_manager_remarks` text NOT NULL,
  `acc_document_received` int(11) NOT NULL,
  `acc_receiveddate` int(11) NOT NULL,
  `transfer_remarks` text NOT NULL,
  `process_remarks` text NOT NULL,
  `return_remarks` text NOT NULL,
  `cheque_dd` enum('1','2') NOT NULL,
  `chequeno` varchar(30) NOT NULL,
  `bankname` text NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `modifiedby` int(11) NOT NULL,
  `modifiedon` int(11) NOT NULL,
  `statusid` int(11) NOT NULL,
  `bill_related_to` enum('0','1','2','3') NOT NULL COMMENT '1-Advance,2-LC/BG,3-Others',
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=63 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emp_categories`
--

DROP TABLE IF EXISTS `emp_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emp_categories` (
  `empcatid` int(11) NOT NULL AUTO_INCREMENT,
  `categoryname` varchar(200) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `createddate` int(11) DEFAULT NULL,
  PRIMARY KEY (`empcatid`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emp_checklist`
--

DROP TABLE IF EXISTS `emp_checklist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emp_checklist` (
  `empchecklistid` int(11) NOT NULL AUTO_INCREMENT,
  `empcode` int(11) DEFAULT NULL,
  `checklistid` int(11) DEFAULT NULL,
  `status` enum('yes','no') DEFAULT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`empchecklistid`)
) ENGINE=InnoDB AUTO_INCREMENT=237 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emp_checklistoptions`
--

DROP TABLE IF EXISTS `emp_checklistoptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emp_checklistoptions` (
  `empchecklistid` int(11) NOT NULL AUTO_INCREMENT,
  `empcode` int(11) DEFAULT NULL,
  `checklistid` int(11) DEFAULT NULL,
  `optionvalue` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`empchecklistid`)
) ENGINE=InnoDB AUTO_INCREMENT=243 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emp_code_update_logs`
--

DROP TABLE IF EXISTS `emp_code_update_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emp_code_update_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `old_emp_code` varchar(11) DEFAULT NULL,
  `new_emp_code` varchar(11) DEFAULT NULL,
  `type` tinyint(3) DEFAULT NULL COMMENT '1 => Individual, 2 => Bulk',
  `createdby` int(11) DEFAULT NULL,
  `createdon` int(11) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emp_code_uploads_logs`
--

DROP TABLE IF EXISTS `emp_code_uploads_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emp_code_uploads_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `old_emp_code` int(11) DEFAULT NULL,
  `new_emp_code` int(11) DEFAULT NULL,
  `requesttype` tinyint(3) DEFAULT NULL COMMENT '1 => insert, 2=> update',
  `finaldata` text DEFAULT NULL,
  `result` tinyint(3) DEFAULT NULL COMMENT '1 => inserted, 2=> updates',
  `fileid` int(11) DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `createdon` int(11) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=274 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emp_codes_uploads`
--

DROP TABLE IF EXISTS `emp_codes_uploads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emp_codes_uploads` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filepath` text DEFAULT NULL,
  `actualfile` text NOT NULL,
  `headerdata` text DEFAULT NULL,
  `requestdata` text DEFAULT NULL,
  `requesttype` tinyint(3) DEFAULT NULL COMMENT '1 => insert, 2 => update',
  `duplicateempcodes` text DEFAULT NULL,
  `invalidempcodes` text DEFAULT NULL,
  `message` varchar(200) DEFAULT NULL,
  `version` varchar(10) DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `createdon` int(11) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=148 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emp_data_logs`
--

DROP TABLE IF EXISTS `emp_data_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emp_data_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empcode` int(9) DEFAULT NULL,
  `empdata` text DEFAULT NULL,
  `createdon` int(11) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=640 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emp_data_otp`
--

DROP TABLE IF EXISTS `emp_data_otp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emp_data_otp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(70) DEFAULT NULL,
  `otp` varchar(30) DEFAULT NULL,
  `otp_status` int(5) DEFAULT 0 COMMENT '0 => otp not sent, 1=> otp send ,2=>otp validated',
  `createdon` int(11) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7151 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emp_experience`
--

DROP TABLE IF EXISTS `emp_experience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emp_experience` (
  `expid` int(11) NOT NULL AUTO_INCREMENT,
  `empid` int(11) DEFAULT NULL,
  `empcode` int(11) DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  `from` int(11) DEFAULT NULL,
  `to` int(11) DEFAULT NULL,
  `duration` float(5,2) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `createddate` int(11) DEFAULT NULL,
  `lastmodifiedby` int(11) DEFAULT NULL,
  `lastmodifieddate` int(11) DEFAULT NULL,
  PRIMARY KEY (`expid`)
) ENGINE=InnoDB AUTO_INCREMENT=155590 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emp_experience_test`
--

DROP TABLE IF EXISTS `emp_experience_test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emp_experience_test` (
  `expid` int(11) NOT NULL AUTO_INCREMENT,
  `empid` int(11) DEFAULT NULL,
  `empcode` int(11) DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  `from` int(11) DEFAULT NULL,
  `to` int(11) DEFAULT NULL,
  `duration` float(5,2) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `createddate` int(11) DEFAULT NULL,
  `lastmodifiedby` int(11) DEFAULT NULL,
  `lastmodifieddate` int(11) DEFAULT NULL,
  PRIMARY KEY (`expid`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emp_family`
--

DROP TABLE IF EXISTS `emp_family`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emp_family` (
  `familyid` int(11) NOT NULL AUTO_INCREMENT,
  `empid` int(11) NOT NULL DEFAULT 0,
  `empcode` int(11) DEFAULT NULL,
  `relationname` varchar(100) DEFAULT NULL,
  `relationtype` varchar(100) DEFAULT NULL,
  `relationdob` bigint(11) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `createddate` int(11) DEFAULT NULL,
  `lastmodifiedby` int(11) DEFAULT NULL,
  `lastmodifieddate` int(11) DEFAULT NULL,
  PRIMARY KEY (`familyid`)
) ENGINE=InnoDB AUTO_INCREMENT=123796 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emp_family_test`
--

DROP TABLE IF EXISTS `emp_family_test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emp_family_test` (
  `familyid` int(11) NOT NULL AUTO_INCREMENT,
  `empid` int(11) NOT NULL DEFAULT 0,
  `empcode` int(11) DEFAULT NULL,
  `relationname` varchar(100) DEFAULT NULL,
  `relationtype` varchar(100) DEFAULT NULL,
  `relationdob` bigint(11) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `createddate` int(11) DEFAULT NULL,
  `lastmodifiedby` int(11) DEFAULT NULL,
  `lastmodifieddate` int(11) DEFAULT NULL,
  PRIMARY KEY (`familyid`)
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emp_link_mail_log`
--

DROP TABLE IF EXISTS `emp_link_mail_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emp_link_mail_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empcode` int(11) DEFAULT NULL,
  `company_email` varchar(100) DEFAULT NULL,
  `subject` text DEFAULT NULL,
  `body` text DEFAULT NULL,
  `mail_status` int(2) DEFAULT NULL,
  `mail_count` int(5) DEFAULT 0,
  `islastmail` tinyint(2) DEFAULT NULL,
  `createddate` int(11) DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19695 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emp_profile`
--

DROP TABLE IF EXISTS `emp_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emp_profile` (
  `empid` int(11) NOT NULL AUTO_INCREMENT,
  `int_empcode` varchar(255) DEFAULT NULL,
  `empcode` int(10) NOT NULL,
  `companyid` int(11) DEFAULT NULL,
  `firstname` varchar(200) DEFAULT NULL,
  `lastname` varchar(200) DEFAULT NULL,
  `fullname` varchar(200) NOT NULL,
  `gender` enum('f','m') DEFAULT NULL,
  `dob` int(11) DEFAULT NULL,
  `bloodgroup` varchar(20) DEFAULT NULL,
  `phone_no` varchar(100) DEFAULT NULL,
  `alt_phone` varchar(50) DEFAULT NULL,
  `emergency_contact` varchar(50) NOT NULL,
  `personal_email` varchar(200) DEFAULT NULL,
  `regionid` int(11) NOT NULL,
  `company_email` varchar(200) NOT NULL,
  `office_phone` varchar(50) DEFAULT NULL,
  `extension` bigint(100) DEFAULT NULL,
  `ip_phone` bigint(100) DEFAULT NULL,
  `maritalstatus` enum('single','married') DEFAULT NULL,
  `marriage_date` int(11) DEFAULT NULL,
  `presentaddress` text NOT NULL,
  `permanentaddress` text NOT NULL,
  `doj` int(11) NOT NULL,
  `username` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `department` int(11) NOT NULL,
  `team` int(11) NOT NULL,
  `designation` int(11) NOT NULL,
  `reporting` int(11) NOT NULL,
  `reporting_email` varchar(255) DEFAULT NULL,
  `dotted_reporting` int(11) NOT NULL,
  `dotted_reporting_email` varchar(255) DEFAULT NULL,
  `buteam` int(11) DEFAULT NULL,
  `pancard` varchar(250) NOT NULL,
  `passport` varchar(50) NOT NULL,
  `photo` varchar(100) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  `createdby` int(11) NOT NULL,
  `createddate` int(11) NOT NULL,
  `lastmodifiedby` int(11) NOT NULL,
  `lastmodifieddate` int(11) NOT NULL,
  `mailcounter` int(11) NOT NULL,
  `tech_details` text NOT NULL,
  `hashvalue` varchar(1000) NOT NULL,
  `hrdob` int(50) NOT NULL,
  `hrdoj` int(50) NOT NULL,
  `usergroup` varchar(5) NOT NULL DEFAULT 'U',
  `hrphoto` varchar(200) NOT NULL,
  `emptype` varchar(50) NOT NULL DEFAULT 'regular',
  `level` varchar(225) NOT NULL,
  `roleid` int(11) NOT NULL,
  `aadharcard_number` varchar(225) NOT NULL,
  `ipno` int(11) NOT NULL,
  `previous_esi` int(11) NOT NULL,
  `is_ipdisabled` enum('y','n') NOT NULL,
  `disability_type` varchar(50) NOT NULL,
  `is_parentsal` enum('y','n') NOT NULL,
  `dispensary` varchar(224) NOT NULL,
  `certificate` varchar(224) NOT NULL,
  `nominee` varchar(50) NOT NULL,
  `nominee_dob` int(11) NOT NULL,
  `nominee_addr` varchar(225) NOT NULL,
  `nominee_relation` varchar(50) NOT NULL,
  `d1_residing` enum('y','n') NOT NULL,
  `dependent1` varchar(225) NOT NULL,
  `d1_relation` varchar(50) NOT NULL,
  `d1_address` varchar(225) NOT NULL,
  `dependent2` varchar(225) NOT NULL,
  `d2_residing` enum('y','n') NOT NULL,
  `d2_relation` varchar(50) NOT NULL,
  `d2_address` varchar(225) NOT NULL,
  `d1_dob` int(11) NOT NULL,
  `d2_dob` int(11) NOT NULL,
  `account_num` varchar(250) NOT NULL,
  `ifsc` varchar(224) NOT NULL,
  `uan_num` varchar(20) NOT NULL,
  `pf_remark1` varchar(224) NOT NULL,
  `pf_remark2` varchar(224) NOT NULL,
  `urlstatus` tinyint(4) NOT NULL,
  `flag_status` int(11) NOT NULL,
  `buddy` int(11) NOT NULL,
  `probation` int(11) NOT NULL,
  `title` varchar(256) NOT NULL,
  `unit` varchar(256) NOT NULL,
  `bank_name` varchar(256) NOT NULL,
  `name_as_per_bankrecord` varchar(256) NOT NULL,
  `usic_no` varchar(256) NOT NULL,
  `emg_cont_person` varchar(256) NOT NULL,
  `total_year_of_experience` varchar(256) NOT NULL,
  `previous_employee` varchar(256) NOT NULL,
  `resignation_date` int(11) NOT NULL,
  `lwd` text NOT NULL,
  `remarks` text NOT NULL,
  `empcode_cat` varchar(50) NOT NULL,
  `google_auth_code` varchar(16) NOT NULL,
  `isAddDevice` tinyint(3) unsigned NOT NULL,
  `isAccess` int(11) NOT NULL DEFAULT 1,
  `userType` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`empid`),
  KEY `empcode` (`empcode`),
  KEY `record_status` (`record_status`),
  KEY `emp_profile_idx_record_status_company_email` (`record_status`,`company_email`),
  KEY `company_email` (`company_email`) USING BTREE,
  FULLTEXT KEY `presentaddress` (`presentaddress`)
) ENGINE=MyISAM AUTO_INCREMENT=6304 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emp_profile1`
--

DROP TABLE IF EXISTS `emp_profile1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emp_profile1` (
  `empid` int(11) NOT NULL AUTO_INCREMENT,
  `empcode` int(11) NOT NULL,
  `fullname` varchar(200) NOT NULL,
  `company_email` varchar(200) NOT NULL,
  `photo` varchar(200) NOT NULL,
  `hashvalue` varchar(256) NOT NULL,
  PRIMARY KEY (`empid`)
) ENGINE=MyISAM AUTO_INCREMENT=533 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emp_profile_bill_level`
--

DROP TABLE IF EXISTS `emp_profile_bill_level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emp_profile_bill_level` (
  `empid` int(11) NOT NULL AUTO_INCREMENT,
  `int_empcode` varchar(255) DEFAULT NULL,
  `empcode` int(10) NOT NULL,
  `companyid` int(11) DEFAULT NULL,
  `firstname` varchar(200) DEFAULT NULL,
  `lastname` varchar(200) DEFAULT NULL,
  `fullname` varchar(200) NOT NULL,
  `company_email` varchar(200) NOT NULL,
  `reporting` int(11) NOT NULL,
  `reporting_email` varchar(255) DEFAULT NULL,
  `record_status` enum('0','1') NOT NULL,
  `createdby` int(11) NOT NULL,
  `createddate` int(11) NOT NULL,
  PRIMARY KEY (`empid`),
  KEY `empcode` (`empcode`),
  KEY `company_email` (`company_email`),
  KEY `record_status` (`record_status`),
  KEY `emp_profile_idx_record_status_company_email` (`record_status`,`company_email`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emp_profile_latest`
--

DROP TABLE IF EXISTS `emp_profile_latest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emp_profile_latest` (
  `empid` int(11) NOT NULL AUTO_INCREMENT,
  `empcode` int(11) NOT NULL,
  `companyid` int(11) DEFAULT NULL,
  `firstname` varchar(200) DEFAULT NULL,
  `lastname` varchar(200) DEFAULT NULL,
  `fullname` varchar(200) NOT NULL,
  `gender` enum('f','m') DEFAULT NULL,
  `dob` int(11) DEFAULT NULL,
  `bloodgroup` varchar(20) DEFAULT NULL,
  `phone_no` varchar(100) DEFAULT NULL,
  `alt_phone` varchar(50) DEFAULT NULL,
  `emergency_contact` varchar(50) NOT NULL,
  `personal_email` varchar(200) DEFAULT NULL,
  `regionid` int(11) NOT NULL,
  `company_email` varchar(200) NOT NULL,
  `office_phone` varchar(50) DEFAULT NULL,
  `extension` bigint(100) DEFAULT NULL,
  `ip_phone` bigint(100) DEFAULT NULL,
  `maritalstatus` enum('single','married') DEFAULT NULL,
  `marriage_date` int(11) DEFAULT NULL,
  `presentaddress` text NOT NULL,
  `permanentaddress` text NOT NULL,
  `doj` int(11) NOT NULL,
  `username` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `department` int(11) NOT NULL,
  `team` int(11) NOT NULL,
  `designation` int(11) NOT NULL,
  `reporting` int(11) NOT NULL,
  `dotted_reporting` int(11) NOT NULL,
  `pancard` varchar(50) NOT NULL,
  `passport` varchar(50) NOT NULL,
  `photo` varchar(100) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  `createdby` int(11) NOT NULL,
  `createddate` int(11) NOT NULL,
  `lastmodifiedby` int(11) NOT NULL,
  `lastmodifieddate` int(11) NOT NULL,
  `mailcounter` int(11) NOT NULL,
  `tech_details` text NOT NULL,
  `hashvalue` varchar(1000) NOT NULL,
  `hrdob` int(50) NOT NULL,
  `hrdoj` int(50) NOT NULL,
  `usergroup` varchar(5) NOT NULL DEFAULT 'U',
  `hrphoto` varchar(200) NOT NULL,
  `emptype` varchar(50) NOT NULL DEFAULT 'regular',
  `level` varchar(225) NOT NULL,
  `roleid` int(11) NOT NULL,
  `aadharcard_number` varchar(225) NOT NULL,
  `ipno` int(11) NOT NULL,
  `previous_esi` int(11) NOT NULL,
  `is_ipdisabled` enum('y','n') NOT NULL,
  `disability_type` varchar(50) NOT NULL,
  `is_parentsal` enum('y','n') NOT NULL,
  `dispensary` varchar(224) NOT NULL,
  `certificate` varchar(224) NOT NULL,
  `nominee` varchar(50) NOT NULL,
  `nominee_dob` int(11) NOT NULL,
  `nominee_addr` varchar(225) NOT NULL,
  `nominee_relation` varchar(50) NOT NULL,
  `d1_residing` enum('y','n') NOT NULL,
  `dependent1` varchar(225) NOT NULL,
  `d1_relation` varchar(50) NOT NULL,
  `d1_address` varchar(225) NOT NULL,
  `dependent2` varchar(225) NOT NULL,
  `d2_residing` enum('y','n') NOT NULL,
  `d2_relation` varchar(50) NOT NULL,
  `d2_address` varchar(225) NOT NULL,
  `d1_dob` int(11) NOT NULL,
  `d2_dob` int(11) NOT NULL,
  `account_num` int(11) NOT NULL,
  `ifsc` varchar(224) NOT NULL,
  `uan_num` int(11) NOT NULL,
  `pf_remark1` varchar(224) NOT NULL,
  `pf_remark2` varchar(224) NOT NULL,
  `urlstatus` tinyint(4) NOT NULL,
  `flag_status` int(11) NOT NULL,
  `buddy` int(11) NOT NULL,
  `probation` int(11) NOT NULL,
  `title` varchar(256) NOT NULL,
  `unit` varchar(256) NOT NULL,
  `bank_name` varchar(256) NOT NULL,
  `name_as_per_bankrecord` varchar(256) NOT NULL,
  `usic_no` varchar(256) NOT NULL,
  `emg_cont_person` varchar(256) NOT NULL,
  `total_year_of_experience` varchar(256) NOT NULL,
  `previous_employee` varchar(256) NOT NULL,
  `resignation_date` int(11) NOT NULL,
  `lwd` text NOT NULL,
  `remarks` text NOT NULL,
  PRIMARY KEY (`empid`),
  KEY `empcode` (`empcode`),
  FULLTEXT KEY `presentaddress` (`presentaddress`)
) ENGINE=MyISAM AUTO_INCREMENT=2073 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emp_profile_profileupdate`
--

DROP TABLE IF EXISTS `emp_profile_profileupdate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emp_profile_profileupdate` (
  `empid` int(11) NOT NULL AUTO_INCREMENT,
  `empcode` int(10) NOT NULL,
  `companyid` int(11) DEFAULT NULL,
  `firstname` varchar(200) DEFAULT NULL,
  `lastname` varchar(200) DEFAULT NULL,
  `fullname` varchar(200) NOT NULL,
  `gender` enum('f','m') DEFAULT NULL,
  `dob` int(11) DEFAULT NULL,
  `bloodgroup` varchar(20) DEFAULT NULL,
  `phone_no` varchar(100) DEFAULT NULL,
  `alt_phone` varchar(50) DEFAULT NULL,
  `emergency_contact` varchar(50) NOT NULL,
  `personal_email` varchar(200) DEFAULT NULL,
  `regionid` int(11) NOT NULL,
  `company_email` varchar(200) NOT NULL,
  `office_phone` varchar(50) DEFAULT NULL,
  `extension` bigint(100) DEFAULT NULL,
  `ip_phone` bigint(100) DEFAULT NULL,
  `maritalstatus` enum('single','married') DEFAULT NULL,
  `marriage_date` int(11) DEFAULT NULL,
  `presentaddress` text NOT NULL,
  `permanentaddress` text NOT NULL,
  `doj` int(11) NOT NULL,
  `username` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `department` int(11) NOT NULL,
  `team` int(11) NOT NULL,
  `designation` int(11) NOT NULL,
  `reporting` int(11) NOT NULL,
  `dotted_reporting` int(11) NOT NULL,
  `buteam` int(11) DEFAULT NULL,
  `pancard` varchar(250) NOT NULL,
  `passport` varchar(50) NOT NULL,
  `photo` varchar(100) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  `createdby` int(11) NOT NULL,
  `createddate` int(11) NOT NULL,
  `lastmodifiedby` int(11) NOT NULL,
  `lastmodifieddate` int(11) NOT NULL,
  `mailcounter` int(11) NOT NULL,
  `tech_details` text NOT NULL,
  `hashvalue` varchar(1000) NOT NULL,
  `hrdob` int(50) NOT NULL,
  `hrdoj` int(50) NOT NULL,
  `usergroup` varchar(5) NOT NULL DEFAULT 'U',
  `hrphoto` varchar(200) NOT NULL,
  `emptype` varchar(50) NOT NULL DEFAULT 'regular',
  `level` varchar(225) NOT NULL,
  `roleid` int(11) NOT NULL,
  `aadharcard_number` varchar(225) NOT NULL,
  `ipno` int(11) NOT NULL,
  `previous_esi` int(11) NOT NULL,
  `is_ipdisabled` enum('y','n') NOT NULL,
  `disability_type` varchar(50) NOT NULL,
  `is_parentsal` enum('y','n') NOT NULL,
  `dispensary` varchar(224) NOT NULL,
  `certificate` varchar(224) NOT NULL,
  `nominee` varchar(50) NOT NULL,
  `nominee_dob` int(11) NOT NULL,
  `nominee_addr` varchar(225) NOT NULL,
  `nominee_relation` varchar(50) NOT NULL,
  `d1_residing` enum('y','n') NOT NULL,
  `dependent1` varchar(225) NOT NULL,
  `d1_relation` varchar(50) NOT NULL,
  `d1_address` varchar(225) NOT NULL,
  `dependent2` varchar(225) NOT NULL,
  `d2_residing` enum('y','n') NOT NULL,
  `d2_relation` varchar(50) NOT NULL,
  `d2_address` varchar(225) NOT NULL,
  `d1_dob` int(11) NOT NULL,
  `d2_dob` int(11) NOT NULL,
  `account_num` varchar(250) NOT NULL,
  `ifsc` varchar(224) NOT NULL,
  `uan_num` varchar(20) NOT NULL,
  `pf_remark1` varchar(224) NOT NULL,
  `pf_remark2` varchar(224) NOT NULL,
  `urlstatus` tinyint(4) NOT NULL,
  `flag_status` int(11) NOT NULL,
  `buddy` int(11) NOT NULL,
  `probation` int(11) NOT NULL,
  `title` varchar(256) NOT NULL,
  `unit` varchar(256) NOT NULL,
  `bank_name` varchar(256) NOT NULL,
  `name_as_per_bankrecord` varchar(256) NOT NULL,
  `usic_no` varchar(256) NOT NULL,
  `emg_cont_person` varchar(256) NOT NULL,
  `total_year_of_experience` varchar(256) NOT NULL,
  `previous_employee` varchar(256) NOT NULL,
  `resignation_date` int(11) NOT NULL,
  `lwd` text NOT NULL,
  `remarks` text NOT NULL,
  `empcode_cat` varchar(50) NOT NULL,
  PRIMARY KEY (`empid`),
  KEY `empcode` (`empcode`),
  KEY `company_email` (`company_email`),
  KEY `record_status` (`record_status`),
  KEY `emp_profile_idx_record_status_company_email` (`record_status`,`company_email`),
  FULLTEXT KEY `presentaddress` (`presentaddress`)
) ENGINE=MyISAM AUTO_INCREMENT=3436 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emp_profile_uploads`
--

DROP TABLE IF EXISTS `emp_profile_uploads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emp_profile_uploads` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filepath` text DEFAULT NULL,
  `actualfile` text NOT NULL,
  `headerdata` text DEFAULT NULL,
  `requestdata` text DEFAULT NULL,
  `requesttype` tinyint(3) DEFAULT NULL COMMENT '1 => insert, 2 => update',
  `duplicateempcodes` text DEFAULT NULL,
  `duplicateemails` text DEFAULT NULL,
  `message` varchar(200) DEFAULT NULL,
  `version` varchar(10) DEFAULT NULL,
  `bkp_table_name` varchar(50) DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `createdon` int(11) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `createdon` (`createdon`),
  KEY `requesttype` (`requesttype`)
) ENGINE=InnoDB AUTO_INCREMENT=1978 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emp_profile_uploads_logs`
--

DROP TABLE IF EXISTS `emp_profile_uploads_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emp_profile_uploads_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empcode` int(8) DEFAULT NULL,
  `requesttype` tinyint(3) DEFAULT NULL COMMENT '1 => insert, 2=> update',
  `finaldata` text DEFAULT NULL,
  `result` tinyint(3) DEFAULT NULL COMMENT '1 => inserted, 2=> updates',
  `fileid` int(11) DEFAULT NULL,
  `bkptablename` varchar(50) DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `createdon` int(11) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=462724 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emp_qualification`
--

DROP TABLE IF EXISTS `emp_qualification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emp_qualification` (
  `qual_id` int(11) NOT NULL AUTO_INCREMENT,
  `empid` int(11) NOT NULL,
  `empcode` int(11) DEFAULT NULL,
  `qualification` varchar(100) DEFAULT NULL,
  `college` varchar(100) DEFAULT NULL,
  `university` varchar(200) DEFAULT NULL,
  `yearofpassing` int(11) DEFAULT NULL,
  `percentage` float DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `createddate` int(11) DEFAULT NULL,
  `lastmodifiedby` int(11) DEFAULT NULL,
  `lastmodifieddate` int(11) DEFAULT NULL,
  `course` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`qual_id`)
) ENGINE=InnoDB AUTO_INCREMENT=125982 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emp_qualification_test`
--

DROP TABLE IF EXISTS `emp_qualification_test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emp_qualification_test` (
  `qual_id` int(11) NOT NULL AUTO_INCREMENT,
  `empid` int(11) NOT NULL,
  `empcode` int(11) DEFAULT NULL,
  `qualification` varchar(100) DEFAULT NULL,
  `college` varchar(100) DEFAULT NULL,
  `university` varchar(200) DEFAULT NULL,
  `yearofpassing` int(11) DEFAULT NULL,
  `percentage` float DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `createddate` int(11) DEFAULT NULL,
  `lastmodifiedby` int(11) DEFAULT NULL,
  `lastmodifieddate` int(11) DEFAULT NULL,
  `course` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`qual_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emp_reporting_structure`
--

DROP TABLE IF EXISTS `emp_reporting_structure`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emp_reporting_structure` (
  `sl_no` int(11) NOT NULL AUTO_INCREMENT,
  `empcode` int(10) NOT NULL,
  `reporting` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 2,
  PRIMARY KEY (`sl_no`),
  KEY `empcode` (`empcode`),
  KEY `record_status` (`record_status`)
) ENGINE=MyISAM AUTO_INCREMENT=1689 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emp_support_docs`
--

DROP TABLE IF EXISTS `emp_support_docs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emp_support_docs` (
  `doc_id` int(11) NOT NULL AUTO_INCREMENT,
  `empid` int(11) DEFAULT NULL,
  `empcode` int(11) DEFAULT NULL,
  `filename` varchar(200) DEFAULT NULL,
  `file_title` varchar(225) NOT NULL,
  `uploaded_by` int(11) NOT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  PRIMARY KEY (`doc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1484 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emp_support_docs_test`
--

DROP TABLE IF EXISTS `emp_support_docs_test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emp_support_docs_test` (
  `doc_id` int(11) NOT NULL AUTO_INCREMENT,
  `empid` int(11) DEFAULT NULL,
  `empcode` int(11) DEFAULT NULL,
  `filename` varchar(200) DEFAULT NULL,
  `file_title` varchar(225) NOT NULL,
  `uploaded_by` int(11) NOT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  PRIMARY KEY (`doc_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emp_technical`
--

DROP TABLE IF EXISTS `emp_technical`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emp_technical` (
  `techid` int(11) NOT NULL AUTO_INCREMENT,
  `empid` int(11) DEFAULT NULL,
  `technical_description` text DEFAULT NULL,
  `record_status` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` int(11) DEFAULT NULL,
  PRIMARY KEY (`techid`)
) ENGINE=MyISAM AUTO_INCREMENT=3816 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `event_feedback`
--

DROP TABLE IF EXISTS `event_feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_feedback` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `eventid` int(11) NOT NULL,
  `feedback` text NOT NULL,
  `empcode` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  `feedback_status` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `event_master`
--

DROP TABLE IF EXISTS `event_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `eventid` int(11) NOT NULL,
  `event_image` varchar(256) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=85 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `eventtitle` text NOT NULL,
  `description` text NOT NULL,
  `type` int(11) NOT NULL,
  `project` int(11) NOT NULL,
  `privateentry` int(11) NOT NULL,
  `startdate` int(11) NOT NULL,
  `enddate` int(11) NOT NULL,
  `repeat` int(11) NOT NULL,
  `self` tinyint(4) NOT NULL,
  `deptid` int(11) NOT NULL,
  `staffid` int(11) NOT NULL,
  `notify` tinyint(4) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `evnt_eventmaster`
--

DROP TABLE IF EXISTS `evnt_eventmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `evnt_eventmaster` (
  `eventid` int(11) NOT NULL AUTO_INCREMENT,
  `event_title` varchar(250) NOT NULL,
  `eventdate` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  PRIMARY KEY (`eventid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `evnt_feedback`
--

DROP TABLE IF EXISTS `evnt_feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `evnt_feedback` (
  `feebbackid` int(11) NOT NULL AUTO_INCREMENT,
  `fback_eventid` int(11) NOT NULL,
  `empname` varchar(250) NOT NULL,
  `empcode` int(11) NOT NULL,
  `empdept` varchar(11) NOT NULL,
  `fback_qid` int(11) NOT NULL,
  `fback_answer` longtext NOT NULL,
  `createdon` varchar(225) NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`feebbackid`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `evnt_linkanswerquestions`
--

DROP TABLE IF EXISTS `evnt_linkanswerquestions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `evnt_linkanswerquestions` (
  `ansid` int(100) NOT NULL AUTO_INCREMENT,
  `answer` text NOT NULL,
  `qid` int(100) NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(20) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`ansid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='table is for having answer id and answer for related questio';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `evnt_linkeventquestion`
--

DROP TABLE IF EXISTS `evnt_linkeventquestion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `evnt_linkeventquestion` (
  `eventlinkid` int(11) NOT NULL AUTO_INCREMENT,
  `eventid` int(11) NOT NULL,
  `qid` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  PRIMARY KEY (`eventlinkid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `evnt_questionmaster`
--

DROP TABLE IF EXISTS `evnt_questionmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `evnt_questionmaster` (
  `qid` int(100) NOT NULL AUTO_INCREMENT,
  `question` text NOT NULL,
  `typeid` int(11) NOT NULL COMMENT '1 for checkbox,2 for radio,3 for textarea. ',
  `createdon` int(11) NOT NULL,
  `createdby` int(20) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`qid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='table is for questionid,question who ever is created by.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `excepted_collection`
--

DROP TABLE IF EXISTS `excepted_collection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `excepted_collection` (
  `collectionid` int(11) NOT NULL AUTO_INCREMENT,
  `Party` varchar(256) NOT NULL,
  `Amount` int(11) NOT NULL,
  `status` enum('1','0') NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  `collection_date` int(11) NOT NULL,
  `reminder_count` int(11) NOT NULL,
  `desc` text NOT NULL,
  PRIMARY KEY (`collectionid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `family_insurance`
--

DROP TABLE IF EXISTS `family_insurance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `family_insurance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `familyid` int(11) DEFAULT NULL,
  `empid` int(11) DEFAULT NULL,
  `empcode` int(11) DEFAULT NULL,
  `relation` varchar(15) DEFAULT NULL,
  `isagreed` tinyint(3) DEFAULT NULL,
  `createdon` int(11) DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `updatedon` int(11) DEFAULT NULL,
  `updatedby` int(11) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=398 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `google_codes`
--

DROP TABLE IF EXISTS `google_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `google_codes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empcode` varchar(20) NOT NULL,
  `google_auth_code` varchar(20) NOT NULL,
  `isAddDevice` tinyint(3) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` tinyint(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6925 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gwinfoabout`
--

DROP TABLE IF EXISTS `gwinfoabout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gwinfoabout` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gwp_addressing`
--

DROP TABLE IF EXISTS `gwp_addressing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gwp_addressing` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `mailid` varchar(100) NOT NULL,
  `addressdate` int(11) NOT NULL,
  `addresstype` int(11) NOT NULL COMMENT '1-suggestion,2-complaint',
  `subject` text NOT NULL,
  `infoabout` int(11) NOT NULL COMMENT '1-sales,2-presales.3-SD',
  `improvement` text NOT NULL,
  `suggestions` text NOT NULL,
  `attachment` varchar(50) NOT NULL,
  `displayname` varchar(100) NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  `createdon` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gwp_appreciation`
--

DROP TABLE IF EXISTS `gwp_appreciation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gwp_appreciation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `mailid` varchar(100) NOT NULL,
  `staffname` varchar(100) NOT NULL,
  `subject` text NOT NULL,
  `department` int(11) NOT NULL,
  `details` text NOT NULL,
  `attachment` varchar(100) NOT NULL,
  `displayname` varchar(100) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  `createdby` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gwp_inviting`
--

DROP TABLE IF EXISTS `gwp_inviting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gwp_inviting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `mailid` varchar(100) NOT NULL,
  `ticketid` varchar(250) NOT NULL,
  `subject` text NOT NULL,
  `department` int(11) NOT NULL,
  `problemdesc` text NOT NULL,
  `expectedaction` text NOT NULL,
  `attachment` varchar(100) NOT NULL,
  `displayname` varchar(100) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  `createdby` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gwpdetails`
--

DROP TABLE IF EXISTS `gwpdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gwpdetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employeeid` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `mailid` varchar(255) NOT NULL,
  `type` int(11) NOT NULL,
  `title` text NOT NULL,
  `comments` text NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  `infoabout` int(11) NOT NULL,
  `manager` text NOT NULL,
  `improvement` text NOT NULL,
  `suggestions` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `holidaymaster`
--

DROP TABLE IF EXISTS `holidaymaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `holidaymaster` (
  `holidayid` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `location_id` varchar(10) DEFAULT NULL,
  `createdby` int(20) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`holidayid`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1 COMMENT='holiday master table to have holiday name and date of the ho';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hr_inc`
--

DROP TABLE IF EXISTS `hr_inc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hr_inc` (
  `incid` int(11) NOT NULL AUTO_INCREMENT,
  `empcode` int(11) DEFAULT NULL,
  `fullname` varchar(224) DEFAULT NULL,
  `wef` varchar(224) DEFAULT NULL,
  `nextcycle` varchar(224) DEFAULT NULL,
  `yearlyctc` bigint(50) DEFAULT NULL,
  `yearlyctc_words` varchar(224) DEFAULT NULL,
  `monthlyctc` bigint(50) DEFAULT NULL,
  `fixed` int(11) DEFAULT NULL,
  `vp` int(11) DEFAULT NULL,
  `pf` int(11) DEFAULT NULL,
  `esi` int(11) DEFAULT NULL,
  `basic` int(11) DEFAULT NULL,
  `hra` int(11) DEFAULT NULL,
  `con_allowance` int(11) DEFAULT NULL,
  `med_allowance` int(11) DEFAULT NULL,
  `lta` int(11) DEFAULT NULL,
  `sodexo` int(11) DEFAULT NULL,
  `spl_allowance` int(11) DEFAULT NULL,
  `email` varchar(224) DEFAULT NULL,
  `date` int(11) NOT NULL,
  PRIMARY KEY (`incid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hrchecklist`
--

DROP TABLE IF EXISTS `hrchecklist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hrchecklist` (
  `listid` int(11) NOT NULL AUTO_INCREMENT,
  `listname` varchar(225) DEFAULT NULL,
  `typeid` int(11) DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `createdon` int(11) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  PRIMARY KEY (`listid`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hrchecklisttypes`
--

DROP TABLE IF EXISTS `hrchecklisttypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hrchecklisttypes` (
  `typeid` int(11) NOT NULL AUTO_INCREMENT,
  `typename` varchar(225) DEFAULT NULL,
  `createdon` int(11) DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  PRIMARY KEY (`typeid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hrdropbox`
--

DROP TABLE IF EXISTS `hrdropbox`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hrdropbox` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment` text NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hrpolicies`
--

DROP TABLE IF EXISTS `hrpolicies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hrpolicies` (
  `fileid` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(224) DEFAULT NULL,
  `displayname` varchar(224) DEFAULT NULL,
  `record_status` enum('1','0') NOT NULL,
  `createddate` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `file_desc` text NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`fileid`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `indent`
--

DROP TABLE IF EXISTS `indent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `indent` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `indentid` varchar(255) NOT NULL,
  `projectcode` varchar(255) NOT NULL,
  `locationid` int(11) NOT NULL,
  `details` text NOT NULL,
  `budgetallocated` varchar(255) NOT NULL,
  `companyid` int(11) NOT NULL,
  `expecteddate` int(11) NOT NULL,
  `indentstatus` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `itil_category`
--

DROP TABLE IF EXISTS `itil_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itil_category` (
  `catid` int(11) NOT NULL AUTO_INCREMENT,
  `ticket_typeid` int(11) NOT NULL,
  `category` varchar(225) DEFAULT NULL,
  `parentcategoryid` int(11) NOT NULL,
  `createdby` int(11) DEFAULT NULL,
  `createdon` int(11) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  PRIMARY KEY (`catid`)
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `kayako_accnt_details`
--

DROP TABLE IF EXISTS `kayako_accnt_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kayako_accnt_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `staffid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `fullname` varchar(256) NOT NULL,
  `staffemail` varchar(256) NOT NULL,
  `empcode` varchar(256) NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `kpimaster`
--

DROP TABLE IF EXISTS `kpimaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kpimaster` (
  `kpi_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` longtext NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`kpi_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `kra_empprofile`
--

DROP TABLE IF EXISTS `kra_empprofile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kra_empprofile` (
  `linkid` int(11) NOT NULL AUTO_INCREMENT,
  `empcode` int(11) NOT NULL,
  `profileid` int(11) NOT NULL,
  `startdate` int(11) NOT NULL,
  `enddate` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  PRIMARY KEY (`linkid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `krakpilinking`
--

DROP TABLE IF EXISTS `krakpilinking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `krakpilinking` (
  `linkid` int(11) NOT NULL AUTO_INCREMENT,
  `kraid` int(11) NOT NULL,
  `kpi_id` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`linkid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `kramaster`
--

DROP TABLE IF EXISTS `kramaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kramaster` (
  `kraid` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`kraid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `krarating`
--

DROP TABLE IF EXISTS `krarating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `krarating` (
  `ratingid` int(11) NOT NULL AUTO_INCREMENT,
  `empid` int(11) NOT NULL,
  `month` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `weightage` float NOT NULL,
  `rating` float NOT NULL,
  `profileid` int(11) NOT NULL,
  `rmid` int(11) NOT NULL,
  `gpid` int(11) NOT NULL,
  `kraid` int(11) NOT NULL,
  `comments` text NOT NULL,
  `aggregate` float NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  `status` varchar(25) NOT NULL,
  PRIMARY KEY (`ratingid`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `leavebalance`
--

DROP TABLE IF EXISTS `leavebalance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `leavebalance` (
  `leavebalanceid` int(11) NOT NULL AUTO_INCREMENT,
  `empcode` int(11) DEFAULT NULL,
  `leavetypeid` int(11) DEFAULT NULL,
  `leavebalance` int(11) DEFAULT NULL,
  `createdby` int(11) NOT NULL,
  `createddate` int(11) NOT NULL,
  `modifieddate` int(11) NOT NULL,
  PRIMARY KEY (`leavebalanceid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `leavetypes`
--

DROP TABLE IF EXISTS `leavetypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `leavetypes` (
  `leavetypeid` int(11) NOT NULL AUTO_INCREMENT,
  `leavetypetitle` varchar(200) DEFAULT NULL,
  `leavetypecode` varchar(200) DEFAULT NULL,
  `leavetypecolor` varchar(200) DEFAULT NULL,
  `leavecount` int(11) NOT NULL,
  `record_status` enum('0','1') DEFAULT '1',
  `createdby` int(11) NOT NULL,
  `createddate` int(11) NOT NULL,
  PRIMARY KEY (`leavetypeid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `levelmaster`
--

DROP TABLE IF EXISTS `levelmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `levelmaster` (
  `levelid` int(11) NOT NULL AUTO_INCREMENT,
  `levelname` varchar(200) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  `createdby` int(11) DEFAULT NULL,
  `createddate` int(11) DEFAULT NULL,
  PRIMARY KEY (`levelid`)
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `levelmaster_june4`
--

DROP TABLE IF EXISTS `levelmaster_june4`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `levelmaster_june4` (
  `levelid` int(11) NOT NULL AUTO_INCREMENT,
  `levelname` varchar(200) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  `createdby` int(11) NOT NULL,
  `createddate` int(11) NOT NULL,
  PRIMARY KEY (`levelid`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `levelmaster_june_2020`
--

DROP TABLE IF EXISTS `levelmaster_june_2020`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `levelmaster_june_2020` (
  `levelid` int(11) NOT NULL AUTO_INCREMENT,
  `levelname` varchar(200) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  `createdby` int(11) NOT NULL,
  `createddate` int(11) NOT NULL,
  PRIMARY KEY (`levelid`)
) ENGINE=MyISAM AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `link_bills`
--

DROP TABLE IF EXISTS `link_bills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `link_bills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `billid` int(11) NOT NULL,
  `advancebillid` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `link_purchaseorder`
--

DROP TABLE IF EXISTS `link_purchaseorder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `link_purchaseorder` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sno` int(11) NOT NULL,
  `productname` text NOT NULL,
  `productdetails` text NOT NULL,
  `productcode` varchar(255) NOT NULL,
  `purchaseorderid` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `linkholidaylocations`
--

DROP TABLE IF EXISTS `linkholidaylocations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `linkholidaylocations` (
  `linkid` int(11) NOT NULL AUTO_INCREMENT,
  `locationid` int(11) NOT NULL,
  `holidayid` int(11) NOT NULL,
  `date` int(11) NOT NULL,
  `createdby` int(20) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`linkid`)
) ENGINE=InnoDB AUTO_INCREMENT=2879 DEFAULT CHARSET=latin1 COMMENT='this table is for inserting the list of holidays based on lo';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `linkprofilekra`
--

DROP TABLE IF EXISTS `linkprofilekra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `linkprofilekra` (
  `linkid` int(100) NOT NULL AUTO_INCREMENT,
  `profileid` int(100) unsigned NOT NULL,
  `kraid` int(100) unsigned NOT NULL,
  `percentage` float unsigned NOT NULL,
  `createdby` int(10) unsigned NOT NULL,
  `createdon` int(50) unsigned NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`linkid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `locationmaster`
--

DROP TABLE IF EXISTS `locationmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `locationmaster` (
  `locationid` int(11) NOT NULL AUTO_INCREMENT,
  `company` int(11) DEFAULT NULL,
  `loc_name` varchar(200) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  `createddate` int(11) DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  PRIMARY KEY (`locationid`)
) ENGINE=InnoDB AUTO_INCREMENT=586 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mail_logs`
--

DROP TABLE IF EXISTS `mail_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mail_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subject` text DEFAULT NULL,
  `body` text DEFAULT NULL,
  `toaddress` text DEFAULT NULL,
  `cc` text DEFAULT NULL,
  `bcc` text DEFAULT NULL,
  `fromaddress` text DEFAULT NULL,
  `type` varchar(200) DEFAULT NULL,
  `iscron` tinyint(3) DEFAULT 0,
  `mail_status` tinyint(3) DEFAULT NULL,
  `extra` text DEFAULT NULL,
  `createddate` int(11) DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `record_status` enum('1','0') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=190 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `manager_login`
--

DROP TABLE IF EXISTS `manager_login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `manager_login` (
  `staffid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `createdby` varchar(100) NOT NULL,
  `createdon` varchar(100) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  PRIMARY KEY (`staffid`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `menuroles`
--

DROP TABLE IF EXISTS `menuroles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `menuroles` (
  `menuroleid` int(11) NOT NULL AUTO_INCREMENT,
  `menuid` int(11) NOT NULL,
  `roleid` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createddate` int(11) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  PRIMARY KEY (`menuroleid`)
) ENGINE=InnoDB AUTO_INCREMENT=3161 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `menus`
--

DROP TABLE IF EXISTS `menus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `menus` (
  `menuid` int(11) NOT NULL AUTO_INCREMENT,
  `menuname` varchar(200) DEFAULT NULL,
  `menupath` varchar(500) NOT NULL,
  `parentmenuid` int(11) NOT NULL DEFAULT 0,
  `glyphicon` varchar(200) NOT NULL,
  `createdby` int(11) DEFAULT NULL,
  `createddate` int(11) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  `sortorder` int(11) NOT NULL,
  PRIMARY KEY (`menuid`)
) ENGINE=InnoDB AUTO_INCREMENT=296 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `my_leavebalance`
--

DROP TABLE IF EXISTS `my_leavebalance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `my_leavebalance` (
  `A` varchar(10) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empcode` int(5) DEFAULT NULL,
  `fullname` varchar(25) DEFAULT NULL,
  `staffid` varchar(10) DEFAULT NULL,
  `email` varchar(10) DEFAULT NULL,
  `clbalance` int(2) DEFAULT NULL,
  `plbalance` int(2) DEFAULT NULL,
  `special_leave` varchar(10) DEFAULT NULL,
  `maternity_leave` varchar(10) DEFAULT NULL,
  `paternity_leave` varchar(10) DEFAULT NULL,
  `createdby` int(5) DEFAULT NULL,
  `createddate` int(10) DEFAULT NULL,
  `modifieddate` int(1) DEFAULT NULL,
  `record_status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=75 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `my_rosternames`
--

DROP TABLE IF EXISTS `my_rosternames`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `my_rosternames` (
  `rosterid` int(11) NOT NULL AUTO_INCREMENT,
  `rostername` varchar(250) NOT NULL,
  `record_status` enum('0','1','2') NOT NULL,
  `startdate` int(11) NOT NULL,
  `enddate` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createddate` int(11) NOT NULL,
  `groupid` int(11) NOT NULL,
  `updatedby` int(11) NOT NULL,
  `updateddate` int(11) NOT NULL,
  PRIMARY KEY (`rosterid`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `my_rosterstaff`
--

DROP TABLE IF EXISTS `my_rosterstaff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `my_rosterstaff` (
  `rosterstaffid` int(11) NOT NULL AUTO_INCREMENT,
  `staffid` int(11) NOT NULL,
  `rosterid` int(11) NOT NULL,
  `groupid` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  `shiftid` int(11) NOT NULL,
  `shiftdate` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createddate` int(11) NOT NULL,
  PRIMARY KEY (`rosterstaffid`)
) ENGINE=InnoDB AUTO_INCREMENT=7364 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `my_shiftmaster`
--

DROP TABLE IF EXISTS `my_shiftmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `my_shiftmaster` (
  `shiftid` int(11) NOT NULL AUTO_INCREMENT,
  `shiftname` varchar(200) NOT NULL,
  `shifttitle` varchar(200) NOT NULL,
  `colorcode` varchar(20) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `shift_time` text NOT NULL,
  PRIMARY KEY (`shiftid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `new_event`
--

DROP TABLE IF EXISTS `new_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `new_event` (
  `eventid` int(11) NOT NULL AUTO_INCREMENT,
  `event_title` varchar(250) NOT NULL,
  `event_desc` text NOT NULL,
  `event_start_date` int(11) NOT NULL,
  `feedback_start_date` int(11) NOT NULL,
  `feedback_end_date` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  `venue` text NOT NULL,
  `event_time` int(11) NOT NULL,
  `event_image` varchar(256) NOT NULL,
  PRIMARY KEY (`eventid`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `newjoinee`
--

DROP TABLE IF EXISTS `newjoinee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `newjoinee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empcode` int(11) NOT NULL,
  `review` int(11) NOT NULL,
  `remindercount` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` enum('0','1','2') NOT NULL,
  `record_status_15` enum('0','1','2') NOT NULL,
  `review_15` int(11) NOT NULL,
  `record_status_45` enum('0','1','2') NOT NULL,
  `review_45` int(11) NOT NULL,
  `record_status_90` enum('0','1','2') NOT NULL,
  `review_90` int(11) NOT NULL,
  `comments_15` text NOT NULL,
  `comments_45` text NOT NULL,
  `open_ended_ques1` text NOT NULL,
  `open_ended_ques2` text NOT NULL,
  `encryptedid` varchar(256) NOT NULL,
  `comments_90` text NOT NULL,
  `comments_60` text DEFAULT NULL,
  `review_60` int(11) DEFAULT NULL,
  `record_status_60` enum('1','0','2') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=600733 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `newjoinee15_feedback`
--

DROP TABLE IF EXISTS `newjoinee15_feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `newjoinee15_feedback` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `questionid` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  `empcode` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=379 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `newjoinee15_questions`
--

DROP TABLE IF EXISTS `newjoinee15_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `newjoinee15_questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_15` text NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `newjoinee15_questions_NOV`
--

DROP TABLE IF EXISTS `newjoinee15_questions_NOV`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `newjoinee15_questions_NOV` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_15` text NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `newjoinee15_questions_NOV_bkp`
--

DROP TABLE IF EXISTS `newjoinee15_questions_NOV_bkp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `newjoinee15_questions_NOV_bkp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_15` text NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `newjoinee15_questions_latest`
--

DROP TABLE IF EXISTS `newjoinee15_questions_latest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `newjoinee15_questions_latest` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_15` text NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `newjoinee45_feedback`
--

DROP TABLE IF EXISTS `newjoinee45_feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `newjoinee45_feedback` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `questionid` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  `empcode` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=105 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `newjoinee45_questions`
--

DROP TABLE IF EXISTS `newjoinee45_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `newjoinee45_questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_45` text NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `newjoinee45_questions_NOV`
--

DROP TABLE IF EXISTS `newjoinee45_questions_NOV`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `newjoinee45_questions_NOV` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_45` text NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `newjoinee45_questions_latest`
--

DROP TABLE IF EXISTS `newjoinee45_questions_latest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `newjoinee45_questions_latest` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_15` text NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `newjoinee60_feedback`
--

DROP TABLE IF EXISTS `newjoinee60_feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `newjoinee60_feedback` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `questionid` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  `empcode` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `newjoinee60_questions_NOV`
--

DROP TABLE IF EXISTS `newjoinee60_questions_NOV`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `newjoinee60_questions_NOV` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_15` text NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `newjoinee60_questions_latest`
--

DROP TABLE IF EXISTS `newjoinee60_questions_latest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `newjoinee60_questions_latest` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_15` text NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `newjoinee90_feedback`
--

DROP TABLE IF EXISTS `newjoinee90_feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `newjoinee90_feedback` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `questionid` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  `empcode` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=131 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `newjoinee90_questions`
--

DROP TABLE IF EXISTS `newjoinee90_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `newjoinee90_questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_90` text NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `newjoinee90_questions_NOV`
--

DROP TABLE IF EXISTS `newjoinee90_questions_NOV`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `newjoinee90_questions_NOV` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_90` text NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `newjoinee90_questions_latest`
--

DROP TABLE IF EXISTS `newjoinee90_questions_latest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `newjoinee90_questions_latest` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_15` text NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `newjoinee_bp_2018Jan`
--

DROP TABLE IF EXISTS `newjoinee_bp_2018Jan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `newjoinee_bp_2018Jan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empcode` int(11) NOT NULL,
  `review` int(11) NOT NULL,
  `remindercount` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` enum('0','1','2') NOT NULL,
  `record_status_15` enum('0','1','2') NOT NULL,
  `review_15` int(11) NOT NULL,
  `record_status_45` enum('0','1','2') NOT NULL,
  `review_45` int(11) NOT NULL,
  `record_status_90` enum('0','1','2') NOT NULL,
  `review_90` int(11) NOT NULL,
  `comments_15` text NOT NULL,
  `comments_45` text NOT NULL,
  `open_ended_ques1` text NOT NULL,
  `open_ended_ques2` text NOT NULL,
  `encryptedid` varchar(256) NOT NULL,
  `comments_90` text NOT NULL,
  `comments_60` text DEFAULT NULL,
  `review_60` int(11) DEFAULT NULL,
  `record_status_60` enum('1','0','2') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=305 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `newjoineefeedback`
--

DROP TABLE IF EXISTS `newjoineefeedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `newjoineefeedback` (
  `fid` int(11) NOT NULL AUTO_INCREMENT,
  `kt` text DEFAULT NULL,
  `facilities` text DEFAULT NULL,
  `hr` text DEFAULT NULL,
  `buddy` text DEFAULT NULL,
  `manager` text DEFAULT NULL,
  `others` text DEFAULT NULL,
  `likes` text DEFAULT NULL,
  `rating` int(11) NOT NULL,
  `createdby` int(11) DEFAULT NULL,
  `createdon` int(11) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  PRIMARY KEY (`fid`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `newjoinne_feedback15_report`
--

DROP TABLE IF EXISTS `newjoinne_feedback15_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `newjoinne_feedback15_report` (
  `newjoin_15_id` int(11) NOT NULL AUTO_INCREMENT,
  `empcode` int(11) NOT NULL,
  `deptid` int(11) NOT NULL,
  `teamid` int(11) NOT NULL,
  `q1` int(11) NOT NULL,
  `q2` int(11) NOT NULL,
  `q3` int(11) NOT NULL,
  `q4` int(11) NOT NULL,
  `q5` int(11) NOT NULL,
  `q6` int(11) NOT NULL,
  `q7` int(11) NOT NULL,
  `q8` int(11) NOT NULL,
  `q9` int(11) NOT NULL,
  `q10` int(11) NOT NULL,
  `q11` int(11) NOT NULL,
  `q12` varchar(250) DEFAULT NULL,
  `q13` varchar(250) DEFAULT NULL,
  `q14` varchar(250) DEFAULT NULL,
  `q15` varchar(250) DEFAULT NULL,
  `q16` varchar(250) DEFAULT NULL,
  `q17` varchar(250) DEFAULT NULL,
  `q18` varchar(250) DEFAULT NULL,
  `experience` varchar(250) DEFAULT NULL,
  `hr_induction` varchar(250) DEFAULT NULL,
  `business_induction` varchar(250) DEFAULT NULL,
  `hr_related` text NOT NULL,
  `comp_cul` text NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` int(11) NOT NULL,
  PRIMARY KEY (`newjoin_15_id`)
) ENGINE=MyISAM AUTO_INCREMENT=618 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `newjoinne_feedback45_report`
--

DROP TABLE IF EXISTS `newjoinne_feedback45_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `newjoinne_feedback45_report` (
  `newjoin_45_id` int(11) NOT NULL AUTO_INCREMENT,
  `empcode` int(11) NOT NULL,
  `q1` int(11) NOT NULL,
  `q2` int(11) NOT NULL,
  `q3` int(11) NOT NULL,
  `q4` int(11) NOT NULL,
  `q5` int(11) NOT NULL,
  `q6` int(11) NOT NULL,
  `q7` int(11) NOT NULL,
  `q8` int(11) NOT NULL,
  `q9` int(11) NOT NULL,
  `q10` int(11) NOT NULL,
  `q11` int(11) NOT NULL,
  `CompCul` text NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` int(11) NOT NULL,
  `q12` int(11) NOT NULL,
  `q13` int(11) NOT NULL,
  `q14` int(11) NOT NULL,
  `q15` int(11) NOT NULL,
  `q16` int(11) NOT NULL,
  `hr_related` text NOT NULL,
  PRIMARY KEY (`newjoin_45_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `newjoinne_feedback60_report`
--

DROP TABLE IF EXISTS `newjoinne_feedback60_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `newjoinne_feedback60_report` (
  `newjoin_45_id` int(11) NOT NULL AUTO_INCREMENT,
  `empcode` int(11) NOT NULL,
  `q1` int(11) NOT NULL,
  `q2` int(11) NOT NULL,
  `q3` int(11) NOT NULL,
  `q4` int(11) NOT NULL,
  `q5` int(11) NOT NULL,
  `q6` int(11) NOT NULL,
  `q7` int(11) NOT NULL,
  `regular` text DEFAULT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` int(11) NOT NULL,
  `future` text DEFAULT NULL,
  PRIMARY KEY (`newjoin_45_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `newjoinne_feedback90_report`
--

DROP TABLE IF EXISTS `newjoinne_feedback90_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `newjoinne_feedback90_report` (
  `newjoin_90_id` int(11) NOT NULL AUTO_INCREMENT,
  `empcode` int(11) NOT NULL,
  `q1` int(11) NOT NULL,
  `q2` int(11) NOT NULL,
  `q3` int(11) NOT NULL,
  `q4` int(11) NOT NULL,
  `q5` int(11) NOT NULL,
  `q6` int(11) NOT NULL,
  `q7` int(11) NOT NULL,
  `q8` int(11) NOT NULL,
  `q9` int(11) NOT NULL,
  `q10` int(11) NOT NULL,
  `CompCul` text NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` int(11) NOT NULL,
  `hr_related` text NOT NULL,
  `work_related` text NOT NULL,
  `work_place` text DEFAULT NULL,
  `growth` text DEFAULT NULL,
  `manager` text DEFAULT NULL,
  `develop` text DEFAULT NULL,
  `future` text DEFAULT NULL,
  `opportunity` text DEFAULT NULL,
  `adequate` text DEFAULT NULL,
  `past` text DEFAULT NULL,
  `experience` text DEFAULT NULL,
  `competitive` text DEFAULT NULL,
  PRIMARY KEY (`newjoin_90_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `newjoinne_feedback_buddy_report`
--

DROP TABLE IF EXISTS `newjoinne_feedback_buddy_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `newjoinne_feedback_buddy_report` (
  `newjoin_15_id` int(11) NOT NULL AUTO_INCREMENT,
  `empcode` int(11) NOT NULL,
  `q1` int(11) NOT NULL,
  `q2` int(11) NOT NULL,
  `q3` int(11) NOT NULL,
  `q4` int(11) NOT NULL,
  `q5` int(11) NOT NULL,
  `q6` int(11) NOT NULL,
  `q7` int(11) NOT NULL,
  `q8` int(11) NOT NULL,
  `q9` int(11) NOT NULL,
  `q10` int(11) NOT NULL,
  `q11` int(11) NOT NULL,
  `hr_related` text NOT NULL,
  `comp_cul` text NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` int(11) NOT NULL,
  PRIMARY KEY (`newjoin_15_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `particular`
--

DROP TABLE IF EXISTS `particular`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `particular` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `password_history`
--

DROP TABLE IF EXISTS `password_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `createdon` varchar(100) DEFAULT NULL,
  `ipaddress` varchar(100) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2296 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pdcheques`
--

DROP TABLE IF EXISTS `pdcheques`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pdcheques` (
  `chequeid` int(11) NOT NULL AUTO_INCREMENT,
  `chequedate` int(11) DEFAULT NULL,
  `chequeno` int(11) NOT NULL,
  `party` varchar(224) DEFAULT NULL,
  `amount` float(10,2) DEFAULT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`chequeid`)
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `policyforms`
--

DROP TABLE IF EXISTS `policyforms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `policyforms` (
  `policyformid` int(11) NOT NULL AUTO_INCREMENT,
  `policyid` int(11) NOT NULL,
  `filename` varchar(200) NOT NULL,
  `displayname` varchar(200) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  PRIMARY KEY (`policyformid`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `profilemaster`
--

DROP TABLE IF EXISTS `profilemaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profilemaster` (
  `profileid` int(50) NOT NULL AUTO_INCREMENT COMMENT 'id of the profile',
  `title` varchar(100) CHARACTER SET utf8 NOT NULL COMMENT 'title for the profile',
  `description` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT 'description for the profile',
  `createdon` int(50) unsigned NOT NULL COMMENT 'profile date',
  `createdby` tinyint(5) unsigned NOT NULL COMMENT 'profile created by user',
  `record_status` enum('0','1') NOT NULL COMMENT 'status for the profile',
  PRIMARY KEY (`profileid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COMMENT='profile master table';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `project_assignee`
--

DROP TABLE IF EXISTS `project_assignee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project_assignee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `taskid` int(11) NOT NULL,
  `assigneeid` int(11) NOT NULL,
  `percentage` varchar(255) NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `project_attachments`
--

DROP TABLE IF EXISTS `project_attachments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project_attachments` (
  `acttachid` int(11) NOT NULL AUTO_INCREMENT,
  `projectid` int(11) NOT NULL,
  `attachment` varchar(256) NOT NULL,
  `display` varchar(256) NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` int(11) NOT NULL,
  PRIMARY KEY (`acttachid`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `project_companies`
--

DROP TABLE IF EXISTS `project_companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project_companies` (
  `companyid` int(11) NOT NULL AUTO_INCREMENT,
  `companyname` varchar(256) NOT NULL,
  PRIMARY KEY (`companyid`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `project_priority`
--

DROP TABLE IF EXISTS `project_priority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project_priority` (
  `priorityid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  PRIMARY KEY (`priorityid`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `project_reflink`
--

DROP TABLE IF EXISTS `project_reflink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project_reflink` (
  `reflinkid` int(11) NOT NULL AUTO_INCREMENT,
  `projectid` int(11) NOT NULL,
  `reflink` text NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` int(11) NOT NULL,
  PRIMARY KEY (`reflinkid`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `project_status`
--

DROP TABLE IF EXISTS `project_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project_status` (
  `statusid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  PRIMARY KEY (`statusid`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `project_taskpriorities`
--

DROP TABLE IF EXISTS `project_taskpriorities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project_taskpriorities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `project_tasktype`
--

DROP TABLE IF EXISTS `project_tasktype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project_tasktype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tasktype` varchar(255) NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `project_type`
--

DROP TABLE IF EXISTS `project_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project_type` (
  `typeid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  PRIMARY KEY (`typeid`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projects` (
  `projectid` int(11) NOT NULL AUTO_INCREMENT,
  `companyid` int(11) NOT NULL,
  `projectname` varchar(256) NOT NULL,
  `project_type` int(11) NOT NULL,
  `priority` int(11) NOT NULL,
  `description` text NOT NULL,
  `status` int(11) NOT NULL,
  `owner` varchar(256) NOT NULL,
  `ownerdept` int(11) NOT NULL,
  `startdate` int(11) NOT NULL,
  `enddate` int(11) NOT NULL,
  `duration` int(11) NOT NULL,
  `estimatebudget` float NOT NULL,
  `followers` varchar(256) NOT NULL,
  `userdept` varchar(256) NOT NULL,
  `staff` varchar(256) NOT NULL,
  `opfno` int(11) NOT NULL,
  `activestatus` varchar(100) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` int(11) NOT NULL,
  PRIMARY KEY (`projectid`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `projecttask`
--

DROP TABLE IF EXISTS `projecttask`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projecttask` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `projectid` int(11) NOT NULL,
  `prorityid` int(11) NOT NULL,
  `tasktypeid` int(11) NOT NULL,
  `startdate` int(11) NOT NULL,
  `enddate` int(11) NOT NULL,
  `duration` int(11) NOT NULL,
  `repeatid` int(11) NOT NULL,
  `deptid` int(11) NOT NULL,
  `ownerid` int(11) NOT NULL,
  `parenttaskid` int(11) NOT NULL,
  `followerid` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `projecttask_attachments`
--

DROP TABLE IF EXISTS `projecttask_attachments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projecttask_attachments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `taskid` int(11) NOT NULL,
  `attachments` varchar(255) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `projecttask_relatedtickets`
--

DROP TABLE IF EXISTS `projecttask_relatedtickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projecttask_relatedtickets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `taskid` int(11) NOT NULL,
  `relatedticket` varchar(255) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `purchase_approval_status`
--

DROP TABLE IF EXISTS `purchase_approval_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `purchase_approval_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phead_id` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `approval_status` int(11) NOT NULL,
  `remarks` text COLLATE latin1_general_ci NOT NULL,
  `storeid` int(11) NOT NULL,
  `record_status` enum('1','0') COLLATE latin1_general_ci NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `approved_status` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `purchasemanager_approval_status`
--

DROP TABLE IF EXISTS `purchasemanager_approval_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `purchasemanager_approval_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pmng_id` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `approval_status` int(11) NOT NULL,
  `remarks` text COLLATE latin1_general_ci NOT NULL,
  `storeid` int(11) NOT NULL,
  `record_status` enum('1','0') COLLATE latin1_general_ci NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `approved_status` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `purchasematerial_approval_status`
--

DROP TABLE IF EXISTS `purchasematerial_approval_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `purchasematerial_approval_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pmng_id` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `approval_status` int(11) NOT NULL,
  `remarks` text COLLATE latin1_general_ci NOT NULL,
  `storeid` int(11) NOT NULL,
  `record_status` enum('1','0') COLLATE latin1_general_ci NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `approved_status` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `purchaseorder`
--

DROP TABLE IF EXISTS `purchaseorder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `purchaseorder` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `party` varchar(255) NOT NULL,
  `typeid` int(11) NOT NULL,
  `kindattention` varchar(255) NOT NULL,
  `locationid` int(11) NOT NULL,
  `deliverydate` int(11) NOT NULL,
  `mobileno` int(11) NOT NULL,
  `currencyid` int(11) NOT NULL,
  `currencyconvert` varchar(255) NOT NULL,
  `warranty` text NOT NULL,
  `freightdetails` text NOT NULL,
  `narration` text NOT NULL,
  `dcno` int(11) NOT NULL,
  `uom` varchar(12) NOT NULL,
  `quantity` int(8) NOT NULL,
  `discount` int(8) NOT NULL,
  `rate` int(8) NOT NULL,
  `gross` int(8) NOT NULL,
  `others` char(10) NOT NULL,
  `warrantyupto` int(11) NOT NULL,
  `excisedutyamount` int(8) NOT NULL,
  `vat` int(8) NOT NULL,
  `total` int(8) NOT NULL,
  `roundoff` char(15) NOT NULL,
  `remarks` char(15) NOT NULL,
  `additionalinformation` text NOT NULL,
  `shippingaddress` text NOT NULL,
  `organization` char(20) NOT NULL,
  `building` varchar(255) NOT NULL,
  `roomnumber` varchar(255) NOT NULL,
  `attentionto` char(20) NOT NULL,
  `requireddate` int(11) NOT NULL,
  `primarylocation` varchar(20) NOT NULL,
  `secondarylocation` varchar(20) NOT NULL,
  `delivery1` text NOT NULL,
  `delivery2` text NOT NULL,
  `delivery3` text NOT NULL,
  `delivery4` text NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `qualificationmaster`
--

DROP TABLE IF EXISTS `qualificationmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `qualificationmaster` (
  `qualificationid` int(11) NOT NULL AUTO_INCREMENT,
  `qualification` varchar(200) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  `createdby` int(11) NOT NULL,
  `createddate` int(11) NOT NULL,
  PRIMARY KEY (`qualificationid`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `questionnarie`
--

DROP TABLE IF EXISTS `questionnarie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `questionnarie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `questionno` varchar(250) NOT NULL,
  `answer` varchar(500) NOT NULL,
  `360reviewerid` int(11) NOT NULL,
  `staffid` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=392 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `questionnarienew`
--

DROP TABLE IF EXISTS `questionnarienew`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `questionnarienew` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `questionno` varchar(250) NOT NULL,
  `rating` varchar(10) NOT NULL,
  `comments` text NOT NULL,
  `360reviewerid` int(11) NOT NULL,
  `staffid` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=121 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `questionrating`
--

DROP TABLE IF EXISTS `questionrating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `questionrating` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rating` varchar(30) NOT NULL,
  `questionid` int(11) NOT NULL,
  `empcode` int(11) NOT NULL,
  `managerid` int(11) NOT NULL,
  `360reviewerid` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=34725 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `questions` (
  `question` longtext NOT NULL,
  `qid` int(11) NOT NULL AUTO_INCREMENT,
  `typeid` int(11) NOT NULL,
  `sortorder` int(11) NOT NULL,
  `que_group` varchar(100) NOT NULL,
  `subgroup` varchar(100) NOT NULL,
  `departmentgroup` varchar(200) NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` int(11) NOT NULL,
  PRIMARY KEY (`qid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `questions_bkp`
--

DROP TABLE IF EXISTS `questions_bkp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `questions_bkp` (
  `qid` int(11) NOT NULL AUTO_INCREMENT,
  `question` text NOT NULL,
  `typeid` int(11) NOT NULL,
  `sortorder` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` int(11) NOT NULL,
  PRIMARY KEY (`qid`)
) ENGINE=MyISAM AUTO_INCREMENT=61 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `quicklinks`
--

DROP TABLE IF EXISTS `quicklinks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quicklinks` (
  `linkid` int(11) NOT NULL AUTO_INCREMENT,
  `link_name` varchar(250) NOT NULL,
  `link` text NOT NULL,
  `createdon` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  `class` varchar(256) NOT NULL,
  PRIMARY KEY (`linkid`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `record_status`
--

DROP TABLE IF EXISTS `record_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `record_status` (
  `extension_id` int(11) NOT NULL AUTO_INCREMENT,
  `profileid` int(11) NOT NULL,
  `kraid` int(11) NOT NULL,
  `createddate` int(11) NOT NULL,
  `created_by` enum('0','1') NOT NULL,
  `record_status` int(11) NOT NULL,
  PRIMARY KEY (`extension_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reset2fa_otp_details`
--

DROP TABLE IF EXISTS `reset2fa_otp_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reset2fa_otp_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `otp` varchar(20) NOT NULL,
  `createdon` varchar(100) DEFAULT NULL,
  `ipaddress` varchar(100) DEFAULT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=213 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reviewer`
--

DROP TABLE IF EXISTS `reviewer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reviewer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `staffid` int(11) NOT NULL,
  `reviewerid` int(11) NOT NULL,
  `review` tinyint(2) NOT NULL,
  `remindercount` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1029 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reviewer_test`
--

DROP TABLE IF EXISTS `reviewer_test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reviewer_test` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `staffid` int(11) NOT NULL,
  `reviewerid` int(11) NOT NULL,
  `review` tinyint(2) NOT NULL,
  `remindercount` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reviewerteams`
--

DROP TABLE IF EXISTS `reviewerteams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reviewerteams` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `deptid` int(11) NOT NULL,
  `teamid` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=230 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reviewerteams_test`
--

DROP TABLE IF EXISTS `reviewerteams_test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reviewerteams_test` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `deptid` int(11) NOT NULL,
  `teamid` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=81 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rolesmaster`
--

DROP TABLE IF EXISTS `rolesmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rolesmaster` (
  `roleid` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(225) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  `createddate` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  PRIMARY KEY (`roleid`)
) ENGINE=InnoDB AUTO_INCREMENT=969 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `share_employee`
--

DROP TABLE IF EXISTS `share_employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `share_employee` (
  `shareid` int(11) NOT NULL AUTO_INCREMENT,
  `empcode` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  `share_message` text NOT NULL,
  `pagename` varchar(256) NOT NULL,
  `feedback_status` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`shareid`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `staffleaves`
--

DROP TABLE IF EXISTS `staffleaves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staffleaves` (
  `leaveid` int(11) NOT NULL AUTO_INCREMENT,
  `empcode` int(11) DEFAULT NULL,
  `leavetypeid` int(11) DEFAULT NULL,
  `status` enum('pending','approved','reject','cancel') DEFAULT 'pending',
  `leavefrom` int(11) DEFAULT NULL,
  `leaveto` int(11) NOT NULL,
  `leavedays` float NOT NULL,
  `halfday` enum('on','off') NOT NULL DEFAULT 'off',
  `halfdaytype` enum('firsthalf','secondhalf') DEFAULT NULL,
  `appliedon` int(11) NOT NULL,
  `reporting` int(11) NOT NULL,
  `approverid` int(11) NOT NULL,
  `approvedon` int(11) NOT NULL,
  `approverreason` varchar(250) NOT NULL,
  `reason` varchar(200) NOT NULL,
  `contactaddress` text NOT NULL,
  `contactno` varchar(20) NOT NULL,
  `alt_contactno` varchar(20) NOT NULL,
  `lastmodified` int(11) NOT NULL,
  PRIMARY KEY (`leaveid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `statutory`
--

DROP TABLE IF EXISTS `statutory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `statutory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `referencenumber` varchar(50) NOT NULL,
  `particular` varchar(100) NOT NULL,
  `department` int(11) NOT NULL,
  `periodofmonth` int(11) NOT NULL,
  `liabilitymonth` int(11) NOT NULL,
  `paidamount` int(11) NOT NULL,
  `challannumber` varchar(100) NOT NULL,
  `challandate` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `modifiedon` int(11) NOT NULL,
  `modifiedby` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `storage_approval_status`
--

DROP TABLE IF EXISTS `storage_approval_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `storage_approval_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `approval_status` int(11) NOT NULL,
  `remarks` text COLLATE latin1_general_ci NOT NULL,
  `storeid` int(11) NOT NULL,
  `record_status` enum('1','0') COLLATE latin1_general_ci NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `approved_status` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=125 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `storage_auditlogs`
--

DROP TABLE IF EXISTS `storage_auditlogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `storage_auditlogs` (
  `logid` int(11) NOT NULL AUTO_INCREMENT,
  `regid` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `inwardno` varchar(225) NOT NULL,
  `createddate` int(11) NOT NULL,
  `empcode` varchar(200) NOT NULL,
  `createdby` int(11) NOT NULL,
  `primaryid` int(11) NOT NULL,
  `primary_processid` varchar(256) NOT NULL,
  PRIMARY KEY (`logid`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `storage_auditlogsdetails`
--

DROP TABLE IF EXISTS `storage_auditlogsdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `storage_auditlogsdetails` (
  `logid` int(11) NOT NULL AUTO_INCREMENT,
  `store_id` varchar(100) NOT NULL,
  `status` int(11) NOT NULL,
  `remarks` varchar(225) NOT NULL,
  `createddate` int(11) NOT NULL,
  `empcode` varchar(200) NOT NULL,
  `createdby` int(11) NOT NULL,
  PRIMARY KEY (`logid`)
) ENGINE=MyISAM AUTO_INCREMENT=54 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `storage_status`
--

DROP TABLE IF EXISTS `storage_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `storage_status` (
  `statusid` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('1','0') COLLATE latin1_general_ci NOT NULL,
  PRIMARY KEY (`statusid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `store_warehouse`
--

DROP TABLE IF EXISTS `store_warehouse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `store_warehouse` (
  `ware_id` int(11) NOT NULL AUTO_INCREMENT,
  `warehouse_name` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `created_on` int(11) NOT NULL,
  `created_by` varchar(256) COLLATE latin1_general_ci NOT NULL,
  `record_status` enum('1','0') COLLATE latin1_general_ci NOT NULL,
  PRIMARY KEY (`ware_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `storefile_attachment`
--

DROP TABLE IF EXISTS `storefile_attachment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `storefile_attachment` (
  `imgid` int(11) NOT NULL AUTO_INCREMENT,
  `store_id` varchar(100) NOT NULL,
  `empcode` varchar(100) NOT NULL,
  `attachment` varchar(100) NOT NULL,
  `display` varchar(100) NOT NULL,
  `createdon` varchar(100) NOT NULL,
  `createdby` varchar(100) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  PRIMARY KEY (`imgid`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swstaff`
--

DROP TABLE IF EXISTS `swstaff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swstaff` (
  `staffid` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `lastname` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `fullname` varchar(200) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `username` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `staffpassword` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `islegacypassword` smallint(6) NOT NULL DEFAULT 0,
  `designation` varchar(200) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `greeting` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `staffgroupid` int(11) NOT NULL DEFAULT 0,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `mobilenumber` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `statusmessage` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `lastprofileupdate` int(11) NOT NULL DEFAULT 0,
  `lastvisit` int(11) NOT NULL DEFAULT 0,
  `lastvisit2` int(11) NOT NULL DEFAULT 0,
  `lastactivity` int(11) NOT NULL DEFAULT 0,
  `enabledst` smallint(6) NOT NULL DEFAULT 0,
  `startofweek` int(11) NOT NULL DEFAULT 1,
  `pmunread` int(11) NOT NULL DEFAULT 0,
  `groupassigns` smallint(6) NOT NULL DEFAULT 1,
  `enablepmalerts` smallint(6) NOT NULL DEFAULT 1,
  `enablepmjsalerts` smallint(6) NOT NULL DEFAULT 1,
  `ticketviewid` int(11) NOT NULL DEFAULT 0,
  `isenabled` smallint(6) NOT NULL DEFAULT 1,
  `passwordupdatetimeline` int(11) NOT NULL DEFAULT 0,
  `iprestriction` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `timezonephp` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`staffid`),
  KEY `staff1` (`staffgroupid`)
) ENGINE=InnoDB AUTO_INCREMENT=2052 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `teamfeedback_skill`
--

DROP TABLE IF EXISTS `teamfeedback_skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teamfeedback_skill` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `staffid` int(11) NOT NULL,
  `reviewerid` int(11) NOT NULL,
  `review` tinyint(2) NOT NULL,
  `remindercount` int(11) NOT NULL,
  `groupid` int(11) DEFAULT NULL,
  `departmentid` int(11) DEFAULT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `teamfeedback_skill_answer`
--

DROP TABLE IF EXISTS `teamfeedback_skill_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teamfeedback_skill_answer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(100) DEFAULT NULL,
  `rating` longtext DEFAULT NULL,
  `comment` longtext DEFAULT NULL,
  `empcode` int(11) DEFAULT NULL,
  `managerid` int(11) DEFAULT NULL,
  `360reviewerid` int(11) DEFAULT NULL,
  `staffid` int(11) NOT NULL,
  `groupid` int(11) DEFAULT NULL,
  `departmentid` int(11) DEFAULT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `teammaster`
--

DROP TABLE IF EXISTS `teammaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teammaster` (
  `teamid` int(11) NOT NULL AUTO_INCREMENT,
  `departmentid` int(11) DEFAULT NULL,
  `teamname` varchar(200) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  `createdby` int(11) NOT NULL,
  `createddate` int(11) NOT NULL,
  PRIMARY KEY (`teamid`)
) ENGINE=InnoDB AUTO_INCREMENT=1611 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `test`
--

DROP TABLE IF EXISTS `test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test` (
  `empcode` int(11) NOT NULL,
  `hrdob` varchar(50) NOT NULL,
  `hrdoj` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `type_category`
--

DROP TABLE IF EXISTS `type_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `type_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` longtext NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` varchar(100) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=89 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `type_category_manager`
--

DROP TABLE IF EXISTS `type_category_manager`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `type_category_manager` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cat_id` int(11) NOT NULL,
  `account_manager` varchar(100) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` varchar(100) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=223 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `types`
--

DROP TABLE IF EXISTS `types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `types` (
  `typeid` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `parenttypeid` int(11) NOT NULL,
  `sortorder` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`typeid`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usergroups`
--

DROP TABLE IF EXISTS `usergroups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usergroups` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `usergroup` varchar(100) DEFAULT NULL,
  `usergroupcode` enum('U','SU') DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `createddate` int(11) DEFAULT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vendor_attachments`
--

DROP TABLE IF EXISTS `vendor_attachments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vendor_attachments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vendorid` int(11) NOT NULL,
  `attachments` text NOT NULL,
  `display_name` varchar(30) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vendor_category`
--

DROP TABLE IF EXISTS `vendor_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vendor_category` (
  `catid` int(11) NOT NULL AUTO_INCREMENT,
  `category` text NOT NULL,
  `parentcategoryid` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`catid`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vendor_info`
--

DROP TABLE IF EXISTS `vendor_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vendor_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `referencenumber` varchar(100) NOT NULL,
  `reference_no` varchar(50) NOT NULL,
  `vendortype` int(11) NOT NULL,
  `vendorid` varchar(100) NOT NULL,
  `vendorname` varchar(100) NOT NULL,
  `mobilenumber` varchar(20) NOT NULL,
  `companyid` int(11) NOT NULL,
  `accountmanager` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `ponumber` varchar(30) NOT NULL,
  `podetails` text NOT NULL,
  `mrnnumber` varchar(50) NOT NULL,
  `invoicenumber` varchar(50) NOT NULL,
  `projectcode` varchar(50) NOT NULL,
  `pannumber` varchar(50) NOT NULL,
  `periodofmonth` int(11) NOT NULL,
  `category` int(11) NOT NULL,
  `subcategory` int(11) NOT NULL,
  `vendor_amount` int(11) NOT NULL,
  `vendor_remarks` text NOT NULL,
  `bill_related_to` varchar(50) NOT NULL COMMENT '1-Advance,2-LC/BG,3-Others',
  `checkfavour` varchar(50) NOT NULL,
  `vendorbankdetails` varchar(50) NOT NULL,
  `bankaccnumber` varchar(50) NOT NULL,
  `accountname` varchar(50) NOT NULL,
  `bankname` varchar(50) NOT NULL,
  `branch` varchar(50) NOT NULL,
  `ifsccode` varchar(50) NOT NULL,
  `approvalstatus` tinyint(1) NOT NULL,
  `manager_amount` int(11) NOT NULL,
  `manager_remarks` text NOT NULL,
  `tdsmode` int(11) NOT NULL COMMENT '1-basic amount,2-total invoice',
  `tdspercentage` int(11) NOT NULL,
  `deductionamount` int(11) NOT NULL,
  `netamount` int(11) NOT NULL,
  `modeofpayment` varchar(50) NOT NULL,
  `paymenttype` int(11) NOT NULL,
  `utrnumber` varchar(100) NOT NULL,
  `transnumber` varchar(100) NOT NULL,
  `paidamount` int(11) NOT NULL,
  `acc_chequee_dd` varchar(50) NOT NULL,
  `acc_bank` varchar(50) NOT NULL,
  `acc_bankno` varchar(50) NOT NULL,
  `acc_mgr_remarks` text NOT NULL,
  `acc_document_received` int(11) NOT NULL,
  `process_remarks` text NOT NULL,
  `acc_receiveddate` int(11) NOT NULL,
  `return_remarks` varchar(100) NOT NULL,
  `transfer_remarks` varchar(100) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `modifiedby` int(11) NOT NULL,
  `modifiedon` int(11) NOT NULL,
  `statusid` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `weeklyoffs`
--

DROP TABLE IF EXISTS `weeklyoffs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `weeklyoffs` (
  `weekoffid` int(11) NOT NULL AUTO_INCREMENT,
  `departmentid` int(11) DEFAULT NULL,
  `weekoff_type` enum('5','6') DEFAULT NULL,
  `second_saturday` enum('yes','no') DEFAULT NULL,
  `createddate` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  PRIMARY KEY (`weekoffid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-25 15:02:40
