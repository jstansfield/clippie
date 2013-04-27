var clickedEl = null;
var Clippie = {
	buildMenu: function(uri){
		chrome.contextMenus.removeAll()
		chrome.contextMenus.onClicked.addListener(this.itemClick);
		parsedUri = parseUri(uri);
		staticItems = { 
			"Domain" : parsedUri.host,
			"Path" :  parsedUri.directory,
			"Domain and path" :  parsedUri.host + parsedUri.directory
		}
		this.mainMenu();
		this.subMenus();
		this.domainItems(parsedUri);
		this.getItems(parsedUri);	
	},
	
	mainMenu: function(){
		chrome.contextMenus.create({
			"id" : "ClippieMain",
			"title" : "Clippie",
			"contexts" : ["link"]
			});
	},
	
	subMenus:function(){
		chrome.contextMenus.create({
			"title" : "Domain/path",
			"id" : "DomainVariables",
			"parentId" : "ClippieMain",
			"contexts": ["link"]
		});
		chrome.contextMenus.create({
			"title" : "GET Variables",
			"id" : "Get",
			"parentId" : "ClippieMain",
			"contexts": ["link"]
		});
	},
	
	domainItems:function(parsedUri){
		for(index in staticItems){
			chrome.contextMenus.create({
				"title" : index + " (" + staticItems[index] + ")",
				"parentId" : "DomainVariables",
				"id" : staticItems[index],
				"contexts": ["link"]
			});
		}
	},
	
	getItems: function(){
		for(index in parsedUri.queryKey) { 
			var attr = parsedUri.queryKey[index];
			if	(attr != '' || attr != null){
				chrome.contextMenus.create({
					"title" : index + " (" + attr + ")",
					"id" : attr,
					"parentId" : "Get",
					"contexts": ["link"],
				});
			}
		}
	},
	itemClick: function(e,tab){	
		Clippie.copyToClipboard(e.menuItemId)
	},
	copyToClipboard: function(text){	 
	 	var copyDiv = document.createElement('div');
		copyDiv.contentEditable = true;
		document.body.appendChild(copyDiv);
		copyDiv.innerHTML = text;
		copyDiv.unselectable = "off";
		copyDiv.focus();
		document.execCommand('SelectAll');
		document.execCommand("Copy", false, null);
		document.body.removeChild(copyDiv);
	}
};

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "event"){
		Clippie.buildMenu(request.message);
	}
});
