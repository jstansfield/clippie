var Clippie = {
	getUrl: function() {
		chrome.tabs.query({
		  active: true,
		  windowId: chrome.windows.WINDOW_ID_CURRENT
		  },function(tabs){
			var tab = tabs[0];
			Clippie.getParameters(tab.url)
		});
	},
	getParameters: function(url) {
		params = /#.*[?&]locale=([^&]+)(&|$)/;
		alert(params.exec(url))
	},
	test:function() {
		return "hello"
	}
};

 Clippie.getUrl();
