
chrome.browserAction.onClicked.addListener(function(activeTab)
{
    var newURL = "www.google.com";
    chrome.tabs.create({ url: newURL });
    chrome.extension.getBackgroundPage().console.log(newURL);
    console.log(activeTab.id)
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json", true);
    xhr.onreadystatechange = function()
    {
      if (xhr.readyState == 4)
      {
    // WARNING! Might be injecting a malicious script!
    //document.getElementById("resp").innerHTML = xhr.responseText;
    console.log(xhr.responseText);

    //...
      }
    }
xhr.send();

    console.log("HTTP request")
    //closeTab();
}
);
