<?php
include('../base/org.php');
class test extends baseMod {
	var $_isget = false;
	var $_title = 'upload page';
	var $_temp = '';
	var $name = '11';
	function get(){$this->_isget = true;}
	function post(){
		if($_FILES['file']['error'] > 0){
			echo 'Return Code: '.$_FILES['file']['error'].'<br />';
		}else{
			echo 'Upload: '.$_FILES['file']['name'];
			echo 'Type: '.$_FILES['file']['type'].'<br />';
			echo 'Size: '.($_FILES['file']['size'] / 1024).' Kb<br />';
			echo 'Temp file: '.$_FILES['file']['tmp_name'].'<br />';
			
			if(file_exists('upload_files/'.$_FILES['file']['name'])){
				echo $_FILES['file']['name'].'already exists.';
			}else{
				move_uploaded_file($_FILES['file']['tmp_name'],
								'upload_files/'.$_FILES['file']['name']);
				chmod('upload_files/'.$_FILES['file']['name'], 0777);
				echo 'Stored in: '.'upload_files/'.$_FILES['file']['name'];
			}
		}
		$_isget = true;
	}
	function nodata(){}
	function doing(){}
	function view(){
		if(!$this->_isget){
			echo '<form action="upload.php" method="post" enctype="multipart/form-data">
					<label for="file">Filename:</label>
					<input type="file" name="file" id="file"><br>
					<input type="submit" name="submit" value="Submit">';
		}else{
			echo "no view";
		}
		echo $this->name.'dfdf';
	}
}
$main = new test();
?>