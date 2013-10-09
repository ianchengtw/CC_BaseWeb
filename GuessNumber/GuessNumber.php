<?php
include('../base/org.php');
class GuessNumber extends baseMod {
	function get(){}
	function post(){}
	function nodata(){}
	function doing(){}
	function view(){
		$this->loadHeader(true);
		echo "<link rel='stylesheet' href='../css/GuessNumber.css'>";
		include 'body.html';
		echo "<script src='../js/GuessNumber.js'></script>";
		$this->loadFooter();
	}
}
$main = new GuessNumber();
?>