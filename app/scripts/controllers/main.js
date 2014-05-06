'use strict';

angular.module('listenApp')
  .controller('MainCtrl', function ($scope, $http, Dropbox, $rootScope) {

    $scope.testDropboxToken = function() {
    	Dropbox.authorizationToken();
    	$rootScope.$on('event:dropbox-authorization-token-success', function (event, data){
    		$scope.dropboxRequestToken = data;
    	});
    };

    $scope.accessToken = function() {
    	Dropbox.accessToken($scope.dropboxRequestToken);
    };

    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
  });
