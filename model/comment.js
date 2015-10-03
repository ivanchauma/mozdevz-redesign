var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	content: { // Conteudo do comentario
		type: String
	},
	user: { // usuario que fez like
		type: mongoose.Schema.Type.ObjectId,
		ref: 'User'
	}
});

module.exports = exports = mongoose.model('Comment', schema);