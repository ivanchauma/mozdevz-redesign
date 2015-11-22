var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	post:{
		type: mongoose.Schema.Types.ObjectId,
		ref:'Post'
	},
	contents: [{ // Conteudo do comentario
		content: String
	}],
	userLike: { // usuario que fez like
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	created: { //Data em q o comentario foi criado
		type: Date,
		default: Date.now
	}
});

module.exports = exports = mongoose.model('Comment', schema);