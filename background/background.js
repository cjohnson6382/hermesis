//  API information
var HERMESIS_API = 'https://cjohnson.ignorelist.com:4343';

<<<<<<< 5e0c64f6fb51f1f131535a3f1a0b7db7adb6d91c
var requester = function () {
  return {
    contract_fields: function (request) {
      apiCaller.getFields(request.file, function (response) {
        return {fields: JSON.parse(response), template: chrome.extension.getURL('myTemplateFieldModifier.html')};
      });
    },
    getcontractnames: function (request) {
      apiCaller.apiCall('https://cjohnson.ignorelist.com:4343/listfiles', function (response) {
        return {files: response};
      });
    },
    auth: function (request) {
      var tabId;
      chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        tabId = tabs[0].id;
=======
var requester = {
  fetchcontracts: function (request) {
    $.ajax({
      url: HERMESIS_API + "/listfiles",
      method: "GET"
    })
      .done(function (resp) {
        return resp;
>>>>>>> moved code to server
      });
  },
  auth: function (request) {
    var tabId;
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      tabId = tabs[0].id;
    });
    
    $.ajax({
      url: HERMESIS_API + "/auth",
      method: "GET",
    })
      .done(function (resp) {
        var newTabId;
        chrome.tabs.create({url: resp.txt}, function (tab) {
          newTabId = tab.id;
          var intervalId = setInterval(function () {
            chrome.tabs.get(newTabId, function () {
              clearInterval(intervalId);
              chrome.tabs.update(tabId, {highlighted: true});
              return "authenticated";
            });
          }, 200);
        });
      });
  },
  fillintemplate: function (request) {
    $.ajax({
      url: HERMESIS_API + "/getfilledtemplate",
      method: "POST",
      data: { id: request.template, fields: request.userfields }
    })
      .done(function (resp) {
        return resp.responseText;
      });
  }
};

chrome.runtime.onMessage.addListener(function (request, sender, sendMessage) {
  sendMessage(requester[request.cmd](request));
  return true;
});