var Clippie = {
	getUrl: function() {
		chrome.tabs.query({
		  active: true,
		  windowId: chrome.windows.WINDOW_ID_CURRENT
		  },function(tabs){
			var tab = tabs[0];
			document.body.innerHTML = tab.url
		});
	},
	getParameters: function(url) {
		params = /#.*[?&]locale=([^&]+)(&|$)/;
		alert(params.exec(url))
	},
	menu: function(){
	    chrome.contextMenus.onClicked.addListener(clickHandler);
		var menuNames = new Array();
		menuNames = ["Object1","Object2"];
		var length = menuNames.length;
		chrome.contextMenus.create({
		    "id" : "ClippieMain",
			"title" : "Clippie",
			"contexts" : ["link"]
			});
		

		chrome.contextMenus.create({
			"title" : "object1",
			"id" : "sub0",
			"parentId" : "ClippieMain",
			"contexts": ["link"],
			"onclick" : clickHandler
		});
		
		function clickHandler(e,tab){
		  chrome.tabs.create({"url" : "http://mypetshark.com" });
		}
	}
};
 Clippie.menu();
