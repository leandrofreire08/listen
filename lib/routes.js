'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    dropbox = require('./controllers/dropbox'),
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.route('/api/awesomeThings')
    .get(api.awesomeThings);

  app.route('/api/dropbox/authorizationtoken')
    .get(dropbox.requestAuthorizationToken);

  app.route('/api/dropbox/accesstoken')
    .post(dropbox.requestAccessToken);
  
  app.route('/api/users')
    .post(users.create)
    .put(users.changePassword);
  app.route('/api/users/me')
    .get(users.me);
  app.route('/api/users/:id')
    .get(users.show);

  app.route('/api/session')
    .post(session.login)
    .delete(session.logout);

  // All undefined api routes should return a 404
  app.route('/api/*')
    .get(function(req, res) {
      res.send(404);
    });

  // All other routes to use Angular routing in app/scripts/app.js
  app.route('/partials/*')
    .get(index.partials);
  app.route('/*')
    .get( middleware.setUserCookie, index.index);

  // Redirect the user to Google for authentication.  When complete, Google
  // will redirect the user back to the application at
  //     /auth/google/return
  app.route('/auth/google').get(users.googleCallback);

  // Google will redirect the user to this URL after authentication.  Finish
  // the process by verifying the assertion.  If valid, the user will be
  // logged in.  Otherwise, authentication has failed.
  app.route('/auth/google/return').get(users.googleAuthenticate);
};