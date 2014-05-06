'use strict';

angular.module('listenApp').factory('Session', function ($resource) {
  return $resource('/api/session/');
});

angular.module('listenApp').factory('Google', function ($resource) {
  return $resource('/auth/google/');
});
