var express = require('express');
var User = require('../model/user');
var UserController = require('../controller/user');
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

	router.post('/edit', function(req, res){
		var usuario = new User();
		var skill = [];
		var skill_det = req.body['skill'].split(',');
		usuario._id = req.body['user_id'];
		if(req.body['genero'])
			usuario.det.gen = req.body['genero'];
		
		if(req.body['data-nascimento'])
			usuario.det.data = new Date(req.body['data-nascimento']);

		if(req.body['det'])
			usuario.det.desc = req.body['det'];

		if(req.body['skill']){
			for(var i = 0; i < skill_det.length; i++){
				var x = {name: skill_det[i]};
				skill.push(x);
			}
			usuario.det.habil = skill;
		}

		
		UserController.update(usuario, function(err, response){
			if (err) throw err;
			if(response.success)
				res.redirect('/profile');
		});
	});

	return router;
}


module.exports = exports = UserApp;
