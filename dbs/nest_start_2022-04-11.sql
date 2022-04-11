CREATE TABLE `admin_user` (
  `user_id` smallint NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `account_name` varchar(24) NOT NULL COMMENT '用户账号',
  `real_name` varchar(20) NOT NULL COMMENT '真实姓名',
  `passwd` char(32) NOT NULL COMMENT '密码',
  `passwd_salt` char(6) NOT NULL COMMENT '密码盐',
  `mobile` varchar(15) NOT NULL DEFAULT '0' COMMENT '手机号码',
  `role` tinyint NOT NULL DEFAULT '3' COMMENT '用户角色：0-超级管理员|1-管理员|2-开发&测试&运营|3-普通用户（只能查看）',
  `user_status` tinyint NOT NULL DEFAULT '0' COMMENT '状态：0-失效|1-有效|2-删除',
  `create_by` smallint NOT NULL COMMENT '创建人ID',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` smallint NOT NULL DEFAULT '0' COMMENT '修改人ID',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`user_id`),
  KEY `idx_m` (`mobile`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COMMENT='后台用户表';

LOCK TABLES `admin_user` WRITE;
/*!40000 ALTER TABLE `admin_user` DISABLE KEYS */;

INSERT INTO `admin_user` (`user_id`, `account_name`, `real_name`, `passwd`, `passwd_salt`, `mobile`, `role`, `user_status`, `create_by`, `create_time`, `update_by`, `update_time`)
VALUES
	(1,'javascript','script','123','0','0',3,0,0,'2022-04-11 10:43:57',0,'2022-04-11 10:43:57'),
	(2,'typescript','script','456','0','0',3,0,0,'2022-04-11 10:44:16',0,'2022-04-11 10:44:16'),
	(3,'test','test001','+UkxVbRmJ/eBMwKp2M7kyw==','uPI/','13729921239',3,1,0,'2022-04-11 11:58:12',0,'2022-04-11 14:22:54'),
	(5,'test123','test002','yfYZnirHDUl7x3MGz0dehw==','KGDn','13777777777',3,1,0,'2022-04-11 12:28:11',0,'2022-04-11 12:28:11'),
	(6,'test111','test003','sf4XZW9itb4xteLf3BB1Ng==','BA+0','13788888888',3,1,0,'2022-04-11 12:30:12',0,'2022-04-11 12:30:12'),
	(7,'test112','test005','1pyMBbYk6B+2x8u9ExflKA==','oySo','13788888888',3,1,0,'2022-04-11 13:40:14',0,'2022-04-11 13:40:14'),
	(8,'keen','test007','z1b4M/yywQ5Y3U0Kzmw/6w==','Y+pB','13155555555',3,1,0,'2022-04-11 14:43:48',0,'2022-04-11 14:43:48');

/*!40000 ALTER TABLE `admin_user` ENABLE KEYS */;
UNLOCK TABLES;

DROP TABLE IF EXISTS `commodity`;

CREATE TABLE `commodity` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '商品ID',
  `ccolumn_id` smallint NOT NULL COMMENT '商品_栏目ID',
  `commodity_name` varchar(10) NOT NULL COMMENT '商品_名称',
  `commodity_desc` varchar(20) NOT NULL COMMENT '商品_介绍',
  `market_price` decimal(7,2) NOT NULL DEFAULT '0.00' COMMENT '市场价',
  `sale_money` decimal(7,2) NOT NULL DEFAULT '0.00' COMMENT '销售价',
  `c_by` varchar(24) NOT NULL COMMENT '创建人',
  `c_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `u_by` varchar(24) NOT NULL DEFAULT '0' COMMENT '修改人',
  `u_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`),
  KEY `idx_ccid` (`ccolumn_id`),
  KEY `idx_cn` (`commodity_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COMMENT='商品表';

LOCK TABLES `commodity` WRITE;
/*!40000 ALTER TABLE `commodity` DISABLE KEYS */;

INSERT INTO `commodity` (`id`, `ccolumn_id`, `commodity_name`, `commodity_desc`, `market_price`, `sale_money`, `c_by`, `c_time`, `u_by`, `u_time`)
VALUES
	(1,1,'婴儿车','轻便的婴儿车',122.00,122.00,'test','2022-04-11 13:53:06','test','2022-04-11 14:07:52'),
	(2,1,'电动车','好看的电动车',4000.00,4000.00,'test','2022-04-11 13:53:29','test','2022-04-11 14:07:53'),
	(3,2,'SUV','好看的SUV',16660.00,16660.00,'test','2022-04-11 13:53:56','test','2022-04-11 14:07:55'),
	(4,2,'Mac电脑','强悍的Mac笔记本',1250.00,1250.00,'test','2022-04-11 13:54:20','test','2022-04-11 14:07:55'),
	(5,1,'键盘','好敲的键盘',10.00,10.00,'test','2022-04-11 13:55:07','test','2022-04-11 14:07:56'),
	(6,1,'鞋子','好辣眼睛的鞋子',70.00,70.00,'test','2022-04-11 13:55:25','test','2022-04-11 14:07:57'),
	(7,1,'香蕉','没熟的香蕉',2.00,2.00,'test','2022-04-11 13:55:53','test','2022-04-11 14:07:57'),
	(8,3,'小汽车','酷酷的小汽车',16740.00,16740.00,'test','2022-04-11 13:56:20','test','2022-04-11 14:07:59'),
	(9,4,'宝马','尊贵的宝马',99999.00,99999.00,'test','2022-04-11 13:56:45','test','2022-04-11 14:08:01'),
	(10,1,'特斯拉','电动跑车特斯拉',88888.00,88888.00,'test','2022-04-11 13:57:04','test','2022-04-11 14:08:02'),
	(11,2,'比亚迪','混动汽车比亚迪',11111.00,11111.00,'test','2022-04-11 13:57:41','test','2022-04-11 14:08:03'),
	(12,2,'灌篮高手','一部卡通片',13.00,13.00,'test','2022-04-11 14:12:59','0','2022-04-11 14:15:56'),
	(13,2,'手机','智能安卓手机',1300.00,1300.00,'test','2022-04-11 14:14:28','0','2022-04-11 14:15:57'),
	(14,2,'苹果','只是一个苹果',1.00,1.00,'test','2022-04-11 14:16:42','0','2022-04-11 14:16:42');

/*!40000 ALTER TABLE `commodity` ENABLE KEYS */;
UNLOCK TABLES;
