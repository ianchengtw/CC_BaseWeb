<?php
define("DOMAIN", "http://localhost/");
define("ROOT", DOMAIN."TeacherThanks/CC_BaseWeb/");

function openHtml($title="", $content=0, $css="", $js="", $ajax=false){
	echo "<!DOCTYPE html>";
	echo "<html>";
	echo "<head>";
	if($title!=""){echo "<title>".$title."</title>";}
	echo '<meta charset="utf-8">';
	if($content>0){echo "<META HTTP-EQUIV='refresh' CONTENT='".(int)$content."'/>";}
	if($css!=""){
		echo "<style type='text/css'>";
		echo "@import url(http://".$css.")";
		echo "</style>";
	}
	if($js!=""){
		//js import
		echo "<script src='".$js."'></script>";
	}
	
	echo "<script src='".ROOT."js/base.js'></script>";
	
	if($ajax == true){
		echo "<script src='".ROOT."js/ajax.js'></script>";
	}

	echo "</head>";
	echo "<body onload=ready();>";
}

function baseView(){
	//echo "it is data-line<br>";
}
function closeHtml(){
	echo "</body>";
	echo "</html>";
}

interface mod{
	function start();
	function doing();
	function get();
	function post();
	function nodata();
	function view();
	function end();
}
class org{
	var $_database = null;
	var $_backPage = 'http://localhost/TeacherThanks/CC_BaseWeb/index.php';
	var $_title = 'Ian project';
	var $_content;
	var $_css;
	var $_js;
	var $_error;
	
	function __construct(){
		//connect DB
		$dbhost = 'localhost';
		$dbuser = 'ian';
		$dbpass = '1234';
		$dbname = 'ianproject';
		$this->database = mysql_connect($dbhost, $dbuser, $dbpass) or die('Error with MySQL connection');
		mysql_query("SET NAMES 'utf8'");
		mysql_select_db($dbname);
	}
}

class baseMod extends org implements mod{
	
	function __construct(){
		parent::__construct();
		$this->start();
		$this->doing();
		$this->view();
		$this->end();
	}
	function start(){
	
		session_start();
		
		if(!empty($_SESSION)){
			foreach(get_class_vars(get_class($this)) as $name => $value){
				if ($name[0]!="_"){
					//SESSION new data demo (to other mod)  ex:$_SESSION[name]=value
					if (array_key_exists($name, $_SESSION)){$this->{$name} = $_SESSION[$name];}
				}
			}
		}else{
			header('location: '.$this->_backPage);
		}
		if(!empty($_GET)){$this->get();}
		elseif(!empty($_POST)){$this->post();}
		else{$this->nodata();}
	}
	function doing(){}
	function get(){}
	function post(){}
	function nodata(){}
	function loadHeader($ajax = false){
		openHtml($this->_title, $this->_content, $this->_css, $this->_js, $ajax);
	}
	function loadFooter(){
		closeHtml();
	}
	function view(){
		$this->loadHeader();
		$this->loadFooter();
	}
	function end(){
		#save data
		foreach(get_class_vars(get_class($this)) as $name => $value){
			if ($name[0]!="_"){$_SESSION[$name]=$this->{$name};}
		}
	}
}

?>