
var should = require('should');
var mimelib = require('mimelib');
var config = require('./config.js');

// for send() tests
config.test = {
  subject: 'Hello there',
  title: 'Hello there',
  text: '<h2>Welcome to lockit!</h2><p><%- link %></p>'
};

var Email = require('../index.js');

// remove '=\r\n' from String - coming from quoted printable encoding ?!?
String.prototype.clean = function() {
  return this.replace(/\r\n/g, '');
};

describe('sendmail', function() {

  var email = new Email(config);

  describe('send()', function() {

    var that = {
      transport: require('nodemailer-stub-transport'),
      template: require(config.emailTemplate),
      config: config,
      link: '<a href="http://localhost:3000/signup/abc123">Click here</a>'
    };
    var send = email.send.bind(that);

    it('should use the correct recipient email address', function(done) {
      send('test', 'john', 'john@email.com', function(err, res) {
        if (err) console.log(err);
        res.response.toString().should.containEql('To: ' + 'john@email.com');
        done();
      });
    });

    it('should set the right subject', function(done) {
      send('test', 'john', 'john@email.com', function(err, res) {
        if (err) console.log(err);
        res.response.toString().should.containEql('Subject: ' + 'Hello there');
        done();
      });
    });

    it('should use the correct local variables', function(done) {
      send('test', 'john', 'john@email.com', function(err, res) {
        if (err) console.log(err);
        res.response.toString().should.containEql('Welcome to lockit!');
        var link = 'href="http://localhost:3000/signup/abc123">Click here</a>';
        res.response.toString().clean().should.containEql(link.clean());
        done();
      });
    });

  });

  describe('signup()', function() {

    it('should use the correct text from config', function(done) {
      email.signup('john', 'john@email.com', 'abc123', function(err, res) {
        if (err) console.log(err);
        res.response.toString().should.containEql('Welcome to Test App!');
        done();
      });
    });

    it('should generate the correct link target', function(done) {
      email.signup('john', 'john@email.com', 'qweqwe', function(err, res) {
        if (err) console.log(err);
        var link = 'href="http://localhost:3000/signup/qweqwe">Click here</a>';
        res.response.toString().clean().should.containEql(link.clean());
        done();
      });
    });

  });

  describe('taken()', function() {

    it('should use the correct text from config', function(done) {
      email.taken('john', 'john@email.com', function(err, res) {
        if (err) console.log(err);
        res.response.toString().should.containEql('Your email is already registered and you cannot sign up twice');
        done();
      });
    });

  });

  describe('resend()', function() {

    it('should use the correct text from config', function(done) {
      email.resend('john', 'john@email.com', 'abc123', function(err, res) {
        if (err) console.log(err);
        res.response.toString().should.containEql('here is the link again.');
        done();
      });
    });

    it('should generate the correct link target', function(done) {
      email.resend('john', 'john@email.com', 'qweqwe', function(err, res) {
        if (err) console.log(err);
        var link = 'href="http://localhost:3000/signup/qweqwe">Click here</a>';
        res.response.toString().should.containEql(link);
        done();
      });
    });

  });

  describe('forgot()', function() {

    it('should use the correct text from config', function(done) {
      email.forgot('john', 'john@email.com', 'abc123', function(err, res) {
        if (err) console.log(err);
        res.response.toString().clean().should.containEql('to reset your password.');
        done();
      });
    });

    it('should generate the correct link target', function(done) {
      email.forgot('john', 'john@email.com', 'qweqwe', function(err, res) {
        if (err) console.log(err);
        var link = 'href="http://localhost:3000/forgot-password/qweqwe">Click here</a>';
        res.response.toString().clean().should.containEql(link);
        done();
      });
    });

  });

});
