function UserData(id,name,pic,online){
	this.id=id;
	this.name=name;
	this.pic=pic;
	this.online=online;
	this.msgs=[];
}
function Msg(id,from_uid,to_uid,timestamp,msg){
	this.id=id;
	this.from_uid=from_uid;
	this.to_uid=to_uid;
	this.timestamp=timestamp;
	this.msg=msg;
}
Msg.prototype = {
	toDate: function(){
		var a = new Date(this.timestamp*1000);
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var year = a.getFullYear();
		var month = months[a.getMonth()];
		var date = a.getDate();
		var hour = a.getHours();
		var min = a.getMinutes();
		var sec = a.getSeconds();
		var time = date+','+month+' '+year+' '+hour+':'+min+':'+sec;
		return time;
	}
}
function MainWin(){
	var w = document.createElement("div");
	w.className = 'chat_Win';
	
	var b = document.createElement("div");
	b.className = 'chat_Bar';
	b.innerHTML = "Chat";
	b.setAttribute("onClick", "toggleMainWin(this)");
	
	var l = document.createElement("div");
	l.id = 'chat_List';
	
	w.appendChild(b);
	w.appendChild(l);
	document.body.appendChild(w);
	
	this.users={};
	this.view=w;
	this.visible=true;
}
MainWin.prototype = {
	show: function(){
	
		var cl=document.getElementById('chat_List');
		
		while (cl.firstChild) {
			cl.removeChild(cl.firstChild);
		}
		
		for(key in this.users){
			var x=this.users[key];
			var u = document.createElement("div");
			u.className = 'chat_user';
			u.id = 'clid_'+x.id;
			u.setAttribute("onClick", "alertPopWin(this)");
			var n = document.createElement("div");
			n.className = 'cu_name';
			n.innerHTML = '<span>'+x.name+'</span>';
			var p = document.createElement("div");
			p.className = 'cu_pic';
			p.innerHTML = '<img src="'+x.pic+'">';
			var o = document.createElement("div");
			o.className = 'cu_online';
			if(x.online==true || x.online=='1')
				o.innerHTML = '<img src="images/green_light.png">';
			else
				o.innerHTML;// = '<img src="images/red_light.png">';
			
			u.appendChild(p);
			u.appendChild(n);
			u.appendChild(o);
			cl.appendChild(u);
		}
	}
}
function PopWin(id,manager){
	var box = document.createElement("div");
	box.className = 'pop_Box';
	box.id = id;

	var bar = document.createElement("div");
	bar.className = 'pop_Bar';
	bar.setAttribute("onClick", "togglePopWin(this)");
	
	var name=document.createElement("span");
	name.innerHTML="User Name";

	var c = document.createElement("div");
	c.className = 'pop_content';
	c.innerHTML = "bra bra bra";

	var btn = document.createElement("button");
	btn.className = 'pop_Btn';
	btn.innerHTML = "X";
	btn.setAttribute("onClick", "closePopWin(this)");
	
	var ia = document.createElement("input");
	ia.id = "inputArea";
	ia.type = "text";
	ia.setAttribute("onkeyup", "sendMsg(event)");

	bar.appendChild(name);
	bar.appendChild(btn);
	box.appendChild(bar);
	box.appendChild(c);
	box.appendChild(ia);
	document.body.appendChild(box);
	
	this.id=id;
	this.user={};
	this.available=true;
	this.visible=true;
	this.position="";
	this.view=box;
	this.manager=manager;
}
PopWin.prototype = {
	empty: function(){
		this.user={};
		this.available=true;
		this.position="0";
		this.view.style.right=this.position;
		this.view.style.display="none";
		this.view.lastChild.value="";
	},
	show: function(){
		this.available=false;
		this.view.style.right=this.position;
		this.view.style.display="block";
		var n=this.view.childNodes;
		n[0].firstChild.innerHTML=this.user.name;
		n[1].innerHTML='';
		this.user.msgs.map(function(m){
			n[1].innerHTML+='<div>'+m.msg+'</div>';
		});
	},
	movePos: function(pos){
		this.position=pos;
		this.view.style.right=this.position;
	},
	release: function(){
		this.empty();
		this.manager.releasePopWin(this);
	}
}
function PopWinManager(){
	this.location=[null,null,null];
	this.pool=[];
	this.pool.push(new PopWin('popWin_0',this));
	this.pool.push(new PopWin('popWin_1',this));
	this.pool.push(new PopWin('popWin_2',this));
	this.waitWin = new WaitWin();
}
PopWinManager.prototype = {
	getPopWin: function(){
		for(var i=0;i<this.pool.length;i++){
			if(this.pool[i].available){
				var j=0
				for(;j<this.location.length;j++){
					if(this.location[j]===null){
						this.location[j]=this.pool[i];
						break;
					}
				}
				switch(j){
					case 0:
						this.pool[i].position="230px";
						break;
					case 1:
						this.pool[i].position="490px";
						break;
					case 2:
						this.pool[i].position="750px";
						break;
				}
				return this.pool[i]
			}
		}
		return null;
	},
	getPopWinById: function(id){
		for(var i=0;i<this.pool.length;i++){
			if(this.pool[i].id==id){
				return this.pool[i];
			}
		}
		return null;
	},
	isLocationAvailable: function(){
		for(var i=0;i<this.location.length;i++){
			if(this.location[i]===null)
				return true;
		}
		return false;
	},
	isUserExistedInPoor: function(user){
		for(var i=0;i<this.pool.length;i++){
			if(this.pool[i].user===user){
				return true;
			}
		}
		return false;
	},
	kpp: function(user){
		var pw=this.location[this.location.length-1];
		this.waitWin.addUser(pw.user);
		var wu=this.waitWin.pullUser(user);
		pw.user=user;
		pw.show();
	},
	alertPopWin: function(user){
		if(this.waitWin.isUserExisted(user)){
			this.kpp(user);
		}else{
			if(this.isUserExistedInPoor(user)){
				return;
			}else{
				if(this.isLocationAvailable()){
					var pw=this.getPopWin();
					if(pw!==null){
						pw.user=user;
						pw.show();
					}else{
					}
				}else{
					this.kpp(user);
				}
			}
		}
		this.waitWin.show();
	},
	releasePopWin: function(pw){
		for(var i=0;i<this.pool.length;i++){
			if(this.pool[i]===pw){
				pw.empty();
				break;
			}
		}
		var removed=false;
		for(var j=0;j<this.location.length;j++){
			if(this.location[j]===pw && removed===false){
				this.location[j]=null;
				removed=true;
				continue;
			}//else{console.log("impossible_release");}
			if(removed===true){
				if(this.location[j]!==null)
				switch(j){
					case 1:
						this.location[j].movePos("230px");
						this.location[j-1]=this.location[j];
						this.location[j]=null;
						break;
					case 2:
						this.location[j].movePos("490px");
						this.location[j-1]=this.location[j];
						this.location[j]=null;
						break;
				}
			}
		}
		if(!this.waitWin.isEmpty()){
			var user=this.waitWin.popUser();
			if(user!==null){
				this.alertPopWin(user);
			}
		}
	},
	updateVisiblePopWinMsg: function(uid){
		for(var i=0;i<this.location.length;i++){
			if(this.location[i]!==null){
				if(this.location[i].user.id===uid){
					this.location[i].show();
					var e=this.location[i].view.childNodes[1];
					e.scrollTop=e.scrollHeight;
				}
			}
		}
	}
}
function WaitWin(){
	var w = document.createElement("div");
	w.className = 'wait_Win';
	
	var i = document.createElement("img");
	i.className = 'wait_img';
	i.src="images/wait_win.png";
	
	var n = document.createElement("div");
	n.className = 'wait_num';
	//n.innerHTML=0;
	
	w.appendChild(i);
	w.appendChild(n);
	document.body.appendChild(w);
	w.style.display="none";
	
	this.users=[];
	this.view=w;
}
WaitWin.prototype = {
	empty: function(){
		this.users=[];
		this.view.style.display="none";
	},
	show: function(){
		if(this.isEmpty()){
			this.empty();
		}else{
			this.view.lastChild.innerHTML=this.users.length;
			this.view.style.display="block";
		}
	},
	isUserExisted: function(user){
		for(var i=0;i<this.users.length;i++){
			if(this.users[i]===user){
				return true;
			}
		}
		return false;
	},
	isEmpty: function(){
		return (this.users.length)?false:true;
	},
	addUser: function(user){
		if(!this.isUserExisted(user)){
			this.users.push(user);
			this.show();
		}
	},
	popUser: function(){
		if(this.isEmpty()){
			this.empty();
			return null;
		}else{
			var user=this.users.shift();
			if(this.isEmpty()){
				this.empty();
			}else{
				this.show();
			}
			return user;
		}
	},
	pullUser: function(user){
		if(this.isUserExisted(user)){
			var newUsers=[];
			while(this.users.length){
				var u=this.users.pop();
				if(u!==user){
					newUsers.push(u);
				}
			}
			this.users=newUsers;
			return true;
		}
		return null;
	}
}

