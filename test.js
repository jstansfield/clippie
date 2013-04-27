var clickedEl = null;
var Clippie = {
	getParameters: function(url) {
		params = /#.*[?&]locale=([^&]+)(&|$)/;
		alert(params.exec(url))
	},
	mainMenu: function(){
	    chrome.contextMenus.onClicked.addListener(this.clickHandler);
		chrome.contextMenus.create({
		    "id" : "ClippieMain",
			"title" : "Clippie",
			"contexts" : ["link"]
			});
	},
	buildSubMenu: function(url){
	    chrome.contextMenus.removeAll()
		this.mainMenu()
		splitUp = parseUri(url);
		
		for(index in splitUp.queryKey) { 
		    var attr = splitUp.queryKey[index];
            if	(attr != '' || attr != null){
				chrome.contextMenus.create({
					"title" : index,
					"id" : attr,
					"parentId" : "ClippieMain",
					"contexts": ["link"],
					"onclick" : this.clickHandler
				});
			}
		}
	},
	clickHandler: function(e,tab){	 
	 	var copyDiv = document.createElement('div');
		copyDiv.contentEditable = true;
		document.body.appendChild(copyDiv);
		copyDiv.innerHTML = e.menuItemId;
		copyDiv.unselectable = "off";
		copyDiv.focus();
		document.execCommand('SelectAll');
		document.execCommand("Copy", false, null);
		document.body.removeChild(copyDiv);
	},
};

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "event"){
		Clippie.buildSubMenu(request.message);
	}
});
