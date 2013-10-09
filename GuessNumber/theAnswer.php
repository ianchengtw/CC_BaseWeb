<?php

$answer = array(7,2,9,4);

if(isset($_POST['num'])){
	if(strlen($_POST['num']) == 4){
		$num = array();
		$num[0] = $_POST['num'][0];
		$num[1] = $_POST['num'][1];
		$num[2] = $_POST['num'][2];
		$num[3] = $_POST['num'][3];
		
		$countA = 0;
		$countB = 0;
		
		for($i=0; $i<4; $i++){
			for($j=0; $j<4; $j++){
				if($answer[$i] == $num[$i]){
					$countA++;
					break;
				}elseif($answer[$i] == $num[$j]){
					$countB++;
					break;
				}
			}
		}
		
		echo $countA.' A '.$countB.' B';
	}else{
		echo 'The amount number is wrong.';
	}
}
?>