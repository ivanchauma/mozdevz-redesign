var express = require('express');
var router = express.Router();

function UserApp(app){

	router.get('/', app.locals.isLoggedIn, function(req, res, next) {
	  res.render('profile', {
	  	user: req.user
	  });
	});

	router.get('/edit', app.locals.isLoggedIn, function(req, res, next) {
	  res.render('edit_profile', {
	  	user: req.user
	  });
	});


	return router;
}


module.exports = exports = UserApp;
