(function(module) {

  module.exports = function(request) {
    var baseUrl = '/api/notifications';
    var mostRecent = function(notifications) {
      var found = {timestamp: 0};
      for(var i = 0; i < notifications.length; i++) {
        var notification = notifications[i];
        if(notification.timestamp > found.timestamp) {
          found = notification;
        }
      }
      return found;
    }

    /*
     * The Notifications Consumer API
    */
    return function(token) {
      return {
        token: token,
        getLastN: function(n, success, error) {
          var url = baseUrl + '/last/' + n;
          request.get(url, this.token, function(response) {
            if(response.length > 0) {
              this.last = mostRecent(response);
            }
            if(success) {
              success(response);
            }
          }.bind(this), error);
        },
        create: function(usernames, payload, success, error) {
          var data = {
            usernames: usernames,
            payload: payload
          };
          request.post(baseUrl, this.token, data, success, error);
        },
        unread: function(success, error) {
          var url = baseUrl + '/unread';
          request.get(url, this.token, function(response) {
            if(response.length > 0) {
              this.last = mostRecent(response);
            }
            if(success) {
              success(response);
            }
          }.bind(this), error);
        },
        after: function(id, success, error) {
          var url = baseUrl + '/after/' + id;
          request.get(url, this.token, function(response) {
            if(response.length > 0) {
              this.last = mostRecent(response);
            }
            if(success) {
              success(response);
            }
          }.bind(this), error);
        },
        read: function(id, success, error) {
          var url = baseUrl + '/' + id + '/read'
          request.post(url, this.token, {}, success, error)
        },
        poll: function(seconds, success, error) {
          var interval = seconds * 1000;
          this.polling = setInterval(function() {
            if(this.last) {
              this.after(this.last.id, success, error);
            }
            else {
              this.unread(success, error);
            }
          }.bind(this), interval);
        },
        stopPolling: function() {
          clearInterval(this.polling);
        }
      };
    }

  };

}(module));
