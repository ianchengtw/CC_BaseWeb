<?php
include('base/org.php');
openHtml('login page', 0, '', '');

echo "<link rel='stylesheet' href='css/login.css'>";
?>
<div class='form'>
	<form action="login.php" method="post">
	<h1>群亞大學-登入</h1>
	<ul>
		<li>
			<div class='c1'>帳號</div>
			<div class='c2'><input type='text' name='account'></div>
		</li>
		<li>
			<div class='c1'>密碼</div>
			<div class='c2'><input type='password' name='password'></div>
		</li>
	</ul>

	<input type='submit' class='submitButton'>
	</form>
</div>
<?php

closeHtml();

?>