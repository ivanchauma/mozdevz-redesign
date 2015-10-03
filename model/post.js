var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	title: { // Obviamente o titulo
		type: String
	},
	content: { // Conteudo do post
		type: String
	},
	categorie: { // Categorias
		type: mongoose.Schema.Type. ObjectId,
		ref: 'Categorie'
	},
	canComment: { // Permitir que outros usuarios possam comentar sobre o post
		type: Boolean,
		default: false
	},
	comment: [{ // Comentarios dos post
		type: mongoose.Schema.Type.ObjectId
		ref: 'Comment'
	}],

	like: [{ // Like nos posts...
		type: mongoose.Schema.Type.ObjectId,
		ref: 'User'
	}]
});

module.exports = exports = mongoose.model('Post', schema);