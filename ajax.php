<?php
include('base/org.php');
class ajax extends baseMod {
	var $_temp = '';
	function get(){$this->_temp = 'get';}
	function post(){$this->_temp = 'post';}
	function nodata(){}
	function doing(){}
	function view(){
		echo $this->_temp;
	}
}
$main = new ajax();
?>