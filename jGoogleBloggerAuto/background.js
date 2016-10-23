function getDomainFromUrl(url){
     var host = "null";
     if(typeof url == "undefined" || null == url)
          url = window.location.href;
     var regex = /.*\:\/\/([^\/]*).*/;
     var match = url.match(regex);
     if(typeof match != "undefined" && null != match)
          host = match[1];
     return host;
}

function checkForValidUrl(tabId, changeInfo, tab) {
	var com_url = getDomainFromUrl(tab.url).toLowerCase();
    if(com_url == "plus.google.com" || com_url == "twitter.com" || com_url == "www.pinterest.com"  || com_url == "tiantianmeitu.blogspot.com"){
          chrome.pageAction.show(tabId);
    }
};

chrome.tabs.onUpdated.addListener(checkForValidUrl);

var sendData = {};
sendData.error = "进行中...";
chrome.runtime.onMessage.addListener(function(request, sender, sendRequest){
	if(request.type!=="google+")
		return;
	sendData = request;
});