var User = require('../model/user'),
	Comment=require('../model/Comment'),
	Post=require('../model/post'),
	mongoose = require('mongoose')


	function PostController(){}


//Insert a Post
	IsueController.prototype.insert= function(iss,cb){
		//initialize the Post
		var post= new Post(post);
		post.save(function(err,post){
			if(err){
				return callback(err);
			}
		return	callback(null,{'success':true,'message':'Post efectuado com sucesso',data:post});
		});
	};



	//update a given Post
	PostController.prototype.update = function(id, newData, post, callback){
		Post.findOneAndUpdate({'_id': new mongoose.Types.ObjectId(id)}, {$set:newData}, function(err, updated){
		if(err){
		 return callback(err);
		}
		return callback(null, {'success':true, 'message': 'Post actualizado com successo','data': updated});
	});
	};



	//Delete a given Post
	PostController.prototype.delete = function(id, callback){
		//var com = Post.findOne(id);
		Post.find({id:id}).remove(function(err,post){
			if(err){
				return callback(err);
			}
			return callback(null,{success:true,'message':'Comentario removido com sucesso',data:post});
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



module.exports = exports = new PostController();