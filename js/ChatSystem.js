function UserData(id,name,pic,online){
	this.id=id;
	this.name=name;
	this.pic=pic;
	this.online=online;
	this.msgs=[];
}
function Msg(id,user_id,username,timestamp,msg){
	this.id=id;
	this.user_id=user_id;
	this.username=username;
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
		var time = date+','+month+' '+year+' '+hour+':'+min+':'+sec ;
		return time;
	}
}
function MainWin(){
	var w = document.createElement("div");
	w.className = 'chat_Win';
	
	var b = document.createElement("div");
	b.className = 'chat_Bar';
	b.innerHTML = "Chat";
	
	var l = document.createElement("div");
	l.id = 'chat_List';
	
	w.appendChild(b);
	w.appendChild(l);
	document.body.appendChild(w);
	
	this.users={};
	this.view=w;
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
			u.setAttribute("onClick", "alertUserWindow(this)");
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
				o.innerHTML = '<img src="images/red_light.png">';
			
			u.appendChild(p);
			u.appendChild(n);
			u.appendChild(o);
			cl.appendChild(u);
		}
	}
}
function PopWin(id){
	var box = document.createElement("div");
	box.className = 'pop_Box';
	box.id = id;

	var bar = document.createElement("div");
	bar.className = 'pop_Bar';
	
	var name=document.createElement("span");
	name.innerHTML="User Name";

	var c = document.createElement("div");
	c.className = 'pop_content';
	c.innerHTML = "bra bra bra";

	var btn = document.createElement("button");
	btn.className = 'pop_Btn';
	btn.innerHTML = "X";
	btn.setAttribute("onClick", "closeUserWindow(this)");
	
	var ia = document.createElement("input");
	ia.id = "inputArea";
	ia.type = "text";

	bar.appendChild(name);
	bar.appendChild(btn);
	box.appendChild(bar);
	box.appendChild(c);
	box.appendChild(ia);
	document.body.appendChild(box);
	
	this.id=id;
	this.user={};
	//this.msgs=[];
	this.available=true;
	this.view=box;
}
PopWin.prototype = {
	empty: function(){
		//var v=document.getElementById(this.id);
		//v.firstChild.firstChild.nodeValue='ianai';
		this.user={};
		//this.msgs=[];
		this.available=true;
		console.log(this);
	},
	show: function(){
		this.view.style.display="block";
		var n=this.view.childNodes;
		n[0].firstChild.innerHTML=this.user.name;
		n[1].innerHTML='';
		this.user.msgs.map(function(m){
			n[1].innerHTML+='<div>'+m.msg+'</div>';
		});
		//this.view.firstChild.firstChild.innerHTML=this.user.name;
	}
}
function WaitWin(){
	this.users={};
}
WaitWin.prototype = {
	empty: function(){},
	show: function(){}
}

var ChatSystem = (function () {
	var instance;

	function init() {
		
		var hostData;
		var userData = {};
		var mainWin = new MainWin();
		var popWins = [];
		var waitWin = new WaitWin();
		var chattingList = [];
		var waitingList = [];

		// Private methods and variables
		function init(){
			mainWin.users=userData;
			mainWin.show();
			popWins.push(new PopWin('popWin_0'));
			popWins.push(new PopWin('popWin_1'));
			popWins.push(new PopWin('popWin_2'));
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
							userData[u[2]].msgs.push(new Msg(u[1],u[2],u[3],u[4],u[5]));
							console.log(userData[u[2]].msgs);
							break;
					}
				});
			},
			
			popWin: function(u_id){
				var pw=null;
				for(var i=0;i<popWins.length;i++){
					if(popWins[i].available){
						pw=popWins[i];
						break;
					}
				}
				
				if(pw===null){
					//swap pw
					console.log('null');
				}else{
					var u_id=u_id.split("_")[1];
					for(key in userData){
						if(userData[key].id==u_id){
							pw.user=userData[key];
							pw.available=false;
							console.log(pw);
							break;
						}
					}
					pw.show();
				}
				//console.log(popWins[0].view.firstChild.firstChild.innerHTML);
				//popWins[0].show();
				//popWins[0].empty();
			},
			
			closePopWin: function(id){
				var i=id.split("_")[1];
				var pw=popWins[i];
				pw.view.style.display="none";
				pw.empty();
			},
			
			test: function(){
				
				//hostData.msgs.push(new Msg(1,"Mary",12569537329,"this is a test."));
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

function alertUserWindow(n){
	cb.popWin(n.id);
}
function closeUserWindow(n){
	var e = n.parentNode.parentElement;
	//document.getElementById(e.id).style.display="none";
	cb.closePopWin(e.id);
}

// Usage:

var cb = ChatSystem.getInstance();
cb.update('HostData,1,Ian,images/default_user_pic.png,1');
cb.update('InsertUser,2,Mary,images/default_user_pic.png,1');
cb.update('InsertUser,3,Alice,images/default_user_pic.png,0');
cb.update('InsertUser,4,George,images/default_user_pic.png,1');
cb.update('UpdateMsg,1,2,Mary,12569537329,This is a test1.This is a test1.This is a test1.This is a test1.This is a test1.');
cb.update('UpdateMsg,2,2,Mary,12569537330,This is a test2.');
cb.update('UpdateMsg,3,2,Mary,12569537331,This is a test3.');
