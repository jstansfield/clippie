document.addEventListener("mousedown", function(event){
	var element = event.target;
	var parentElements = new Array();
	var parentElements = $(element).parents("*")
	if(event.button == 2){
	//debugger
		if(element.nodeName == "A"){
			chrome.runtime.sendMessage({greeting: "event",message: element.href}, function(response) {});
		}
		else{
			$(parentElements).each(function(index){
				if(parentElements[index].nodeName == "A"){
					chrome.runtime.sendMessage({greeting: "event",message: String(parentElements[index].href)}, function(response) {});
				}
			})
		}
	}
}, true);
