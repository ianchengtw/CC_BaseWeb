<?php
include('base/org.php');
openHtml('Sign Up', 0, '', '', true);
?>
<script src="js/md5.js"></script>
<script type="text/javascript">
	function SignIn(){
		window.location.href="login.php";
	}
	function updateView(data){

		switch(data){
			case 'AccountOK':
				outputArea.innerHTML = '該帳號可以使用';
				break;
			case 'AccountExist':
				outputArea.innerHTML = '<p style="color:red;">該帳號已存在</p>';
				break;
			case 'Register Success':
				outputArea.innerHTML = '註冊成功';
				window.location.href = "login.php";
				break;
			default:
				outputArea.innerHTML = data;
				break;
		}
	}
	function accountCheck(node){
		outputArea.innerHTML = '帳號確認中...';
		xmlhttp.open('POST', 'nologin_can_do.php', true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send("mod=accountCheck&account="+node.value);
	}
	function passwordCheck(node){}
	function passConfirmCheck(node){
		var pw = document.getElementById('password');
		if(node.value == pw.value){
			outputArea.innerHTML = '';
		}else{
			outputArea.innerHTML = '<p style="color:red;">密碼確認不正確</p>';
		}
	}
	function register(){
		outputArea.innerHTML = '註冊中...';
		var username = document.getElementById('username').value;
		var password = document.getElementById('password').value;
		password = CryptoJS.MD5(password).toString();	//MD5
		var passConfirm = document.getElementById('passConfirm').value;
		var nickname = document.getElementById('nickname').value;
		var phone = document.getElementById('phone').value;
		var address = document.getElementById('address').value;
		var email = document.getElementById('email').value;
		var str = 	"mod=accountRegister" +
					"&username=" + username +
					"&password=" + password +
					"&passConfirm=" + passConfirm +
					"&nickname=" + nickname +
					"&phone=" + phone +
					"&address=" + address +
					"&email=" + email;
		xmlhttp.open('POST', 'nologin_can_do.php', true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send(str);
	}
</script>
<style type="text/css">
	.form {border:1px solid black; width:380px; margin:20px auto;}
	.form ul {list-style:none; margin:20px auto;}
	.c1 {width:90px; text-align:right; float:left; margin-right:10px;}
	.c2 {}
	.submitButton {margin:0 0 20px 300px;}
	.form h1 {text-align:center; border-bottom:1px dotted black;
			  padding:10px; margin:20px 20px;}
</style>

<button onclick="SignIn()" style="float:right;">Sign In</button>

<div class="form">
	<form method="post">
	<h1>群亞大學-註冊</h1>
	<ul>
		<li>
			<div class="c1">帳號</div>
			<div class="c2"><input type="text" name="username" id="username" onchange="accountCheck(this)"></div>
		</li>
		<li>
			<div class="c1">密碼</div>
			<div class="c2"><input type="password" name="password" id="password" onchange="passwordCheck(this)"></div>
		</li>
		<li>
			<div class="c1">確認密碼</div>
			<div class="c2"><input type="password" name="passConfirm" id="passConfirm" onchange="passConfirmCheck(this)"></div>
		</li>
		<li>
			<div class="c1">暱稱</div>
			<div class="c2"><input type="text" name="nickname" id="nickname"></div>
		</li>
		<li>
			<div class="c1">電話號碼</div>
			<div class="c2"><input type="text" name="phone" id="phone"></div>
		</li>
		<li>
			<div class="c1">地址</div>
			<div class="c2"><input type="text" name="address" id="address"></div>
		</li>
		<li>
			<div class="c1">E-mail</div>
			<div class="c2"><input type="text" name="email" id="email"></div>
		</li>
	</ul>

	<input type="button" class="submitButton" onclick="register()" value="註冊" />
	<input type="hidden" name="mod" value="accountRegister">
	</form>
</div>

<p id="outputArea"></p>

<?php closeHtml(); ?>