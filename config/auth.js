var passport = require('passport'),
	bCrypt = require('bcrypt-nodejs'),
	LocalStrategy = require('passport-local').Strategy,
	UserController = require('../controller/user');


passport.use(new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password',
	passReqToCallback: true
},

function(req, username, password, next){
	UserController.validateLogin(username, password, function(err, result){
		if (err) return;

		if (result.sucess) {
			next(null, result.data);
		}else{
			next(null, false, req.flash('message', result.message));
		};
	});
}));

passport.serializeUser(function(user, next){
	if (user === undefined) {
		next(null, null);
	};
	next(null, user._id);
});

passport.deserializeUser(function(id, next){
	UserController.selectById(id, function(err, result){
		if(err) next(err);
		next(null, result.data);
	});
});

module.exports = passport;