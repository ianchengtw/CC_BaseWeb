<?php
include('base/org.php');
openHtml('login page', 0, '', '', true);

echo "<link rel='stylesheet' href='css/login.css'>";
?>
<script src="js/md5.js"></script>
<script type="text/javascript">
	function updateView(data){
		switch(data){
			case 'AC_PW_ERR':
				outputArea.innerHTML = '<p style="color:red;">Username or Password is error.</p>';
				break;
			case 'Login Success':
				outputArea.innerHTML = '登入成功';
				var username = document.getElementById('username').value;
				setCookie("username",username,3);
				window.location.href = "work.php";
				break;
			default:
				outputArea.innerHTML = data;
				break;
		}
	}
	function login(){
		outputArea.innerHTML = '登入中...';
		var username = document.getElementById('username').value;
		var password = document.getElementById('password').value;
		password = CryptoJS.MD5(password).toString();	//MD5
		var str = 	"mod=login" +
					"&username=" + username +
					"&password=" + password;
		xmlhttp.open('POST', 'nologin_can_do.php', true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send(str);
	}
	function enter(e) {
		if (e.keyCode == 13)login();
	}
	function signUp(){
		window.location.href="sign_up.php";
	}
	function ready(){
		var username = getCookie('username');
		if(username != null){
			document.getElementById('username').value = username;
		}
	}
</script>

<button onclick="signUp()" style="float:right;">Sign Up</button>

<div class='form'>
	<form action="nologin_can_do.php" method="post">
	<h1>群亞大學-登入</h1>
	<ul>
		<li>
			<div class='c1'>帳號</div>
			<div class='c2'><input type='text' name='username' id='username' onkeypress="enter(event)"></div>
		</li>
		<li>
			<div class='c1'>密碼</div>
			<div class='c2'><input type='password' name='password' id='password' onkeypress="enter(event)"></div>
		</li>
	</ul>

	<input type="button" class="submitButton" onclick="login()" value="登入" />
	<input type="hidden" name="mod" value="login">
	</form>
</div>

<p id="outputArea"></p>

<?php closeHtml(); ?>






