'use strict';
process.env.NODE_ENV = 'test';

var app = require('../server/server.js');
var Browser = require('zombie');

function showMeUrl (browser) {
  console.log('Visitor is here: ' + browser.url);
}

function displayList (browser) {

  browser.assert.text('h1', 'Gestion des utilisateurs');
  browser.assert.elements('table tr', {atLeast: 4});
  showMeUrl(browser);
}

describe('Visitor comes to homepage', function() {

  before(function (done) {
    this.server = app.listen(3001);
    this.browser = new Browser({site: 'http://localhost:3001/'});
    this.browser.visit('/#/', done);
    showMeUrl(this.browser);
  });

  it('should display homepage', function (){
    this.browser.assert.success();
    this.browser.assert.text('h1', 'Index');
    this.browser.assert.attribute('div ul li.navimenu a', 'ui-sref', 'list');
  });


  describe('He navigates to user list page', function () {

    before(function (done) {
      this.browser.clickLink('div ul li.navimenu a[ui-sref="list"]', done);
    });

    it('should show a user list', function () {
      displayList(this.browser);
    });

    it('should show an add user button', function () {
      this.browser.assert.text('b', 'Ajouter un utilisateur...');
      this.browser.assert.attribute('a.btn-info', 'ui-sref', 'userNew');
    });

    it('should show an edition button for each user', function () {
      this.browser.assert.attribute(
        'table tr td a.btn-warning'
        , 'ui-sref'
        , 'userEdit({id: user.id})'
      );
    });

    it('should show an delete button for each user', function () {
      this.browser.assert.attribute(
        'table tr td a.btn-danger'
        , 'ui-sref'
        , 'userDel({id: user.id})'
      );
    });
  });

  describe('He wants to add a new user', function () {

    before(function (done) {
      this.browser.clickLink('a.btn-info[ui-sref="userNew"]', done);
    });

    it('should display a form to add a new user', function () {
      showMeUrl(this.browser);
      this.browser.assert.text('h1', 'Ajouter un utilisateur');
      this.browser.assert.attribute('div.fa', 'ng-form', 'formAdd');
      this.browser.assert.elements('div input.form-control', 4);
    });

    it('should display submit & cancel buttons at end of form', function () {
      this.browser.assert.elements('div.fa a.decal', 1);
      this.browser.assert.elements('div.fa a.btn-danger', 1);
    });

    it('should fill and submit the form', function (done) {
      this.browser.fill('[ng-model="user.firstname"]', 'Benjamin')
                  .fill('[ng-model="user.lastname"]', 'Leroy')
                  .fill('[ng-model="user.username"]', 'Bender')
                  .fill('[ng-model="user.password"]', 'camelus');
      this.browser.clickLink('a.btn-success', done);
    });

    it('should be back at list page and added a new user', function () {
      displayList(this.browser);
      this.browser.assert.elements('table tr', {atLeast: 5});
    });
  });

  describe('He wants to add another user & cancels before submit', function () {

    before(function (done) {
      this.browser.clickLink(
        'a.btn-info[ui-sref="userNew"]'
        , done
        );
    });

    it('should come back to list on cancel button click', function (done) {
      showMeUrl(this.browser);
      this.browser.clickLink('a.btn-danger', done);
    });

    after(function () {
      showMeUrl(this.browser);
    });
  });

  describe('He wants to edit informations for one user', function () {

    before(function (done) {
      this.browser.clickLink(
        'table tr td a.btn-warning[ui-sref="userEdit({id: user.id})"]'
        , done
        );
    });

    it('should display a form to edit user informations', function () {
      showMeUrl(this.browser);
      this.browser.assert.text(
        'h1', 'Modifier les informations de l\'utilisateur'
      );
      this.browser.assert.attribute(
        'div.fm', 'ng-form', 'formMod'
      );
      this.browser.assert.elements(
        'div input.form-control'
        , 4
      );
    });

    it('should display submit & cancel buttons at end of form', function () {
      this.browser.assert.elements('div.fm a.decal', 1);
      this.browser.assert.elements('div.fm a.btn-danger', 1);
    });

    it('should authorize modification of inputs', function (done) {
      this
        .browser
          .fill('[ng-model="Edit.user.firstname"]', 'Isa')
          .fill('[ng-model="Edit.user.lastname"]', 'Belle')
          .fill('[ng-model="Edit.user.username"]', 'Yeux')
          .fill('[ng-model="Edit.user.password"]', 'Bleus')
      ;
      this.browser.clickLink('a.btn-success', done);
    });

    it('should be back at list and altered first record', function () {
      displayList(this.browser);
      this.browser.assert.text(
        'table tr:nth-child(2) td:nth-child(2)'
        , 'Isa'
      );
      this.browser.assert.text(
        'table tr:nth-child(2) td:nth-child(3)'
        , 'Belle'
      );
      this.browser.assert.text(
        'table tr:nth-child(2) td:nth-child(4)'
        , 'Yeux'
      );
    });
  });

  after(function (done) {
    this.server.close(done);
  });
});

// retour à la liste

    /*after(function (done){
      this.browser.clickLink('div ul li.navimenu a[ui-sref="list"]', done);
    });*/
