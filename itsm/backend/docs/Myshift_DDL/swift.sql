-- MariaDB dump 10.19  Distrib 10.4.25-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: swift
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
-- Current Database: `swift`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `swift` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `swift`;

--
-- Table structure for table `approval_types`
--

DROP TABLE IF EXISTS `approval_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `approval_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `approval_type` varchar(50) NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_dt` date DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `modified_dt` date DEFAULT NULL,
  `record_status` int(1) NOT NULL DEFAULT 1,
  `sales_type` int(11) DEFAULT NULL COMMENT '1->Channels, 2->Online, 3->Others',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1 COMMENT='Work flow list';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `callerhistory`
--

DROP TABLE IF EXISTS `callerhistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `callerhistory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` varchar(200) NOT NULL,
  `agentid` varchar(200) NOT NULL,
  `agentname` varchar(200) NOT NULL,
  `callerid` varchar(200) NOT NULL,
  `calltype` varchar(200) NOT NULL,
  `customerinputs` text NOT NULL,
  `agentinputs` text NOT NULL,
  `coratype` varchar(200) NOT NULL COMMENT 'Customer/Agent',
  `startdatetime` datetime NOT NULL,
  `enddatetime` datetime NOT NULL,
  `orgname` varchar(200) NOT NULL,
  `orgemailid` varchar(200) NOT NULL,
  `callback` varchar(200) NOT NULL DEFAULT 'no',
  `callbackdatetime` datetime NOT NULL,
  `calledback` varchar(200) NOT NULL DEFAULT 'no',
  `calledbackdatetime` datetime NOT NULL,
  `calledbackcomments` text NOT NULL,
  `callbackagentname` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1689 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ci_sessions`
--

DROP TABLE IF EXISTS `ci_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ci_sessions` (
  `session_id` varchar(40) NOT NULL DEFAULT '0',
  `ip_address` varchar(45) NOT NULL DEFAULT '0',
  `user_agent` varchar(120) NOT NULL,
  `last_activity` int(10) unsigned NOT NULL DEFAULT 0,
  `user_data` text NOT NULL,
  PRIMARY KEY (`session_id`),
  KEY `last_activity_idx` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cms_api_logs`
--

DROP TABLE IF EXISTS `cms_api_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_api_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uri` varchar(255) NOT NULL,
  `method` varchar(6) NOT NULL,
  `params` text DEFAULT NULL,
  `api_key` varchar(40) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `time` int(11) NOT NULL,
  `rtime` float DEFAULT NULL,
  `authorized` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cms_groups`
--

DROP TABLE IF EXISTS `cms_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_groups` (
  `group_id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(10) NOT NULL DEFAULT 0,
  `group_name` varchar(100) NOT NULL,
  `sorting_order` int(3) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_by` varchar(50) NOT NULL,
  `status` int(1) NOT NULL,
  PRIMARY KEY (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cms_menugroups`
--

DROP TABLE IF EXISTS `cms_menugroups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_menugroups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `groupname` varchar(45) DEFAULT NULL,
  `permissions` varchar(1000) DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `modifiedby` int(11) DEFAULT NULL,
  `createdon` int(11) DEFAULT NULL,
  `modifiedon` int(11) DEFAULT 0,
  `usertype` varchar(45) DEFAULT NULL,
  `record_status` int(1) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cms_menupermissions`
--

DROP TABLE IF EXISTS `cms_menupermissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_menupermissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) DEFAULT NULL,
  `moduleid` int(11) DEFAULT NULL,
  `submoduleid` int(11) DEFAULT NULL,
  `menuid` int(11) DEFAULT NULL,
  `createddate` int(11) DEFAULT NULL,
  `modifieddate` int(11) DEFAULT NULL,
  `record_status` int(11) DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `modifiedby` int(11) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cms_menus`
--

DROP TABLE IF EXISTS `cms_menus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_menus` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `submoduleid` int(11) DEFAULT NULL,
  `menutitle` varchar(200) DEFAULT NULL,
  `menupath` varchar(200) DEFAULT NULL,
  `class` varchar(100) DEFAULT NULL,
  `menupara` varchar(200) DEFAULT NULL,
  `record_status` int(11) DEFAULT NULL,
  `createdby` varchar(200) DEFAULT NULL,
  `createddate` int(11) DEFAULT NULL,
  `sortorder` int(11) DEFAULT 0,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cms_menuusergroups`
--

DROP TABLE IF EXISTS `cms_menuusergroups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_menuusergroups` (
  `sno` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) DEFAULT NULL,
  `groupid` int(11) DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `updatedby` int(11) DEFAULT NULL,
  `createdon` int(11) DEFAULT NULL,
  `updatedon` int(11) DEFAULT NULL,
  `record_status` int(11) DEFAULT NULL,
  PRIMARY KEY (`sno`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cms_notifications`
--

DROP TABLE IF EXISTS `cms_notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `department` varchar(10) NOT NULL,
  `dept_id` int(5) NOT NULL,
  `userid` int(11) NOT NULL,
  `title` varchar(300) NOT NULL,
  `desc` text DEFAULT NULL,
  `created_id` int(11) NOT NULL,
  `section` varchar(15) NOT NULL,
  `section_id` int(11) NOT NULL,
  `created_by` varchar(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `modified_date` datetime NOT NULL,
  `deleted_status` int(1) NOT NULL COMMENT '0->Active,1->deleted',
  `record_status` int(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3621 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cms_user_logs`
--

DROP TABLE IF EXISTS `cms_user_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_user_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `clientid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `usertype` varchar(20) DEFAULT NULL,
  `ipaddress` varchar(500) NOT NULL,
  `action` varchar(500) NOT NULL,
  `url` varchar(500) NOT NULL,
  `loginfo` text DEFAULT NULL,
  `createddate` varchar(72) NOT NULL,
  `record_status` enum('0','1') NOT NULL COMMENT '0=>Inactive,1=>active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25175 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cms_user_servers`
--

