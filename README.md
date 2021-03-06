# notifications-js-polling-consumer
A consumer for the [notifications](https://github.com/samfcmc/bennu-notifications) service that uses polling

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Requirements](#requirements)
- [Installation](#installation)
  - [Use the development version](#use-the-development-version)
- [Usage](#usage)
- [Development](#development)
  - [Requirements](#requirements-1)
  - [Compile](#compile)
  - [Compile for production](#compile-for-production)
  - [Create a new release](#create-a-new-release)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Requirements
* Bower

## Installation
If you are using Bower to manage all the frontend dependencies in your project you can use it to install this library:
```shell
bower install notifications-js-polling-consumer --save
```

### Use the development version
If you want to use the version available in the `master` branch you can use `bower link`.
* In this project's root:
```shell
bower link
```

* In the project where you are using this lib run the following:
```shell
bower link notifications-js-polling-consumer
```

* That's it, you are using the development version of this library

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
