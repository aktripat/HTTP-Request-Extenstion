
//chrome.browserAction.onClicked.addListener(function(activeTab)
//{
    // var newURL = "https://www.google.com/maps";
    // chrome.tabs.create({ url: newURL });
    //chrome.extension.getBackgroundPage().console.log(newURL);
    // console.log(activeTab.id)
    // var xhr = new XMLHttpRequest();
    // xhr.open("GET", "https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json", true);
    // xhr.onreadystatechange = function()
    // {
    //   if (xhr.readyState == 4)
    //   {
    // // WARNING! Might be injecting a malicious script!
    // //document.getElementById("resp").innerHTML = xhr.responseText;
    // console.log(xhr.responseText);

    // 2/2/2017 Detection of new tabs
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab)
  {
       //chrome.extension.getBackgroundPage().console.log(tab.url);
    //insertDictionaryScript();
    console.log("TABID",tabId);;
    console.log(tab.url);
    //console.log("Change Info",changeInfo);
    //console.log("TabInfo",tab);
    console.log("New URL Opened",tab.url);
  }
  );


chrome.tabs.onCreated.addListener(function(tab) {
   //insertDictionaryScript();
   //console.log(tab);
   console.log("NEW TAB OPENED");
});

chrome.tabs.onMoved.addListener(function (tabId, moveInfo)
{
  console.log(tabId,"is Moved");
})

chrome.tabs.onHighlighted.addListener(function ( highlightInfo, tabIds,windowId)
{
  // //var a;
  // // for( var a = 0 ; a<tabIds.length;a++);
  // // {
  // //   console.log("tabId",tabIds[a]);
  //
  // }
  console.log(tabIds);

  console.log("tab highlighted from window",windowId)

})

chrome.tabs.onDetached.addListener(function (tabId, detachInfo)
{
  console.log("Tab detached",detachInfo);
})

chrome.tabs.onAttached.addListener(function (tabId, attachInfo)

{
  console.log("Tab attached",attachInfo);
})

chrome.tabs.onRemoved.addListener(function ( tabId,  removeInfo)
{
  console.log("Tab Removed",tabId);
})

chrome.tabs.onZoomChange.addListener(function( ZoomChangeInfo)
{
  console.log(ZoomChangeInfo);
})


//}

//     //...
//       }
//     }
// xhr.send();
//
//     console.log("HTTP request")
//     //closeTab();
// }
// );
