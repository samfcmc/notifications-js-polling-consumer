'use strict';

/*
 * Notifications JS Consumer
 */

(function(require, module) {
  var request = require('./request');

  window.Notifications = require('./notifications')(request);

}(require, module));
