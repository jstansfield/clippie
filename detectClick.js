document.addEventListener("mousedown", function(event){
    var href = event.target;
    if(event.button == 2 && href.nodeName == "A" ) { 
		chrome.runtime.sendMessage({greeting: "event",message: String(href)}, function(response) {});
    }
}, true);
