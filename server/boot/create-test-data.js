'use strict';

var server = require('../server');
var dataSource = server.dataSources.db;
var Account = server.models.Dena_User;
var accounts = [
  {
    "firstname": "Aaaaaaa"
    , "lastname": "Aaaaaaa"
    , "username": "Aaaaaaa"
    , "password": "Aaaaaaa"
    , "id": 1
  }
 , {
    "firstname": "Bbbbb"
    , "lastname": "Bbbbb"
    , "username": "Bbbbb"
    , "password": "Bbbbb"
    , "id": 2
  }
  , {
    "firstname": "Ccccc"
    , "lastname": "Ccccc"
    , "username": "Ccccc"
    , "password": "Ccccc"
    , "id": 3
  }
];

var count = accounts.length;
dataSource.automigrate('Dena_User', function(er) {
  if (er) {throw er; }
  accounts.forEach(function(account) {
    Account.create(account, function (err, result) {
      if (err) {return; }
      console.log('Record created:', result);
      count--;
      if(count === 0) {
        console.log('done');
        dataSource.disconnect();
      }
    });
  });
});
