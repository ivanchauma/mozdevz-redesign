var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	content: { // Conteudo do comentario
		type: String
	},
	user: { // usuario que fez like
		type: mongoose.Schema.Type.ObjectId,
		ref: 'User'
	},
	created: { //Data em q o comentario foi criado
		type: Date,
		default: Date.now
	},
	post:{
		type:Schema.Type.ObjectId,
		ref:'Post'
	}
});

module.exports = exports = mongoose.model('Comment', schema);