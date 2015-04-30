'use strict';

(function() {

  var app = angular.module('userList'
                          , ['lbServices'
                          , 'ui.router']);

  app.config(
      ['$stateProvider'
      , '$urlRouterProvider'
      , function ($stateProvider, $urlRouterProvider) {

        $stateProvider.state('liste', {
          url: 'liste'
          , templateUrl: 'views/liste.html'
          //, controller: 'ListController'
        })
        .state('index', {
          url: ''
          , template: '<h1>Index</h1><br/>'
        });
        $urlRouterProvider.otherwise('index');

      }]);


  app.controller('ListController'
    , function (Dena_User){

      var List = this;

      List.users = [];

      Dena_User.find().$promise.then(function(data){

        List.users = data;
      });
    });

})();
