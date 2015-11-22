var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	title: { // Titulo do comentario
		type: String,
		required:'Title is required for posting an Post'
	},
	description:{
		type: String,
		required: 'Description is required for posting an Post'
	},
	category:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category'
	}],
	comments:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment'
	},
	allowComments:{
		type: Boolean,
		default: true
	},
	project:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Project'
	},

	user: { // usuario que fez like
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	created: {
		type: Date,
		default: Date.now
	},
});

module.exports = exports = mongoose.model('Post', schema);
