'use strict';

/*
 * Utility to make requests to the REST API
 */

(function(module) {

  function request(url, method, token, data, success, error) {
    var dataRequest = null;
    var finalUrl = url + '?token=' + token;
    if(method != 'GET') {
      dataRequest = JSON.stringify(data);
    }
    var request = new XMLHttpRequest();
    request.onload = function () {
      if(success) {
        success(JSON.parse(request.responseText));
      }
    }
    request.onerror = function() {
      if(error) {
        error(request.responseText);
      }
    }
    request.open(method, finalUrl, true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(dataRequest);
  }

  module.exports = {
    get: function(url, token, success, error) {
      request(url, 'GET', token, {}, success, error);
    },
    post: function(url, token, data, success, error) {
      request(url, 'POST', token, data, success, error);
    }
  };

}(module));
