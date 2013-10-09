<?php
include_once("base/org.php");

function isAccountExisted($username){
	$DB = new org();
	$sql = "SELECT COUNT(ID) AS ID FROM `account` WHERE `username`='".$username."';";
	$result = mysql_query($sql) or die("MySQL query error");
	
	while ($row = mysql_fetch_assoc($result)) {
		if($row['ID'] == 0){
			return false;
		}else{
			return $row['ID'];
		}
	}
}

function getUserId($username){
	$DB = new org();
	$sql = "SELECT ID FROM `account` WHERE username='".$username."';";
	$result = mysql_query($sql) or die("MySQL query error");
	
	while ($row = mysql_fetch_assoc($result)) {
		return $row['ID'];
	}
	
	return false;
}






?>
