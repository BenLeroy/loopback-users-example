process.env.NODE_ENV = 'test';

var app = require('../server/server.js');
var Browser = require('zombie');
var assert = require('assert');

function displayList (browser) {
  
  browser.assert.text('h1', 'Gestion des utilisateurs');
  browser.assert.elements('table tr td', {atLeast: 3});
  showMeUrl(browser);
};

function showMeUrl (browser) {
  console.log('Visitor is here: ' + browser.url);
};

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
      this.browser.assert.attribute('a.btn-info','ui-sref', 'userNew');      
    });

    it('should show an edition button for each user', function () {
      this.browser.assert.attribute('table tr td a.btn-warning', 'ui-sref', 'userEdit({id: user.id})');
    });

    it('should show an delete button for each user',function () {
      this.browser.assert.attribute('table tr td a.btn-danger', 'ui-sref', 'userDel({id: user.id})');
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

    it('should display 2 buttons at end of form (submit & cancel)', function () {
      this.browser.assert.elements('div.fa a.decal', 1);
      this.browser.assert.elements('div.fa a.btn-danger', 1);
    });

    // retour à la liste

    after(function (done){
      this.browser.clickLink('div ul li.navimenu a[ui-sref="list"]', done);
    });

  });

  describe('He wants to edit informations for one user', function  () {
    
    before(function (done) {
      this.browser.clickLink('table tr td a.btn-warning[ui-sref="userEdit({id: user.id})"]', done);
    });

    it('should display a form to edit user informations', function () {
      showMeUrl(this.browser);
      this.browser.assert.text('h1', 'Modifier les informations de l\'utilisateur');
      this.browser.assert.attribute('div.fm', 'ng-form', 'formMod');
      this.browser.assert.elements('div input.form-control', 4);
    });

    it('should display 2 buttons at end of form (submit & cancel)', function () {
      this.browser.assert.elements('div.fm a.decal', 1);
      this.browser.assert.elements('div.fm a.btn-danger', 1);
    });

  });



  after(function (done) {
    this.server.close(done);
  });
});
