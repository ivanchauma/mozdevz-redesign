var passport = require('passport'),
	bCrypt = require('bcrypt-nodejs'),

	LocalStrategy = require('passport-local').Strategy,
	FacebookStrategy = require('passport-facebook').Strategy,
	TwitterStrategy  = require('passport-twitter').Strategy,
	GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy,

	User = require('../model/user'),
	UserController = require('../controller/user');

var configAuth = require('./auth');

// Serialize the user for the session
passport.serializeUser(function(user, next){
	if (user === undefined) {
		next(null, null);
	};
	next(null, user._id);
});

// Deserialize the user for the session
passport.deserializeUser(function(id, next){
	UserController.selectById(id, function(err, result){
		if(err) next(err);
		next(null, result.data);
	});
});


// ========== Local Login ============= //
passport.use('local-login', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
},
function(req, email, password, next){
    console.log(password+" from passport");

	UserController.validateLogin(email, password, function(err, result){
		if (err) throw err;

		if (result.success) {
			next(null, result.data);
		}else{
			console.log("Passportjs failed to login...");
			next(null, false, req.flash('message', result.message));
		};
	});
}));


// ============= Local Signup ================ //
passport.use('local-signup', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, 
function(req, email, password, next){
	var usuario = new User();
	usuario.local.email = email;
	usuario.local.password = password;

	UserController.insert(usuario, function(err, user){
		if (err) throw err;
		if (user.success) {
			next(null, user.data)
		}else{
			// Design failure logic here.
		};
	});
}));


// ============= Facebook ============= //
passport.use(new FacebookStrategy({
	clientID        : configAuth.facebookAuth.clientID,
	clientSecret    : configAuth.facebookAuth.clientSecret,
	callbackURL     : configAuth.facebookAuth.callbackURL,
	passReqToCallback : true
},
function(req, token, refreshToken, profile, next){
	var fbUser = new User();
		fbUser.facebook.id = profile.id;
		fbUser.facebook.token = token;
		fbUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
        fbUser.facebook.email = profile.emails[0].value;

        fbUser.type = 'facebook';

	UserController.inserSocial(fbUser, function(err, user){
		next(null, user.data);
	});
}));



// ================ Twitter ================ //
passport.use(new TwitterStrategy({
	consumerKey     : configAuth.twitterAuth.consumerKey,
	consumerSecret  : configAuth.twitterAuth.consumerSecret,
	callbackURL     : configAuth.twitterAuth.callbackURL,
	passReqToCallback: true
},
function(req, token, tokenSecret, profile, next){
	var twittUser = new User();
		twittUser.twitter.id = profile.id;
	    twittUser.twitter.token = token;
	    twittUser.twitter.username = profile.username;
	    twittUser.twitter.displayName = profile.displayName;

	    twittUser.type = 'twitter';

	    UserController.inserSocial(twittUser, function(err, user){
			next(null, user.data);
		});

}));

module.exports = passport;