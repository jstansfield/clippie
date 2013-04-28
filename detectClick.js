document.addEventListener("mousedown", function(event){
	var element = event.target;
	var parentElements = new Array();
	var parentElements = $(element).parents("*")
	var menuSet = false
	if(event.button == 2){
		if(element.nodeName == "A"){
			chrome.runtime.sendMessage({type: "link",message: element.href}, function(response) {});
			menuSet= true;
		}
		else if(element.nodeName == "BUTTON" || (element.nodeName == "INPUT" && element.type == "submit")){
			var uri = buildUri(parentElements);
			if(uri != null){
				chrome.runtime.sendMessage({type: "form",message: uri}, function(response) {});
				menuSet = true;
			}
		}
		else{
			$(parentElements).each(function(index){
				if(parentElements[index].nodeName == "A"){
					chrome.runtime.sendMessage({type: "link",message: String(parentElements[index].href)}, function(response) {});
					menuSet = true;
				}
			})
			
		}
		
		if( menuSet == false){
			chrome.runtime.sendMessage({type: "page",message: document.URL}, function(response) {});
		}
	}
}, true);

function buildUri(parentElements){
	var uriString = null;
	$(parentElements).each(function(){
		if(this.nodeName == "FORM"){
			uriString = this.action;
			var mark = uriString.indexOf("?") == -1 ? "?" : "&";
			uriString += mark + "Form method=" + this.method;
			$(this).find(':input').each(function (input){
				if(this.name != "" || this.name != null || this.name != undefined ){
					uriString += "&" + this.name + "=" + encodeURIComponent(this.value);
				}
			});
		}
	})
	return uriString;
}