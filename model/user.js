var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	name: {
		type: String
	},
	// Formas de login
	local: {
        email: String,
        password: String,
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    // Formas de login end here
    
	level: { // Nivel de usuario (Os niveis sao 1 e 2, sendo 1 - Administrador e 2 - Common user)
		type: Number,
		default: 3
	},
	regDate: { // Data de registo
		type: Date,
		default: Date.now
	},
	localidade: { // Local de residencia, etc...
		cid: {
			type: String
		},
		prov: {
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
		data:{// Data nascimento
			type: Date
		},
		desc:{ // Descricao
			type: String
		},
		prof: { //Profissao
			type: String
		},
		habil: [{ // Habilidade (skill's)
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