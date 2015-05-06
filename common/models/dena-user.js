module.exports = function(DenaUser) {

};

// var db = require("../data-sample/db.js")('In-memory');
// var config = require("./dena_user.json");
// var loopback = require('loopback');

// /**
//  * customer Model
//  */

// var dena_user = module.exports = loopback.User.extend(
//   'Dena_users',
//   config.properties,
//   config.options
// );

// // attach to the db
// dena_user.attachTo(db);

// // TODO - this should be available as `hideRemotely: true`
// dena_user.beforeRemote('find', function (ctx, inst, next) {
//   var args = ctx.args;
//   var filter = args.filter || (args.filter = {});
//   var fields = filter.fields || (filter.fields = {});

//   // always hide password
//   fields.password = false;

//   next();
// });