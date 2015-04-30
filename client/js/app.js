'use strict';

(function() {

  var app = angular.module('userList', ['lbServices', 'ui.router']);


  app.controller('ListController', function (Dena_User){
    var List = this;

    List.users = [];

    Dena_User.find().$promise.then(function(data){

      //console.log(data);
      List.users = data;
    });

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
      $stateProvider.state('liste', {
        url: '',
        templateUrl: 'views/liste.html',
        //controller: 'ListController'
      });
       $urlRouterProvider.otherwise('liste');
    }]);
  });
})();
