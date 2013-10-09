<?php
session_start();

if(empty($_SESSION)){
	header('location: index.php');
	return;
}else{
	include('base/org.php');
	openHtml('login page', 0, '', '', true);
}

?>

<script>
	function updateView(data){
		switch(data){
			case 'SignOutOK':
				outputArea.innerHTML = '登出成功';
				window.location.href = "index.php";
				break;
			default:
				break;
		}
	}
	function SignOut(){
		outputArea.innerHTML = '登出中...';
		xmlhttp.open('POST', 'user.php', true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send('mod=SignOut');
	}
	
</script>

<button onclick=SignOut() style="float:right;">Sign Out</button>
<p id="outputArea"></p>

<script src="js/ChatBox.js"></script>
<link rel='stylesheet' href='css/ChatBox.css'>

<?php closeHtml(); ?>