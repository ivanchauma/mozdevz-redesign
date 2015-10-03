var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	name: {
		type: String,
		unique: true
	},
	password: {
		type: String,
		require: true
	},
	level: { // Nivel de usuario (Os niveis sao 1 e 2, sendo 1 - Administrador e 2 - Common user)
		type: Number
	},
	regDate: { // Data de registo
		type: Date,
		default: Date.now
	},
	local: { // Local de residencia, etc...
		res: {
			type: String
		}
	},
	cont: { // Informacoes de contacto
		cel: { // Celular
			type: String
		},
		email: {
			type: String
		}
	},
	det: { // Detalhes do usuario
		gen:{ // Genero
			type: String
		},
		desc:{ // Descricao
			type: String
		},
		habil: [{
			name: {
				type: String
			}
		}],

		port: [{ // Array de portfolio (com nome, link)
			name: {
				type: String
			},
			link: {
				type: String
			},
			ano: {
				type: String // Ou date
			}
		}]
	},

	//  Relacionado ao forum...
	post: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post'
	}]
});

module.exports = exports = mongoose.model('User', schema);