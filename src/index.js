'use strict';

/*
 * Notifications JS Consumer
 */

(function(require, module) {
  var request = require('./request');

  var Notifications = require('./notifications')(request);

  if(window) {
    window.Notifications = Notifications;
  }
  if(module && module.exports) {
    module.exports = Notifications;
  }

}(require, module));
