var express = require('express');
var router = express.Router();
var passport = require('../config/auth');
var flash = require('connect-flash');

function RouterApp(app){

	app.use(passport.initialize());
	app.use(passport.session());

    router.get('/', function(req, res){
        res.render('index');
    });


	/* GET to Login Page. */
	router.get('/login', function(req, res){
        var x = req.flash('message');
        if(x.length >0){
            return res.render('login', { message:'Usuário ou Senha incorreto'});
        }
        res.render('login', { message:''});
    });

    router.post('/login', passport.authenticate('local',{
        failureRedirect: '/login',
        failureFlash: true
    }), function(req, res){
        var url = req.session.redirrect_to || '/';
        delete(req.session.redirrect_to);
        res.redirect(url);
    });

	/* GET logout page. */
    router.get('/logout', function(req,res){
        req.logout();
        res.redirect('/');
    });
   

	return router;
}


module.exports = exports = RouterApp;
