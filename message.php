<?php
include('base/org.php');
include('db_operator.php');

class Message extends baseMod {
	function get(){}
	function post(){
		if(isset($_POST['mod'])){
			switch($_POST['mod']){
				case 'msg':
					if(isset($_POST['m']) && isset($_POST['t'])){
						if($_POST['m']!==""){
							$hostID = getUserId($_SESSION['username']);
							$to_id = mysql_real_escape_string($_POST['t']);
							$msg = mysql_real_escape_string($_POST['m']);
							$time = time();

							$sql = "INSERT INTO `msg`(`from_id`, `to_id`, `msg`, `time`) 
									VALUES ('".$hostID."','".$to_id."','".$msg."',FROM_UNIXTIME(".$time."))";
							mysql_query($sql);

							$sql = "SELECT LAST_INSERT_ID();";
							$result = mysql_query($sql) or die(mysql_error());
							$row = mysql_fetch_assoc($result);
							$msg_id = $row['LAST_INSERT_ID()'];

							$sql = "INSERT INTO `readed_msg`(`msg_id`, `user_id`, `is_readed`) 
										VALUES ('".$msg_id."','".$hostID."',true);";
							mysql_query($sql);
							$sql = "INSERT INTO `readed_msg`(`msg_id`, `user_id`, `is_readed`) 
										VALUES ('".$msg_id."','".$to_id."',false);";
							mysql_query($sql);

							echo "UpdateMsg".",".
								$msg_id.",".
								$hostID.",".
								$_POST['t'].",".
								$time.",".
								$_POST['m'].";";
						}
					}
					
					break;
				case 'getUserList':
					$userList = $this->getUserList();
					$hostID = getUserId($_SESSION['username']);
					if($hostID!==false){
						foreach ($userList as $v) {
							if($v[0]==$hostID){
								echo "HostData".",".
									$hostID.",".
									$v[1].",".
									"images/default_user_pic.png".",".
									"1".";";
							}else{
								echo "InsertUser".",".
									$v[0].",".
									$v[1].",".
									"images/default_user_pic.png".",".
									$v[2].";";
							}
						}
					}else{
						echo "Session is not existed.".$_SESSION['username'];
					}
					break;
				case 'sync':
					$hostID = getUserId($_SESSION['username']);
					$sql = "SELECT * FROM `msg` AS a
						LEFT JOIN 
						(SELECT `is_readed`, `msg_id` FROM `readed_msg`) AS b
						ON a.`id`=b.`msg_id`
						WHERE a.`to_id`='".$hostID."' AND b.`is_readed`=false;";
					$result = mysql_query($sql) or die(mysql_error());
					
					while ($row = mysql_fetch_assoc($result)) {
						echo "UpdateMsg".",".
							$row['id'].",".
							$row['from_id'].",".
							$row['to_id'].",".
							$row['time'].",".
							$row['msg'].";";
					}
					
					$sql = "UPDATE `readed_msg` SET `is_readed`=true WHERE `user_id`='".$hostID."';";
					mysql_query($sql);
					break;
			}
		}
	}
	function nodata(){}
	function doing(){}
	function view(){}
	
	//functions
	function getUserList(){
		$sql = "SELECT `account_id`, `nick_name` FROM `user_data`";
		$result = mysql_query($sql) or die(mysql_error());
		$userData = array();

		while ($row = mysql_fetch_array($result)) {
			$userData[$row['account_id']] = array($row['account_id'],$row['nick_name']);
		}

		$sql = "SELECT `user_id`, `is_online` FROM `user_online_list`";
		$result = mysql_query($sql) or die(mysql_error());
		while ($row = mysql_fetch_array($result)) {
			if($row['is_online']){
				array_push($userData[$row['user_id']],"1");
			}
		}

		foreach ($userData as $key => $value) {
			if(sizeof($value)<3){
				array_push($userData[$key],"0");
			}
		}
		
		return $userData;
	}
}
$main = new Message();

?>