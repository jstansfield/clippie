var contexts = ["link","page"]
var Clippie = {
	buildMenu: function(uri){
		chrome.contextMenus.removeAll()
		//chrome.contextMenus.onClicked.addListener(this.itemClick);
		parsedUri = parseUri(uri);
		staticItems = { 
			"Domain" : parsedUri.host,
			"Path" :  parsedUri.directory,
			"File" : parsedUri.file,
			"Full path" : parsedUri.path,
			"All" :  parsedUri.host + parsedUri.directory + parsedUri.file
		}
		this.mainMenu();
		this.subMenus();
		this.domainItems(parsedUri,staticItems);
		this.getItems(parsedUri);	
	},
	
	mainMenu: function(){
		chrome.contextMenus.create({
			"id" : "ClippieMain",
			"title" : "Clippie",
			"contexts" : contexts
			});
	},
	
	subMenus:function(){
		chrome.contextMenus.create({
			"title" : "Domain/path",
			"id" : "DomainVariables",
			"parentId" : "ClippieMain",
			"contexts": contexts
		});
		chrome.contextMenus.create({
			"title" : "GET/POST Variables",
			"id" : "Get",
			"parentId" : "ClippieMain",
			"contexts": contexts
		});
	},
	
	domainItems:function(parsedUri,staticItems){
		for(index in staticItems){
			if(staticItems[index] != ""){
				chrome.contextMenus.create({
					"title" : index + " : " + staticItems[index],
					"id" : index,
					"parentId" : "DomainVariables",
					"contexts": contexts,
					'onclick': function(info, tab) {
						Clippie.itemClick(info, tab, staticItems);
					}
				});
			}
		}
	},
	
	getItems: function(parsedUri){
		for(index in parsedUri.queryKey) { 
			if	(parsedUri.queryKey[index] != '' || parsedUri.queryKey[index] != null){
				chrome.contextMenus.create({
					"title" : index + " : " + parsedUri.queryKey[index],
					"id" : index,
					"parentId" : "Get",
					"contexts": contexts,
					'onclick': function(info, tab) {
						Clippie.itemClick(info, tab, parsedUri.queryKey);
					}
				});
			}
		}
	},
	itemClick: function(e,tab,object){	
		Clippie.copyToClipboard(object[e.menuItemId])
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
    if (request.type == "link" || request.type == "page" || request.type == "form"){
		Clippie.buildMenu(request.message);
	}
});
