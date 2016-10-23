var options = {
	"googleClick": 0,
	"twitterClick": 0,
	"pinterestClick": 0
};
document.addEventListener('DOMContentLoaded', function () {
	chrome.storage.sync.get("jGoogleBloggerAuto", function(data) {
		$.extend(options, data);
		$("#content-google").html("&nbsp;"+options.googleClick);
		$("#content-twitter").html("&nbsp;"+options.twitterClick);
		$("#content-pinterest").html("&nbsp;"+options.pinterestClick);
	});
});

chrome.storage.onChanged.addListener(function(changes) {
	console.info(changes);
    for (var name in changes) {
        var change = changes[name];
		if(name == "googleClick"){
			$("#content-google").html("&nbsp;"+ parseInt(change.newValue) <= 0 ? change.oldValue : change.newValue);
		}else if(name == "twitterClick"){
			$("#content-twitter").html("&nbsp;"+ parseInt(change.newValue) <= 0 ? change.oldValue : change.newValue);
		}else if(name == "pinterestClick"){
			$("#content-pinterest").html("&nbsp;"+ parseInt(change.newValue) <= 0 ? change.oldValue : change.newValue);
		}
    }
});
