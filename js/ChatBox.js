var ChatBox = (function () {
	var instance;

	function init() {
		
		var users = {};
		var popWins = {};

		// Private methods and variables
		function createChatBox(){
			var box = document.createElement("div");
			box.className = 'chat_Box';
			
			var bar = document.createElement("div");
			bar.className = 'chat_Bar';
			bar.innerHTML = "Chat";
			
			var list = document.createElement("div");
			list.id = 'chat_List';
			
			
			box.appendChild(bar);
			box.appendChild(list);
			document.body.appendChild(box);
		}
		
		function createPopWins(){
			for(var j=0;j<3;j++){
				var box = document.createElement("div");
				box.className = 'pop_Box';
				box.id = 'popWin_'+j;

				var bar = document.createElement("div");
				bar.className = 'pop_Bar';
				bar.innerHTML = 'aa';//userInfo.name;

				var c = document.createElement("div");
				c.className = 'pop_content';
				c.innerHTML = "p2p haha<br>p2p haha<br>p2p haha<br>p2p haha<br>";

				var btn = document.createElement("button");
				btn.className = 'pop_Btn';
				btn.innerHTML = "X";
				btn.setAttribute("onClick", "closeUserWindow(this)");
				
				var ia = document.createElement("input");
				ia.id = "inputArea";
				ia.type = "text";

				bar.appendChild(btn);
				box.appendChild(bar);
				box.appendChild(c);
				box.appendChild(ia);
				document.body.appendChild(box);
				
				popWins[j]=box;
			}
		}

		//Implement
		createChatBox();
		createPopWins();

		return {

			// Public methods and variables
			//publicProperty: "I am public",
			
			users: function(){return users;},

			insertUser: function(id,name,pic,online){
			
				users[id]={'name':name,'pic':pic,'online':online};
				
				var u = document.createElement("div");
				u.className = 'chat_user';
				u.id = 'clid_'+id;
				u.setAttribute("onClick", "alertUserWindow(this)");
				var i = document.createElement("input");
				i.name = "id";
				i.type = "hidden";
				i.value = id;
				var n = document.createElement("div");
				n.className = 'cu_name';
				n.innerHTML = '<span>'+name+'</span>';
				var p = document.createElement("div");
				p.className = 'cu_pic';
				p.innerHTML = '<img src="images/default_user_pic.png">';
				var o = document.createElement("div");
				o.className = 'cu_online';
				o.innerHTML = '<img src="images/green_light.png">';
				
				u.appendChild(i);
				u.appendChild(p);
				u.appendChild(n);
				u.appendChild(o);
				chat_List.appendChild(u);
			},
			
			popWin: function(id){
				id=id.split("_")[1];
				popWins[0].style.display="block";
				popWins[0].firstChild.firstChild.nodeValue=users[id].name;
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
	
	/*
	var username = getCookie('username');
	if(username != null){
		//console.log('my username='+username);
	}
	*/
}
function closeUserWindow(n){
	var e = n.parentNode.parentElement;
	document.getElementById(e.id).style.display="none";
}

// Usage:

var cb = ChatBox.getInstance();
cb.insertUser(1,"Ian","pic",true);
cb.insertUser(2,"Mary","pic",true);
cb.insertUser(3,"Alice","pic",true);

//var p = new P2PBox;