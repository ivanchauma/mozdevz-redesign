var express = require('express');
var router = express.Router();
var passport = require('../config/auth');
var flash = require('connect-flash');

function RouterApp(app){

	app.use(passport.initialize());
	app.use(passport.session());

	/* GET home page. */
	router.get('/', function(req, res, next) {
	  res.render('index', { title: 'Express' });
	});

	return router;
}


module.exports = exports = RouterApp;
