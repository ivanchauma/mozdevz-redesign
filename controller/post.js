var User = require('../model/user'),
		Comment = require('../model/Comment'),
		Post = require('../model/post'),
		mongoose = require('mongoose');


		function PostController(){}


	//Insert a Post
	PostController.prototype.insert = function(post, callback){
		//initialize the Post
		var new_post= new Post(post);
		new_post.save(function(err, postDB) {
			if(err)	return callback(err);
			return	callback(null, {'success':true, 'message':'Post efectuado com sucesso', data: postDB});
		});
	};

	//update a given Post
	PostController.prototype.update = function(id, newData, post, callback){
		Post.findOneAndUpdate({'_id': new mongoose.Types.ObjectId(id)}, {$set:newData}, function(err, updated){
			if(err) return callback(err);
			return callback(null, {'success':true, 'message': 'Post actualizado com successo','data': updated});
		});
	};

	//Delete a given Post
	PostController.prototype.delete = function(id, callback){
		//var com = Post.findOne(id);
		Post.findOne({'id': id}).remove(function(err,post){
			if(err) return callback(err);
			return callback(null,{success:true,'message':'Comentario removido com sucesso', data:post});
		});
	};

	//Retrieve a Post by its id
	PostController.prototype.selectById = function(id, callback){
		Post.findOne({'id': id}, function(err,post){
			if (err) return callback(err);
			if (!post) return callback(null, {'success': false, 'message': 'Comentario nao encontrado'});
			return callback(null,{success:true,'message':'OK','data':post});
		});
	};

	// Get all posts
	PostController.prototype.selectAll = function(callback) {
		Post.find({}, function(err, posts) {
			if(err) return callback(null, {'success': false, 'message': 'Ocoreu uma falha ao buscar os dados. Tente novamente, mais tarde'});
			if(!posts.length) return callback(null, {'success': true, 'message': 'Nao existe nunhum post na Base de Dados.'});
			return callback(null, {'success': true, 'message': 'OK', 'data': posts});
		});
	};

module.exports = exports = new PostController();
