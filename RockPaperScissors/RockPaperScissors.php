<?php
include('../base/org.php');
class test extends baseMod {
	function get(){}
	function post(){}
	function nodata(){}
	function doing(){}
	function view(){
		echo "<link rel='stylesheet' href='../css/RockPaperScissors.css'>";
		include 'body.html';
		echo "<script src='../js/RockPaperScissors.js'></script>";
	}
}
$main = new test();
?>