function select(){
	document.getElementById('guess').select();
}
function log(data){
	var str = '' + document.getElementById('guess').value;
	str += ' => ' + data + '<br>';
	document.getElementById('log').innerHTML += str;
}
function send(){
	select();
	var num = document.getElementById('guess').value;
	xmlhttp.open('POST', 'theAnswer.php', true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("num="+num);
}