var ChatSystem = (function () {
	var instance;

	function init() {
		
		var hostData;
		var userData = {};
		var mainWin = new MainWin();
		var popWinManager = new PopWinManager();

		// Private methods and variables
		function init(){
			mainWin.users=userData;
			mainWin.show();
		}
		
		//Implement
		init();

		return {

			// Public methods and variables
			//publicProperty: "I am public",
			update: function(cmds){
				var cmdList=cmds.split(";");
				cmdList.map(function(x){
					var u=x.split(",");
					switch(u[0]){
						case 'HostData':
							hostData = new UserData(u[1],u[2],u[3],u[4]);
							break;
						case 'InsertUser':
							userData[u[1]]=new UserData(u[1],u[2],u[3],u[4]);
							mainWin.show();
							break;
						case 'UpdateMsg':
							var m="";
							for(var i=5;i<u.length;i++){
								m+=u[i];
							}
							if(u[2]==hostData.id){
								userData[u[3]].msgs.push(new Msg(u[1],u[2],u[3],u[4],m));
								popWinManager.updateVisiblePopWinMsg(u[3]);
							}else{
								userData[u[2]].msgs.push(new Msg(u[1],u[2],u[3],u[4],m));
								popWinManager.updateVisiblePopWinMsg(u[2]);
							}
							break;
					}
				});
			},
			
			alertPopWin: function(u_id){
				var user=null;
				for(key in userData){
					if(userData[key].id==u_id){
						user=userData[key];
						break;
					}
				}
				if(user!==null){
					popWinManager.alertPopWin(user);
				}
			},
			
			closePopWin: function(id){
				var pw=popWinManager.getPopWinById(id);
				pw.release();
			},
			
			toggleMainWin: function(){
				if(mainWin.visible){
					mainWin.view.lastChild.style.height="0";
				}else{
					mainWin.view.lastChild.style.height="auto";
				}
				mainWin.visible=!mainWin.visible;
			},
			
			togglePopWin: function(id){

			},
			
			getUserIDByPopWin: function(pw_id){
				var pw=popWinManager.getPopWinById(pw_id);
				if(pw!==null){
					return pw.user.id;
				}
			},
			
			test: function(){

				//hostData.msgs.push(new Msg(1,"Mary",1381593993777,"this is a test."));
				//console.log(hostData.msgs[0].toDate());
			}
		};
	};

	return {

		// Get the Singleton instance if one exists
		// or create one if it doesn't
		getInstance: function () {

			if ( !instance ) {
			  instance = init();
			}

			return instance;
		}

	};

})();

