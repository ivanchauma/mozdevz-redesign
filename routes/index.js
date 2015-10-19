var express = require('express');
var router = express.Router();
var passport = require('../config/passport');
var flash = require('connect-flash');

function RouterApp(app){

	app.use(passport.initialize());
	app.use(passport.session());

    router.get('/', function(req, res){
        res.render('index');
    });


	/* Local Login and Signup */
	router.get('/login', function(req, res){
        var x = req.flash('message');
        if(x.length >0){
            return res.render('login', { message:'Usuário ou Senha incorreto'});
        }
        res.render('login', { message:''});
    });

    router.post('/login', passport.authenticate('local-login',{
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
        // Implementar mais tarde, redirecionar para ultima pagina que visitou...
    }));

    app.get('/signup', function(req, res) {
        res.render('signup', { message: req.flash('loginMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', 
        failureRedirect : '/signup', 
        failureFlash : true 
    }));


    //  Facebook
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect : '/profile',
        failureRedirect : '/login'
    }));


	/* GET logout page. */
    router.get('/logout', function(req,res){
        req.logout();
        res.redirect('/');
    });
   

	return router;
}


module.exports = exports = RouterApp;
