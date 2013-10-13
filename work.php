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
<script src="js/ChatSystem.js"></script>
<link rel='stylesheet' href='css/ChatSystem.css'>
<script>
	function updateView(data){
		//console.log('updateView= '+data);
		switch(data){
			case 'SignOutOK':
				outputArea.innerHTML = '登出成功';
				window.location.href = "index.php";
				break;
			default:
				break;
		}
		cs.update(data);
	}
	function SignOut(){
		outputArea.innerHTML = '登出中...';
		xmlhttp.open('POST', 'user.php', true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send('mod=SignOut');
	}
	function ready(){
		csInit();
		setInterval(csSync,3000);
	}
	var cs = ChatSystem.getInstance();
	window.onbeforeunload=SignOut;	//close window event
</script>

<button onclick=SignOut() style="float:right;">Sign Out</button>
<p id="outputArea"></p>


<?php closeHtml(); ?>