<?php
include("base/org.php");

if(!empty($_POST)){
	if(isset($_POST['mod'])){
		switch($_POST['mod']){
			case 'accountCheck':

					if(isAccountExisted($_POST['username']) === false){
						echo 'AccountOK';
					}else{
						echo 'AccountExist';
					}

				break;
			case 'login':
			
				if(isset($_POST['username']) && isset($_POST['password'])){
					$DB = new org();
					$username = mysql_real_escape_string($_POST['username']);
					$password = mysql_real_escape_string($_POST['password']);
					$sql = "SELECT ID FROM `account` WHERE username='".$username."' AND password='".$password."';";
					$result = mysql_query($sql) or die(mysql_error());

					if(mysql_num_rows($result) == 0){
						echo "AC_PW_ERR";
					}else{
						session_start();
						$_SESSION['username'] = $_POST['username'];
						$userID = getUserId($username);
						if($userID === false){
							// @_@"
						}else{
							$sql = "INSERT INTO `user_online_list`(`user_id`, `is_online`) 
									VALUES('".$userID."',TRUE)";
							mysql_query($sql);
						}
						
						echo "Login Success";
					}
				}else{
					echo "AC_PW_ERR";
				}
				
				break;
			case 'newUser':
				echo 'newUser';
				break;
			case 'accountRegister':
				
				if(isAccountExisted($_POST['username']) === false){
					$DB = new org();
					$sql = "INSERT INTO `account`(`username`, `password`, `enable`) 
										VALUES ('".$_POST['username']."',
												'".$_POST['password']."',
												'1');";
					$result = mysql_query($sql) or die(mysql_error());
					
					$sql = "SELECT ID FROM `account` WHERE username='".$_POST['username']."';";
					$result = mysql_query($sql) or die(mysql_error());
					$array = mysql_fetch_assoc($result);
					$account_id = $array['ID'];
					
					$sql = "INSERT INTO `user_data`(	`account_id`, 
														`nick_name`, 
														`phone`, 
														`address`, 
														`email`, 
														`registered_time`) 
											VALUES ('".$account_id."',
													'".$_POST['nickname']."',
													'".$_POST['phone']."',
													'".$_POST['address']."',
													'".$_POST['email']."',
													NOW())";
					$result = mysql_query($sql) or die(mysql_error());
					
					echo 'Register Success';
					/*
					echo "&username=".$_POST['username'].'<br>';
					echo "&password=".$_POST['password'].'<br>';
					echo "&passConfirm=".$_POST['passConfirm'].'<br>';
					echo "&nickname=".$_POST['nickname'].'<br>';
					echo "&phone=".$_POST['phone'].'<br>';
					echo "&address=".$_POST['address'].'<br>';
					echo "&email=".$_POST['email'].'<br>';
					*/
				}else{
					echo 'AccountExist';
				}

				break;
		}
	}
}

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
