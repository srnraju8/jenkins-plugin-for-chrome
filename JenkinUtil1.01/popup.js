console.log("Looking for Buil No..");
var valid_url = false;
chrome.tabs.getSelected(null,function(tab) {
          tablink = tab.url;
          if (tablink.includes("/consoleText")){
                valid_url=true
                constructAndDownloadFile(tablink);

          }
          //Making sure this is a jenkin Page and it has a Valid Build No
          //                          â†“                              â†“
          if (tab.title.includes("[Jenkins]") && tab.title.includes(" #")) {
            if (tablink.includes("/console"))//Basic check to construct the bill Url
                tablink += "Text";
            else 
              tablink += "consoleText";

            constructAndDownloadFile(tablink);
            valid_url=true;

          } else if(!valid_url){
            window.document.body.innerHTML += "<center><b>Sorry,This page is not having a Jenkins build to download</b></center>";
            window.document.body.innerHTML +="<img src = 'jenkins.gif'>"
          }
        });

function constructAndDownloadFile(tablink){
      fileName = tablink.substring(tablink.lastIndexOf("/job/") + 5, tablink.lastIndexOf("/"));//Constructing a filename based on jobs 
            console.log(fileName);
            window.document.body.innerHTML += "<b>A Download request is submitted to the Chrome Engine, and will be downloaded to ($Default Download Directry)/_Logs/"
                + fileName + "</b>";
            window.document.body.innerHTML +="<img src = 'download.png'>"

            fileName = "./_Logs/" + fileName;
            downloadFile(tablink,fileName);
}

function downloadFile(Filelink,fileNameToBeDownloadedas){
  chrome.downloads.download({
    url : Filelink,
    filename : fileNameToBeDownloadedas
  });
}
