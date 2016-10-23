var timer = null;
var timer_update = null;
var finish = true;
var finish_index = 0;
var options = {
	"googleClick": 0,
	"twitterClick": 0,
	"pinterestClick": 0
};
/*检测域名*/
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
/*google+点赞*/
function googleClick(){
	finish = false;
	var listCount = $("content div[role=list] c-wiz[role=listitem] div[role=button][aria-pressed=false]").length;
	if(listCount <=0){
		finish = true;
		return;
	}
	$("content div[role=list] c-wiz[role=listitem] div[role=button][aria-pressed=false]").eq(Math.floor(Math.random()*(listCount-1)+1)).trigger("click");
	chrome.storage.sync.get("jGoogleBloggerAuto", function(data) {
		$.extend(options, data);
		options.googleClick = parseInt(options.googleClick != undefined ? options.googleClick : 0) + 1;
		chrome.storage.sync.set(options);
	});
	/*$("content div[role=list] c-wiz[role=listitem]").each(function(){
		$(this).find("div[role=button][aria-pressed=false]").trigger("click");
	});*/
}
/*google+加入*/
function googleJoin(){
	$("button[role=button] content span").each(function(){
		if($(this).html() == "加入"){
			$(this).parent().parent().trigger("click");
		}
	});
}
/*twitter点赞*/
function twitterClick(){
	//$(".stream ol.stream-items li.stream-item .stream-item-footer button.js-actionFavorite").trigger("click");
}
/*twitter关注*/
function twitterFollow(){
	var listCount = $("#page-container .content button.follow-button").length;
	if(listCount <=0){
		return;
	}
	$("#page-container .content button.follow-button").eq(Math.floor(Math.random()*(listCount-1)+1)).trigger("click");
}
/*pinterest点赞*/
function pinterestClick(){
	finish = false;
	var likes = Array();
	$(".HomePage .AuthHomePage .Grid .GridItems .item").each(function(){
		if($(this).find(".pinImageActionButtonWrapper .rightSideButtonsWrapper button.LikeButton .accessibilityText").html() == "Like"){
			likes.push($(this));
		}
	});
	if(likes.length <= 0){
		finish = true;
		return;
	}
	var index = Math.floor(Math.random()*(likes.length-1)+1);
	if(likes[index] == undefined){
		finish = true;
		return;
	}
	likes[index].find(".pinImageActionButtonWrapper .rightSideButtonsWrapper button.LikeButton").trigger("click");
	chrome.storage.sync.get("jGoogleBloggerAuto", function(data) {
		$.extend(options, data);
		options.pinterestClick = parseInt(options.pinterestClick != undefined ? options.pinterestClick : 0) + 1;
		chrome.storage.sync.set(options);
	});
}
/*blogger*/
function bloggerClick(){
	finish = false;
	
}
/*开启定时器*/
function start(){
	timer = setInterval("run()",10000);
}
/*关闭定时器*/
function stop(){
	clearInterval(timer);
}
/*执行任务*/
function run(){
	var comp_url = getDomainFromUrl(document.URL).toLowerCase();
	if(comp_url == "plus.google.com"){
		googleClick();
		googleJoin();
	}else if(comp_url == "twitter.com"){
		//twitterClick();
		twitterFollow();
	}else if(comp_url == "www.pinterest.com"){
		pinterestClick();
	}else if(comp_url == "tiantianmeitu.blogspot.com"){
		
	}
}
/*开启刷新页面定时器*/
function startRefresh(){
	timer_update = setInterval("refresh()",60000);
}
/*关闭刷新页面定时器*/
function stopRefresh(){
	clearInterval(timer_update);
}
/*刷新页面*/
function refresh(){
	if(finish){
		finish_index = 0;
		var comp_url = getDomainFromUrl(document.URL).toLowerCase();
		if(comp_url == "plus.google.com"){
			if($("div[role=banner] div[role=heading] div").eq(0).length>0){
				$("div[role=banner] div[role=heading] div").eq(0).trigger("click");
			}else{
				location.reload();
			}
		}else if(comp_url == "twitter.com"){
			location.reload();
		}else if(comp_url == "www.pinterest.com"){
			location.reload();
		}else if(comp_url == "tiantianmeitu.blogspot.com"){
			//location.reload();
		}
		start();
		finish = false;
	}else{
		finish_index++;
		if(finish_index >= 3){
			finish = true;
			stop();
		}
	}
}

start();
startRefresh();