# notifications-js-pooling-consumer
A consumer for the [notifications](https://github.com/samfcmc/bennu-notifications) service that uses pooling

## Requirements
* Bower

## Installation
If you are using Bower to manage all the frontend dependencies in your project you can use it to install this library:
```shell
bower install notifications-js-pooling-consumer --save
```

## Usage
* Get a token from the notifications service (TODO)
* Include the library and create an instance of the consumer:
```javascript
var notifications = new Notifications(token);
```
Now you can start use several methods to handle notifications of a particular user

* Get last N notifications, where is N the limit of notifications you get.

```javascript
notifications.getLastN(N, function(response) {
  // 'response' contains an array of notifications objects
}, function(error) {
  // Handle error
});
```

* Get all unread notifications

```javascript
notifications.unread(function(response) {
  // 'response' contains an array of unread notifications
}, function(error) {
  // Handle error
});
```

* Get all notifications that were created after a given one

```javascript
notifications.after(id, function(response) {
  /* 'response' contains an array of all notifications
   * that happened after the one with id 'id'
   */
}, function(error) {
  // Handle error
});
```

* Read a given notification

```javascript
notifications.read(id, function(response) {
  // Notification was successfully marked as read
}, function(error) {
  // Handle error
});
```

* Get all new notifications from time to time.
This is pooling to give the illusion of a real time application.

```javascript
notifications.poll(seconds, function(response) {
  // 'response' contains an array of new notifications
  // This callback is invoked at each 'seconds' interval
}, function(error) {
  // Handle error
});
```

To stop polling you can do the following:
```javascript
notifications.stopPolling();
```

## Development
### Requirements
* NodeJS
* NPM
* Bower
* Grunt CLI

### Compile
First, clone this repo to have access to the library's source code.

Then, install all the dependencies using NPM:
```shell
npm install
```

Use Grunt to generate the bundle file
```shell
grunt
```

The generated file is available at `build/notifications.js`.

### Compile for production
To create the files to be included in the production environment you can use Grunt:
```shell
grunt dist
```

The generated file is available at `dist/notifications.js`

### Create a new release
You can also use Grunt to create a new release. It will generate the production ready file, increment the version number in both `bower.json` and `package.json` files, create a new tag in the repository and push all the changes.
```shell
grunt release
```
