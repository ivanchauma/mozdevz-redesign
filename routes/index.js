var express = require('express');
var router = express.Router();
var passport = require('../config/passport');
var UserController = require('../controller/user');
var User = require('../model/user');
var flash = require('connect-flash');

function RouterApp(app){

	app.use(passport.initialize());
	app.use(passport.session());

    router.get('/', function(req, res){
        res.render('index', {user: req.user});
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
        res.render('signup', { message: req.flash('loginMessage')});
    });

    app.post('/signup', function(req, res) {
        var usuario = new User();
        usuario.local = {};
        usuario.name = req.body['name'];
        usuario.local.email = req.body['email'];
        usuario.local.password = req.body['password'];

        UserController.insert(usuario, function(err, user){
            if (err) console.log(err);
            if (user.success) {
                res.redirect('/');
            };
        });
    });


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
