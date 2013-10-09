var ChatBox = (function () {
	var instance;

	function init() {

		// Private methods and variables
		function createChatBox(){
			var box = document.createElement("div");
			box.id = 'chat_Box';
			
			var bar = document.createElement("div");
			bar.id = 'chat_Bar';
			bar.innerHTML = "Chat";
			
			var list = document.createElement("div");
			list.id = 'chat_List';
			
			
			box.appendChild(bar);
			box.appendChild(list);
			document.body.appendChild(box);
		}

		function privateMethod(){
			console.log( "I am private" );
		}
		
		createChatBox();

		return {

			// Public methods and variables
			publicMethod: function () {
				console.log( "The public can see me!" );
			},

			publicProperty: "I am also public",

			insertUser: function(id,name,pic,online){
				var u = document.createElement("div");
				u.id = 'chat_user';
				var n = document.createElement("div");
				n.id = 'cu_name';
				n.innerHTML = '<span>'+name+'</span>';
				var p = document.createElement("div");
				p.id = 'cu_pic';
				p.innerHTML = '<img src="images/default_user_pic.png">';
				var o = document.createElement("div");
				o.id = 'cu_online';
				o.innerHTML = '<img src="images/green_light.png">';
				
				u.appendChild(p);
				u.appendChild(n);
				u.appendChild(o);
				chat_List.appendChild(u);
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


// Usage:

var cb = ChatBox.getInstance();
cb.insertUser(1,"Ian","pic",1);
cb.insertUser(2,"Mary","pic",1);
cb.insertUser(3,"Alice","pic",1);
//console.log(cb.publicMethod());

