var User = require('../model/user'),
	Comment=require('../model/comment'),
	mongoose = require('mongoose')


	function CommentController(){}


//Insert a comment
	CommentController.prototype.insert= function(content, callback){
		//initialize the comment
		var com = new Comment(content);
		com.save(function(err){
			if(err)	return callback(err);
			return	callback(null,{'success': true,'message': 'Comentario efectuado com sucesso', 'data': com});
		});
	};



	//update a given comment
	CommentController.prototype.update = function(id, newData, comment, callback){
		Comment.findOneAndUpdate({'_id': new mongoose.Types.ObjectId(id)}, {$set:newData}, function(err, updated){
			if(err){
			 return callback(err);
			}
			return callback(null, {'success':true, 'message': 'Comentario actualizado com successo','data': updated});
		});
	};



	//Delete a given comment
	CommentController.prototype.delete = function(id, callback){
		//var com = Comment.findOne(id);
		Comment.find({id:id}).remove(function(err,com){
			if(err){
				return callback(err);
			}
			return callback(null,{success:true,'message':'Comentario removido com sucesso',data:com});
		});
	};

	//Retrieve a comment by its id

	CommentController.prototype.selectById = function(id, callback){
		Comment.findOne({'id': id}, function(err,com){
		if (err) return callback(err);
		if (!com) return callback(null, {'success': false, 'message': 'Comentario nao encontrado'});
		return callback(null,{success:true,'message':'OK','data':com});
	});
	};

		//List coments of one issue

	CommentController.prototype.selectByIssue = function(issue, callback){
		Comment.find({'issue': issue}, function(err,com){
		if (err) return callback(err);
		if (!com) return callback(null, {'success': false, 'message': 'Comentario nao encontrado'});
		return callback(null,{success:true,'message':'OK','data':com});
	});
	};


module.exports = exports = new CommentController();