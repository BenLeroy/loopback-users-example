'use strict';

(function() {

  var app = angular.module('userList'
                          , ['lbServices'
                          , 'ui.router']);

  app.config(
      ['$stateProvider'
      , '$urlRouterProvider'
      , function ($stateProvider, $urlRouterProvider) {

        $stateProvider.state('list', {
          url: 'list'
          , templateUrl: 'views/list.html'
          //, controller: 'ListController'
        })
        .state('index', {
          url: '/'
          , template: '<h1>Index</h1><br/>'
        })
        .state('userEdit', {
          url: 'user/edit/:id'
          , templateUrl: 'views/edit.html'
        })
        // .state('user/del', {
        //   url: '/del/:id'
        //   , templateUrl: 'views/delete.html'
        // })
        ;
        $urlRouterProvider.otherwise('/');

      }]);


  app.controller('ListController'
    , function (Dena_User){

      var List = this;

      List.users = [];

      Dena_User.find().$promise.then(function(data){

        List.users = data;
      });
    });

  // app.controller('EditCtrl'
  //   , function (Dena_User, Id) {

  //     var Edit = this;

  //     Edit.id = Id;

  //     Dena_User.findById({id: Edit.id}, function (err, data){

  //       Dena_User.fName = data.firstname;
  //       Dena_User.lName = data.lastname;
  //       Dena_User.uName = data.username;
  //       Dena_User.uPass = data.password;



      //}).$promise.then(function(data){

      //Edit.user = data;
      // Dena_User.firstname = fName;
      // Dena_User.lastname = lName;
      // Dena_User.username = uName;
      // Dena_User.password = uPass;
      // Dena_user.$save();

    //   });

    // });

  // app.controller('DelCtrl'
  //   , function (Dena_User, Id) {

  //     var Del = this;

  //     Dena_User.findById({id: Id}).$promise.then(function(data){

  //       Del.user = data;

  //       Dena_User.deleteById({id: Id});

  //     });
  //   });

})();
