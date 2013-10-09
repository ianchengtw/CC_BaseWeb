<?php
include('base/org.php');
include('db_operator.php');

class User extends baseMod {
	var $USER_LOGOUT = 1;
	var $_status = 0;
	function get(){}
	function post(){
		if(isset($_POST['mod'])){
			switch($_POST['mod']){
				case 'SignOut':
					
					$userID = getUserId($_SESSION['username']);
					if($userID === false){
						// @_@"
					}else{
						$sql = "DELETE FROM `user_online_list` WHERE `user_id`='".$userID."'";
						mysql_query($sql);
					}
					
					if(!empty($_SESSION)){
						session_destroy();
					}
					
					$this->_status = $this->USER_LOGOUT;
					break;
			}
		}
	}
	function nodata(){}
	function doing(){}
	function view(){
		switch($this->_status){
			case $this->USER_LOGOUT:
				echo "SignOutOK";
				break;
			default:
				echo "User";
				break;
		}
	}
}
$main = new User();
?>