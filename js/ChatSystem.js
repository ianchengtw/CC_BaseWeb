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
				o.innerHTML = '<img src="images/red_light.png">';
			
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
		this.view.style.display="none";
		this.view.style.right=this.position;
	},
	show: function(){
		this.available=false;
		this.view.style.display="block";
		this.view.style.right=this.position;
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
		this.manager.release(this);
	}
}
function PopWinManager(){
	this.location=[null,null,null];
	this.pool=[];
	this.pool.push(new PopWin('popWin_0',this));
	this.pool.push(new PopWin('popWin_1',this));
	this.pool.push(new PopWin('popWin_2',this));
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
						this.pool[i].position="270px";
						break;
					case 1:
						this.pool[i].position="530px";
						break;
					case 2:
						this.pool[i].position="790px";
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
	isUserExisted: function(user){
		for(var i=0;i<this.pool.length;i++){
			if(this.pool[i].user===user){
				return true;
			}
		}
		return false;
	},
	alertPopWin: function(user){
		if(!this.isUserExisted(user)){
			var pw=this.getPopWin();
			if(pw!==null){
				pw.user=user;
				pw.show();
			}
		}
	},
	release: function(pw){
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
						this.location[j].movePos("270px");
						this.location[j-1]=this.location[j];
						this.location[j]=null;
						break;
					case 2:
						this.location[j].movePos("530px");
						this.location[j-1]=this.location[j];
						this.location[j]=null;
						break;
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
	n.innerHTML=0;
	
	w.appendChild(i);
	w.appendChild(n);
	document.body.appendChild(w);
	w.style.display="none";
	
	this.users={};
	this.count=0;
	this.view=w;
}
WaitWin.prototype = {
	empty: function(){
		this.users={};
		this.count=0;
	},
	show: function(){
		this.view.style.display="block";
	}
}

var ChatSystem = (function () {
	var instance;

	function init() {
		
		var hostData;
		var userData = {};
		var mainWin = new MainWin();
		var popWinManager = new PopWinManager();
		var waitWin = new WaitWin();
		var chattingList = [];
		var waitingList = [];

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
							userData[u[2]].msgs.push(new Msg(u[1],u[2],u[3],u[4],u[5]));
							break;
					}
				});
			},
			
			alertPopWin: function(u_id){
				var u_id=u_id.split("_")[1];
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
					mainWin.view.lastChild.style.padding="0";
				}else{
					mainWin.view.lastChild.style.height="auto";
					mainWin.view.lastChild.style.padding="2px 0 0 0";
				}
				mainWin.visible=!mainWin.visible;
			},
			
			togglePopWin: function(id){

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

function alertPopWin(n){
	cb.alertPopWin(n.id);
}
function closePopWin(n){
	var e = n.parentNode.parentElement;
	cb.closePopWin(e.id);
}
function toggleMainWin(n){
	cb.toggleMainWin();
}
function togglePopWin(n){
	var e = n.parentElement;
	cb.togglePopWin(e.id);
}
// Usage:

var cb = ChatSystem.getInstance();
cb.update('HostData,1,Ian,images/default_user_pic.png,1');
cb.update('InsertUser,2,Mary,images/default_user_pic.png,1');
cb.update('InsertUser,3,Alice,images/default_user_pic.png,0');
cb.update('InsertUser,4,George,images/default_user_pic.png,1');
cb.update('InsertUser,5,Chili,images/default_user_pic.png,0');
cb.update('UpdateMsg,1,2,Mary,12569537329,This is a test1.This is a test1.This is a test1.This is a test1.This is a test1.');
cb.update('UpdateMsg,2,2,Mary,12569537330,This is a test2.');
cb.update('UpdateMsg,3,2,Mary,12569537331,This is a test3.');