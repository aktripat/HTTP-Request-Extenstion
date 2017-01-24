var { setInterval } = require("sdk/timers");
var Request = require("sdk/request").Request;
var tabs = require("sdk/tabs");
var windows = require("sdk/windows").browserWindows;
var urls = require("sdk/url");
var ui = require("sdk/ui");

var host = "http://127.0.0.1:5432";
var blanktab = "about:blank";
var newtab = "about:newtab";
var isFirst = true;

//TODO: When activity opens tab, the tab open event triggers a new create activity event, resulting in two activities for the same url

//Ignore
setInterval(function() {
	Request({
	  url: host + "/activities",
	  onComplete: function (response) {
			console.log("Response: " + JSON.stringify(response.json));
			console.log("Session ID: " + response.json.sessid);
			for(let act of response.json.Activities)
				openTab(urls.URL(act.url));
	  }
	}).get();
}, 5000)

//Ignore
var recbutton = ui.ToggleButton({
	id: "rec-button",
	label: "Record",
	icon: "./rec.png",
	onClick: function(state){
		if(state.checked) startRec();
		else stopRec();

		console.log("recording:" + state.checked);
	}
});

function startRec(){
	Request({
		url: host+ "/startrec",
		onComplete: function (response) {
			console.log("recording on");
		}
	}).get();
}

function stopRec(){
	Request({
		url: host+ "/stoprec",
		onComplete: function (response) {
			console.log("recording off");
		}
	}).get();
}

//Port this method to chrome
function openTab(url){
	var found = false
	if (isFirst){
		tabs[0].url = url;
		isFirst = false;
	}else{
		for(let tab of tabs){
			console.log(urls.URL(tab.url).href + ":" + url.href);
			if(urls.URL(tab.url).href == url.href) found = true;
		}
		if(!found) tabs.open(url.href);
	}
}

//Port this method to chrome
function closeTab(id, url){
	var json = '{"id":"' + id + '","url":"' + url + '"}';
	Request({
		url: host+ "/remove",
		//contentType: "application/json;charset=UTF-8",
		content: json, 
	  onComplete: function (response) {
			console.log("complete");
	  }
	}).post();
}

//Port this method to chrome
function createActivity(id, url){
	var json = '{"id":"' + id + '","url":"' + url + '"}';
	console.log(json);
	Request({
		url: host+ "/create",
		//contentType: "application/json;charset=UTF-8",
		content: json,
	  onComplete: function (response) {
			console.log(response.text);
	  }
	}).post();
}

//Port this method to chrome
function updateActivity(id, url){
	var json = '{"id":"' + id + '","url":"' + url + '"}';
	console.log(json);
	Request({
		url: host+ "/update",
		//contentType: "application/json;charset=UTF-8",
		content: json,
	  onComplete: function (response) {
			console.log(response.text);
	  }
	}).post();
}

//Port this method to chrome
tabs.on('close', function onClose(tab){
	console.log("close tab: " + tab.url);
	closeTab(tab.id, tab.url);
});

//Port this method to chrome
tabs.on('open', function onOpen(tab){
	console.log("loaded tab: " + tab.title);// + ":" tab.url);
	//if new or blank ignore, only send if opened from bookmark
	
	if(tab.url == blanktab || tab.url == newtab) return;

	createActivity(tab.id, tab.url);
});

//Port this method to chrome
tabs.on('ready', function onReady(tab){
	updateActivity(tab.id, tab.url);
});

//Port this method to chrome
// add a listener to the 'close' event
windows.on('close', function(window) {
  console.log("A window was closed.");
});
//Port this method to chrome
// add a listener to the 'open' event
windows.on('open', function(window) {
  myOpenWindows.push(window);
  console.log("A window has been opened.");
});


//Port this method to chrome
// add a listener to the 'activate' event
windows.on('activate', function(window) {
  console.log("A window was activated.");
});

//Port this method to chrome
// add a listener to the 'deactivate' event
windows.on('deactivate', function(window) {
  console.log("A window was deactivated.");
});
/*
*/
