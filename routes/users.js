var express = require('express');
var router = express.Router();

function UserApp(app){
	/* GET users listing. */
	router.get('/', app.locals.isLoggedIn, function(req, res, next) {
	  res.send('respond with a resource');
	});

	return router;
}


module.exports = exports = UserApp;
