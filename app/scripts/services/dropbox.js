'use strict';

angular.module('listenApp').factory('Dropbox', function ($resource, $http, $rootScope) {

  var service = {

	  /**
	   * Request Dropbox Auth Token            
	   */
	  authorizationToken: function() {
	  	return $http.get('/api/dropbox/authorizationtoken').then(function (response) { // Success
     		$rootScope.$emit('event:dropbox-authorization-token-success', response.data);
      },
      function (response) { // Error
      	$rootScope.$emit('event:dropbox-authorization-token-error', response);
      });
	  },
	  accessToken: function (request_token) {	
			return $http.post('/api/dropbox/accesstoken',JSON.stringify(request_token)).then(function (response) { // Success
     		$rootScope.$emit('event:dropbox-access-token-success', response.data);
      },
      function (response) { // Error
      	$rootScope.$emit('event:dropbox-access-token-error', response);
      });
	  }
  }

  return service;
});
