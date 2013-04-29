document.addEventListener("mousedown", function(event){
	var element = event.target;
	var parentElements = new Array();
	var parentElements = $(element).parents("*")
	var menuSet = false
	if(event.button == 2){
		if(element.nodeName == "A"){
			chrome.runtime.sendMessage({type: "Link",message: element.href}, function(response) {});
			menuSet= true;
		}
		else{
			$(parentElements).each(function(index){
				if(this.nodeName == "A"){

					chrome.runtime.sendMessage({type: "Link",message: String(this.href)}, function(response) {});
					menuSet = true;
				}
				
				if(this.nodeName == "FORM"){
					var uri = buildUri(this);
					if(uri != null){
						chrome.runtime.sendMessage({type: "Form",message: uri}, function(response) {});
						menuSet = true;
					}
				}
			})
		}
		
		if( menuSet == false){
			chrome.runtime.sendMessage({type: "Page",message: document.URL}, function(response) {});
		}
	}
}, true);

function buildUri(element){
	var uriString = null;
	uriString = element.action;
	var mark = uriString.indexOf("?") == -1 ? "?" : "&";
	uriString += mark + "Form_method=" + element.method;
	$(element).find(':input').each(function (input){
		if(this.name != "" || this.name != null || this.name != undefined ){
			uriString += "&" + this.name + "=" + encodeURIComponent(this.value);
		}
	});

	return uriString;
}