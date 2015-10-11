var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	title: { // Conteudo do comentario
		type: String,
		required:'Title is required for posting an Issue',
		d
	},
	description:{
		type:String,
		required:'Description is required for posting an Issue'
	},
	category:[{
		type:mongoose.Schema.Type.ObjectId,
		ref:'Category'
	}],
	comments:[{
		type:mongoose.Schema.Type.ObjectId,
		ref:'Comment'
	}],
	allowComments:{
		type:Boolean,
		default:true
	},
	project:{
		mongoose.Schema.Type.ObjectId,
		ref:'Project'
	}

	user: { // usuario que fez like
		type: mongoose.Schema.Type.ObjectId,
		ref: 'User'
	},
	created: {
		type: Date,
		default: Date.now
	},
});

module.exports = exports = mongoose.model('Issue', schema);