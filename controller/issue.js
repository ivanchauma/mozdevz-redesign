var User = require('../model/user'),
	Comment=require('../model/Comment'),
	Issue=require('../model/issue'),
	mongoose = require('mongoose')


	function IssueController(){}


//Insert a Issue
	IsueController.prototype.insert= function(iss,cb){
		//initialize the Issue
		var issue= new Issue(iss);
		issue.save(function(err,issue){
			if(err){
				return callback(err);
			}
		return	callback(null,{'success':true,'message':'Issue efectuado com sucesso',data:issue});
		});
	};



	//update a given Issue
	IssueController.prototype.update = function(id, newData, issue, callback){
		Issue.findOneAndUpdate({'_id': new mongoose.Types.ObjectId(id)}, {$set:newData}, function(err, updated){
		if(err){
		 return callback(err);
		}
		return callback(null, {'success':true, 'message': 'Issue actualizado com successo','data': updated});
	});
	};



	//Delete a given Issue
	IssueController.prototype.delete = function(id, callback){
		//var com = Issue.findOne(id);
		Issue.find({id:id}).remove(function(err,issue){
			if(err){
				return callback(err);
			}
			return callback(null,{success:true,'message':'Comentario removido com sucesso',data:issue});
		});
	};

	//Retrieve a Issue by its id

	IssueController.prototype.selectById = function(id, callback){
		Issue.findOne({'id': id}, function(err,issue){
		if (err) return callback(err);
		if (!issue) return callback(null, {'success': false, 'message': 'Comentario nao encontrado'});
		return callback(null,{success:true,'message':'OK','data':issue});
	});
	};



module.exports = exports = new IssueController();