'use strict';

(function() {

  var app = angular.module('userList', ['lbServices']);


  app.controller('ListController', function (Dena_User){
    var List = this;

    List.users = [];

    Dena_User.find().$promise.then(function(data){

      console.log(data);
      List.users = data;
    });
  });
})();
