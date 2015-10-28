var express = require('express'),
User = require('../model/user'),
 Comment= require('../model.comment'),
 CommentController = require('../controller/comment'),
 UserController = require('../controller/user'),
 router = express.Router();

function CommentApp(app){

	//still have to check for user auth

	router.post('/', function(req, res){
		var comment = new Comment();
		//usuario._id = req.body['user_id'];
		if(req.body['content'])
			comment.content= req.body['content'];

	
			CommentController.insert(comment, function(err, response){
				if (err) throw err;
				if(response.success)
				res.render('comment', {comment: response.data});
		});
	});

		//still to be defined	
	 router.get('/edit',function(req, res, next) {
	   
	 });
	 	//still to be defied
	router.post('/edit', function(req, res){
		
	
	});

	//still a=to be defined
	router.get('/delete', function(req, res){
		
	
	});


	return router;
}


module.exports = exports = UserApp;
