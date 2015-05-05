'use strict';

(function() {

  var app = angular.module('userList'
                          , ['lbServices'
                          , 'ui.router']);

  app.config(
      ['$stateProvider'
      , '$urlRouterProvider'
      , function ($stateProvider, $urlRouterProvider) {

        $stateProvider.state('index', {
          url: '/'
          , template: '<h1>Index</h1><br/>'
        })
        .state('list', {
          url: '/list'
          , templateUrl: 'views/list.html'
          , controller: 'ListCtrl'
        })
        .state('userEdit', {
          url: '/user/edit/:id'
          , templateUrl: 'views/edit.html'
          , controller: 'EditCtrl'
        })
        .state('userDel', {
          url: '/user/del/:id'
          , templateUrl: 'views/delete.html'
          , controller: 'DelCtrl'
        })
        .state('userNew', {
          url: '/user/add'
          , templateUrl: 'views/add.html'
          , controller: 'AddCtrl'
        })
        ;
        $urlRouterProvider.otherwise('/');

      }]);


  app.controller('ListCtrl'
    , function (Dena_User){

      var List = this;

      List.users = [];

      Dena_User.find().$promise.then(function (data){

        List.users = data;
      });
    });

  app.controller('EditCtrl'
    , function (Dena_User, $stateParams, $scope) {

      var Edit = this;

      Dena_User.findById({id: $stateParams.id}
        , function (data) {

        Edit.user = data;

      });

      $scope.SaveMod = function () {

        //todo: gérer le chgmt de password
        Edit.user.$save();
      };

    });

  app.controller('DelCtrl'
    , function (Dena_User, $stateParams, $scope) {

      var Del = this;

      Dena_User.findById({id: $stateParams.id}
        , function (data) {

        Del.user = data;

       });

      $scope.deleteUser = function () {

        console.log(Del.user);

        Del.user.$delete();
      };
    });

  app.controller('AddCtrl'
    , function (Dena_User, $scope, $location) {

      $scope.NewUser = function(){

        Dena_User.create($scope.user, function () {
          $location.path('/list');
        });
      };
    });
})();
