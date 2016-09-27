var App = {};
(function (_App) {
  'use strict';
  function fetchContent(contentId, actionCallback, errorCallback) {
    // Get IE9+ compatible request object
    var request = new XMLHttpRequest();
    // Assuming very simple name for the content
    request.open('GET', '/responsive-accordion/challenge2/content/content-' + contentId + '.html', true);
    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var resp = request.responseText;
        actionCallback(resp);
      } else {
        // We reached our target server, but it returned an error
        errorCallback(resp)
      }
    };

    request.onerror = function (error) {
      errorCallback(error)
    };

    request.send();
  }

  _App.ContentFetcher = {
    fetchContent: fetchContent
  }

})(App);