function alertPopWin(n){
	var u_id=n.id.split("_")[1];
	getUserMsgLast10(u_id);
	cs.alertPopWin(u_id);
}
function closePopWin(n){
	var e = n.parentNode.parentElement;
	cs.closePopWin(e.id);
}
function toggleMainWin(n){
	cs.toggleMainWin();
}
function togglePopWin(n){
	var e = n.parentElement;
	cs.togglePopWin(e.id);
}
function sendMsg(e){
	if (e.keyCode == 13){
		var n=e.target || e.srcElement;
		if(n.value!=""){
			var toID=cs.getUserIDByPopWin(n.parentElement.id);
			console.log(toID);
			var msg="mod=msg&t="+toID+"&m="+n.value;
			xmlhttp.open('POST', 'message.php', true);
			xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xmlhttp.send(msg);
			n.value="";
		}
	}
}
function getUserMsgLast10(u_id){
	console.log('u_id='+u_id);
	xmlhttp.open('POST', 'message.php', true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("mod=getUserMsgLast10&u="+u_id);
}
function getUserUnreadedMsg(u_id){
	xmlhttp.open('POST', 'message.php', true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("mod=getUserUnreadedMsg&u="+u_id);
}
function getUserList(){
	xmlhttp.open('POST', 'message.php', true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("mod=getUserList");
}
function csInit(){
	getUserList();
}
var csSync=function(){
	var objToday = new Date(),
	weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
	dayOfWeek = weekday[objToday.getDay()],
	domEnder = new Array( 'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th' ),
	dayOfMonth = today + (objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder[objToday.getDate()] : objToday.getDate() + domEnder[parseFloat(("" + objToday.getDate()).substr(("" + objToday.getDate()).length - 1))],
	months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
	curMonth = months[objToday.getMonth()],
	curYear = objToday.getFullYear(),
	curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
	curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
	curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
	curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
	var today = curHour + ":" + curMinute + "." + curSeconds + curMeridiem + " " + dayOfWeek + " " + dayOfMonth + " of " + curMonth + ", " + curYear;
	console.log('sync1='+xmlhttp.readyState+',date='+today);
	
	xmlhttp.open('POST', 'message.php', true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("mod=sync");
}
// Usage:


//cb.update('UpdateMsg,1,12,10,12569537329,This is a test1.This is a test1.This is a test1.This is a test1.This is a test1.');
//cb.update('UpdateMsg,2,12,10,12569537330,This is a test2.');
//cb.update('UpdateMsg,3,12,10,12569537331,This is a test3.');