DROP TABLE IF EXISTS `cms_user_servers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_user_servers` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `userid` int(10) DEFAULT NULL,
  `clientid` int(10) DEFAULT NULL,
  `monitorserverid` varchar(45) DEFAULT '0',
  `servername` varchar(100) DEFAULT NULL,
  `record_status` int(1) DEFAULT 1,
  `insertedby` int(11) DEFAULT 0,
  `modifiedby` int(11) DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cms_users`
--

DROP TABLE IF EXISTS `cms_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_users` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `fullname` varchar(200) DEFAULT NULL,
  `username` varchar(200) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `createdby` varchar(20) DEFAULT NULL,
  `createddate` int(11) DEFAULT NULL,
  `record_status` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `customer_dashboard`
--

DROP TABLE IF EXISTS `customer_dashboard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer_dashboard` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cust_id` int(11) NOT NULL,
  `total` int(11) NOT NULL DEFAULT 0,
  `pending` int(11) NOT NULL DEFAULT 0,
  `publish` int(11) NOT NULL DEFAULT 0,
  `type` varchar(20) NOT NULL,
  `last_cron_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=891 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `fisindiaemail`
--

DROP TABLE IF EXISTS `fisindiaemail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fisindiaemail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ticketid` varchar(256) NOT NULL,
  `priority` varchar(256) NOT NULL,
  `prioritytime` varchar(256) NOT NULL,
  `status` varchar(256) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `flagreport`
--

DROP TABLE IF EXISTS `flagreport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `flagreport` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `tkid` varchar(20) NOT NULL,
  `maskid` varchar(200) NOT NULL,
  `createtime` int(11) NOT NULL,
  `ticketstatusid` int(11) NOT NULL,
  `ticketstatustitle` varchar(20) NOT NULL,
  `tickettypeid` int(11) NOT NULL,
  `tickettypetitle` varchar(20) NOT NULL,
  `department` varchar(200) NOT NULL,
  `departmentid` int(11) NOT NULL,
  `subject` varchar(200) NOT NULL,
  `customer` varchar(200) NOT NULL,
  `ownername` varchar(200) NOT NULL,
  `Priority` varchar(30) NOT NULL,
  `remarks` text NOT NULL,
  `firstreplybreach` int(1) DEFAULT NULL,
  `firstreplybreachedcolor` varchar(10) DEFAULT NULL,
  `followupbreach` int(11) DEFAULT NULL,
  `followupbreachcolor` varchar(10) DEFAULT NULL,
  `slaabouttobreach` int(11) DEFAULT NULL,
  `slaaboutbreachcolor` varchar(11) DEFAULT NULL,
  `slabreached` int(11) DEFAULT NULL,
  `slabreachcolor` varchar(11) DEFAULT NULL,
  `problemticketbreach` int(11) NOT NULL,
  `problemticketbreachcolor` varchar(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `flagreport_periodic`
--

DROP TABLE IF EXISTS `flagreport_periodic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `flagreport_periodic` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `tkid` varchar(20) NOT NULL,
  `itilticket` int(11) DEFAULT NULL,
  `mytktid` varchar(100) DEFAULT NULL,
  `maskid` varchar(200) NOT NULL,
  `createtime` int(11) NOT NULL,
  `ticketstatusid` int(11) NOT NULL,
  `ticketstatustitle` varchar(20) NOT NULL,
  `tickettypeid` int(11) NOT NULL,
  `tickettypetitle` varchar(20) NOT NULL,
  `department` varchar(200) NOT NULL,
  `departmentid` int(11) NOT NULL,
  `subject` varchar(200) NOT NULL,
  `customer` varchar(200) NOT NULL,
  `ownername` varchar(200) NOT NULL,
  `Priority` varchar(30) NOT NULL,
  `remarks` text NOT NULL,
  `firstreplybreach` int(1) DEFAULT NULL,
  `firstreplybreachedcolor` varchar(10) DEFAULT NULL,
  `followupbreach` int(11) DEFAULT NULL,
  `followupbreachcolor` varchar(10) DEFAULT NULL,
  `slaabouttobreach` int(11) DEFAULT NULL,
  `slaaboutbreachcolor` varchar(11) DEFAULT NULL,
  `slabreached` int(11) DEFAULT NULL,
  `slabreachcolor` varchar(11) DEFAULT NULL,
  `problemticketbreach` int(11) NOT NULL,
  `problemticketbreachcolor` varchar(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=864 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `flagstatusheader`
--

DROP TABLE IF EXISTS `flagstatusheader`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `flagstatusheader` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `prioritytype` varchar(2) DEFAULT NULL,
  `problemticket` int(11) NOT NULL,
  `red` int(11) DEFAULT NULL,
  `orange` int(11) DEFAULT NULL,
  `yellow` int(11) DEFAULT NULL,
  `close` int(11) DEFAULT NULL,
  `slar` int(11) DEFAULT NULL,
  `slao` int(11) DEFAULT NULL,
  `slay` int(11) DEFAULT NULL,
  `followup` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `helpdesk_reopen`
--

DROP TABLE IF EXISTS `helpdesk_reopen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `helpdesk_reopen` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ticketid` int(11) NOT NULL,
  `ticketmaskid` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `empid` int(11) NOT NULL,
  `resontoopen` text NOT NULL,
  `linkcode` int(11) NOT NULL,
  `ipaddress` varchar(11) NOT NULL,
  `createddate` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `keys`
--

DROP TABLE IF EXISTS `keys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `keys` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(40) NOT NULL,
  `level` int(2) NOT NULL,
  `ignore_limits` tinyint(1) NOT NULL DEFAULT 0,
  `is_private_key` tinyint(1) NOT NULL DEFAULT 0,
  `ip_addresses` text DEFAULT NULL,
  `date_created` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `link_orguser`
--

DROP TABLE IF EXISTS `link_orguser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `link_orguser` (
  `linkid` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `companyid` bigint(20) NOT NULL,
  PRIMARY KEY (`linkid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `menu_permissions`
--

DROP TABLE IF EXISTS `menu_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `menu_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_type` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `menu_id` int(5) NOT NULL,
  `add` tinyint(1) DEFAULT 0,
  `edit` tinyint(1) DEFAULT 0,
  `view` tinyint(1) DEFAULT 0,
  `delete` tinyint(1) DEFAULT 0,
  `date_modified` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2900 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `my_approveattachments`
--

DROP TABLE IF EXISTS `my_approveattachments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `my_approveattachments` (
  `appattch_id` int(11) NOT NULL AUTO_INCREMENT,
  `purchase_id` int(11) NOT NULL,
  `attachment` varchar(100) NOT NULL,
  `display` varchar(100) NOT NULL,
  `createdon` varchar(100) NOT NULL,
  `createdby` varchar(100) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  PRIMARY KEY (`appattch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `my_colattachments`
--

DROP TABLE IF EXISTS `my_colattachments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `my_colattachments` (
  `appattch_id` int(11) NOT NULL AUTO_INCREMENT,
  `purchase_id` int(11) NOT NULL,
  `attachment` varchar(100) NOT NULL,
  `display` varchar(100) NOT NULL,
  `createdon` varchar(100) NOT NULL,
  `createdby` varchar(100) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  PRIMARY KEY (`appattch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `my_department_jiraproject_mapping`
--

DROP TABLE IF EXISTS `my_department_jiraproject_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `my_department_jiraproject_mapping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `departmentid` int(11) DEFAULT NULL,
  `jiraprojectid` int(11) DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `createdon` int(11) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `my_login_access`
--

DROP TABLE IF EXISTS `my_login_access`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `my_login_access` (
  `id` int(11) NOT NULL,
  `userid` int(15) DEFAULT NULL,
  `ip_address` varchar(20) DEFAULT NULL,
  `failed_login_attempts` int(11) DEFAULT NULL,
  `lockstartdate` int(12) DEFAULT NULL,
  `lockenddate` int(12) DEFAULT NULL,
  `createddate` int(12) DEFAULT NULL,
  `updateddate` int(12) DEFAULT NULL,
  `status` tinyint(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `my_plattachments`
--

DROP TABLE IF EXISTS `my_plattachments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `my_plattachments` (
  `plattch_id` int(11) NOT NULL AUTO_INCREMENT,
  `purchase_id` int(11) NOT NULL,
  `attachment` varchar(100) NOT NULL,
  `display` varchar(100) NOT NULL,
  `createdon` varchar(100) NOT NULL,
  `createdby` varchar(100) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  PRIMARY KEY (`plattch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `my_purchase_itemdetails`
--

DROP TABLE IF EXISTS `my_purchase_itemdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `my_purchase_itemdetails` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `purchase_id` varchar(100) NOT NULL,
  `indentsubno` varchar(100) NOT NULL,
  `item` varchar(100) NOT NULL,
  `quantity` varchar(100) NOT NULL,
  `desc_purchase` varchar(100) NOT NULL,
  `desc_oem` varchar(100) NOT NULL,
  `stores` varchar(100) NOT NULL,
  `storesno` varchar(100) NOT NULL,
  `purchasepo` varchar(100) NOT NULL,
  `unit_price` varchar(100) NOT NULL,
  `total` varchar(100) NOT NULL,
  `etime_delivery` varchar(100) NOT NULL,
  `createdon` int(100) NOT NULL,
  `createdby` int(100) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `my_purchase_request`
--

DROP TABLE IF EXISTS `my_purchase_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `my_purchase_request` (
  `purchase_id` int(11) NOT NULL AUTO_INCREMENT,
  `datevalue` varchar(100) NOT NULL,
  `opfno` varchar(100) NOT NULL,
  `indentno` varchar(100) NOT NULL,
  `custname` varchar(100) NOT NULL,
  `salesperson` varchar(100) NOT NULL,
  `presales` varchar(100) NOT NULL,
  `pmhead` varchar(100) NOT NULL,
  `pmname` varchar(100) NOT NULL,
  `req_name` varchar(100) NOT NULL,
  `req_daddress` varchar(100) NOT NULL,
  `req_contact` varchar(100) NOT NULL,
  `req_emailid` varchar(100) NOT NULL,
  `app_name` varchar(100) NOT NULL,
  `app_contact` varchar(100) NOT NULL,
  `app_email` varchar(100) NOT NULL,
  `pl_aatach` varchar(100) NOT NULL,
  `comment` text NOT NULL,
  `collection` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `proposed` varchar(100) NOT NULL,
  `oapproved` varchar(100) NOT NULL,
  `papproved` varchar(100) NOT NULL,
  `capproved` varchar(100) NOT NULL,
  `capprovedval` varchar(100) NOT NULL,
  `prosignature` varchar(100) NOT NULL,
  `osignature` varchar(100) NOT NULL,
  `psignature` varchar(100) NOT NULL,
  `csignature` varchar(100) NOT NULL,
  `csignatureval` varchar(100) NOT NULL,
  `pro_date` varchar(100) NOT NULL,
  `o_date` varchar(100) NOT NULL,
  `p_date` varchar(100) NOT NULL,
  `c_date` varchar(100) NOT NULL,
  `c_dateval` varchar(100) NOT NULL,
  `createdon` varchar(100) NOT NULL,
  `createdby` varchar(100) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  PRIMARY KEY (`purchase_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `my_purchase_status`
--

DROP TABLE IF EXISTS `my_purchase_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `my_purchase_status` (
  `status_id` int(100) NOT NULL AUTO_INCREMENT,
  `status_name` varchar(100) NOT NULL,
  `createdon` varchar(100) NOT NULL,
  `createdby` varchar(100) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `my_purchase_type`
--

DROP TABLE IF EXISTS `my_purchase_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `my_purchase_type` (
  `ptype_id` int(100) NOT NULL AUTO_INCREMENT,
  `ptype_name` varchar(100) NOT NULL,
  `createdon` varchar(100) NOT NULL,
  `createdby` varchar(100) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  PRIMARY KEY (`ptype_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `my_sessionticket`
--

DROP TABLE IF EXISTS `my_sessionticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `my_sessionticket` (
  `s_id` int(100) NOT NULL AUTO_INCREMENT,
  `itilticketid` varchar(100) NOT NULL,
  `staffid` varchar(100) NOT NULL,
  `createdon` varchar(100) NOT NULL,
  `record_status` enum('1','0') NOT NULL,
  PRIMARY KEY (`s_id`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `my_staffgroups`
--

DROP TABLE IF EXISTS `my_staffgroups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `my_staffgroups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `staffid` int(11) NOT NULL,
  `groupid` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `my_ticket_completion_time_logs`
--

DROP TABLE IF EXISTS `my_ticket_completion_time_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `my_ticket_completion_time_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ticket_completion_time_id` int(11) DEFAULT NULL,
  `itilticketid` int(11) DEFAULT NULL,
  `operation` varchar(50) DEFAULT NULL,
  `data` text DEFAULT NULL,
  `createdon` int(11) DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nagios_commands`
--

DROP TABLE IF EXISTS `nagios_commands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nagios_commands` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `command_name` varchar(255) DEFAULT NULL,
  `status` int(1) DEFAULT 1,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nagios_device_services`
--

DROP TABLE IF EXISTS `nagios_device_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nagios_device_services` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `device_id` int(11) DEFAULT NULL,
  `service_name` varchar(255) NOT NULL DEFAULT '',
  `status` int(1) DEFAULT 1,
  `created_date` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nagios_devices`
--

DROP TABLE IF EXISTS `nagios_devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nagios_devices` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `device_name` varchar(255) DEFAULT NULL,
  `status` int(1) DEFAULT 1,
  `created_date` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1 COMMENT='this is for nagio device list';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nagios_host_alerts`
--

DROP TABLE IF EXISTS `nagios_host_alerts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nagios_host_alerts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `host_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `host_name` varchar(200) NOT NULL,
  `service_type` varchar(10) NOT NULL,
  `host_server_id` int(11) NOT NULL,
  `service` varchar(100) DEFAULT NULL,
  `alerts_message` varchar(100) DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `insert_status` varchar(10) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1 COMMENT '1->active,0->down',
  `del` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nagios_hosts`
--

DROP TABLE IF EXISTS `nagios_hosts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nagios_hosts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `host_name` varchar(100) NOT NULL,
  `client_id` varchar(50) NOT NULL,
  `cloud_host_id` int(11) NOT NULL,
  `order_details_id` int(11) NOT NULL,
  `host_server_id` int(11) NOT NULL,
  `location` int(2) NOT NULL COMMENT '1-HYD, 2-MUM',
  `monitoring_type` varchar(50) NOT NULL,
  `host_type` varchar(100) NOT NULL COMMENT 'Linux or windows',
  `isMail` int(1) DEFAULT NULL COMMENT '1->for yes, 0->No',
  `cust_email` varchar(50) NOT NULL,
  `time_interval` int(11) NOT NULL,
  `alias_host_name` varchar(50) NOT NULL,
  `host_ip` varchar(50) NOT NULL,
  `connection_string` varchar(50) NOT NULL,
  `connection_chk` int(1) DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` int(2) NOT NULL DEFAULT 1,
  `host_running_status` int(11) NOT NULL DEFAULT 1 COMMENT 'active=1,down=0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nagios_hosts_services`
--

DROP TABLE IF EXISTS `nagios_hosts_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nagios_hosts_services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `service_name` varchar(100) NOT NULL,
  `host_id` int(11) NOT NULL,
  `host_server_id` int(11) NOT NULL,
  `location` int(11) NOT NULL COMMENT '1-HYD, 2-MUM',
  `service_type` varchar(100) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` int(2) NOT NULL DEFAULT 1,
  `device_type` varchar(100) NOT NULL,
  `command_type` varchar(100) NOT NULL,
  `description` varchar(225) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nagios_monitoring`
--

DROP TABLE IF EXISTS `nagios_monitoring`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nagios_monitoring` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nagios_server_id` varchar(50) NOT NULL,
  `host_name` varchar(50) NOT NULL,
  `host_id` int(11) NOT NULL,
  `asset_name` varchar(100) NOT NULL,
  `created_by` int(11) NOT NULL,
  `clientid` int(11) DEFAULT NULL,
  `record_status` int(1) NOT NULL DEFAULT 1,
  `dashboard_status` int(11) NOT NULL,
  `publish_status` int(1) NOT NULL,
  `modified_by` int(11) NOT NULL,
  `modified_date` datetime NOT NULL,
  `date_added` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=291 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nagios_monitoring_info`
--

DROP TABLE IF EXISTS `nagios_monitoring_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nagios_monitoring_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `service_id` int(11) DEFAULT NULL,
  `host_id` int(11) NOT NULL,
  `host_server_id` int(11) NOT NULL,
  `service_type` varchar(50) DEFAULT NULL,
  `active_checks_enabled` int(11) DEFAULT NULL,
  `current_attempt` int(11) DEFAULT NULL,
  `performance_data` varchar(100) DEFAULT NULL,
  `last_hard_state` int(11) DEFAULT NULL,
  `notifications_enabled` int(11) DEFAULT NULL,
  `current_state` int(11) DEFAULT NULL,
  `downtimes` varchar(100) DEFAULT NULL,
  `plugin_output` varchar(100) DEFAULT NULL,
  `last_check` bigint(20) DEFAULT NULL,
  `problem_has_been_acknowledged` int(11) DEFAULT NULL,
  `last_state_change` mediumint(9) DEFAULT NULL,
  `scheduled_downtime_depth` int(11) DEFAULT NULL,
  `comments` varchar(100) DEFAULT NULL,
  `last_notification` int(11) DEFAULT NULL,
  `max_attempts` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `insert_status` varchar(10) NOT NULL,
  `status` int(11) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nagios_servers`
--

DROP TABLE IF EXISTS `nagios_servers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nagios_servers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `server_name` varchar(100) NOT NULL,
  `location` int(11) NOT NULL COMMENT '1-HYD, 2-MUM',
  `display_name` varchar(50) NOT NULL,
  `api_data` longblob NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_status` int(1) NOT NULL DEFAULT 1,
  `status` int(2) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nagios_services`
--

DROP TABLE IF EXISTS `nagios_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nagios_services` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `device_id` int(11) DEFAULT NULL,
  `service_name` varchar(255) NOT NULL DEFAULT '',
  `status` int(1) DEFAULT 1,
  `created_date` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pm_alerttickets`
--

DROP TABLE IF EXISTS `pm_alerttickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pm_alerttickets` (
  `autoid` int(11) NOT NULL AUTO_INCREMENT,
  `ticketid` int(11) DEFAULT NULL,
  PRIMARY KEY (`autoid`)
) ENGINE=InnoDB AUTO_INCREMENT=30874 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `portal_menus`
--

DROP TABLE IF EXISTS `portal_menus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `portal_menus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `link` varchar(100) NOT NULL,
  `menu_for` varchar(50) DEFAULT 'other',
  `description` varchar(100) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `section_id` int(11) DEFAULT NULL,
  `display_order` int(11) DEFAULT NULL,
  `status` int(2) NOT NULL,
  `class` varchar(100) NOT NULL DEFAULT 'fa-building',
  `created_by` varchar(50) NOT NULL,
  `deleted_status` int(1) DEFAULT 0,
  `created_date` datetime DEFAULT NULL,
  `date_modified` datetime DEFAULT NULL,
  `admin_permission` int(1) DEFAULT 1,
  `staff_permission` int(1) DEFAULT NULL,
  `customer_permission` int(1) DEFAULT NULL,
  `user_permission` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `portal_sections`
--

DROP TABLE IF EXISTS `portal_sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `portal_sections` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `actual` varchar(50) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `display_order` int(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `repbasicinfo`
--

DROP TABLE IF EXISTS `repbasicinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `repbasicinfo` (
  `ticketid` int(8) NOT NULL,
  `ticketmaskid` varchar(15) NOT NULL,
  `priority` varchar(15) NOT NULL,
  `status` varchar(30) NOT NULL,
  `type` varchar(30) NOT NULL,
  `department` varchar(50) NOT NULL,
  `cdate` int(20) NOT NULL,
  `lastact` int(8) NOT NULL,
  `user` varchar(50) NOT NULL,
  `owner` varchar(50) NOT NULL,
  `subject` varchar(120) NOT NULL,
  `resolutiondateline` int(8) NOT NULL,
  `lastuserreplytime` int(8) NOT NULL,
  `email` varchar(255) NOT NULL,
  `reopen` int(8) NOT NULL,
  `resolutionseconds` int(8) NOT NULL,
  KEY `ticketid` (`ticketid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `repbasicinfo_latest`
--

DROP TABLE IF EXISTS `repbasicinfo_latest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `repbasicinfo_latest` (
  `ticketid` int(8) NOT NULL,
  `ticketmaskid` varchar(15) NOT NULL,
  `priority` varchar(15) NOT NULL,
  `status` varchar(30) NOT NULL,
  `type` varchar(30) NOT NULL,
  `department` varchar(50) NOT NULL,
  `cdate` int(20) NOT NULL,
  `lastact` int(8) NOT NULL,
  `user` varchar(50) NOT NULL,
  `owner` varchar(50) NOT NULL,
  `subject` varchar(120) NOT NULL,
  `resolutiondateline` int(8) NOT NULL,
  `lastuserreplytime` int(8) NOT NULL,
  `email` varchar(255) NOT NULL,
  `reopen` int(8) NOT NULL,
  `resolutionseconds` int(8) NOT NULL,
  KEY `ticketid` (`ticketid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `repdeptchange`
--

DROP TABLE IF EXISTS `repdeptchange`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `repdeptchange` (
  `ticketid` int(8) NOT NULL,
  `from` varchar(30) NOT NULL,
  `to` varchar(30) NOT NULL,
  `fromtime` int(8) NOT NULL,
  `movedby` varchar(50) NOT NULL,
  `staffworked` longtext NOT NULL,
  `totime` int(8) NOT NULL,
  `staffrep` int(3) NOT NULL,
  `custrep` int(3) NOT NULL,
  KEY `ticketid` (`ticketid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `repdeptchange_latest`
--

DROP TABLE IF EXISTS `repdeptchange_latest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `repdeptchange_latest` (
  `ticketid` int(8) NOT NULL,
  `from` varchar(30) NOT NULL,
  `to` varchar(30) NOT NULL,
  `fromtime` int(8) NOT NULL,
  `movedby` varchar(50) NOT NULL,
  `staffworked` longtext NOT NULL,
  `totime` int(8) NOT NULL,
  `staffrep` int(3) NOT NULL,
  `custrep` int(3) NOT NULL,
  KEY `ticketid` (`ticketid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reptktclinfo`
--

DROP TABLE IF EXISTS `reptktclinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reptktclinfo` (
  `ticketid` int(8) NOT NULL,
  `resolved` int(8) NOT NULL,
  `closed` int(8) NOT NULL,
  `lastreply` int(8) NOT NULL,
  `hold` int(8) NOT NULL,
  `reopen` int(8) NOT NULL,
  `open` int(8) NOT NULL,
  `resolvedtime` int(11) NOT NULL COMMENT 'resolved duration',
  `staff` varchar(100) NOT NULL,
  `dept` varchar(100) NOT NULL,
  `resreopen` int(8) NOT NULL,
  `pocreopen` int(8) NOT NULL,
  KEY `ticketid` (`ticketid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reptktclinfo_latest`
--

DROP TABLE IF EXISTS `reptktclinfo_latest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reptktclinfo_latest` (
  `ticketid` int(8) NOT NULL,
  `resolved` int(8) NOT NULL,
  `closed` int(8) NOT NULL,
  `lastreply` int(8) NOT NULL,
  `hold` int(8) NOT NULL,
  `reopen` int(8) NOT NULL,
  `open` int(8) NOT NULL,
  `resolvedtime` int(11) NOT NULL COMMENT 'resolved duration',
  `staff` varchar(100) NOT NULL,
  `dept` varchar(100) NOT NULL,
  `resreopen` int(8) NOT NULL,
  `pocreopen` int(8) NOT NULL,
  KEY `ticketid` (`ticketid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reptktintinfo`
--

DROP TABLE IF EXISTS `reptktintinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reptktintinfo` (
  `ticketid` int(8) NOT NULL,
  `firstassigntime` int(8) NOT NULL,
  `firstreplystaff` varchar(30) NOT NULL,
  `deptchange` int(8) NOT NULL,
  `chstaff` varchar(50) NOT NULL,
  `firstacttime` int(8) NOT NULL,
  `firstreptime` int(8) NOT NULL,
  `firstassignby` varchar(100) NOT NULL,
  `repmsg` varchar(100) NOT NULL,
  KEY `ticketid` (`ticketid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reptktintinfo_latest`
--

DROP TABLE IF EXISTS `reptktintinfo_latest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reptktintinfo_latest` (
  `ticketid` int(8) NOT NULL,
  `firstassigntime` int(8) NOT NULL,
  `firstreplystaff` varchar(30) NOT NULL,
  `deptchange` int(8) NOT NULL,
  `chstaff` varchar(50) NOT NULL,
  `firstacttime` int(8) NOT NULL,
  `firstreptime` int(8) NOT NULL,
  `firstassignby` varchar(100) NOT NULL,
  `repmsg` varchar(100) NOT NULL,
  KEY `ticketid` (`ticketid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `section_permissions`
--

DROP TABLE IF EXISTS `section_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `section_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_type` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `section_id` int(5) NOT NULL,
  `add` tinyint(1) DEFAULT 0,
  `edit` tinyint(1) DEFAULT 0,
  `view` tinyint(1) DEFAULT 0,
  `delete` tinyint(1) DEFAULT 0,
  `date_modified` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9001 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `srshourlymonitor`
--

DROP TABLE IF EXISTS `srshourlymonitor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `srshourlymonitor` (
  `hourlyid` int(11) NOT NULL AUTO_INCREMENT,
  `deptid` int(11) DEFAULT NULL,
  `newtickets` int(11) DEFAULT NULL,
  `pendingclosed` int(11) DEFAULT NULL,
  `movedin` int(11) DEFAULT NULL,
  `movedout` int(11) DEFAULT NULL,
  `p1` int(11) DEFAULT NULL,
  `p2` int(11) DEFAULT NULL,
  `p3` int(11) DEFAULT NULL,
  `open` int(11) DEFAULT NULL,
  `poc` int(11) DEFAULT NULL,
  `activity` int(11) DEFAULT NULL,
  `closed` int(11) DEFAULT NULL,
  `slap1` int(11) DEFAULT NULL,
  `slap2` int(11) DEFAULT NULL,
  `slap3` int(11) DEFAULT NULL,
  `cdate` datetime DEFAULT NULL,
  `chour` int(11) DEFAULT NULL,
  PRIMARY KEY (`hourlyid`)
) ENGINE=InnoDB AUTO_INCREMENT=700784 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `srsremark`
--

DROP TABLE IF EXISTS `srsremark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `srsremark` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `staffid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `ticketid` int(11) NOT NULL,
  `rating` float(10,2) NOT NULL,
  `remark` text NOT NULL,
  `role` int(11) NOT NULL,
  `rolename` varchar(225) NOT NULL DEFAULT 'hr',
  `cgroupid` int(11) NOT NULL,
  `rateType` enum('individual','group') NOT NULL,
  `createDate` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `srsreopentickets`
--

DROP TABLE IF EXISTS `srsreopentickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `srsreopentickets` (
  `reopenid` int(11) NOT NULL AUTO_INCREMENT,
  `reopentype` int(11) NOT NULL,
  `ticketid` int(11) NOT NULL,
  `comments` text NOT NULL,
  `reopentime` varchar(72) NOT NULL,
  `ticketstatusid` int(11) NOT NULL,
  PRIMARY KEY (`reopenid`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `srsreopentype`
--

DROP TABLE IF EXISTS `srsreopentype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `srsreopentype` (
  `reopentypeid` int(11) NOT NULL AUTO_INCREMENT,
  `reopentype` varchar(27) NOT NULL,
  PRIMARY KEY (`reopentypeid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swapplogdata`
--

DROP TABLE IF EXISTS `swapplogdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swapplogdata` (
  `applogdataid` int(11) NOT NULL AUTO_INCREMENT,
  `applogid` int(11) NOT NULL DEFAULT 0,
  `logdata` text COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`applogdataid`),
  KEY `applogdata1` (`applogid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swapplogs`
--

DROP TABLE IF EXISTS `swapplogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swapplogs` (
  `applogid` int(11) NOT NULL AUTO_INCREMENT,
  `appname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `logtype` smallint(6) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`applogid`),
  KEY `applogs1` (`appname`,`logtype`),
  KEY `applogs2` (`logtype`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swattachmentchunks`
--

DROP TABLE IF EXISTS `swattachmentchunks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swattachmentchunks` (
  `chunkid` int(11) NOT NULL AUTO_INCREMENT,
  `attachmentid` int(11) NOT NULL DEFAULT 0,
  `contents` mediumblob NOT NULL,
  `notbase64` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`chunkid`),
  KEY `attachmentchunks1` (`attachmentid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swattachments`
--

DROP TABLE IF EXISTS `swattachments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swattachments` (
  `attachmentid` bigint(20) NOT NULL AUTO_INCREMENT,
  `linktype` smallint(6) NOT NULL DEFAULT 0,
  `linktypeid` int(11) NOT NULL DEFAULT 0,
  `downloaditemid` int(11) NOT NULL DEFAULT 0,
  `ticketid` bigint(20) NOT NULL,
  `filename` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `filesize` int(11) NOT NULL DEFAULT 0,
  `filetype` varchar(150) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `dateline` int(11) NOT NULL DEFAULT 0,
  `attachmenttype` smallint(6) NOT NULL DEFAULT 0,
  `storefilename` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `contentid` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`attachmentid`),
  KEY `attachments1` (`linktype`,`linktypeid`),
  KEY `attachments2` (`attachmenttype`),
  KEY `attachments3` (`downloaditemid`),
  KEY `attachments4` (`ticketid`,`linktype`,`linktypeid`),
  KEY `attachments5` (`linktype`,`ticketid`,`linktypeid`),
  KEY `attachments6` (`linktype`,`ticketid`,`attachmentid`),
  KEY `linktypeid` (`linktypeid`)
) ENGINE=InnoDB AUTO_INCREMENT=212504616 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swautoclosecriteria`
--

DROP TABLE IF EXISTS `swautoclosecriteria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swautoclosecriteria` (
  `autoclosecriteriaid` int(11) NOT NULL AUTO_INCREMENT,
  `autocloseruleid` int(11) NOT NULL DEFAULT 0,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `ruleop` smallint(6) NOT NULL DEFAULT 0,
  `rulematch` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `rulematchtype` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`autoclosecriteriaid`),
  KEY `autoclosecriteria1` (`autocloseruleid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swautocloserules`
--

DROP TABLE IF EXISTS `swautocloserules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swautocloserules` (
  `autocloseruleid` int(11) NOT NULL AUTO_INCREMENT,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `title` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `targetticketstatusid` int(11) NOT NULL DEFAULT 0,
  `inactivitythreshold` double NOT NULL DEFAULT 0,
  `closurethreshold` double NOT NULL DEFAULT 0,
  `sendpendingnotification` int(11) NOT NULL DEFAULT 0,
  `sendfinalnotification` int(11) NOT NULL DEFAULT 0,
  `suppresssurveyemail` int(11) NOT NULL DEFAULT 0,
  `isenabled` int(11) NOT NULL DEFAULT 0,
  `sortorder` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`autocloseruleid`),
  KEY `autocloserules1` (`isenabled`,`sortorder`),
  KEY `autocloserules2` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swbayescategories`
--

DROP TABLE IF EXISTS `swbayescategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swbayescategories` (
  `bayescategoryid` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `probability` decimal(10,0) NOT NULL DEFAULT 0,
  `wordcount` bigint(20) NOT NULL DEFAULT 0,
  `categoryweight` smallint(6) NOT NULL DEFAULT 0,
  `ismaster` smallint(6) NOT NULL DEFAULT 0,
  `categorytype` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`bayescategoryid`),
  KEY `bayescategories1` (`category`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swbayeswords`
--

DROP TABLE IF EXISTS `swbayeswords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swbayeswords` (
  `bayeswordid` int(11) NOT NULL AUTO_INCREMENT,
  `word` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`bayeswordid`),
  UNIQUE KEY `bayeswords1` (`word`)
) ENGINE=InnoDB AUTO_INCREMENT=162669116 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swbayeswords_test`
--

DROP TABLE IF EXISTS `swbayeswords_test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swbayeswords_test` (
  `bayeswordid` int(11) NOT NULL AUTO_INCREMENT,
  `word` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`bayeswordid`),
  UNIQUE KEY `bayeswords1` (`word`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swbayeswordsfreqs`
--

DROP TABLE IF EXISTS `swbayeswordsfreqs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swbayeswordsfreqs` (
  `bayeswordid` int(11) NOT NULL DEFAULT 0,
  `bayescategoryid` int(11) NOT NULL DEFAULT 0,
  `wordcount` bigint(20) NOT NULL DEFAULT 0,
  UNIQUE KEY `bayeswordsfreqs1` (`bayeswordid`,`bayescategoryid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swbreaklines`
--

DROP TABLE IF EXISTS `swbreaklines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swbreaklines` (
  `breaklineid` int(11) NOT NULL AUTO_INCREMENT,
  `breakline` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `isregexp` smallint(6) NOT NULL DEFAULT 0,
  `sortorder` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`breaklineid`),
  KEY `breaklines1` (`breakline`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swcalls`
--

DROP TABLE IF EXISTS `swcalls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swcalls` (
  `callid` int(11) NOT NULL AUTO_INCREMENT,
  `phonenumber` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `callguid` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `userid` int(11) NOT NULL DEFAULT 0,
  `userfullname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `useremail` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `staffid` int(11) NOT NULL DEFAULT 0,
  `stafffullname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `chatobjectid` int(11) NOT NULL DEFAULT 0,
  `departmentid` int(11) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `enddateline` int(11) NOT NULL DEFAULT 0,
  `lastactivity` int(11) NOT NULL DEFAULT 0,
  `duration` int(11) NOT NULL DEFAULT 0,
  `isclicktocall` smallint(6) NOT NULL DEFAULT 0,
  `callstatus` smallint(6) NOT NULL DEFAULT 0,
  `calltype` smallint(6) NOT NULL DEFAULT 0,
  `fileid` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`callid`),
  KEY `calls1` (`phonenumber`,`userid`),
  KEY `calls2` (`userid`),
  KEY `calls3` (`staffid`),
  KEY `calls4` (`dateline`),
  KEY `calls5` (`callstatus`),
  KEY `calls6` (`departmentid`),
  KEY `calls7` (`chatobjectid`),
  KEY `calls8` (`callguid`),
  KEY `calls9` (`calltype`,`callstatus`),
  KEY `calls10` (`phonenumber`(15),`userfullname`(30),`useremail`(40))
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swcannedcategories`
--

DROP TABLE IF EXISTS `swcannedcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swcannedcategories` (
  `cannedcategoryid` int(11) NOT NULL AUTO_INCREMENT,
  `parentcategoryid` int(11) NOT NULL DEFAULT 0,
  `categorytype` smallint(6) NOT NULL DEFAULT 0,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`cannedcategoryid`),
  KEY `cannedcategories1` (`parentcategoryid`),
  KEY `cannedcategories2` (`categorytype`,`staffid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swcannedresponsedata`
--

DROP TABLE IF EXISTS `swcannedresponsedata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swcannedresponsedata` (
  `cannedresponsedataid` int(11) NOT NULL AUTO_INCREMENT,
  `cannedresponseid` int(11) NOT NULL DEFAULT 0,
  `contents` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`cannedresponsedataid`),
  KEY `cannedresponsedata1` (`cannedresponseid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swcannedresponses`
--

DROP TABLE IF EXISTS `swcannedresponses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swcannedresponses` (
  `cannedresponseid` int(11) NOT NULL AUTO_INCREMENT,
  `cannedcategoryid` int(11) NOT NULL DEFAULT 0,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `urldata` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `imagedata` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `responsetype` smallint(6) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`cannedresponseid`),
  KEY `cannedresponses1` (`cannedcategoryid`),
  KEY `cannedresponses2` (`staffid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swcatchallrules`
--

DROP TABLE IF EXISTS `swcatchallrules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swcatchallrules` (
  `catchallruleid` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `ruleexpr` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `emailqueueid` int(11) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `sortorder` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`catchallruleid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swchatchilds`
--

DROP TABLE IF EXISTS `swchatchilds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swchatchilds` (
  `chatchildid` int(11) NOT NULL AUTO_INCREMENT,
  `chatobjectid` int(11) NOT NULL DEFAULT 0,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `isinvite` smallint(6) NOT NULL DEFAULT 0,
  `isobserver` smallint(6) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`chatchildid`),
  KEY `chatchilds1` (`chatobjectid`,`staffid`),
  KEY `chatchilds2` (`staffid`),
  KEY `chatchilds3` (`chatobjectid`,`isinvite`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swchatdata`
--

DROP TABLE IF EXISTS `swchatdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swchatdata` (
  `chatdataid` int(11) NOT NULL AUTO_INCREMENT,
  `chatobjectid` int(11) NOT NULL DEFAULT 0,
  `contents` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`chatdataid`),
  KEY `cobjid` (`chatobjectid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swchathits`
--

DROP TABLE IF EXISTS `swchathits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swchathits` (
  `chathitid` int(11) NOT NULL AUTO_INCREMENT,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `chatobjectid` int(11) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `fullname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `isaccepted` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`chathitid`),
  KEY `chathits1` (`chatobjectid`,`staffid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swchatobjects`
--

DROP TABLE IF EXISTS `swchatobjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swchatobjects` (
  `chatobjectid` int(11) NOT NULL AUTO_INCREMENT,
  `chatobjectmaskid` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `visitorsessionid` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `chatsessionid` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `dateline` int(11) NOT NULL DEFAULT 0,
  `lastpostactivity` int(11) NOT NULL DEFAULT 0,
  `userpostactivity` int(11) NOT NULL DEFAULT 0,
  `staffpostactivity` int(11) NOT NULL DEFAULT 0,
  `userid` int(11) NOT NULL DEFAULT 0,
  `userfullname` varchar(150) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `useremail` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `subject` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `staffid` int(11) NOT NULL DEFAULT 0,
  `staffname` varchar(150) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `chatstatus` smallint(6) NOT NULL DEFAULT 0,
  `transferfromid` int(11) NOT NULL DEFAULT 0,
  `transfertoid` int(11) NOT NULL DEFAULT 0,
  `transferstatus` smallint(6) NOT NULL DEFAULT 0,
  `transfertimeline` int(11) NOT NULL DEFAULT 0,
  `roundrobintimeline` int(11) NOT NULL DEFAULT 0,
  `roundrobinhits` int(11) NOT NULL DEFAULT 0,
  `departmentid` int(11) NOT NULL DEFAULT 0,
  `departmenttitle` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `chattype` smallint(6) NOT NULL DEFAULT 0,
  `ipaddress` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `waittime` int(11) NOT NULL DEFAULT 0,
  `chatskillid` int(11) NOT NULL DEFAULT 0,
  `isproactive` smallint(6) NOT NULL DEFAULT 0,
  `creatorstaffid` int(11) NOT NULL DEFAULT 0,
  `tgroupid` int(11) NOT NULL DEFAULT 0,
  `isphone` smallint(6) NOT NULL DEFAULT 0,
  `phonenumber` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `callstatus` smallint(6) NOT NULL DEFAULT 0,
  `isindexed` smallint(6) NOT NULL DEFAULT 0,
  `hasgeoip` smallint(6) NOT NULL DEFAULT 0,
  `geoiptimezone` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoipisp` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoiporganization` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoipnetspeed` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoipcountry` varchar(10) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoipcountrydesc` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoipregion` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoipcity` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoippostalcode` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoiplatitude` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoiplongitude` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoipmetrocode` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoipareacode` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`chatobjectid`),
  KEY `chatobjects1` (`chatstatus`,`staffid`,`lastpostactivity`),
  KEY `chatobjects2` (`chatstatus`,`chattype`),
  KEY `chatobjects3` (`visitorsessionid`),
  KEY `chatobjects4` (`staffid`),
  KEY `chatobjects5` (`userid`,`useremail`),
  KEY `chatobjects6` (`ipaddress`),
  KEY `chatobjects7` (`departmentid`,`dateline`),
  KEY `chatobjects8` (`useremail`),
  KEY `chatobjects9` (`chatstatus`,`staffid`,`dateline`),
  KEY `chatobjects10` (`chatstatus`,`chatobjectid`,`staffid`),
  KEY `chatobjects11` (`chatstatus`,`dateline`,`lastpostactivity`),
  KEY `chatobjects12` (`departmentid`,`chatstatus`),
  KEY `chatobjects13` (`dateline`),
  KEY `chatobjects14` (`chatobjectmaskid`,`departmentid`),
  KEY `chatobjects15` (`chatstatus`,`staffid`,`isphone`),
  KEY `chatobjects16` (`isindexed`,`chatstatus`),
  KEY `chatobjects17` (`subject`(220),`userfullname`(30),`useremail`(40),`phonenumber`(15))
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swchatskilllinks`
--

DROP TABLE IF EXISTS `swchatskilllinks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swchatskilllinks` (
  `chatskilllinkid` int(11) NOT NULL AUTO_INCREMENT,
  `chatskillid` int(11) NOT NULL DEFAULT 0,
  `staffid` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`chatskilllinkid`),
  KEY `chatskilllinks1` (`chatskillid`),
  KEY `chatskilllinks2` (`staffid`)
) ENGINE=InnoDB AUTO_INCREMENT=13171 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swchatskills`
--

DROP TABLE IF EXISTS `swchatskills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swchatskills` (
  `chatskillid` int(11) NOT NULL AUTO_INCREMENT,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`chatskillid`),
  KEY `chatskills1` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swchattextdata`
--

DROP TABLE IF EXISTS `swchattextdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swchattextdata` (
  `chattextdataid` int(11) NOT NULL AUTO_INCREMENT,
  `chatobjectid` int(11) NOT NULL DEFAULT 0,
  `contents` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`chattextdataid`),
  KEY `chattextdata1` (`chatobjectid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swchatvariables`
--

DROP TABLE IF EXISTS `swchatvariables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swchatvariables` (
  `chatvariableid` int(11) NOT NULL AUTO_INCREMENT,
  `variabletype` smallint(6) NOT NULL DEFAULT 0,
  `chatobjectid` int(11) NOT NULL DEFAULT 0,
  `variablevalue` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`chatvariableid`),
  KEY `chatvariables1` (`chatobjectid`,`variabletype`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swcommentdata`
--

DROP TABLE IF EXISTS `swcommentdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swcommentdata` (
  `commentdataid` int(11) NOT NULL AUTO_INCREMENT,
  `commentid` int(11) NOT NULL DEFAULT 0,
  `contents` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`commentdataid`),
  KEY `commentdata1` (`commentid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swcomments`
--

DROP TABLE IF EXISTS `swcomments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swcomments` (
  `commentid` int(11) NOT NULL AUTO_INCREMENT,
  `typeid` int(11) NOT NULL DEFAULT 0,
  `creatortype` smallint(6) NOT NULL DEFAULT 0,
  `creatorid` int(11) NOT NULL DEFAULT 0,
  `commenttype` smallint(6) NOT NULL DEFAULT 0,
  `fullname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `ipaddress` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0.0.0.0',
  `dateline` int(11) NOT NULL DEFAULT 0,
  `parentcommentid` int(11) NOT NULL DEFAULT 0,
  `commentstatus` smallint(6) NOT NULL DEFAULT 0,
  `useragent` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `referrer` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `parenturl` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`commentid`),
  KEY `comments1` (`commenttype`,`commentstatus`,`typeid`),
  KEY `comments2` (`parentcommentid`),
  KEY `comments3` (`dateline`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swcron`
--

DROP TABLE IF EXISTS `swcron`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swcron` (
  `cronid` int(11) NOT NULL AUTO_INCREMENT,
  `nextrun` int(11) NOT NULL DEFAULT 0,
  `lastrun` int(11) NOT NULL DEFAULT 0,
  `chour` int(11) NOT NULL DEFAULT 0,
  `cminute` int(11) NOT NULL DEFAULT 0,
  `cday` int(11) NOT NULL DEFAULT 0,
  `app` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `controller` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `action` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `autorun` smallint(6) NOT NULL DEFAULT 0,
  `name` varchar(150) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`cronid`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swcronlogs`
--

DROP TABLE IF EXISTS `swcronlogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swcronlogs` (
  `cronlogid` int(11) NOT NULL AUTO_INCREMENT,
  `cronid` int(11) NOT NULL DEFAULT 0,
  `crontitle` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `dateline` int(11) NOT NULL DEFAULT 0,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`cronlogid`)
) ENGINE=InnoDB AUTO_INCREMENT=19375266 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swcustomfielddeplinks`
--

DROP TABLE IF EXISTS `swcustomfielddeplinks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swcustomfielddeplinks` (
  `customfielddeplinkid` int(11) NOT NULL AUTO_INCREMENT,
  `customfieldgroupid` int(11) NOT NULL DEFAULT 0,
  `departmentid` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`customfielddeplinkid`),
  UNIQUE KEY `customfielddeplinks1` (`customfieldgroupid`,`departmentid`)
) ENGINE=InnoDB AUTO_INCREMENT=1862 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swcustomfieldgrouppermissions`
--

DROP TABLE IF EXISTS `swcustomfieldgrouppermissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swcustomfieldgrouppermissions` (
  `customfieldgrouppermissionsid` int(11) NOT NULL AUTO_INCREMENT,
  `typeid` int(11) NOT NULL DEFAULT 0,
  `customfieldgroupid` int(11) NOT NULL DEFAULT 0,
  `cfgrouptype` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `accessmask` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`customfieldgrouppermissionsid`),
  KEY `customfieldgrouppermissions1` (`customfieldgroupid`,`cfgrouptype`),
  KEY `customfieldgrouppermissions2` (`cfgrouptype`,`typeid`)
) ENGINE=InnoDB AUTO_INCREMENT=15266 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swcustomfieldgroups`
--

DROP TABLE IF EXISTS `swcustomfieldgroups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swcustomfieldgroups` (
  `customfieldgroupid` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `grouptype` smallint(6) NOT NULL DEFAULT 0,
  `visibilitytype` smallint(6) NOT NULL DEFAULT 1,
  `displayorder` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`customfieldgroupid`),
  KEY `customfieldgroups1` (`grouptype`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swcustomfieldlinks`
--

DROP TABLE IF EXISTS `swcustomfieldlinks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swcustomfieldlinks` (
  `customfieldlinkid` int(11) NOT NULL AUTO_INCREMENT,
  `grouptype` smallint(6) NOT NULL DEFAULT 0,
  `linktypeid` int(11) NOT NULL DEFAULT 0,
  `customfieldgroupid` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`customfieldlinkid`),
  KEY `customfieldlinks1` (`grouptype`,`linktypeid`,`customfieldgroupid`),
  KEY `customfieldlinks2` (`customfieldgroupid`)
) ENGINE=InnoDB AUTO_INCREMENT=786635 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swcustomfieldoptionlinks`
--

DROP TABLE IF EXISTS `swcustomfieldoptionlinks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swcustomfieldoptionlinks` (
  `customfieldoptionlinkid` int(11) NOT NULL AUTO_INCREMENT,
  `customfieldid` int(11) NOT NULL DEFAULT 0,
  `customfieldoptionid` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`customfieldoptionlinkid`),
  KEY `customfieldoptionlinks1` (`customfieldid`),
  KEY `customfieldoptionlinks2` (`customfieldoptionid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swcustomfieldoptions`
--

DROP TABLE IF EXISTS `swcustomfieldoptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swcustomfieldoptions` (
  `customfieldoptionid` int(11) NOT NULL AUTO_INCREMENT,
  `customfieldid` int(11) NOT NULL DEFAULT 0,
  `optionvalue` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `displayorder` int(11) NOT NULL DEFAULT 0,
  `isselected` smallint(6) NOT NULL DEFAULT 0,
  `parentcustomfieldoptionid` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`customfieldoptionid`),
  KEY `customfieldoptions1` (`customfieldid`),
  KEY `customfieldoptions2` (`parentcustomfieldoptionid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swcustomfields`
--

DROP TABLE IF EXISTS `swcustomfields`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swcustomfields` (
  `customfieldid` int(11) NOT NULL AUTO_INCREMENT,
  `customfieldgroupid` int(11) NOT NULL DEFAULT 0,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `fieldtype` smallint(6) NOT NULL DEFAULT 0,
  `fieldname` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `defaultvalue` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `isrequired` smallint(6) NOT NULL DEFAULT 0,
  `usereditable` smallint(6) NOT NULL DEFAULT 0,
  `staffeditable` smallint(6) NOT NULL DEFAULT 0,
  `regexpvalidate` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `displayorder` int(11) NOT NULL DEFAULT 0,
  `encryptindb` smallint(6) NOT NULL DEFAULT 0,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`customfieldid`),
  KEY `customfields1` (`customfieldgroupid`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swcustomfieldvalues`
--

DROP TABLE IF EXISTS `swcustomfieldvalues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swcustomfieldvalues` (
  `customfieldvalueid` int(11) NOT NULL AUTO_INCREMENT,
  `customfieldid` int(11) NOT NULL DEFAULT 0,
  `typeid` int(11) NOT NULL DEFAULT 0,
  `fieldvalue` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `isserialized` smallint(6) NOT NULL DEFAULT 0,
  `isencrypted` smallint(6) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `uniquehash` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `lastupdated` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`customfieldvalueid`),
  KEY `customfieldvalues1` (`customfieldid`,`typeid`),
  KEY `customfieldvalues2` (`uniquehash`)
) ENGINE=InnoDB AUTO_INCREMENT=6516876 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swdepartments`
--

DROP TABLE IF EXISTS `swdepartments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swdepartments` (
  `departmentid` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `departmenttype` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'public',
  `departmentapp` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'tickets',
  `isdefault` smallint(6) NOT NULL DEFAULT 0,
  `displayorder` int(11) NOT NULL DEFAULT 0,
  `parentdepartmentid` int(11) NOT NULL DEFAULT 0,
  `uservisibilitycustom` smallint(6) NOT NULL DEFAULT 0,
  `enabletimer` int(1) NOT NULL DEFAULT 0,
  `ideltime` int(11) NOT NULL DEFAULT 0,
  `surrender` int(1) NOT NULL DEFAULT 0,
  `showtimer` int(1) NOT NULL DEFAULT 0,
  `showpausetime` int(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`departmentid`),
  KEY `departments1` (`departmentapp`),
  KEY `departments2` (`departmenttype`),
  KEY `departments3` (`parentdepartmentid`,`departmentapp`,`departmentid`,`departmenttype`)
) ENGINE=InnoDB AUTO_INCREMENT=3084 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swdepartments_bp_719`
--

DROP TABLE IF EXISTS `swdepartments_bp_719`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swdepartments_bp_719` (
  `departmentid` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `departmenttype` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'public',
  `departmentapp` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'tickets',
  `isdefault` smallint(6) NOT NULL DEFAULT 0,
  `displayorder` int(11) NOT NULL DEFAULT 0,
  `parentdepartmentid` int(11) NOT NULL DEFAULT 0,
  `uservisibilitycustom` smallint(6) NOT NULL DEFAULT 0,
  `enabletimer` int(1) NOT NULL DEFAULT 0,
  `ideltime` int(11) NOT NULL DEFAULT 0,
  `surrender` int(1) NOT NULL DEFAULT 0,
  `showtimer` int(1) NOT NULL DEFAULT 0,
  `showpausetime` int(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`departmentid`),
  KEY `departments1` (`departmentapp`),
  KEY `departments2` (`departmenttype`),
  KEY `departments3` (`parentdepartmentid`,`departmentapp`,`departmentid`,`departmenttype`)
) ENGINE=InnoDB AUTO_INCREMENT=1824 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swemailqueues`
--

DROP TABLE IF EXISTS `swemailqueues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swemailqueues` (
  `emailqueueid` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `type` varchar(30) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'tickets',
  `fetchtype` varchar(30) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'pipe',
  `host` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `port` varchar(10) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `userpassword` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `customfromname` varchar(200) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `customfromemail` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `tickettypeid` int(11) NOT NULL DEFAULT 0,
  `priorityid` int(11) NOT NULL DEFAULT 0,
  `ticketstatusid` int(11) NOT NULL DEFAULT 0,
  `departmentid` int(11) NOT NULL DEFAULT 0,
  `prefix` varchar(30) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `ticketautoresponder` smallint(6) NOT NULL DEFAULT 0,
  `replyautoresponder` smallint(6) NOT NULL DEFAULT 0,
  `registrationrequired` smallint(6) NOT NULL DEFAULT 0,
  `tgroupid` int(11) NOT NULL DEFAULT 0,
  `forcequeue` smallint(6) NOT NULL DEFAULT 1,
  `leavecopyonserver` smallint(6) NOT NULL DEFAULT 0,
  `usequeuesmtp` smallint(6) NOT NULL DEFAULT 0,
  `smtptype` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `isenabled` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`emailqueueid`),
  KEY `emailqueues1` (`email`),
  KEY `emailqueues2` (`email`(100),`customfromname`(100),`customfromemail`(100))
) ENGINE=InnoDB AUTO_INCREMENT=1844 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swemailqueues_ticket_count`
--

DROP TABLE IF EXISTS `swemailqueues_ticket_count`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swemailqueues_ticket_count` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `emailqueueid` int(11) NOT NULL DEFAULT 0,
  `emailid` varchar(100) DEFAULT NULL,
  `tickets_created_count` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `emailqueueid` (`emailqueueid`),
  KEY `emailid` (`emailid`)
) ENGINE=InnoDB AUTO_INCREMENT=364 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swentpmlist`
--

DROP TABLE IF EXISTS `swentpmlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swentpmlist` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `pmname` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `contact` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `extno` int(100) NOT NULL,
  `createdon` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `createdby` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `record_status` enum('0','1') COLLATE utf8_unicode_ci NOT NULL COMMENT '''0''is inactive and ''1'' is active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swerrorlogs`
--

DROP TABLE IF EXISTS `swerrorlogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swerrorlogs` (
  `errorlogid` int(11) NOT NULL AUTO_INCREMENT,
  `type` smallint(6) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `errordetails` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `userdata` text COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`errorlogid`),
  KEY `errorlogs1` (`type`),
  KEY `errorlogs2` (`dateline`)
) ENGINE=InnoDB AUTO_INCREMENT=1309288 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swescalationnotifications`
--

DROP TABLE IF EXISTS `swescalationnotifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swescalationnotifications` (
  `escalationnotificationid` int(11) NOT NULL AUTO_INCREMENT,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `escalationruleid` int(11) NOT NULL DEFAULT 0,
  `notificationtype` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `subject` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `notificationcontents` text COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`escalationnotificationid`),
  KEY `escalationnotifications1` (`escalationruleid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swescalationpaths`
--

DROP TABLE IF EXISTS `swescalationpaths`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swescalationpaths` (
  `escalationpathid` int(11) NOT NULL AUTO_INCREMENT,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `ticketid` bigint(20) NOT NULL,
  `slaplanid` int(11) NOT NULL DEFAULT 0,
  `slaplantitle` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `escalationruleid` int(11) NOT NULL DEFAULT 0,
  `escalationruletitle` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `ownerstaffid` int(11) NOT NULL DEFAULT 0,
  `ownerstaffname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `departmentid` int(11) NOT NULL DEFAULT 0,
  `departmenttitle` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `ticketstatusid` int(11) NOT NULL DEFAULT 0,
  `ticketstatustitle` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `priorityid` int(11) NOT NULL DEFAULT 0,
  `prioritytitle` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `tickettypeid` int(11) NOT NULL DEFAULT 0,
  `tickettypetitle` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `flagtype` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`escalationpathid`),
  KEY `escalationpaths1` (`ticketid`)
) ENGINE=InnoDB AUTO_INCREMENT=1294604 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swescalationrules`
--

DROP TABLE IF EXISTS `swescalationrules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swescalationrules` (
  `escalationruleid` int(11) NOT NULL AUTO_INCREMENT,
  `slaplanid` int(11) NOT NULL DEFAULT 0,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `priorityid` int(11) NOT NULL DEFAULT 0,
  `ticketstatusid` int(11) NOT NULL DEFAULT 0,
  `departmentid` int(11) NOT NULL DEFAULT 0,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `dateline` int(11) NOT NULL DEFAULT 0,
  `ruletype` smallint(6) NOT NULL DEFAULT 0,
  `flagtype` smallint(6) NOT NULL DEFAULT 0,
  `newslaplanid` int(11) NOT NULL DEFAULT 0,
  `addtags` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  `removetags` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  `tickettypeid` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`escalationruleid`),
  KEY `escalationrules1` (`slaplanid`),
  KEY `escalationrules2` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swfgeorganization`
--

DROP TABLE IF EXISTS `swfgeorganization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swfgeorganization` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `userorganizationid` int(100) NOT NULL,
  `bugroupid` int(11) NOT NULL,
  `fgegroup` int(11) NOT NULL,
  `fgepmlist` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `customername` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `contactno` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `status` enum('0','1') COLLATE utf8_unicode_ci NOT NULL COMMENT '''0'' is inactive and ''1'' is active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=936 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swfiles`
--

DROP TABLE IF EXISTS `swfiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swfiles` (
  `fileid` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `originalfilename` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `filehash` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `dateline` int(11) NOT NULL DEFAULT 0,
  `expiry` int(11) NOT NULL DEFAULT 0,
  `subdirectory` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`fileid`),
  KEY `files1` (`dateline`,`expiry`),
  KEY `files2` (`expiry`)
) ENGINE=InnoDB AUTO_INCREMENT=11141 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoipcities`
--

DROP TABLE IF EXISTS `swgeoipcities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoipcities` (
  `blockid` int(11) NOT NULL DEFAULT 0,
  `country` varchar(5) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `region` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `city` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `postalcode` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `latitude` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `longitude` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `metrocode` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `areacode` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`blockid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoipcityblocks1`
--

DROP TABLE IF EXISTS `swgeoipcityblocks1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoipcityblocks1` (
  `ipfrom` bigint(20) NOT NULL DEFAULT 0,
  `ipto` bigint(20) NOT NULL DEFAULT 0,
  `blockid` int(11) NOT NULL DEFAULT 0,
  KEY `geoipcityblocks1` (`ipto`),
  KEY `geoipcityblocks2` (`blockid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoipcityblocks10`
--

DROP TABLE IF EXISTS `swgeoipcityblocks10`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoipcityblocks10` (
  `ipfrom` bigint(20) NOT NULL DEFAULT 0,
  `ipto` bigint(20) NOT NULL DEFAULT 0,
  `blockid` int(11) NOT NULL DEFAULT 0,
  KEY `geoipcityblocks1` (`ipto`),
  KEY `geoipcityblocks2` (`blockid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoipcityblocks2`
--

DROP TABLE IF EXISTS `swgeoipcityblocks2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoipcityblocks2` (
  `ipfrom` bigint(20) NOT NULL DEFAULT 0,
  `ipto` bigint(20) NOT NULL DEFAULT 0,
  `blockid` int(11) NOT NULL DEFAULT 0,
  KEY `geoipcityblocks1` (`ipto`),
  KEY `geoipcityblocks2` (`blockid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoipcityblocks3`
--

DROP TABLE IF EXISTS `swgeoipcityblocks3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoipcityblocks3` (
  `ipfrom` bigint(20) NOT NULL DEFAULT 0,
  `ipto` bigint(20) NOT NULL DEFAULT 0,
  `blockid` int(11) NOT NULL DEFAULT 0,
  KEY `geoipcityblocks1` (`ipto`),
  KEY `geoipcityblocks2` (`blockid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoipcityblocks4`
--

DROP TABLE IF EXISTS `swgeoipcityblocks4`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoipcityblocks4` (
  `ipfrom` bigint(20) NOT NULL DEFAULT 0,
  `ipto` bigint(20) NOT NULL DEFAULT 0,
  `blockid` int(11) NOT NULL DEFAULT 0,
  KEY `geoipcityblocks1` (`ipto`),
  KEY `geoipcityblocks2` (`blockid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoipcityblocks5`
--

DROP TABLE IF EXISTS `swgeoipcityblocks5`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoipcityblocks5` (
  `ipfrom` bigint(20) NOT NULL DEFAULT 0,
  `ipto` bigint(20) NOT NULL DEFAULT 0,
  `blockid` int(11) NOT NULL DEFAULT 0,
  KEY `geoipcityblocks1` (`ipto`),
  KEY `geoipcityblocks2` (`blockid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoipcityblocks6`
--

DROP TABLE IF EXISTS `swgeoipcityblocks6`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoipcityblocks6` (
  `ipfrom` bigint(20) NOT NULL DEFAULT 0,
  `ipto` bigint(20) NOT NULL DEFAULT 0,
  `blockid` int(11) NOT NULL DEFAULT 0,
  KEY `geoipcityblocks1` (`ipto`),
  KEY `geoipcityblocks2` (`blockid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoipcityblocks7`
--

DROP TABLE IF EXISTS `swgeoipcityblocks7`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoipcityblocks7` (
  `ipfrom` bigint(20) NOT NULL DEFAULT 0,
  `ipto` bigint(20) NOT NULL DEFAULT 0,
  `blockid` int(11) NOT NULL DEFAULT 0,
  KEY `geoipcityblocks1` (`ipto`),
  KEY `geoipcityblocks2` (`blockid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoipcityblocks8`
--

DROP TABLE IF EXISTS `swgeoipcityblocks8`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoipcityblocks8` (
  `ipfrom` bigint(20) NOT NULL DEFAULT 0,
  `ipto` bigint(20) NOT NULL DEFAULT 0,
  `blockid` int(11) NOT NULL DEFAULT 0,
  KEY `geoipcityblocks1` (`ipto`),
  KEY `geoipcityblocks2` (`blockid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoipcityblocks9`
--

DROP TABLE IF EXISTS `swgeoipcityblocks9`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoipcityblocks9` (
  `ipfrom` bigint(20) NOT NULL DEFAULT 0,
  `ipto` bigint(20) NOT NULL DEFAULT 0,
  `blockid` int(11) NOT NULL DEFAULT 0,
  KEY `geoipcityblocks1` (`ipto`),
  KEY `geoipcityblocks2` (`blockid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoipisp1`
--

DROP TABLE IF EXISTS `swgeoipisp1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoipisp1` (
  `ipfrom` bigint(20) NOT NULL DEFAULT 0,
  `ipto` bigint(20) NOT NULL DEFAULT 0,
  `isp` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  KEY `geoipisp1` (`ipto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoipisp10`
--

DROP TABLE IF EXISTS `swgeoipisp10`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoipisp10` (
  `ipfrom` bigint(20) NOT NULL DEFAULT 0,
  `ipto` bigint(20) NOT NULL DEFAULT 0,
  `isp` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  KEY `geoipisp1` (`ipto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoipisp2`
--

DROP TABLE IF EXISTS `swgeoipisp2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoipisp2` (
  `ipfrom` bigint(20) NOT NULL DEFAULT 0,
  `ipto` bigint(20) NOT NULL DEFAULT 0,
  `isp` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  KEY `geoipisp1` (`ipto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoipisp3`
--

DROP TABLE IF EXISTS `swgeoipisp3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoipisp3` (
  `ipfrom` bigint(20) NOT NULL DEFAULT 0,
  `ipto` bigint(20) NOT NULL DEFAULT 0,
  `isp` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  KEY `geoipisp1` (`ipto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoipisp4`
--

DROP TABLE IF EXISTS `swgeoipisp4`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoipisp4` (
  `ipfrom` bigint(20) NOT NULL DEFAULT 0,
  `ipto` bigint(20) NOT NULL DEFAULT 0,
  `isp` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  KEY `geoipisp1` (`ipto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoipisp5`
--

DROP TABLE IF EXISTS `swgeoipisp5`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoipisp5` (
  `ipfrom` bigint(20) NOT NULL DEFAULT 0,
  `ipto` bigint(20) NOT NULL DEFAULT 0,
  `isp` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  KEY `geoipisp1` (`ipto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoipisp6`
--

DROP TABLE IF EXISTS `swgeoipisp6`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoipisp6` (
  `ipfrom` bigint(20) NOT NULL DEFAULT 0,
  `ipto` bigint(20) NOT NULL DEFAULT 0,
  `isp` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  KEY `geoipisp1` (`ipto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoipisp7`
--

DROP TABLE IF EXISTS `swgeoipisp7`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoipisp7` (
  `ipfrom` bigint(20) NOT NULL DEFAULT 0,
  `ipto` bigint(20) NOT NULL DEFAULT 0,
  `isp` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  KEY `geoipisp1` (`ipto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoipisp8`
--

DROP TABLE IF EXISTS `swgeoipisp8`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoipisp8` (
  `ipfrom` bigint(20) NOT NULL DEFAULT 0,
  `ipto` bigint(20) NOT NULL DEFAULT 0,
  `isp` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  KEY `geoipisp1` (`ipto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoipisp9`
--

DROP TABLE IF EXISTS `swgeoipisp9`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoipisp9` (
  `ipfrom` bigint(20) NOT NULL DEFAULT 0,
  `ipto` bigint(20) NOT NULL DEFAULT 0,
  `isp` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  KEY `geoipisp1` (`ipto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoipnetspeed1`
--

DROP TABLE IF EXISTS `swgeoipnetspeed1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoipnetspeed1` (
  `ipfrom` bigint(20) NOT NULL DEFAULT 0,
  `ipto` bigint(20) NOT NULL DEFAULT 0,
  `netspeed` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  KEY `geoipnetspeed1` (`ipto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoipnetspeed10`
--

DROP TABLE IF EXISTS `swgeoipnetspeed10`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoipnetspeed10` (
  `ipfrom` bigint(20) NOT NULL DEFAULT 0,
  `ipto` bigint(20) NOT NULL DEFAULT 0,
  `netspeed` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  KEY `geoipnetspeed1` (`ipto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoipnetspeed2`
--

DROP TABLE IF EXISTS `swgeoipnetspeed2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoipnetspeed2` (
  `ipfrom` bigint(20) NOT NULL DEFAULT 0,
  `ipto` bigint(20) NOT NULL DEFAULT 0,
  `netspeed` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  KEY `geoipnetspeed1` (`ipto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoipnetspeed3`
--

DROP TABLE IF EXISTS `swgeoipnetspeed3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoipnetspeed3` (
  `ipfrom` bigint(20) NOT NULL DEFAULT 0,
  `ipto` bigint(20) NOT NULL DEFAULT 0,
  `netspeed` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  KEY `geoipnetspeed1` (`ipto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoipnetspeed4`
--

DROP TABLE IF EXISTS `swgeoipnetspeed4`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoipnetspeed4` (
  `ipfrom` bigint(20) NOT NULL DEFAULT 0,
  `ipto` bigint(20) NOT NULL DEFAULT 0,
  `netspeed` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  KEY `geoipnetspeed1` (`ipto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoipnetspeed5`
--

DROP TABLE IF EXISTS `swgeoipnetspeed5`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoipnetspeed5` (
  `ipfrom` bigint(20) NOT NULL DEFAULT 0,
  `ipto` bigint(20) NOT NULL DEFAULT 0,
  `netspeed` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  KEY `geoipnetspeed1` (`ipto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoipnetspeed6`
--

DROP TABLE IF EXISTS `swgeoipnetspeed6`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoipnetspeed6` (
  `ipfrom` bigint(20) NOT NULL DEFAULT 0,
  `ipto` bigint(20) NOT NULL DEFAULT 0,
  `netspeed` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  KEY `geoipnetspeed1` (`ipto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoipnetspeed7`
--

DROP TABLE IF EXISTS `swgeoipnetspeed7`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoipnetspeed7` (
  `ipfrom` bigint(20) NOT NULL DEFAULT 0,
  `ipto` bigint(20) NOT NULL DEFAULT 0,
  `netspeed` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  KEY `geoipnetspeed1` (`ipto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoipnetspeed8`
--

DROP TABLE IF EXISTS `swgeoipnetspeed8`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoipnetspeed8` (
  `ipfrom` bigint(20) NOT NULL DEFAULT 0,
  `ipto` bigint(20) NOT NULL DEFAULT 0,
  `netspeed` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  KEY `geoipnetspeed1` (`ipto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoipnetspeed9`
--

DROP TABLE IF EXISTS `swgeoipnetspeed9`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoipnetspeed9` (
  `ipfrom` bigint(20) NOT NULL DEFAULT 0,
  `ipto` bigint(20) NOT NULL DEFAULT 0,
  `netspeed` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  KEY `geoipnetspeed1` (`ipto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoiporganization1`
--

DROP TABLE IF EXISTS `swgeoiporganization1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoiporganization1` (
  `ipfrom` bigint(20) NOT NULL DEFAULT 0,
  `ipto` bigint(20) NOT NULL DEFAULT 0,
  `organization` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  KEY `geoiporganization1` (`ipto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoiporganization10`
--

DROP TABLE IF EXISTS `swgeoiporganization10`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoiporganization10` (
  `ipfrom` bigint(20) NOT NULL DEFAULT 0,
  `ipto` bigint(20) NOT NULL DEFAULT 0,
  `organization` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  KEY `geoiporganization1` (`ipto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoiporganization2`
--

DROP TABLE IF EXISTS `swgeoiporganization2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoiporganization2` (
  `ipfrom` bigint(20) NOT NULL DEFAULT 0,
  `ipto` bigint(20) NOT NULL DEFAULT 0,
  `organization` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  KEY `geoiporganization1` (`ipto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoiporganization3`
--

DROP TABLE IF EXISTS `swgeoiporganization3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoiporganization3` (
  `ipfrom` bigint(20) NOT NULL DEFAULT 0,
  `ipto` bigint(20) NOT NULL DEFAULT 0,
  `organization` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  KEY `geoiporganization1` (`ipto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoiporganization4`
--

DROP TABLE IF EXISTS `swgeoiporganization4`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoiporganization4` (
  `ipfrom` bigint(20) NOT NULL DEFAULT 0,
  `ipto` bigint(20) NOT NULL DEFAULT 0,
  `organization` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  KEY `geoiporganization1` (`ipto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoiporganization5`
--

DROP TABLE IF EXISTS `swgeoiporganization5`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoiporganization5` (
  `ipfrom` bigint(20) NOT NULL DEFAULT 0,
  `ipto` bigint(20) NOT NULL DEFAULT 0,
  `organization` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  KEY `geoiporganization1` (`ipto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoiporganization6`
--

DROP TABLE IF EXISTS `swgeoiporganization6`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoiporganization6` (
  `ipfrom` bigint(20) NOT NULL DEFAULT 0,
  `ipto` bigint(20) NOT NULL DEFAULT 0,
  `organization` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  KEY `geoiporganization1` (`ipto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoiporganization7`
--

DROP TABLE IF EXISTS `swgeoiporganization7`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoiporganization7` (
  `ipfrom` bigint(20) NOT NULL DEFAULT 0,
  `ipto` bigint(20) NOT NULL DEFAULT 0,
  `organization` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  KEY `geoiporganization1` (`ipto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoiporganization8`
--

DROP TABLE IF EXISTS `swgeoiporganization8`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoiporganization8` (
  `ipfrom` bigint(20) NOT NULL DEFAULT 0,
  `ipto` bigint(20) NOT NULL DEFAULT 0,
  `organization` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  KEY `geoiporganization1` (`ipto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgeoiporganization9`
--

DROP TABLE IF EXISTS `swgeoiporganization9`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgeoiporganization9` (
  `ipfrom` bigint(20) NOT NULL DEFAULT 0,
  `ipto` bigint(20) NOT NULL DEFAULT 0,
  `organization` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  KEY `geoiporganization1` (`ipto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swgroupassigns`
--

DROP TABLE IF EXISTS `swgroupassigns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swgroupassigns` (
  `groupassignid` int(11) NOT NULL AUTO_INCREMENT,
  `departmentid` int(11) NOT NULL DEFAULT 0,
  `staffgroupid` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`groupassignid`),
  UNIQUE KEY `groupassigns3` (`departmentid`,`staffgroupid`),
  KEY `groupassigns1` (`staffgroupid`),
  KEY `groupassigns2` (`departmentid`)
) ENGINE=InnoDB AUTO_INCREMENT=428315 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swimportlogs`
--

DROP TABLE IF EXISTS `swimportlogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swimportlogs` (
  `importlogid` int(11) NOT NULL AUTO_INCREMENT,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `staffname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `ipaddress` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0.0.0.0',
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `logtype` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`importlogid`),
  KEY `importlogs1` (`logtype`,`dateline`),
  KEY `importlogs2` (`dateline`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swimportregistry`
--

DROP TABLE IF EXISTS `swimportregistry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swimportregistry` (
  `importregistryid` int(11) NOT NULL AUTO_INCREMENT,
  `section` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `vkey` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `data` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `nocache` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`importregistryid`),
  KEY `importregistry1` (`section`,`vkey`),
  KEY `importregistry2` (`nocache`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swjabberqueue`
--

DROP TABLE IF EXISTS `swjabberqueue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swjabberqueue` (
  `jabberqueueid` int(11) NOT NULL AUTO_INCREMENT,
  `messagetype` smallint(6) NOT NULL DEFAULT 0,
  `dispatchname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `dispatchtype` smallint(6) NOT NULL DEFAULT 0,
  `message` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `dateline` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`jabberqueueid`),
  KEY `jabberqueue1` (`messagetype`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swjobqueuemessagelogs`
--

DROP TABLE IF EXISTS `swjobqueuemessagelogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swjobqueuemessagelogs` (
  `jobqueuemessagelogid` int(11) NOT NULL AUTO_INCREMENT,
  `jobqueuemessageid` int(11) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `messagestatus` smallint(6) NOT NULL DEFAULT 0,
  `statusstage` smallint(6) NOT NULL DEFAULT 0,
  `updatecontents` text COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`jobqueuemessagelogid`),
  KEY `jobqueuemessagelogs1` (`jobqueuemessageid`),
  KEY `jobqueuemessagelogs2` (`dateline`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swjobqueuemessagepackets`
--

DROP TABLE IF EXISTS `swjobqueuemessagepackets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swjobqueuemessagepackets` (
  `jobqueuemessagepacketid` int(11) NOT NULL AUTO_INCREMENT,
  `queuename` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `dateline` int(11) NOT NULL DEFAULT 0,
  `receipthandle` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `messagebody` longtext COLLATE utf8_unicode_ci NOT NULL,
  `verifyhash` smallint(6) NOT NULL DEFAULT 0,
  `controllerparentclass` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`jobqueuemessagepacketid`),
  KEY `jobqueuemessagepackets1` (`queuename`),
  KEY `jobqueuemessagepackets2` (`dateline`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swjobqueuemessages`
--

DROP TABLE IF EXISTS `swjobqueuemessages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swjobqueuemessages` (
  `jobqueuemessageid` int(11) NOT NULL AUTO_INCREMENT,
  `messageuuid` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `serverid` int(11) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `lastupdate` int(11) NOT NULL DEFAULT 0,
  `messagestatus` smallint(6) NOT NULL DEFAULT 0,
  `statusstage` smallint(6) NOT NULL DEFAULT 0,
  `executionpath` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `contents` longtext COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`jobqueuemessageid`),
  KEY `jobqueuemessages1` (`serverid`),
  KEY `jobqueuemessages2` (`messageuuid`),
  KEY `jobqueuemessages3` (`lastupdate`),
  KEY `jobqueuemessages4` (`dateline`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swkbarticledata`
--

DROP TABLE IF EXISTS `swkbarticledata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swkbarticledata` (
  `kbarticledataid` int(11) NOT NULL AUTO_INCREMENT,
  `kbarticleid` int(11) NOT NULL DEFAULT 0,
  `contents` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  `contentstext` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`kbarticledataid`),
  KEY `kbarticledata1` (`kbarticleid`)
) ENGINE=InnoDB AUTO_INCREMENT=270 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swkbarticlelinks`
--

DROP TABLE IF EXISTS `swkbarticlelinks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swkbarticlelinks` (
  `kbarticlelinkid` int(11) NOT NULL AUTO_INCREMENT,
  `kbarticleid` int(11) NOT NULL DEFAULT 0,
  `linktype` smallint(6) NOT NULL DEFAULT 0,
  `linktypeid` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`kbarticlelinkid`),
  KEY `kbarticlelinks1` (`kbarticleid`),
  KEY `kbarticlelinks2` (`linktype`,`linktypeid`,`kbarticleid`)
) ENGINE=InnoDB AUTO_INCREMENT=804 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swkbarticles`
--

DROP TABLE IF EXISTS `swkbarticles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swkbarticles` (
  `kbarticleid` int(11) NOT NULL AUTO_INCREMENT,
  `creator` smallint(6) NOT NULL DEFAULT 0,
  `creatorid` int(11) NOT NULL DEFAULT 0,
  `author` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `subject` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `isedited` smallint(6) NOT NULL DEFAULT 0,
  `editeddateline` int(11) NOT NULL DEFAULT 0,
  `editedstaffid` int(11) NOT NULL DEFAULT 0,
  `views` int(11) NOT NULL DEFAULT 0,
  `isfeatured` smallint(6) NOT NULL DEFAULT 0,
  `allowcomments` smallint(6) NOT NULL DEFAULT 0,
  `totalcomments` int(11) NOT NULL DEFAULT 0,
  `hasattachments` smallint(6) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `articlestatus` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `articlerating` double NOT NULL DEFAULT 0,
  `ratinghits` int(11) NOT NULL DEFAULT 0,
  `ratingcount` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`kbarticleid`),
  KEY `kbarticles1` (`creator`,`creatorid`),
  KEY `kbarticles2` (`kbarticleid`,`isfeatured`),
  KEY `kbarticles3` (`articlestatus`),
  KEY `kbarticles4` (`subject`,`kbarticleid`)
) ENGINE=InnoDB AUTO_INCREMENT=270 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swkbarticlesubscribers`
--

DROP TABLE IF EXISTS `swkbarticlesubscribers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swkbarticlesubscribers` (
  `kbarticlesubscriberid` int(11) NOT NULL AUTO_INCREMENT,
  `kbarticleid` int(11) NOT NULL DEFAULT 0,
  `creator` smallint(6) NOT NULL DEFAULT 0,
  `creatorid` int(11) NOT NULL DEFAULT 0,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`kbarticlesubscriberid`),
  KEY `kbarticlesubscribers1` (`kbarticleid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swkbcategories`
--

DROP TABLE IF EXISTS `swkbcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swkbcategories` (
  `kbcategoryid` int(11) NOT NULL AUTO_INCREMENT,
  `parentkbcategoryid` int(11) NOT NULL DEFAULT 0,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `dateline` int(11) NOT NULL DEFAULT 0,
  `totalarticles` int(11) NOT NULL DEFAULT 0,
  `categorytype` smallint(6) NOT NULL DEFAULT 0,
  `displayorder` int(11) NOT NULL DEFAULT 0,
  `articlesortorder` smallint(6) NOT NULL DEFAULT 0,
  `allowcomments` smallint(6) NOT NULL DEFAULT 0,
  `allowrating` smallint(6) NOT NULL DEFAULT 0,
  `ispublished` smallint(6) NOT NULL DEFAULT 0,
  `uservisibilitycustom` smallint(6) NOT NULL DEFAULT 0,
  `staffvisibilitycustom` smallint(6) NOT NULL DEFAULT 0,
  `isimporteddownloadcategory` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`kbcategoryid`),
  KEY `kbcategories1` (`parentkbcategoryid`),
  KEY `kbcategories2` (`categorytype`,`parentkbcategoryid`,`uservisibilitycustom`,`staffvisibilitycustom`),
  KEY `kbcategories3` (`uservisibilitycustom`,`categorytype`),
  KEY `kbcategories4` (`title`,`kbcategoryid`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swlanguagephrases`
--

DROP TABLE IF EXISTS `swlanguagephrases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swlanguagephrases` (
  `phraseid` int(11) NOT NULL AUTO_INCREMENT,
  `languageid` int(11) NOT NULL DEFAULT 0,
  `section` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `code` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `sectioncode` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `appname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `contents` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `contentsdefault` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `ismaster` smallint(6) NOT NULL DEFAULT 1,
  `revertrequired` smallint(6) NOT NULL DEFAULT 0,
  `modified` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'notmodified',
  PRIMARY KEY (`phraseid`),
  UNIQUE KEY `languagephrases1` (`languageid`,`code`),
  KEY `languagephrases2` (`modified`,`revertrequired`),
  KEY `languagephrases3` (`languageid`,`modified`),
  KEY `languagephrases4` (`appname`)
) ENGINE=InnoDB AUTO_INCREMENT=14676 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swlanguages`
--

DROP TABLE IF EXISTS `swlanguages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swlanguages` (
  `languageid` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `languagecode` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `charset` varchar(200) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `author` varchar(120) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `textdirection` varchar(10) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'ltr',
  `ismaster` smallint(6) NOT NULL DEFAULT 0,
  `isdefault` smallint(6) NOT NULL DEFAULT 0,
  `displayorder` int(11) NOT NULL DEFAULT 0,
  `isenabled` smallint(6) NOT NULL DEFAULT 1,
  `flagicon` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`languageid`),
  KEY `languages1` (`languagecode`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swmacrocategories`
--

DROP TABLE IF EXISTS `swmacrocategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swmacrocategories` (
  `macrocategoryid` int(11) NOT NULL AUTO_INCREMENT,
  `parentcategoryid` int(11) NOT NULL DEFAULT 0,
  `categorytype` smallint(6) NOT NULL DEFAULT 0,
  `restrictstaffgroupid` int(11) NOT NULL DEFAULT 0,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`macrocategoryid`),
  KEY `macrocategories1` (`parentcategoryid`),
  KEY `macrocategories2` (`categorytype`,`staffid`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swmacroreplies`
--

DROP TABLE IF EXISTS `swmacroreplies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swmacroreplies` (
  `macroreplyid` int(11) NOT NULL AUTO_INCREMENT,
  `macrocategoryid` int(11) NOT NULL DEFAULT 0,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `subject` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `dateline` int(11) NOT NULL DEFAULT 0,
  `totalhits` int(11) NOT NULL DEFAULT 0,
  `lastusage` int(11) NOT NULL DEFAULT 0,
  `departmentid` double NOT NULL DEFAULT -1,
  `ownerstaffid` double NOT NULL DEFAULT -1,
  `tickettypeid` double NOT NULL DEFAULT -1,
  `ticketstatusid` double NOT NULL DEFAULT -1,
  `priorityid` double NOT NULL DEFAULT -1,
  PRIMARY KEY (`macroreplyid`),
  KEY `macroreplies1` (`macrocategoryid`),
  KEY `macroreplies2` (`staffid`),
  KEY `macroreplies3` (`subject`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swmacroreplydata`
--

DROP TABLE IF EXISTS `swmacroreplydata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swmacroreplydata` (
  `macroreplydataid` int(11) NOT NULL AUTO_INCREMENT,
  `macroreplyid` int(11) NOT NULL DEFAULT 0,
  `contents` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  `tagcontents` text COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`macroreplydataid`),
  KEY `macroreplydata1` (`macroreplyid`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swmailqueuedata`
--

DROP TABLE IF EXISTS `swmailqueuedata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swmailqueuedata` (
  `mailqueuedataid` int(11) NOT NULL AUTO_INCREMENT,
  `toemail` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `fromemail` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `fromname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `subject` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `datatext` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  `datahtml` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `ishtml` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`mailqueuedataid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swmessagedata`
--

DROP TABLE IF EXISTS `swmessagedata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swmessagedata` (
  `messagedataid` int(11) NOT NULL AUTO_INCREMENT,
  `messageid` int(11) NOT NULL DEFAULT 0,
  `contenttype` smallint(6) NOT NULL DEFAULT 0,
  `contents` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`messagedataid`),
  KEY `messagedata1` (`messageid`,`contenttype`),
  KEY `messagedata2` (`contenttype`,`messageid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swmessagequeue`
--

DROP TABLE IF EXISTS `swmessagequeue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swmessagequeue` (
  `messagequeueid` int(11) NOT NULL AUTO_INCREMENT,
  `chatobjectid` int(11) NOT NULL DEFAULT 0,
  `chatchildid` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `staffid` int(11) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `name` varchar(150) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `contents` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  `msgtype` varchar(15) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `guid` varchar(150) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `submittype` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`messagequeueid`),
  KEY `messagequeue1` (`chatobjectid`,`chatchildid`),
  KEY `messagequeue2` (`dateline`),
  KEY `messagequeue3` (`chatobjectid`,`staffid`),
  KEY `messagequeue4` (`guid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swmessagerouting`
--

DROP TABLE IF EXISTS `swmessagerouting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swmessagerouting` (
  `messageroutingid` int(11) NOT NULL AUTO_INCREMENT,
  `departmentid` int(11) NOT NULL DEFAULT 0,
  `preservemessage` smallint(6) NOT NULL DEFAULT 0,
  `routetotickets` smallint(6) NOT NULL DEFAULT 0,
  `routetoemail` smallint(6) NOT NULL DEFAULT 0,
  `ticketdepartmentid` int(11) NOT NULL DEFAULT 0,
  `forwardemails` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`messageroutingid`),
  KEY `messagerouting1` (`departmentid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swmessages`
--

DROP TABLE IF EXISTS `swmessages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swmessages` (
  `messageid` int(11) NOT NULL AUTO_INCREMENT,
  `messagemaskid` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `dateline` int(11) NOT NULL DEFAULT 0,
  `replydateline` int(11) NOT NULL DEFAULT 0,
  `fullname` varchar(150) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `email` varchar(150) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `subject` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `departmentid` int(11) NOT NULL DEFAULT 0,
  `parentmessageid` int(11) NOT NULL DEFAULT 0,
  `messagestatus` smallint(6) NOT NULL DEFAULT 0,
  `messagetype` smallint(6) NOT NULL DEFAULT 0,
  `messagerating` double NOT NULL DEFAULT 0,
  `chatobjectid` int(11) NOT NULL DEFAULT 0,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `staffname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `hasgeoip` smallint(6) NOT NULL DEFAULT 0,
  `geoiptimezone` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoipisp` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoiporganization` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoipnetspeed` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoipcountry` varchar(10) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoipcountrydesc` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoipregion` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoipcity` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoippostalcode` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoiplatitude` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoiplongitude` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoipmetrocode` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoipareacode` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`messageid`),
  KEY `messages1` (`departmentid`,`messagestatus`),
  KEY `messages2` (`staffid`),
  KEY `messages3` (`messagestatus`,`dateline`),
  KEY `messages4` (`messagetype`,`messagerating`),
  KEY `messages5` (`messagerating`),
  KEY `messages6` (`messagetype`,`messagestatus`,`messagerating`),
  KEY `messages7` (`messagemaskid`),
  KEY `messages8` (`dateline`),
  KEY `messages9` (`chatobjectid`),
  KEY `messages10` (`subject`(250),`fullname`(30),`email`(40)),
  KEY `messages11` (`departmentid`),
  KEY `messages12` (`messagemaskid`,`departmentid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swnewscategories`
--

DROP TABLE IF EXISTS `swnewscategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swnewscategories` (
  `newscategoryid` int(11) NOT NULL AUTO_INCREMENT,
  `categorytitle` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `newsitemcount` int(11) NOT NULL DEFAULT 0,
  `visibilitytype` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `dateline` int(11) NOT NULL DEFAULT 0,
  `lastupdate` int(11) NOT NULL DEFAULT 0,
  `titlehash` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`newscategoryid`),
  KEY `newscategories1` (`visibilitytype`),
  KEY `newscategories2` (`titlehash`,`visibilitytype`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swnewscategorylinks`
--

DROP TABLE IF EXISTS `swnewscategorylinks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swnewscategorylinks` (
  `newscategorylinkid` int(11) NOT NULL AUTO_INCREMENT,
  `newsitemid` int(11) NOT NULL DEFAULT 0,
  `newscategoryid` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`newscategorylinkid`),
  KEY `newscategorylinks1` (`newsitemid`,`newscategoryid`),
  KEY `newscategorylinks2` (`newscategoryid`,`newsitemid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swnewsitemdata`
--

DROP TABLE IF EXISTS `swnewsitemdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swnewsitemdata` (
  `newsitemdataid` int(11) NOT NULL AUTO_INCREMENT,
  `newsitemid` int(11) NOT NULL DEFAULT 0,
  `contents` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`newsitemdataid`),
  KEY `newsitemdata1` (`newsitemid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swnewsitems`
--

DROP TABLE IF EXISTS `swnewsitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swnewsitems` (
  `newsitemid` int(11) NOT NULL AUTO_INCREMENT,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `newstype` smallint(6) NOT NULL DEFAULT 0,
  `newsstatus` smallint(6) NOT NULL DEFAULT 0,
  `author` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `subject` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `emailsubject` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `description` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  `descriptionhash` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `subjecthash` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `contentshash` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `dateline` int(11) NOT NULL DEFAULT 0,
  `expiry` int(11) NOT NULL DEFAULT 0,
  `issynced` smallint(6) NOT NULL DEFAULT 0,
  `syncguidhash` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `syncdateline` int(11) NOT NULL DEFAULT 0,
  `edited` smallint(6) NOT NULL DEFAULT 0,
  `editedstaffid` int(11) NOT NULL DEFAULT 0,
  `editeddateline` int(11) NOT NULL DEFAULT 0,
  `totalcomments` int(11) NOT NULL DEFAULT 0,
  `uservisibilitycustom` smallint(6) NOT NULL DEFAULT 0,
  `staffvisibilitycustom` smallint(6) NOT NULL DEFAULT 0,
  `allowcomments` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`newsitemid`),
  KEY `newsitems1` (`newstype`,`newsstatus`,`expiry`,`uservisibilitycustom`,`newsitemid`),
  KEY `newsitems2` (`issynced`,`syncguidhash`,`syncdateline`),
  KEY `newsitems3` (`dateline`),
  KEY `newsitems4` (`newsstatus`,`expiry`,`staffvisibilitycustom`),
  KEY `newsitems5` (`expiry`,`staffvisibilitycustom`),
  KEY `newsitems6` (`subject`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swnewssubscriberhash`
--

DROP TABLE IF EXISTS `swnewssubscriberhash`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swnewssubscriberhash` (
  `newssubscriberhashid` int(11) NOT NULL AUTO_INCREMENT,
  `newssubscriberid` int(11) NOT NULL DEFAULT 0,
  `hash` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `dateline` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`newssubscriberhashid`),
  KEY `newssubscriberhash1` (`newssubscriberid`),
  KEY `newssubscriberhash2` (`hash`)
) ENGINE=InnoDB AUTO_INCREMENT=889 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swnewssubscribers`
--

DROP TABLE IF EXISTS `swnewssubscribers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swnewssubscribers` (
  `newssubscriberid` int(11) NOT NULL AUTO_INCREMENT,
  `tgroupid` int(11) NOT NULL DEFAULT 0,
  `userid` int(11) NOT NULL DEFAULT 0,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `dateline` int(11) NOT NULL DEFAULT 0,
  `isvalidated` smallint(6) NOT NULL DEFAULT 0,
  `usergroupid` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`newssubscriberid`),
  UNIQUE KEY `newssubscribers2` (`email`),
  KEY `newssubscribers1` (`tgroupid`,`isvalidated`),
  KEY `newssubscribers3` (`usergroupid`,`isvalidated`),
  KEY `newssubscribers4` (`isvalidated`)
) ENGINE=InnoDB AUTO_INCREMENT=865 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swnotificationactions`
--

DROP TABLE IF EXISTS `swnotificationactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swnotificationactions` (
  `notificationactionid` int(11) NOT NULL AUTO_INCREMENT,
  `notificationruleid` int(11) NOT NULL DEFAULT 0,
  `actiontype` smallint(6) NOT NULL DEFAULT 0,
  `contents` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`notificationactionid`),
  KEY `notificationactions1` (`notificationruleid`)
) ENGINE=InnoDB AUTO_INCREMENT=7170 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swnotificationcriteria`
--

DROP TABLE IF EXISTS `swnotificationcriteria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swnotificationcriteria` (
  `notificationcriteriaid` int(11) NOT NULL AUTO_INCREMENT,
  `notificationruleid` int(11) NOT NULL DEFAULT 0,
  `name` varchar(200) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `ruleop` smallint(6) NOT NULL DEFAULT 0,
  `rulematch` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `rulematchtype` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`notificationcriteriaid`),
  KEY `notificationcriteria1` (`notificationruleid`)
) ENGINE=InnoDB AUTO_INCREMENT=5946 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swnotificationpool`
--

DROP TABLE IF EXISTS `swnotificationpool`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swnotificationpool` (
  `notificationpoolid` int(11) NOT NULL AUTO_INCREMENT,
  `notificationruleid` int(11) NOT NULL DEFAULT 0,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `contents` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `dateline` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`notificationpoolid`),
  KEY `notificationpool1` (`staffid`,`dateline`),
  KEY `notificationpool2` (`dateline`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swnotificationrules`
--

DROP TABLE IF EXISTS `swnotificationrules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swnotificationrules` (
  `notificationruleid` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `ruletype` smallint(6) NOT NULL DEFAULT 0,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `emailprefix` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `isenabled` smallint(6) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`notificationruleid`),
  KEY `notificationrules1` (`ruletype`,`isenabled`),
  KEY `notificationrules2` (`isenabled`)
) ENGINE=InnoDB AUTO_INCREMENT=289 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swonsitesessions`
--

DROP TABLE IF EXISTS `swonsitesessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swonsitesessions` (
  `onsitesessionid` int(11) NOT NULL AUTO_INCREMENT,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `sessioncode` varchar(5) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `sessionhash` varchar(60) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `chatsessionid` varchar(60) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `chatobjectid` int(11) NOT NULL DEFAULT 0,
  `configid` smallint(6) NOT NULL DEFAULT 0,
  `peerjid` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `localjid` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `userid` int(11) NOT NULL DEFAULT 0,
  `staffname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `staffid` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`onsitesessionid`),
  KEY `onsitesessions1` (`sessionhash`,`chatsessionid`,`chatobjectid`),
  KEY `onsitesessions2` (`dateline`),
  KEY `onsitesessions3` (`sessioncode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sworganizationpm`
--

DROP TABLE IF EXISTS `sworganizationpm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sworganizationpm` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `userorganizationid` int(100) NOT NULL,
  `entgroup` int(11) NOT NULL,
  `pmlist` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `pm` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `customername` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `contactno` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `status` enum('0','1') COLLATE utf8_unicode_ci NOT NULL COMMENT '''0'' is inactive and ''1'' is active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sworgusers`
--

DROP TABLE IF EXISTS `sworgusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sworgusers` (
  `swu_id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL DEFAULT 0,
  `userorganizationid` int(11) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `record_status` enum('1','0') NOT NULL DEFAULT '1',
  PRIMARY KEY (`swu_id`),
  KEY `users1` (`userid`),
  KEY `userorganizationid1` (`userorganizationid`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swparserbans`
--

DROP TABLE IF EXISTS `swparserbans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swparserbans` (
  `parserbanid` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `dateline` int(11) NOT NULL DEFAULT 0,
  `staffid` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`parserbanid`),
  UNIQUE KEY `parserbans1` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=35660 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swparserbans_logs`
--

DROP TABLE IF EXISTS `swparserbans_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swparserbans_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `dateline` int(11) NOT NULL DEFAULT 0,
  `staffid` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=155 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swparserlogdata`
--

DROP TABLE IF EXISTS `swparserlogdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swparserlogdata` (
  `parserlogdataid` int(11) NOT NULL AUTO_INCREMENT,
  `parserlogid` int(11) NOT NULL DEFAULT 0,
  `contents` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`parserlogdataid`),
  KEY `parserlogdata1` (`parserlogid`)
) ENGINE=InnoDB AUTO_INCREMENT=3391514 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swparserlogs`
--

DROP TABLE IF EXISTS `swparserlogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swparserlogs` (
  `parserlogid` int(11) NOT NULL AUTO_INCREMENT,
  `typeid` int(11) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `emailqueueid` int(11) NOT NULL DEFAULT 0,
  `logtype` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'failure',
  `subject` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `fromemail` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `toemail` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `size` int(11) NOT NULL DEFAULT 0,
  `description` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `parsetimetaken` double NOT NULL DEFAULT 0,
  `responsetype` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'ticket',
  `ticketpostid` int(11) NOT NULL DEFAULT 0,
  `ticketmaskid` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`parserlogid`),
  KEY `parserlogs1` (`ticketpostid`),
  KEY `parserlogs2` (`dateline`),
  KEY `parserlogs3` (`emailqueueid`),
  KEY `parserlogs4` (`logtype`,`dateline`)
) ENGINE=InnoDB AUTO_INCREMENT=3391516 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swparserloopblocks`
--

DROP TABLE IF EXISTS `swparserloopblocks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swparserloopblocks` (
  `parserloopblockid` int(11) NOT NULL AUTO_INCREMENT,
  `restoretime` int(11) NOT NULL DEFAULT 0,
  `address` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`parserloopblockid`),
  KEY `parserloopblocks1` (`address`,`restoretime`),
  KEY `parserloopblocks2` (`restoretime`)
) ENGINE=InnoDB AUTO_INCREMENT=1241791 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swparserloophits`
--

DROP TABLE IF EXISTS `swparserloophits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swparserloophits` (
  `parserloophitid` int(11) NOT NULL AUTO_INCREMENT,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `emailaddress` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`parserloophitid`),
  KEY `parserloophits1` (`dateline`),
  KEY `parserloophits2` (`emailaddress`)
) ENGINE=InnoDB AUTO_INCREMENT=152922512 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swparserlooprules`
--

DROP TABLE IF EXISTS `swparserlooprules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swparserlooprules` (
  `parserloopruleid` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `length` int(11) NOT NULL DEFAULT 0,
  `maxhits` int(11) NOT NULL DEFAULT 0,
  `restoreafter` int(11) NOT NULL DEFAULT 0,
  `ismaster` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`parserloopruleid`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swparserruleactions`
--

DROP TABLE IF EXISTS `swparserruleactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swparserruleactions` (
  `parserruleactionid` int(11) NOT NULL AUTO_INCREMENT,
  `parserruleid` int(11) NOT NULL DEFAULT 0,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `typeid` int(11) NOT NULL DEFAULT 0,
  `typedata` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  `typechar` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`parserruleactionid`),
  KEY `parserruleactions1` (`parserruleid`)
) ENGINE=InnoDB AUTO_INCREMENT=546 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swparserrulecriteria`
--

DROP TABLE IF EXISTS `swparserrulecriteria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swparserrulecriteria` (
  `parserrulecriteriaid` int(11) NOT NULL AUTO_INCREMENT,
  `parserruleid` int(11) NOT NULL DEFAULT 0,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `ruleop` smallint(6) NOT NULL DEFAULT 0,
  `rulematch` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `rulematchtype` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`parserrulecriteriaid`),
  KEY `parserrulecriteria1` (`parserruleid`)
) ENGINE=InnoDB AUTO_INCREMENT=483 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swparserrules`
--

DROP TABLE IF EXISTS `swparserrules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swparserrules` (
  `parserruleid` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `dateline` int(11) NOT NULL DEFAULT 0,
  `sortorder` int(11) NOT NULL DEFAULT 0,
  `ruletype` smallint(6) NOT NULL DEFAULT 0,
  `matchtype` smallint(6) NOT NULL DEFAULT 0,
  `stopprocessing` smallint(6) NOT NULL DEFAULT 0,
  `isenabled` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`parserruleid`),
  KEY `parserrules1` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=154 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swpremiumorganizations`
--

DROP TABLE IF EXISTS `swpremiumorganizations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swpremiumorganizations` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `userorganizationid` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2581 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swqueuesignatures`
--

DROP TABLE IF EXISTS `swqueuesignatures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swqueuesignatures` (
  `queuesignatureid` int(11) NOT NULL AUTO_INCREMENT,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `emailqueueid` int(11) NOT NULL DEFAULT 0,
  `contents` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`queuesignatureid`),
  KEY `queuesignatures1` (`emailqueueid`)
) ENGINE=InnoDB AUTO_INCREMENT=1669 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swratingresults`
--

DROP TABLE IF EXISTS `swratingresults`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swratingresults` (
  `ratingresultid` int(11) NOT NULL AUTO_INCREMENT,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `typeid` int(11) NOT NULL DEFAULT 0,
  `ratingid` int(11) NOT NULL DEFAULT 0,
  `ratingresult` double NOT NULL DEFAULT 0,
  `creatorid` int(11) NOT NULL DEFAULT 0,
  `creatortype` smallint(6) NOT NULL DEFAULT 0,
  `isedited` smallint(6) NOT NULL DEFAULT 0,
  `editorid` int(11) NOT NULL DEFAULT 0,
  `editortype` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ratingresultid`),
  KEY `ratingresults1` (`ratingid`),
  KEY `ratingresults2` (`typeid`,`ratingid`)
) ENGINE=InnoDB AUTO_INCREMENT=225573 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swratings`
--

DROP TABLE IF EXISTS `swratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swratings` (
  `ratingid` int(11) NOT NULL AUTO_INCREMENT,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `departmentid` int(11) NOT NULL DEFAULT 0,
  `displayorder` int(11) NOT NULL DEFAULT 0,
  `ratingscale` smallint(6) NOT NULL DEFAULT 0,
  `ratingvisibility` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'private',
  `ratingtype` smallint(6) NOT NULL DEFAULT 0,
  `staffvisibilitycustom` smallint(6) NOT NULL DEFAULT 0,
  `uservisibilitycustom` smallint(6) NOT NULL DEFAULT 0,
  `iseditable` smallint(6) NOT NULL DEFAULT 0,
  `isclientonly` smallint(6) NOT NULL DEFAULT 0,
  `ratingtitle` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`ratingid`),
  KEY `ratings1` (`ratingtype`,`departmentid`),
  KEY `ratings2` (`departmentid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swregistry`
--

DROP TABLE IF EXISTS `swregistry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swregistry` (
  `vkey` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `data` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `isvolatile` smallint(6) NOT NULL DEFAULT 0,
  `datasize` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`vkey`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swreportcategories`
--

DROP TABLE IF EXISTS `swreportcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swreportcategories` (
  `reportcategoryid` int(11) NOT NULL AUTO_INCREMENT,
  `visibilitytype` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'public',
  `staffid` int(11) NOT NULL DEFAULT 0,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`reportcategoryid`),
  KEY `reportcategories1` (`visibilitytype`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swreporthistory`
--

DROP TABLE IF EXISTS `swreporthistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swreporthistory` (
  `reporthistoryid` int(11) NOT NULL AUTO_INCREMENT,
  `reportid` int(11) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `creatorstaffid` int(11) NOT NULL DEFAULT 0,
  `creatorstaffname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `kql` text COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`reporthistoryid`),
  KEY `reporthistory1` (`reportid`)
) ENGINE=InnoDB AUTO_INCREMENT=6588 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swreports`
--

DROP TABLE IF EXISTS `swreports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swreports` (
  `reportid` int(11) NOT NULL AUTO_INCREMENT,
  `reportcategoryid` int(11) NOT NULL DEFAULT 0,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `basetablename` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `basetablenametext` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `dateline` int(11) NOT NULL DEFAULT 0,
  `creatorstaffid` int(11) NOT NULL DEFAULT 0,
  `creatorstaffname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `visibilitytype` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'public',
  `updatedateline` int(11) NOT NULL DEFAULT 0,
  `updatestaffid` int(11) NOT NULL DEFAULT 0,
  `updatestaffname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `executedateline` int(11) NOT NULL DEFAULT 0,
  `executestaffid` int(11) NOT NULL DEFAULT 0,
  `executestaffname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `executetimetaken` int(11) NOT NULL DEFAULT 0,
  `chartsenabled` smallint(6) NOT NULL DEFAULT 1,
  `kql` text COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`reportid`),
  KEY `reports1` (`dateline`),
  KEY `reports2` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=579 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swreportschedules`
--

DROP TABLE IF EXISTS `swreportschedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swreportschedules` (
  `scheduleid` int(11) NOT NULL AUTO_INCREMENT,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `reportid` int(11) NOT NULL DEFAULT 0,
  `isexecuted` smallint(6) NOT NULL DEFAULT 0,
  `lastrun` int(11) DEFAULT 0,
  `nextrun` int(11) NOT NULL DEFAULT 0,
  `cday` int(11) DEFAULT 0,
  `format` varchar(10) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Excel',
  `recurrencetype` smallint(6) NOT NULL DEFAULT 0,
  `ccemails` text COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`scheduleid`),
  KEY `reportschedules1` (`staffid`),
  KEY `reportschedules2` (`reportid`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swreportusagelogs`
--

DROP TABLE IF EXISTS `swreportusagelogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swreportusagelogs` (
  `reportusagelogid` int(11) NOT NULL AUTO_INCREMENT,
  `reportid` int(11) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `staffname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `timetaken` double NOT NULL DEFAULT 0,
  PRIMARY KEY (`reportusagelogid`),
  KEY `reportusagelogs1` (`reportid`),
  KEY `reportusagelogs2` (`staffid`,`reportid`)
) ENGINE=InnoDB AUTO_INCREMENT=5562 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swsearchindex`
--

DROP TABLE IF EXISTS `swsearchindex`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swsearchindex` (
  `objid` int(11) NOT NULL,
  `subobjid` int(11) DEFAULT 0,
  `type` smallint(6) DEFAULT NULL,
  `ft` text COLLATE utf8_unicode_ci DEFAULT NULL,
  KEY `searchindex1` (`objid`),
  KEY `searchindex2` (`type`,`objid`),
  KEY `searchindex3` (`objid`,`type`),
  KEY `searchindex4` (`objid`,`subobjid`,`type`),
  FULLTEXT KEY `fulltextsearch` (`ft`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swsearchstoredata`
--

DROP TABLE IF EXISTS `swsearchstoredata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swsearchstoredata` (
  `searchstoredataid` int(11) NOT NULL AUTO_INCREMENT,
  `searchstoreid` int(11) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `dataid` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`searchstoredataid`),
  KEY `searchstoredata1` (`searchstoreid`),
  KEY `searchstoredata2` (`dateline`)
) ENGINE=InnoDB AUTO_INCREMENT=1191347 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swsearchstores`
--

DROP TABLE IF EXISTS `swsearchstores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swsearchstores` (
  `searchstoreid` int(11) NOT NULL AUTO_INCREMENT,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `sessionid` varchar(70) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `lastupdate` int(11) NOT NULL DEFAULT 0,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `userid` int(11) NOT NULL DEFAULT 0,
  `storetype` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`searchstoreid`),
  KEY `searchstores1` (`sessionid`),
  KEY `searchstores2` (`storetype`,`staffid`),
  KEY `searchstores3` (`storetype`,`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=1509233 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swsessions`
--

DROP TABLE IF EXISTS `swsessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swsessions` (
  `sessionid` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `ipaddress` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0.0.0.0',
  `lastactivity` int(11) NOT NULL DEFAULT 0,
  `lastactivitycustom` int(11) NOT NULL DEFAULT 0,
  `useragent` varchar(60) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `isloggedin` smallint(6) NOT NULL DEFAULT 0,
  `sessiontype` int(11) NOT NULL DEFAULT 0,
  `typeid` int(11) NOT NULL DEFAULT 0,
  `sessionhits` int(11) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `status` smallint(6) NOT NULL DEFAULT 0,
  `phonestatus` smallint(6) NOT NULL DEFAULT 0,
  `captcha` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `gridcolor` varchar(30) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `visitorgroupid` smallint(6) NOT NULL DEFAULT 0,
  `departmentid` smallint(6) NOT NULL DEFAULT 0,
  `proactiveresult` smallint(6) NOT NULL DEFAULT 0,
  `ticketviewid` smallint(6) NOT NULL DEFAULT 0,
  `iswinapp` smallint(6) NOT NULL DEFAULT 0,
  `csrfhash` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `languagecode` varchar(10) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`sessionid`),
  KEY `sessions1` (`sessiontype`,`lastactivity`,`status`),
  KEY `sessions2` (`typeid`,`sessiontype`),
  KEY `sessions3` (`sessionid`,`sessiontype`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swsettings`
--

DROP TABLE IF EXISTS `swsettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swsettings` (
  `settingid` int(11) NOT NULL AUTO_INCREMENT,
  `section` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `vkey` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `data` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`settingid`),
  KEY `settings1` (`section`,`vkey`)
) ENGINE=InnoDB AUTO_INCREMENT=274 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swsettingsfields`
--

DROP TABLE IF EXISTS `swsettingsfields`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swsettingsfields` (
  `sfieldid` int(11) NOT NULL AUTO_INCREMENT,
  `sgroupid` int(11) NOT NULL DEFAULT 0,
  `name` varchar(200) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `customvalue` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  `iscustom` smallint(6) NOT NULL DEFAULT 0,
  `settingtype` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'text',
  `app` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `displayorder` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`sfieldid`),
  KEY `settingsfields1` (`sgroupid`)
) ENGINE=InnoDB AUTO_INCREMENT=2194 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swsettingsgroups`
--

DROP TABLE IF EXISTS `swsettingsgroups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swsettingsgroups` (
  `sgroupid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `app` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `displayorder` int(11) NOT NULL DEFAULT 0,
  `ishidden` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`sgroupid`),
  KEY `settingsgroups1` (`app`),
  KEY `settingsgroups2` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swsignatures`
--

DROP TABLE IF EXISTS `swsignatures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swsignatures` (
  `signatureid` int(11) NOT NULL AUTO_INCREMENT,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `signature` text COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`signatureid`),
  KEY `signatures1` (`staffid`)
) ENGINE=InnoDB AUTO_INCREMENT=13313 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swslaholidaylinks`
--

DROP TABLE IF EXISTS `swslaholidaylinks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swslaholidaylinks` (
  `slaholidaylinkid` int(11) NOT NULL AUTO_INCREMENT,
  `slaplanid` int(11) NOT NULL DEFAULT 0,
  `slaholidayid` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`slaholidaylinkid`),
  KEY `slaholidaylinks1` (`slaplanid`,`slaholidayid`),
  KEY `slaholidaylinks2` (`slaholidayid`)
) ENGINE=InnoDB AUTO_INCREMENT=1641 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swslaholidays`
--

DROP TABLE IF EXISTS `swslaholidays`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swslaholidays` (
  `slaholidayid` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `holidayday` smallint(6) NOT NULL DEFAULT 0,
  `holidaymonth` smallint(6) NOT NULL DEFAULT 0,
  `holidaydate` varchar(200) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `flagicon` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `iscustom` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`slaholidayid`),
  KEY `slaholidays1` (`holidayday`,`holidaymonth`),
  KEY `slaholidays2` (`holidaydate`,`iscustom`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swslaplans`
--

DROP TABLE IF EXISTS `swslaplans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swslaplans` (
  `slaplanid` int(11) NOT NULL AUTO_INCREMENT,
  `slascheduleid` int(11) NOT NULL DEFAULT 0,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `overduehrs` double NOT NULL DEFAULT 0,
  `resolutionduehrs` double NOT NULL DEFAULT 0,
  `isenabled` smallint(6) NOT NULL DEFAULT 0,
  `sortorder` int(11) NOT NULL DEFAULT 0,
  `ruletype` smallint(6) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`slaplanid`),
  KEY `slaplans1` (`slascheduleid`),
  KEY `slaplans2` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=643 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swslarulecriteria`
--

DROP TABLE IF EXISTS `swslarulecriteria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swslarulecriteria` (
  `slarulecriteriaid` int(11) NOT NULL AUTO_INCREMENT,
  `slaplanid` int(11) NOT NULL DEFAULT 0,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `ruleop` smallint(6) NOT NULL DEFAULT 0,
  `rulematch` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `rulematchtype` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`slarulecriteriaid`),
  KEY `slarulecriteria1` (`slaplanid`)
) ENGINE=InnoDB AUTO_INCREMENT=1631 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swslaschedules`
--

DROP TABLE IF EXISTS `swslaschedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swslaschedules` (
  `slascheduleid` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `sunday_open` smallint(6) NOT NULL DEFAULT 0,
  `monday_open` smallint(6) NOT NULL DEFAULT 0,
  `tuesday_open` smallint(6) NOT NULL DEFAULT 0,
  `wednesday_open` smallint(6) NOT NULL DEFAULT 0,
  `thursday_open` smallint(6) NOT NULL DEFAULT 0,
  `friday_open` smallint(6) NOT NULL DEFAULT 0,
  `saturday_open` smallint(6) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`slascheduleid`)
) ENGINE=InnoDB AUTO_INCREMENT=213 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swslascheduletable`
--

DROP TABLE IF EXISTS `swslascheduletable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swslascheduletable` (
  `slascheduletableid` int(11) NOT NULL AUTO_INCREMENT,
  `slascheduleid` int(11) NOT NULL DEFAULT 0,
  `sladay` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `opentimeline` varchar(6) COLLATE utf8_unicode_ci NOT NULL DEFAULT '00:00',
  `closetimeline` varchar(6) COLLATE utf8_unicode_ci NOT NULL DEFAULT '00:00',
  PRIMARY KEY (`slascheduletableid`)
) ENGINE=InnoDB AUTO_INCREMENT=1076 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=5117 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swstaffactivitylog`
--

DROP TABLE IF EXISTS `swstaffactivitylog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swstaffactivitylog` (
  `staffactivitylogid` int(11) NOT NULL AUTO_INCREMENT,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `staffname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `ipaddress` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `forwardedipaddress` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `useragent` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `actiontype` smallint(6) NOT NULL DEFAULT 0,
  `sectiontype` smallint(6) NOT NULL DEFAULT 0,
  `interfacetype` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`staffactivitylogid`),
  KEY `staffactivitylog1` (`interfacetype`,`dateline`),
  KEY `staffactivitylog2` (`dateline`)
) ENGINE=InnoDB AUTO_INCREMENT=5367233 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swstaffassigns`
--

DROP TABLE IF EXISTS `swstaffassigns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swstaffassigns` (
  `staffassignid` int(11) NOT NULL AUTO_INCREMENT,
  `departmentid` int(11) NOT NULL DEFAULT 0,
  `staffid` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`staffassignid`),
  UNIQUE KEY `staffassigns3` (`departmentid`,`staffid`),
  KEY `staffassigns1` (`staffid`),
  KEY `staffassigns2` (`departmentid`)
) ENGINE=InnoDB AUTO_INCREMENT=138171 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swstaffgroup`
--

DROP TABLE IF EXISTS `swstaffgroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swstaffgroup` (
  `staffgroupid` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `isadmin` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`staffgroupid`),
  KEY `staffgroup1` (`isadmin`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swstaffgrouplinks`
--

DROP TABLE IF EXISTS `swstaffgrouplinks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swstaffgrouplinks` (
  `staffgrouplinkid` int(11) NOT NULL AUTO_INCREMENT,
  `toassignid` int(11) NOT NULL DEFAULT 0,
  `type` smallint(6) NOT NULL DEFAULT 0,
  `staffgroupid` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`staffgrouplinkid`),
  KEY `staffgrouplinks1` (`staffgroupid`,`type`),
  KEY `staffgrouplinks2` (`toassignid`,`type`,`staffgroupid`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swstaffgroupsettings`
--

DROP TABLE IF EXISTS `swstaffgroupsettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swstaffgroupsettings` (
  `sgroupsettingid` int(11) NOT NULL AUTO_INCREMENT,
  `staffgroupid` int(11) NOT NULL DEFAULT 0,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `value` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`sgroupsettingid`),
  UNIQUE KEY `staffgroupsettings2` (`staffgroupid`,`name`),
  KEY `staffgroupsettings1` (`staffgroupid`)
) ENGINE=InnoDB AUTO_INCREMENT=6498 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swstaffloginlog`
--

DROP TABLE IF EXISTS `swstaffloginlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swstaffloginlog` (
  `staffloginlogid` int(11) NOT NULL AUTO_INCREMENT,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `logindateline` int(11) NOT NULL DEFAULT 0,
  `activitydateline` int(11) NOT NULL DEFAULT 0,
  `logoutdateline` int(11) NOT NULL DEFAULT 0,
  `staffname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `staffusername` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `ipaddress` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0.0.0.0',
  `forwardedipaddress` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0.0.0.0',
  `useragent` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `sessionid` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `logouttype` smallint(6) NOT NULL DEFAULT 0,
  `loginresult` smallint(6) NOT NULL DEFAULT 0,
  `interfacetype` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`staffloginlogid`),
  KEY `staffloginlog1` (`staffid`,`logindateline`,`interfacetype`),
  KEY `staffloginlog2` (`staffusername`,`logindateline`,`loginresult`),
  KEY `staffloginlog3` (`logindateline`,`loginresult`),
  KEY `staffloginlog4` (`sessionid`)
) ENGINE=InnoDB AUTO_INCREMENT=17289535 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swstaffprofileimages`
--

DROP TABLE IF EXISTS `swstaffprofileimages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swstaffprofileimages` (
  `staffprofileimageid` int(11) NOT NULL AUTO_INCREMENT,
  `type` smallint(6) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `extension` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `imagedata` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`staffprofileimageid`),
  KEY `staffprofileimages1` (`staffid`,`type`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swstaffproperties`
--

DROP TABLE IF EXISTS `swstaffproperties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swstaffproperties` (
  `staffpropertyid` int(11) NOT NULL AUTO_INCREMENT,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `updatedateline` int(11) NOT NULL DEFAULT 0,
  `keyname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `keyvalue` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`staffpropertyid`),
  KEY `staffproperties1` (`staffid`,`keyname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swstaffsettings`
--

DROP TABLE IF EXISTS `swstaffsettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swstaffsettings` (
  `staffsettingid` int(11) NOT NULL AUTO_INCREMENT,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `departmentid` int(11) NOT NULL DEFAULT 0,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `value` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`staffsettingid`),
  UNIQUE KEY `staffsettings2` (`staffid`,`departmentid`,`name`),
  KEY `staffsettings1` (`staffid`),
  KEY `staffsettings3` (`departmentid`)
) ENGINE=InnoDB AUTO_INCREMENT=10013565 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swsurvey`
--

DROP TABLE IF EXISTS `swsurvey`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swsurvey` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tickethash` varchar(200) NOT NULL,
  `satisfaction` int(11) NOT NULL,
  `resolution` int(11) NOT NULL,
  `helpfullness` int(11) NOT NULL,
  `attitude` int(11) NOT NULL,
  `techexpertise` int(11) NOT NULL,
  `timelines` int(11) NOT NULL,
  `appropriateness` int(11) NOT NULL,
  `helpdesk` int(11) NOT NULL,
  `resolutiontype` int(11) NOT NULL,
  `suggestions` text NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` int(11) NOT NULL,
  `record_status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1291 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swsurvey_new`
--

DROP TABLE IF EXISTS `swsurvey_new`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swsurvey_new` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tickethash` varchar(255) DEFAULT NULL,
  `satisfaction` varchar(255) DEFAULT NULL,
  `resolution` varchar(255) DEFAULT NULL,
  `response` varchar(255) DEFAULT NULL,
  `rating` varchar(255) DEFAULT NULL,
  `suggestions` text DEFAULT NULL,
  `createdon` int(11) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=132647 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swsurveylinks`
--

DROP TABLE IF EXISTS `swsurveylinks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swsurveylinks` (
  `linkid` int(11) NOT NULL AUTO_INCREMENT,
  `tickethash` varchar(225) DEFAULT NULL,
  `dateline` int(11) DEFAULT NULL,
  `record_status` enum('0','1') DEFAULT NULL,
  PRIMARY KEY (`linkid`)
) ENGINE=InnoDB AUTO_INCREMENT=19773085 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swtaglinks`
--

DROP TABLE IF EXISTS `swtaglinks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swtaglinks` (
  `taglinkid` int(11) NOT NULL AUTO_INCREMENT,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `tagid` int(11) NOT NULL DEFAULT 0,
  `linktype` smallint(6) NOT NULL DEFAULT 0,
  `linkid` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`taglinkid`),
  KEY `taglinks1` (`tagid`,`linktype`),
  KEY `taglinks2` (`linktype`,`linkid`)
) ENGINE=InnoDB AUTO_INCREMENT=39917 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swtags`
--

DROP TABLE IF EXISTS `swtags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swtags` (
  `tagid` int(11) NOT NULL AUTO_INCREMENT,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `tagname` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `linkcount` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`tagid`),
  KEY `tags1` (`tagname`)
) ENGINE=InnoDB AUTO_INCREMENT=311 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swtemplatecategories`
--

DROP TABLE IF EXISTS `swtemplatecategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swtemplatecategories` (
  `tcategoryid` int(11) NOT NULL AUTO_INCREMENT,
  `tgroupid` int(11) NOT NULL DEFAULT 0,
  `name` varchar(60) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `icon` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `app` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`tcategoryid`),
  KEY `templatecategories1` (`tgroupid`)
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swtemplatedata`
--

DROP TABLE IF EXISTS `swtemplatedata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swtemplatedata` (
  `templatedataid` int(11) NOT NULL AUTO_INCREMENT,
  `templateid` int(11) NOT NULL DEFAULT 0,
  `contents` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  `contentsdefault` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`templatedataid`),
  KEY `templatedata1` (`templateid`)
) ENGINE=InnoDB AUTO_INCREMENT=1330 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swtemplategroups`
--

DROP TABLE IF EXISTS `swtemplategroups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swtemplategroups` (
  `tgroupid` int(11) NOT NULL AUTO_INCREMENT,
  `languageid` int(11) NOT NULL DEFAULT 0,
  `isenabled` smallint(6) NOT NULL DEFAULT 0,
  `guestusergroupid` int(11) NOT NULL DEFAULT 0,
  `regusergroupid` int(11) NOT NULL DEFAULT 0,
  `title` varchar(155) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `companyname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `ismaster` smallint(6) NOT NULL DEFAULT 0,
  `enablepassword` smallint(6) NOT NULL DEFAULT 0,
  `groupusername` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `grouppassword` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `restrictgroups` smallint(6) NOT NULL DEFAULT 0,
  `isdefault` smallint(6) NOT NULL DEFAULT 0,
  `useloginshare` smallint(6) NOT NULL DEFAULT 0,
  `loginapi_appid` smallint(6) NOT NULL DEFAULT 0,
  `ticketstatusid` int(11) NOT NULL DEFAULT 0,
  `priorityid` int(11) NOT NULL DEFAULT 0,
  `departmentid` int(11) NOT NULL DEFAULT 0,
  `tickettypeid` int(11) NOT NULL DEFAULT 0,
  `departmentid_livechat` int(11) NOT NULL DEFAULT 0,
  `tickets_prompttype` smallint(6) NOT NULL DEFAULT 0,
  `tickets_promptpriority` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`tgroupid`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swtemplatehistory`
--

DROP TABLE IF EXISTS `swtemplatehistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swtemplatehistory` (
  `templatehistoryid` int(11) NOT NULL AUTO_INCREMENT,
  `templateid` int(11) NOT NULL DEFAULT 0,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `changelognotes` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `templatelength` int(11) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `templateversion` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT '1.00.00',
  `contents` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  `contentshash` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`templatehistoryid`),
  KEY `templatehistory1` (`templateid`)
) ENGINE=InnoDB AUTO_INCREMENT=431 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swtemplates`
--

DROP TABLE IF EXISTS `swtemplates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swtemplates` (
  `templateid` int(11) NOT NULL AUTO_INCREMENT,
  `tgroupid` int(11) NOT NULL DEFAULT 0,
  `tcategoryid` int(11) NOT NULL DEFAULT 0,
  `templateversion` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT '1.00.00',
  `name` varchar(60) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `templatelength` int(11) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `modified` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'notmodified',
  `contentshash` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `iscustom` smallint(6) NOT NULL DEFAULT 0,
  `contentsdefaulthash` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`templateid`),
  KEY `templates1` (`tgroupid`,`name`),
  KEY `templates2` (`tcategoryid`)
) ENGINE=InnoDB AUTO_INCREMENT=1330 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swticketauditlogs`
--

DROP TABLE IF EXISTS `swticketauditlogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swticketauditlogs` (
  `ticketauditlogid` bigint(20) NOT NULL AUTO_INCREMENT,
  `ticketid` bigint(20) NOT NULL DEFAULT 0,
  `ticketpostid` bigint(20) NOT NULL DEFAULT 0,
  `departmentid` int(11) NOT NULL DEFAULT 0,
  `departmenttitle` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `dateline` int(11) NOT NULL DEFAULT 0,
  `creatortype` smallint(6) NOT NULL DEFAULT 0,
  `creatorid` int(11) NOT NULL DEFAULT 0,
  `creatorfullname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `actiontype` smallint(6) NOT NULL DEFAULT 0,
  `actionmsg` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `valuetype` int(11) NOT NULL DEFAULT 0,
  `oldvalueid` int(11) NOT NULL DEFAULT 0,
  `oldvaluestring` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `newvalueid` int(11) NOT NULL DEFAULT 0,
  `newvaluestring` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `actionhash` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`ticketauditlogid`) USING BTREE,
  KEY `ticketauditlogs1` (`ticketid`,`actiontype`) USING BTREE,
  KEY `ticketauditlogs2` (`dateline`,`creatortype`,`creatorid`) USING BTREE,
  KEY `ticketauditlogs3` (`actionhash`) USING BTREE,
  KEY `ticketauditlogs4` (`ticketid`,`ticketpostid`,`valuetype`) USING BTREE,
  KEY `ticketauditlogs5` (`ticketpostid`,`ticketid`,`valuetype`) USING BTREE,
  KEY `actionmsg` (`actionmsg`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1693149380 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swticketdrafts`
--

DROP TABLE IF EXISTS `swticketdrafts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swticketdrafts` (
  `ticketdraftid` int(11) NOT NULL AUTO_INCREMENT,
  `ticketid` bigint(20) NOT NULL,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `staffname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `isedited` smallint(6) NOT NULL DEFAULT 0,
  `editedstaffname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `editedbystaffid` int(11) NOT NULL DEFAULT 0,
  `editeddateline` int(11) NOT NULL DEFAULT 0,
  `contents` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ticketdraftid`),
  KEY `ticketdrafts1` (`ticketid`,`staffid`)
) ENGINE=InnoDB AUTO_INCREMENT=128969 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swticketemails`
--

DROP TABLE IF EXISTS `swticketemails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swticketemails` (
  `ticketemailid` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `issearchable` smallint(6) NOT NULL DEFAULT 1,
  PRIMARY KEY (`ticketemailid`),
  UNIQUE KEY `ticketemails1` (`issearchable`,`email`)
) ENGINE=InnoDB AUTO_INCREMENT=858954 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swticketemails_group`
--

DROP TABLE IF EXISTS `swticketemails_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swticketemails_group` (
  `ticketemailid` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `issearchable` smallint(6) NOT NULL DEFAULT 1,
  `ticketpostid_em` int(11) DEFAULT NULL,
  PRIMARY KEY (`ticketemailid`),
  UNIQUE KEY `ticketemails1` (`issearchable`,`email`)
) ENGINE=InnoDB AUTO_INCREMENT=488135 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swticketfiletypes`
--

DROP TABLE IF EXISTS `swticketfiletypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swticketfiletypes` (
  `ticketfiletypeid` int(11) NOT NULL AUTO_INCREMENT,
  `extension` varchar(10) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `maxsize` int(11) NOT NULL DEFAULT 0,
  `acceptsupportcenter` smallint(6) NOT NULL DEFAULT 0,
  `acceptmailparser` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ticketfiletypeid`),
  KEY `ticketfiletypes1` (`extension`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swticketfilterfields`
--

DROP TABLE IF EXISTS `swticketfilterfields`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swticketfilterfields` (
  `ticketfilterfieldid` int(11) NOT NULL AUTO_INCREMENT,
  `ticketfilterid` int(11) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `fieldtitle` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `fieldoper` int(11) NOT NULL DEFAULT 0,
  `fieldvalue` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`ticketfilterfieldid`),
  KEY `ticketfilterfields1` (`ticketfilterid`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swticketfilters`
--

DROP TABLE IF EXISTS `swticketfilters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swticketfilters` (
  `ticketfilterid` int(11) NOT NULL AUTO_INCREMENT,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `lastactivity` int(11) NOT NULL DEFAULT 0,
  `filtertype` smallint(6) NOT NULL DEFAULT 0,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `staffid` int(11) NOT NULL DEFAULT 0,
  `restrictstaffgroupid` int(11) NOT NULL DEFAULT 0,
  `criteriaoptions` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ticketfilterid`),
  KEY `ticketfilters1` (`filtertype`,`staffid`),
  KEY `ticketfilters2` (`filtertype`,`restrictstaffgroupid`),
  KEY `ticketfilters3` (`staffid`),
  KEY `ticketfilters4` (`title`,`ticketfilterid`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swticketfollowups`
--

DROP TABLE IF EXISTS `swticketfollowups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swticketfollowups` (
  `ticketfollowupid` int(11) NOT NULL AUTO_INCREMENT,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `executiondateline` int(11) NOT NULL DEFAULT 0,
  `ticketid` bigint(20) NOT NULL,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `dochangeproperties` smallint(6) NOT NULL DEFAULT 0,
  `ownerstaffid` double NOT NULL DEFAULT 0,
  `departmentid` double NOT NULL DEFAULT 0,
  `ticketstatusid` double NOT NULL DEFAULT 0,
  `tickettypeid` double NOT NULL DEFAULT 0,
  `priorityid` double NOT NULL DEFAULT 0,
  `dochangeduedateline` smallint(6) NOT NULL DEFAULT 0,
  `duedateline` int(11) NOT NULL DEFAULT 0,
  `resolutionduedateline` int(11) NOT NULL DEFAULT 0,
  `timeworked` int(11) NOT NULL DEFAULT 0,
  `timebillable` int(11) NOT NULL DEFAULT 0,
  `donote` smallint(6) NOT NULL DEFAULT 0,
  `notetype` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `notecolor` smallint(6) NOT NULL DEFAULT 0,
  `ticketnotes` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  `doreply` smallint(6) NOT NULL DEFAULT 0,
  `replycontents` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  `doforward` smallint(6) NOT NULL DEFAULT 0,
  `forwardemailto` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `forwardcontents` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ticketfollowupid`),
  KEY `ticketfollowups1` (`ticketid`),
  KEY `ticketfollowups2` (`executiondateline`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swticketholdtime`
--

DROP TABLE IF EXISTS `swticketholdtime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swticketholdtime` (
  `ticketid` bigint(20) NOT NULL,
  `resoltuiondateline` int(11) NOT NULL,
  `totalholdtime` int(11) NOT NULL,
  `updated` smallint(6) NOT NULL,
  `slaplan` smallint(6) NOT NULL,
  PRIMARY KEY (`ticketid`),
  UNIQUE KEY `ticketid` (`ticketid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swticketlinkchains`
--

DROP TABLE IF EXISTS `swticketlinkchains`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swticketlinkchains` (
  `ticketlinkchainid` int(11) NOT NULL AUTO_INCREMENT,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `ticketid` bigint(20) NOT NULL,
  `ticketlinktypeid` int(11) NOT NULL DEFAULT 0,
  `chainhash` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`ticketlinkchainid`),
  KEY `ticketlinkchains1` (`chainhash`),
  KEY `ticketlinkchains2` (`ticketid`),
  KEY `ticketlinkchains3` (`ticketlinktypeid`)
) ENGINE=InnoDB AUTO_INCREMENT=6712 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swticketlinkedtables`
--

DROP TABLE IF EXISTS `swticketlinkedtables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swticketlinkedtables` (
  `ticketlinkedtableid` int(11) NOT NULL AUTO_INCREMENT,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `linktype` smallint(6) NOT NULL DEFAULT 0,
  `linktypeid` int(11) NOT NULL DEFAULT 0,
  `ticketid` bigint(20) NOT NULL,
  PRIMARY KEY (`ticketlinkedtableid`),
  KEY `ticketlinkedtables1` (`ticketid`,`linktype`),
  KEY `ticketlinkedtables2` (`linktype`,`linktypeid`)
) ENGINE=InnoDB AUTO_INCREMENT=181922668 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swticketlinktypes`
--

DROP TABLE IF EXISTS `swticketlinktypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swticketlinktypes` (
  `ticketlinktypeid` int(11) NOT NULL AUTO_INCREMENT,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `displayorder` int(11) NOT NULL DEFAULT 0,
  `linktypetitle` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`ticketlinktypeid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swticketlocks`
--

DROP TABLE IF EXISTS `swticketlocks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swticketlocks` (
  `ticketid` bigint(20) NOT NULL,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  UNIQUE KEY `ticketlocks1` (`ticketid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swticketmergelog`
--

DROP TABLE IF EXISTS `swticketmergelog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swticketmergelog` (
  `ticketmergelogid` int(11) NOT NULL AUTO_INCREMENT,
  `oldticketid` int(11) NOT NULL DEFAULT 0,
  `oldticketmaskid` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `ticketid` int(11) NOT NULL DEFAULT 0,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ticketmergelogid`),
  KEY `ticketmergelog1` (`oldticketid`),
  KEY `ticketmergelog2` (`oldticketmaskid`),
  KEY `ticketmergelog3` (`ticketid`)
) ENGINE=InnoDB AUTO_INCREMENT=1016095 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swticketmessageids`
--

DROP TABLE IF EXISTS `swticketmessageids`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swticketmessageids` (
  `ticketmessageid` int(11) NOT NULL AUTO_INCREMENT,
  `messageid` varchar(17) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `ticketid` bigint(20) NOT NULL,
  `ticketpostid` int(11) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ticketmessageid`),
  KEY `ticketmessageids1` (`messageid`,`ticketid`),
  KEY `ticketmessageids2` (`dateline`),
  KEY `ticketmessageids3` (`ticketid`,`messageid`)
) ENGINE=InnoDB AUTO_INCREMENT=221788450 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swticketnotes`
--

DROP TABLE IF EXISTS `swticketnotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swticketnotes` (
  `ticketnoteid` bigint(20) NOT NULL AUTO_INCREMENT,
  `linktypeid` bigint(20) NOT NULL DEFAULT 0,
  `linktype` smallint(6) NOT NULL DEFAULT 0,
  `forstaffid` int(11) NOT NULL DEFAULT 0,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `isedited` smallint(6) NOT NULL DEFAULT 0,
  `staffname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `editedstaffid` int(11) NOT NULL DEFAULT 0,
  `editedstaffname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `editedtimeline` int(11) NOT NULL DEFAULT 0,
  `notecolor` int(11) NOT NULL DEFAULT 0,
  `note` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ticketnoteid`),
  KEY `ticketnotes1` (`linktypeid`,`linktype`,`forstaffid`),
  KEY `ticketnotes2` (`linktype`,`linktypeid`)
) ENGINE=InnoDB AUTO_INCREMENT=189407610 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swticketnotes_permanent`
--

DROP TABLE IF EXISTS `swticketnotes_permanent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swticketnotes_permanent` (
  `ticketnoteid` int(11) NOT NULL AUTO_INCREMENT,
  `linktypeid` int(11) NOT NULL DEFAULT 0,
  `linktype` smallint(6) NOT NULL DEFAULT 0,
  `forstaffid` int(11) NOT NULL DEFAULT 0,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `isedited` smallint(6) NOT NULL DEFAULT 0,
  `staffname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `editedstaffid` int(11) NOT NULL DEFAULT 0,
  `editedstaffname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `editedtimeline` int(11) NOT NULL DEFAULT 0,
  `notecolor` int(11) NOT NULL DEFAULT 0,
  `note` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ticketnoteid`),
  KEY `ticketnotes1` (`linktypeid`,`linktype`,`forstaffid`),
  KEY `ticketnotes2` (`linktype`,`linktypeid`)
) ENGINE=InnoDB AUTO_INCREMENT=49138 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swticketpostlocks`
--

DROP TABLE IF EXISTS `swticketpostlocks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swticketpostlocks` (
  `ticketpostlockid` int(11) NOT NULL AUTO_INCREMENT,
  `ticketid` bigint(20) NOT NULL,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `contents` text COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ticketpostlockid`),
  KEY `ticketpostlocks1` (`ticketid`,`staffid`),
  KEY `ticketpostlocks2` (`dateline`)
) ENGINE=InnoDB AUTO_INCREMENT=4140661 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swticketposts`
--

DROP TABLE IF EXISTS `swticketposts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swticketposts` (
  `ticketpostid` bigint(20) NOT NULL AUTO_INCREMENT,
  `ticketid` bigint(20) NOT NULL,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `userid` int(11) NOT NULL DEFAULT 0,
  `fullname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `emailto` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `subject` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `ipaddress` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0.0.0.0',
  `hasattachments` smallint(6) NOT NULL DEFAULT 0,
  `edited` smallint(6) NOT NULL DEFAULT 0,
  `editedbystaffid` int(11) NOT NULL DEFAULT 0,
  `editeddateline` int(11) NOT NULL DEFAULT 0,
  `creator` smallint(6) NOT NULL DEFAULT 0,
  `isthirdparty` smallint(6) NOT NULL DEFAULT 0,
  `ishtml` smallint(6) NOT NULL DEFAULT 0,
  `isemailed` smallint(6) NOT NULL DEFAULT 0,
  `isprivate` smallint(6) NOT NULL DEFAULT 0,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `contents` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  `contenthash` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `subjecthash` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `issurveycomment` smallint(6) NOT NULL DEFAULT 0,
  `creationmode` smallint(6) NOT NULL DEFAULT 0,
  `responsetime` int(11) NOT NULL DEFAULT 0,
  `firstresponsetime` int(11) NOT NULL DEFAULT 0,
  `slaresponsetime` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ticketpostid`),
  KEY `ticketposts1` (`ticketid`,`staffid`),
  KEY `ticketposts2` (`email`,`subjecthash`),
  KEY `ticketposts3` (`creator`,`staffid`,`dateline`),
  KEY `ticketposts4` (`responsetime`),
  KEY `ticketposts5` (`firstresponsetime`),
  KEY `ticketid` (`ticketid`),
  KEY `staffid` (`staffid`),
  FULLTEXT KEY `contents_idx` (`contents`)
) ENGINE=InnoDB AUTO_INCREMENT=432519238 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swticketpriorities`
--

DROP TABLE IF EXISTS `swticketpriorities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swticketpriorities` (
  `priorityid` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `displayorder` int(11) NOT NULL DEFAULT 0,
  `type` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'public',
  `linkedtypes` varchar(200) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `frcolorcode` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `bgcolorcode` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `iscustom` smallint(6) NOT NULL DEFAULT 1,
  `ismaster` smallint(6) NOT NULL DEFAULT 1,
  `uservisibilitycustom` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`priorityid`),
  KEY `ticketpriorities1` (`uservisibilitycustom`,`priorityid`),
  KEY `ticketpriorities2` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=671 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swticketrecipients`
--

DROP TABLE IF EXISTS `swticketrecipients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swticketrecipients` (
  `ticketrecipientid` bigint(20) NOT NULL AUTO_INCREMENT,
  `ticketid` bigint(20) NOT NULL,
  `ticketemailid` int(11) DEFAULT NULL,
  `recipienttype` smallint(6) NOT NULL,
  `ticketpostid_po` int(11) DEFAULT 0,
  PRIMARY KEY (`ticketrecipientid`),
  UNIQUE KEY `ticketrecipients1` (`ticketid`,`ticketemailid`)
) ENGINE=InnoDB AUTO_INCREMENT=124609509 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swticketrecipients_group`
--

DROP TABLE IF EXISTS `swticketrecipients_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swticketrecipients_group` (
  `ticketrecipientid` int(11) NOT NULL AUTO_INCREMENT,
  `ticketid` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ticketemailid` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `recipienttype` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ticketpostid_po` int(11) DEFAULT NULL,
  PRIMARY KEY (`ticketrecipientid`)
) ENGINE=InnoDB AUTO_INCREMENT=28748690 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swticketrecipients_t1`
--

DROP TABLE IF EXISTS `swticketrecipients_t1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swticketrecipients_t1` (
  `ticketrecipientid` int(11) NOT NULL AUTO_INCREMENT,
  `ticketid` int(11) DEFAULT NULL,
  `ticketemailid` int(11) DEFAULT NULL,
  `recipienttype` smallint(6) NOT NULL,
  `ticketpostid_po` int(11) DEFAULT NULL,
  PRIMARY KEY (`ticketrecipientid`),
  UNIQUE KEY `ticketrecipients1` (`ticketid`,`ticketemailid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swticketrecurrences`
--

DROP TABLE IF EXISTS `swticketrecurrences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swticketrecurrences` (
  `ticketrecurrenceid` int(11) NOT NULL AUTO_INCREMENT,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `ticketid` int(11) NOT NULL DEFAULT 0,
  `tickettype` smallint(6) NOT NULL DEFAULT 0,
  `departmentid` int(11) NOT NULL DEFAULT 0,
  `ownerstaffid` int(11) NOT NULL DEFAULT 0,
  `tickettypeid` int(11) NOT NULL DEFAULT 0,
  `ticketstatusid` int(11) NOT NULL DEFAULT 0,
  `ticketpriorityid` int(11) NOT NULL DEFAULT 0,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `dontsendemail` smallint(6) NOT NULL DEFAULT 0,
  `dispatchautoresponder` smallint(6) NOT NULL DEFAULT 0,
  `intervaltype` smallint(6) NOT NULL DEFAULT 0,
  `intervalstep` int(11) NOT NULL DEFAULT 0,
  `daily_everyweekday` smallint(6) NOT NULL DEFAULT 0,
  `weekly_monday` smallint(6) NOT NULL DEFAULT 0,
  `weekly_tuesday` smallint(6) NOT NULL DEFAULT 0,
  `weekly_wednesday` smallint(6) NOT NULL DEFAULT 0,
  `weekly_thursday` smallint(6) NOT NULL DEFAULT 0,
  `weekly_friday` smallint(6) NOT NULL DEFAULT 0,
  `weekly_saturday` smallint(6) NOT NULL DEFAULT 0,
  `weekly_sunday` smallint(6) NOT NULL DEFAULT 0,
  `monthly_type` smallint(6) NOT NULL DEFAULT 0,
  `monthly_day` smallint(6) NOT NULL DEFAULT 0,
  `monthly_extdaystep` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `monthly_extday` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `yearly_type` smallint(6) NOT NULL DEFAULT 0,
  `yearly_month` smallint(6) NOT NULL DEFAULT 0,
  `yearly_monthday` smallint(6) NOT NULL DEFAULT 0,
  `yearly_extdaystep` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `yearly_extday` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `yearly_extmonth` smallint(6) NOT NULL DEFAULT 0,
  `startdateline` int(11) NOT NULL DEFAULT 0,
  `endtype` smallint(6) NOT NULL DEFAULT 0,
  `enddateline` int(11) NOT NULL DEFAULT 0,
  `endcount` int(11) NOT NULL DEFAULT 0,
  `creationcount` int(11) NOT NULL DEFAULT 0,
  `nextrecurrence` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ticketrecurrenceid`),
  KEY `ticketrecurrences1` (`nextrecurrence`,`startdateline`),
  KEY `ticketrecurrences2` (`ticketid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swtickets`
--

DROP TABLE IF EXISTS `swtickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swtickets` (
  `ticketid` bigint(20) NOT NULL AUTO_INCREMENT,
  `ticketmaskid` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `departmentid` int(11) NOT NULL DEFAULT 0,
  `departmenttitle` varchar(255) COLLATE utf8_unicode_ci DEFAULT '',
  `ticketstatusid` int(11) NOT NULL DEFAULT 0,
  `ticketstatustitle` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `priorityid` int(11) NOT NULL DEFAULT 0,
  `prioritytitle` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `emailqueueid` int(11) NOT NULL DEFAULT 0,
  `userid` int(11) NOT NULL DEFAULT 0,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `ownerstaffid` int(11) NOT NULL DEFAULT 0,
  `ownerstaffname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `assignstatus` smallint(6) NOT NULL DEFAULT 0,
  `fullname` varchar(225) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `email` varchar(150) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `lastreplier` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `replyto` varchar(150) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `subject` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `dateline` int(11) NOT NULL DEFAULT 0,
  `lastactivity` int(11) NOT NULL DEFAULT 0,
  `laststaffreplytime` int(11) NOT NULL DEFAULT 0,
  `lastuserreplytime` int(11) NOT NULL DEFAULT 0,
  `slaplanid` int(11) NOT NULL DEFAULT 0,
  `ticketslaplanid` int(11) NOT NULL DEFAULT 0,
  `duetime` int(11) NOT NULL DEFAULT 0,
  `totalreplies` int(11) NOT NULL DEFAULT 0,
  `ipaddress` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0.0.0.0',
  `flagtype` smallint(6) NOT NULL DEFAULT 0,
  `hasnotes` smallint(6) NOT NULL DEFAULT 0,
  `hasattachments` smallint(6) NOT NULL DEFAULT 0,
  `isemailed` smallint(6) NOT NULL DEFAULT 0,
  `edited` smallint(6) NOT NULL DEFAULT 0,
  `editedbystaffid` int(11) NOT NULL DEFAULT 0,
  `editeddateline` int(11) NOT NULL DEFAULT 0,
  `creator` smallint(6) NOT NULL DEFAULT 0,
  `charset` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `transferencoding` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `timeworked` int(11) NOT NULL DEFAULT 0,
  `timebilled` int(11) NOT NULL DEFAULT 0,
  `dateicon` int(11) NOT NULL DEFAULT 0,
  `lastpostid` int(11) NOT NULL DEFAULT 0,
  `firstpostid` int(11) NOT NULL DEFAULT 0,
  `tgroupid` int(11) NOT NULL DEFAULT 0,
  `messageid` varchar(17) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `escalationruleid` int(11) NOT NULL DEFAULT 0,
  `hasdraft` smallint(6) NOT NULL DEFAULT 0,
  `hasbilling` smallint(6) NOT NULL DEFAULT 0,
  `isphonecall` smallint(6) NOT NULL DEFAULT 0,
  `isescalated` smallint(6) NOT NULL DEFAULT 0,
  `isescalatedvolatile` smallint(6) NOT NULL DEFAULT 0,
  `phoneno` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `isautoclosed` smallint(6) NOT NULL DEFAULT 0,
  `autocloseruleid` int(11) NOT NULL DEFAULT 0,
  `autoclosestatus` smallint(6) NOT NULL DEFAULT 0,
  `autoclosetimeline` int(11) NOT NULL DEFAULT 0,
  `escalatedtime` int(11) NOT NULL DEFAULT 0,
  `followupcount` int(11) NOT NULL DEFAULT 0,
  `hasfollowup` smallint(6) NOT NULL DEFAULT 0,
  `hasratings` smallint(6) NOT NULL DEFAULT 0,
  `tickethash` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `islinked` smallint(6) NOT NULL DEFAULT 0,
  `trasholddepartmentid` int(11) DEFAULT 0,
  `tickettype` smallint(6) NOT NULL DEFAULT 0,
  `tickettypeid` int(11) NOT NULL DEFAULT 0,
  `tickettypetitle` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `creationmode` smallint(6) NOT NULL DEFAULT 0,
  `isfirstcontactresolved` smallint(6) NOT NULL DEFAULT 0,
  `wasreopened` smallint(6) NOT NULL DEFAULT 0,
  `reopendateline` int(11) NOT NULL DEFAULT 0,
  `resolutiondateline` int(11) NOT NULL DEFAULT 0,
  `escalationlevelcount` int(11) NOT NULL DEFAULT 0,
  `resolutionseconds` int(11) NOT NULL DEFAULT 0,
  `resolutionlevel` int(11) NOT NULL DEFAULT 0,
  `repliestoresolution` int(11) NOT NULL DEFAULT 0,
  `averageresponsetime` int(11) NOT NULL DEFAULT 0,
  `averageresponsetimehits` int(11) NOT NULL DEFAULT 0,
  `firstresponsetime` int(11) NOT NULL DEFAULT 0,
  `resolutionduedateline` int(11) NOT NULL DEFAULT 0,
  `isresolved` smallint(6) NOT NULL DEFAULT 0,
  `iswatched` smallint(6) NOT NULL DEFAULT 0,
  `oldeditemailaddress` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `recurrencefromticketid` int(11) NOT NULL DEFAULT 0,
  `linkkbarticleid` int(11) NOT NULL DEFAULT 0,
  `linkticketmacroid` int(11) NOT NULL DEFAULT 0,
  `bayescategoryid` int(11) NOT NULL DEFAULT 0,
  `averageslaresponsetime` int(11) NOT NULL DEFAULT 0,
  `internal` int(11) NOT NULL,
  PRIMARY KEY (`ticketid`),
  KEY `ticketcount` (`departmentid`,`ticketstatusid`,`ownerstaffid`,`tickettypeid`,`lastactivity`),
  KEY `tickets1` (`userid`,`email`,`replyto`,`departmentid`,`isresolved`),
  KEY `tickets2` (`slaplanid`,`duetime`,`ticketstatusid`),
  KEY `tickets3` (`departmentid`,`ticketstatusid`,`lastactivity`),
  KEY `tickets4` (`email`),
  KEY `tickets5` (`departmentid`,`ticketstatusid`,`userid`),
  KEY `tickets6` (`departmentid`,`ticketstatusid`,`duetime`),
  KEY `tickets7` (`dateline`),
  KEY `tickets8` (`departmentid`,`ticketstatusid`,`lastuserreplytime`),
  KEY `tickets9` (`duetime`,`resolutionduedateline`,`isescalatedvolatile`,`isresolved`),
  KEY `tickets10` (`ticketmaskid`,`ticketid`,`departmentid`),
  KEY `tickets11` (`departmentid`,`ticketstatusid`,`duetime`,`resolutionduedateline`),
  KEY `tickets12` (`isresolved`,`departmentid`),
  KEY `tickets13` (`ticketstatusid`,`departmentid`,`priorityid`,`tickettypeid`),
  KEY `tickets14` (`isescalatedvolatile`,`isresolved`),
  KEY `tickets15` (`ticketid`,`departmentid`),
  KEY `tickets16` (`ticketid`,`isresolved`,`autoclosestatus`,`lastactivity`),
  KEY `tickets17` (`autoclosestatus`,`autocloseruleid`,`autoclosetimeline`),
  KEY `tickets18` (`lastactivity`),
  KEY `tickets19` (`recurrencefromticketid`),
  KEY `userid` (`userid`),
  KEY `replyto` (`replyto`),
  KEY `swtickets_idx_ticketid` (`ticketid`)
) ENGINE=InnoDB AUTO_INCREMENT=2169065764 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swticketstatus`
--

DROP TABLE IF EXISTS `swticketstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swticketstatus` (
  `ticketstatusid` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `displayorder` int(11) NOT NULL DEFAULT 0,
  `iscustom` smallint(6) NOT NULL DEFAULT 1,
  `displayinmainlist` smallint(6) NOT NULL DEFAULT 0,
  `markasresolved` smallint(6) NOT NULL DEFAULT 0,
  `ismaster` smallint(6) NOT NULL DEFAULT 0,
  `statustype` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'public',
  `displaycount` smallint(6) NOT NULL DEFAULT 0,
  `statuscolor` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `statusbgcolor` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `departmentid` int(11) NOT NULL DEFAULT 0,
  `type` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'public',
  `resetduetime` smallint(6) NOT NULL DEFAULT 0,
  `displayicon` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `staffvisibilitycustom` smallint(6) NOT NULL DEFAULT 0,
  `dispatchnotification` smallint(6) NOT NULL DEFAULT 0,
  `triggersurvey` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ticketstatusid`),
  KEY `ticketstatus1` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=795 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swtickettimetracknotes`
--

DROP TABLE IF EXISTS `swtickettimetracknotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swtickettimetracknotes` (
  `tickettimetracknoteid` int(11) NOT NULL AUTO_INCREMENT,
  `tickettimetrackid` int(11) NOT NULL DEFAULT 0,
  `notes` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`tickettimetracknoteid`),
  KEY `tickettimetracknotes1` (`tickettimetrackid`)
) ENGINE=InnoDB AUTO_INCREMENT=494813 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swtickettimetracks`
--

DROP TABLE IF EXISTS `swtickettimetracks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swtickettimetracks` (
  `tickettimetrackid` int(11) NOT NULL AUTO_INCREMENT,
  `ticketid` bigint(20) NOT NULL,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `workdateline` int(11) NOT NULL DEFAULT 0,
  `creatorstaffid` int(11) NOT NULL DEFAULT 0,
  `creatorstaffname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `timespent` int(11) NOT NULL DEFAULT 0,
  `timebillable` int(11) NOT NULL DEFAULT 0,
  `isedited` smallint(6) NOT NULL DEFAULT 0,
  `editedstaffid` int(11) NOT NULL DEFAULT 0,
  `editedstaffname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `editedtimeline` int(11) NOT NULL DEFAULT 0,
  `notecolor` int(11) NOT NULL DEFAULT 0,
  `workerstaffid` int(11) NOT NULL DEFAULT 0,
  `workerstaffname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `sessionhash` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`tickettimetrackid`),
  KEY `tickettimetracks1` (`ticketid`)
) ENGINE=InnoDB AUTO_INCREMENT=495121 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swtickettypes`
--

DROP TABLE IF EXISTS `swtickettypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swtickettypes` (
  `tickettypeid` int(11) NOT NULL AUTO_INCREMENT,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `departmentid` int(11) NOT NULL DEFAULT 0,
  `displayorder` int(11) NOT NULL DEFAULT 0,
  `ismaster` smallint(6) NOT NULL DEFAULT 0,
  `displayicon` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `type` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'public',
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `uservisibilitycustom` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`tickettypeid`),
  KEY `tickettypes1` (`departmentid`),
  KEY `tickettypes2` (`uservisibilitycustom`,`tickettypeid`),
  KEY `tickettypes3` (`title`),
  KEY `dateline` (`dateline`)
) ENGINE=InnoDB AUTO_INCREMENT=749 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swticketviewfields`
--

DROP TABLE IF EXISTS `swticketviewfields`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swticketviewfields` (
  `ticketviewfieldid` int(11) NOT NULL AUTO_INCREMENT,
  `ticketviewid` int(11) NOT NULL DEFAULT 0,
  `fieldtype` smallint(6) NOT NULL DEFAULT 0,
  `fieldtypeid` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ticketviewfieldid`),
  KEY `ticketviewfields1` (`ticketviewid`)
) ENGINE=InnoDB AUTO_INCREMENT=2780 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swticketviewlinks`
--

DROP TABLE IF EXISTS `swticketviewlinks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swticketviewlinks` (
  `ticketviewlinkid` int(11) NOT NULL AUTO_INCREMENT,
  `ticketviewid` int(11) NOT NULL DEFAULT 0,
  `linktype` smallint(6) NOT NULL DEFAULT 0,
  `linktypeid` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ticketviewlinkid`),
  KEY `ticketviewlinks1` (`ticketviewid`)
) ENGINE=InnoDB AUTO_INCREMENT=188 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swticketviews`
--

DROP TABLE IF EXISTS `swticketviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swticketviews` (
  `ticketviewid` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `viewscope` smallint(6) NOT NULL DEFAULT 0,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `viewalltickets` smallint(6) NOT NULL DEFAULT 0,
  `viewunassigned` smallint(6) NOT NULL DEFAULT 0,
  `viewassigned` smallint(6) NOT NULL DEFAULT 0,
  `sortby` smallint(6) NOT NULL DEFAULT 0,
  `sortorder` smallint(6) NOT NULL DEFAULT 0,
  `ismaster` int(11) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `ticketsperpage` int(11) NOT NULL DEFAULT 0,
  `autorefresh` smallint(6) NOT NULL DEFAULT 0,
  `setasowner` smallint(6) NOT NULL DEFAULT 0,
  `defaultstatusonreply` smallint(6) NOT NULL DEFAULT 0,
  `afterreplyaction` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ticketviewid`),
  KEY `ticketviews1` (`viewscope`,`staffid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swticketwatchers`
--

DROP TABLE IF EXISTS `swticketwatchers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swticketwatchers` (
  `ticketwatcherid` int(11) NOT NULL AUTO_INCREMENT,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `ticketid` int(11) NOT NULL DEFAULT 0,
  `staffid` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ticketwatcherid`),
  UNIQUE KEY `ticketwatchers1` (`ticketid`,`staffid`)
) ENGINE=InnoDB AUTO_INCREMENT=1369 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swticketworkflowactions`
--

DROP TABLE IF EXISTS `swticketworkflowactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swticketworkflowactions` (
  `ticketworkflowactionid` int(11) NOT NULL AUTO_INCREMENT,
  `ticketworkflowid` int(11) NOT NULL DEFAULT 0,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `typeid` int(11) NOT NULL DEFAULT 0,
  `typedata` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  `typechar` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`ticketworkflowactionid`),
  KEY `ticketworkflowactions1` (`ticketworkflowid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swticketworkflowcriteria`
--

DROP TABLE IF EXISTS `swticketworkflowcriteria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swticketworkflowcriteria` (
  `ticketworkflowcriteriaid` int(11) NOT NULL AUTO_INCREMENT,
  `ticketworkflowid` int(11) NOT NULL DEFAULT 0,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `ruleop` smallint(6) NOT NULL DEFAULT 0,
  `rulematch` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `rulematchtype` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ticketworkflowcriteriaid`),
  KEY `ticketworkflowcriteria1` (`ticketworkflowid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swticketworkflownotifications`
--

DROP TABLE IF EXISTS `swticketworkflownotifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swticketworkflownotifications` (
  `ticketworkflownotificationid` int(11) NOT NULL AUTO_INCREMENT,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `ticketworkflowid` int(11) NOT NULL DEFAULT 0,
  `notificationtype` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `subject` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `notificationcontents` text COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ticketworkflownotificationid`),
  KEY `ticketworkflownotifications1` (`ticketworkflowid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swticketworkflows`
--

DROP TABLE IF EXISTS `swticketworkflows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swticketworkflows` (
  `ticketworkflowid` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `isenabled` smallint(6) NOT NULL DEFAULT 0,
  `sortorder` int(11) NOT NULL DEFAULT 0,
  `ruletype` smallint(6) NOT NULL DEFAULT 0,
  `staffvisibilitycustom` smallint(6) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ticketworkflowid`),
  KEY `ticketworkflows2` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swtkttemp`
--

DROP TABLE IF EXISTS `swtkttemp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swtkttemp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ticketid` int(11) NOT NULL,
  `tickettypeid` int(11) NOT NULL,
  `tickettypetitle` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swtroubleshootercategories`
--

DROP TABLE IF EXISTS `swtroubleshootercategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swtroubleshootercategories` (
  `troubleshootercategoryid` int(11) NOT NULL AUTO_INCREMENT,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `staffname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `description` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `categorytype` smallint(6) NOT NULL DEFAULT 0,
  `displayorder` int(11) NOT NULL DEFAULT 0,
  `views` int(11) NOT NULL DEFAULT 0,
  `uservisibilitycustom` smallint(6) NOT NULL DEFAULT 0,
  `staffvisibilitycustom` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`troubleshootercategoryid`),
  KEY `troubleshootercategories1` (`categorytype`),
  KEY `troubleshootercategories2` (`staffvisibilitycustom`,`troubleshootercategoryid`),
  KEY `troubleshootercategories3` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swtroubleshooterdata`
--

DROP TABLE IF EXISTS `swtroubleshooterdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swtroubleshooterdata` (
  `troubleshooterdataid` int(11) NOT NULL AUTO_INCREMENT,
  `troubleshooterstepid` int(11) NOT NULL DEFAULT 0,
  `contents` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`troubleshooterdataid`),
  KEY `troubleshooterdata1` (`troubleshooterstepid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swtroubleshooterlinks`
--

DROP TABLE IF EXISTS `swtroubleshooterlinks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swtroubleshooterlinks` (
  `troubleshooterlinkid` int(11) NOT NULL AUTO_INCREMENT,
  `troubleshootercategoryid` int(11) NOT NULL DEFAULT 0,
  `parenttroubleshooterstepid` int(11) NOT NULL DEFAULT 0,
  `childtroubleshooterstepid` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`troubleshooterlinkid`),
  KEY `troubleshooterlinks1` (`troubleshootercategoryid`,`parenttroubleshooterstepid`,`childtroubleshooterstepid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swtroubleshootersteps`
--

DROP TABLE IF EXISTS `swtroubleshootersteps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swtroubleshootersteps` (
  `troubleshooterstepid` int(11) NOT NULL AUTO_INCREMENT,
  `troubleshootercategoryid` int(11) NOT NULL DEFAULT 0,
  `stepstatus` smallint(6) NOT NULL DEFAULT 0,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `staffname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `subject` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `edited` smallint(6) NOT NULL DEFAULT 0,
  `editedstaffid` int(11) NOT NULL DEFAULT 0,
  `editedstaffname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `editeddateline` int(11) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `displayorder` int(11) NOT NULL DEFAULT 0,
  `views` int(11) NOT NULL DEFAULT 0,
  `allowcomments` smallint(6) NOT NULL DEFAULT 0,
  `hasattachments` smallint(6) NOT NULL DEFAULT 0,
  `redirecttickets` smallint(6) NOT NULL DEFAULT 0,
  `ticketsubject` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `redirectdepartmentid` int(11) NOT NULL DEFAULT 0,
  `tickettypeid` int(11) NOT NULL DEFAULT 0,
  `priorityid` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`troubleshooterstepid`),
  KEY `troubleshootersteps1` (`troubleshootercategoryid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swuseremails`
--

DROP TABLE IF EXISTS `swuseremails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swuseremails` (
  `useremailid` int(11) NOT NULL AUTO_INCREMENT,
  `linktype` smallint(6) NOT NULL DEFAULT 0,
  `linktypeid` int(11) NOT NULL DEFAULT 0,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `isprimary` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`useremailid`),
  KEY `useremails1` (`linktype`,`linktypeid`,`isprimary`),
  KEY `useremails2` (`linktype`,`email`),
  KEY `useremails3` (`email`),
  KEY `useremails4` (`linktype`,`useremailid`),
  KEY `linktypeid` (`linktypeid`)
) ENGINE=InnoDB AUTO_INCREMENT=123614094 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swusergroupassigns`
--

DROP TABLE IF EXISTS `swusergroupassigns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swusergroupassigns` (
  `usergroupassignid` int(11) NOT NULL AUTO_INCREMENT,
  `toassignid` int(11) NOT NULL DEFAULT 0,
  `type` smallint(6) NOT NULL DEFAULT 0,
  `usergroupid` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`usergroupassignid`),
  KEY `usergroupassigns1` (`usergroupid`,`type`),
  KEY `usergroupassigns2` (`toassignid`,`type`,`usergroupid`)
) ENGINE=InnoDB AUTO_INCREMENT=713 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swusergroups`
--

DROP TABLE IF EXISTS `swusergroups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swusergroups` (
  `usergroupid` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `grouptype` int(11) NOT NULL DEFAULT 0,
  `ismaster` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`usergroupid`),
  KEY `usergroups1` (`grouptype`),
  KEY `usergroups2` (`title`,`grouptype`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swusergroupsettings`
--

DROP TABLE IF EXISTS `swusergroupsettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swusergroupsettings` (
  `ugroupsettingid` int(11) NOT NULL AUTO_INCREMENT,
  `usergroupid` int(11) NOT NULL DEFAULT 0,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `value` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`ugroupsettingid`),
  UNIQUE KEY `usergroupsettings2` (`usergroupid`,`name`),
  KEY `usergroupsettings1` (`usergroupid`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swuserloginlog`
--

DROP TABLE IF EXISTS `swuserloginlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swuserloginlog` (
  `userloginlogid` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL DEFAULT 0,
  `logindateline` int(11) NOT NULL DEFAULT 0,
  `activitydateline` int(11) NOT NULL DEFAULT 0,
  `logoutdateline` int(11) NOT NULL DEFAULT 0,
  `userfullname` varchar(255) NOT NULL DEFAULT '',
  `useremail` varchar(255) NOT NULL DEFAULT '',
  `ipaddress` varchar(50) NOT NULL DEFAULT '0.0.0.0',
  `forwardedipaddress` varchar(50) NOT NULL DEFAULT '0.0.0.0',
  `useragent` varchar(255) NOT NULL DEFAULT '',
  `sessionid` varchar(255) NOT NULL DEFAULT '',
  `logouttype` smallint(6) NOT NULL DEFAULT 0,
  `loginresult` smallint(6) NOT NULL DEFAULT 0,
  `interfacetype` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`userloginlogid`),
  KEY `userloginlog1` (`userid`,`logindateline`,`interfacetype`),
  KEY `userloginlog2` (`userfullname`,`logindateline`,`loginresult`),
  KEY `userloginlog3` (`logindateline`,`loginresult`),
  KEY `userloginlog4` (`sessionid`)
) ENGINE=InnoDB AUTO_INCREMENT=509349 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swusernotedata`
--

DROP TABLE IF EXISTS `swusernotedata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swusernotedata` (
  `usernotedataid` bigint(20) NOT NULL AUTO_INCREMENT,
  `usernoteid` bigint(20) NOT NULL DEFAULT 0,
  `notecontents` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  `permanetnote` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`usernotedataid`),
  KEY `usernotedata1` (`usernoteid`)
) ENGINE=InnoDB AUTO_INCREMENT=30096440 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swusernotes`
--

DROP TABLE IF EXISTS `swusernotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swusernotes` (
  `usernoteid` bigint(20) NOT NULL AUTO_INCREMENT,
  `linktypeid` bigint(20) NOT NULL DEFAULT 0,
  `linktype` smallint(6) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `lastupdated` int(11) NOT NULL DEFAULT 0,
  `isedited` smallint(6) NOT NULL DEFAULT 0,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `staffname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `editedstaffid` int(11) NOT NULL DEFAULT 0,
  `editedstaffname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `editedtimeline` int(11) NOT NULL DEFAULT 0,
  `notecolor` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`usernoteid`),
  KEY `usernotes1` (`linktype`,`linktypeid`)
) ENGINE=InnoDB AUTO_INCREMENT=30060444 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swuserorganizations`
--

DROP TABLE IF EXISTS `swuserorganizations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swuserorganizations` (
  `userorganizationid` int(11) NOT NULL AUTO_INCREMENT,
  `organizationname` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `icp_customerid` int(11) NOT NULL DEFAULT 0,
  `icp_customername` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `division` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `organizationtype` smallint(6) NOT NULL DEFAULT 0,
  `address` varchar(200) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `city` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `state` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `postalcode` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `country` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `phone` varchar(25) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `fax` varchar(200) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `website` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `dateline` int(11) NOT NULL DEFAULT 0,
  `lastupdate` int(11) NOT NULL DEFAULT 0,
  `languageid` int(11) NOT NULL DEFAULT 0,
  `slaplanid` int(11) NOT NULL DEFAULT 0,
  `slaexpirytimeline` int(11) NOT NULL DEFAULT 0,
  `usergroupid` int(11) NOT NULL DEFAULT 0,
  `sapdet` int(11) DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 0,
  `organizationname_old` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`userorganizationid`),
  KEY `userorganizations1` (`organizationname`,`address`,`phone`),
  KEY `userorganizationid` (`userorganizationid`),
  KEY `organizationname` (`organizationname`),
  KEY `phone` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=138612 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swuserprofileimages`
--

DROP TABLE IF EXISTS `swuserprofileimages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swuserprofileimages` (
  `userprofileimageid` int(11) NOT NULL AUTO_INCREMENT,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `userid` int(11) NOT NULL DEFAULT 0,
  `extension` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `imagedata` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`userprofileimageid`),
  KEY `userprofileimages1` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=2513 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swuserproperties`
--

DROP TABLE IF EXISTS `swuserproperties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swuserproperties` (
  `userpropertyid` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `updatedateline` int(11) NOT NULL DEFAULT 0,
  `keyname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `keyvalue` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`userpropertyid`),
  KEY `userproperties1` (`userid`,`keyname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swusers`
--

DROP TABLE IF EXISTS `swusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swusers` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `usergroupid` int(11) NOT NULL DEFAULT 0,
  `userrole` smallint(6) NOT NULL DEFAULT 0,
  `userorganizationid` int(11) NOT NULL DEFAULT 0,
  `salutation` smallint(6) NOT NULL DEFAULT 0,
  `fullname` varchar(200) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `userdesignation` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `phone` varchar(25) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `userpassword` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `islegacypassword` smallint(6) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `lastupdate` int(11) NOT NULL DEFAULT 0,
  `lastvisit` int(11) NOT NULL DEFAULT 0,
  `lastvisit2` int(11) NOT NULL DEFAULT 0,
  `lastactivity` int(11) NOT NULL DEFAULT 0,
  `lastvisitip` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `lastvisitip2` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `isenabled` smallint(6) NOT NULL DEFAULT 0,
  `languageid` int(11) NOT NULL DEFAULT 0,
  `timezonephp` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `enabledst` smallint(6) NOT NULL DEFAULT 0,
  `useremailcount` int(11) NOT NULL DEFAULT 0,
  `slaplanid` int(11) NOT NULL DEFAULT 0,
  `slaexpirytimeline` int(11) NOT NULL DEFAULT 0,
  `userexpirytimeline` int(11) NOT NULL DEFAULT 0,
  `isvalidated` int(11) NOT NULL DEFAULT 0,
  `profileprompt` smallint(6) NOT NULL DEFAULT 0,
  `hasgeoip` smallint(6) NOT NULL DEFAULT 0,
  `geoiptimezone` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoipisp` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoiporganization` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoipnetspeed` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoipcountry` varchar(10) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoipcountrydesc` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoipregion` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoipcity` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoippostalcode` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoiplatitude` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoiplongitude` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoipmetrocode` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoipareacode` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`userid`),
  KEY `users1` (`usergroupid`),
  KEY `users2` (`isenabled`,`dateline`),
  KEY `users3` (`userorganizationid`),
  KEY `users4` (`fullname`,`phone`),
  KEY `users5` (`isvalidated`,`dateline`),
  KEY `swusers_idx_userid` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=386498 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swusers_30_11_22`
--

DROP TABLE IF EXISTS `swusers_30_11_22`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swusers_30_11_22` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `usergroupid` int(11) NOT NULL DEFAULT 0,
  `userrole` smallint(6) NOT NULL DEFAULT 0,
  `userorganizationid` int(11) NOT NULL DEFAULT 0,
  `salutation` smallint(6) NOT NULL DEFAULT 0,
  `fullname` varchar(200) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `userdesignation` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `phone` varchar(25) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `userpassword` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `islegacypassword` smallint(6) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `lastupdate` int(11) NOT NULL DEFAULT 0,
  `lastvisit` int(11) NOT NULL DEFAULT 0,
  `lastvisit2` int(11) NOT NULL DEFAULT 0,
  `lastactivity` int(11) NOT NULL DEFAULT 0,
  `lastvisitip` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `lastvisitip2` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `isenabled` smallint(6) NOT NULL DEFAULT 0,
  `languageid` int(11) NOT NULL DEFAULT 0,
  `timezonephp` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `enabledst` smallint(6) NOT NULL DEFAULT 0,
  `useremailcount` int(11) NOT NULL DEFAULT 0,
  `slaplanid` int(11) NOT NULL DEFAULT 0,
  `slaexpirytimeline` int(11) NOT NULL DEFAULT 0,
  `userexpirytimeline` int(11) NOT NULL DEFAULT 0,
  `isvalidated` int(11) NOT NULL DEFAULT 0,
  `profileprompt` smallint(6) NOT NULL DEFAULT 0,
  `hasgeoip` smallint(6) NOT NULL DEFAULT 0,
  `geoiptimezone` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoipisp` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoiporganization` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoipnetspeed` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoipcountry` varchar(10) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoipcountrydesc` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoipregion` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoipcity` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoippostalcode` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoiplatitude` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoiplongitude` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoipmetrocode` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoipareacode` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`userid`) USING BTREE,
  KEY `users1` (`usergroupid`) USING BTREE,
  KEY `users2` (`isenabled`,`dateline`) USING BTREE,
  KEY `users3` (`userorganizationid`) USING BTREE,
  KEY `users4` (`fullname`,`phone`) USING BTREE,
  KEY `users5` (`isvalidated`,`dateline`) USING BTREE,
  KEY `swusers_idx_userid` (`userid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=385964 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swusersettings`
--

DROP TABLE IF EXISTS `swusersettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swusersettings` (
  `usersettingid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `value` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `userid` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`usersettingid`),
  UNIQUE KEY `usersettings2` (`userid`,`name`),
  KEY `usersettings1` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=69221 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swuserverifyhash`
--

DROP TABLE IF EXISTS `swuserverifyhash`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swuserverifyhash` (
  `userverifyhashid` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `userid` int(11) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `hashtype` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`userverifyhashid`),
  KEY `userverifyhash1` (`hashtype`,`dateline`),
  KEY `userverifyhash2` (`userid`,`hashtype`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swvisitorbans`
--

DROP TABLE IF EXISTS `swvisitorbans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swvisitorbans` (
  `visitorbanid` int(11) NOT NULL AUTO_INCREMENT,
  `ipaddress` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0.0.0.0',
  `dateline` int(11) NOT NULL DEFAULT 0,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `isregex` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`visitorbanid`),
  UNIQUE KEY `visitorbans3` (`ipaddress`),
  KEY `visitorbans2` (`staffid`),
  KEY `visitorbans4` (`isregex`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swvisitordata`
--

DROP TABLE IF EXISTS `swvisitordata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swvisitordata` (
  `visitordataid` int(11) NOT NULL AUTO_INCREMENT,
  `visitorsessionid` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `visitorruleid` int(11) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `datakey` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `datavalue` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `datatype` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`visitordataid`),
  KEY `visitordata1` (`visitorsessionid`,`datatype`),
  KEY `visitordata2` (`visitorruleid`),
  KEY `visitordata3` (`visitorsessionid`,`visitorruleid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swvisitorfootprints`
--

DROP TABLE IF EXISTS `swvisitorfootprints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swvisitorfootprints` (
  `sessionid` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `pageurl` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `pagehash` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `pagetitle` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `country` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `countrycode` varchar(2) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `dateline` int(11) NOT NULL DEFAULT 0,
  `lastactivity` int(11) NOT NULL DEFAULT 0,
  `ipaddress` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0.0.0.0',
  `hostname` varchar(80) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `referrer` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `resolution` varchar(30) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `colordepth` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `appversion` varchar(150) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `operatingsys` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `browsername` varchar(150) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `browserversion` varchar(150) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `browsercode` varchar(2) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `searchenginename` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `searchstring` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `searchengineurl` varchar(200) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `platform` varchar(150) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `rowbgcolor` varchar(7) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `rowfrcolor` varchar(7) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `hasnote` smallint(6) NOT NULL DEFAULT 0,
  `repeatvisit` smallint(6) NOT NULL DEFAULT 0,
  `lastvisit` int(11) NOT NULL DEFAULT 0,
  `lastchat` int(11) NOT NULL DEFAULT 0,
  `topull` smallint(6) NOT NULL DEFAULT 0,
  `campaignid` int(11) NOT NULL DEFAULT 0,
  `campaigntitle` int(11) NOT NULL DEFAULT 0,
  `geoiptimezone` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoipisp` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoiporganization` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoipnetspeed` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoipcountry` varchar(10) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoipcountrydesc` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoipregion` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoipcity` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoippostalcode` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoiplatitude` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoiplongitude` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoipmetrocode` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `geoipareacode` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  UNIQUE KEY `visitorfootprints1` (`sessionid`,`pagehash`),
  KEY `visitorfootprints2` (`lastactivity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swvisitorgroups`
--

DROP TABLE IF EXISTS `swvisitorgroups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swvisitorgroups` (
  `visitorgroupid` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `dateline` int(11) NOT NULL DEFAULT 0,
  `color` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`visitorgroupid`),
  KEY `visitorgroups1` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swvisitornotedata`
--

DROP TABLE IF EXISTS `swvisitornotedata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swvisitornotedata` (
  `visitornotedataid` int(11) NOT NULL AUTO_INCREMENT,
  `visitornoteid` int(11) NOT NULL DEFAULT 0,
  `contents` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`visitornotedataid`),
  KEY `visitornotedata` (`visitornoteid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swvisitornotes`
--

DROP TABLE IF EXISTS `swvisitornotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swvisitornotes` (
  `visitornoteid` int(11) NOT NULL AUTO_INCREMENT,
  `linktypevalue` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `linktype` smallint(6) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `notetype` smallint(6) NOT NULL DEFAULT 0,
  `lastupdated` int(11) NOT NULL DEFAULT 0,
  `isedited` smallint(6) NOT NULL DEFAULT 0,
  `editedstaffid` int(11) NOT NULL DEFAULT 0,
  `editedstaffname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `editedtimeline` int(11) NOT NULL DEFAULT 0,
  `notecolor` int(11) NOT NULL DEFAULT 0,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `staffname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`visitornoteid`),
  KEY `visitornotes1` (`linktype`,`linktypevalue`),
  KEY `visitornotes2` (`staffid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swvisitorpulls`
--

DROP TABLE IF EXISTS `swvisitorpulls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swvisitorpulls` (
  `visitorsessionid` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`visitorsessionid`),
  KEY `visitorpulls1` (`staffid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swvisitorpulls2`
--

DROP TABLE IF EXISTS `swvisitorpulls2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swvisitorpulls2` (
  `visitorsessionid` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `staffid` int(11) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`visitorsessionid`),
  KEY `visitorpulls21` (`staffid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swvisitorruleactions`
--

DROP TABLE IF EXISTS `swvisitorruleactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swvisitorruleactions` (
  `visitorruleactionid` int(11) NOT NULL AUTO_INCREMENT,
  `visitorruleid` int(11) NOT NULL DEFAULT 0,
  `actiontype` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `actionname` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `actionvalue` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`visitorruleactionid`),
  KEY `visitorruleactions1` (`visitorruleid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swvisitorrulecriteria`
--

DROP TABLE IF EXISTS `swvisitorrulecriteria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swvisitorrulecriteria` (
  `visitorrulecriteriaid` int(11) NOT NULL AUTO_INCREMENT,
  `visitorruleid` int(11) NOT NULL DEFAULT 0,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `ruleop` smallint(6) NOT NULL DEFAULT 0,
  `rulematch` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`visitorrulecriteriaid`),
  KEY `visitorrulecriteria1` (`visitorruleid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swvisitorrules`
--

DROP TABLE IF EXISTS `swvisitorrules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swvisitorrules` (
  `visitorruleid` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `ruletype` smallint(6) NOT NULL DEFAULT 0,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `sortorder` int(11) NOT NULL DEFAULT 0,
  `matchtype` smallint(6) NOT NULL DEFAULT 0,
  `stopprocessing` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`visitorruleid`),
  KEY `visitorrules1` (`ruletype`),
  KEY `visitorrules2` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `swwidgets`
--

DROP TABLE IF EXISTS `swwidgets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swwidgets` (
  `widgetid` int(11) NOT NULL AUTO_INCREMENT,
  `dateline` int(11) NOT NULL DEFAULT 0,
  `defaulttitle` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `appname` varchar(200) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `widgetlink` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `defaulticon` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `defaultsmallicon` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `displayorder` int(11) NOT NULL DEFAULT 0,
  `displayinnavbar` smallint(6) NOT NULL DEFAULT 0,
  `displayinindex` smallint(6) NOT NULL DEFAULT 0,
  `ismaster` smallint(6) NOT NULL DEFAULT 0,
  `isenabled` smallint(6) NOT NULL DEFAULT 0,
  `widgetvisibility` smallint(6) NOT NULL DEFAULT 0,
  `uservisibilitycustom` smallint(6) NOT NULL DEFAULT 0,
  `widgetname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `staffid` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`widgetid`),
  KEY `widgets1` (`appname`),
  KEY `widgets2` (`isenabled`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `trschecksms`
--

DROP TABLE IF EXISTS `trschecksms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trschecksms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ticketid` int(11) NOT NULL,
  `maskid` varchar(30) NOT NULL,
  `customername` varchar(200) NOT NULL,
  `orgname` varchar(200) NOT NULL,
  `mobileno` varchar(25) NOT NULL,
  `smsmessage` text NOT NULL,
  `smssenddate` datetime NOT NULL,
  `smssendby` varchar(20) NOT NULL,
  `feedbackrating` int(11) NOT NULL,
  `feedbackcomment` varchar(200) NOT NULL,
  `feedbackreceivedon` datetime NOT NULL,
  `orgid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `smstype` enum('0','1') NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=112045 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `trschecksms_test`
--

DROP TABLE IF EXISTS `trschecksms_test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trschecksms_test` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ticketid` varchar(256) NOT NULL,
  `mobileno` varchar(256) NOT NULL,
  `received` varchar(256) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1567 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_permissions`
--

DROP TABLE IF EXISTS `user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `support` varchar(200) NOT NULL DEFAULT 'add,edit,view',
  `billing` varchar(200) NOT NULL,
  `order` varchar(200) NOT NULL,
  `date_added` datetime NOT NULL,
  `date_modified` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
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
