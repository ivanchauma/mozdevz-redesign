var User = require('../model/user'),
	encryptor = require('./encryption'),
	mongoose = require('mongoose'),
	nivelUser = 3;

function UserController(){}

// Inserir novo usuario na BD
UserController.prototype.insert = function(user, callback) {

	User.findOne({'local.email': user.local.email}, function(err, dbusuario){
		if(err) callback(err);
		else if(dbusuario) {
			callback(null, {success: false, message: 'Este email ja foi usado para registo.'});
		}else{
			encryptor.cryptPassword(user.local.password, function(err, senha){
				if(err) return callback(err);

				user.local.password = senha;
				var usuario = new User(user);
				usuario.save(function(err){
					if(err) return callback(err);
					callback(null, {'success': true,'message': 'Usuario registado com sucesso', 'data': usuario});
				});
			});
		};
	});
};

UserController.prototype.insertSocial = function(user, callback) {
	switch(user.type){
		// Facebook
		case 'facebook' :
				if(!req.user){
					User.findOne({ 'facebook.id' : user.facebook.id }, function(err, usuario) {
				    	if (usuario) {
                if (!usuario.facebook.token) {
                	usuario.facebook.token = user.facebook.token;
                    usuario.facebook.name  = user.facebook.name;
                    usuario.facebook.email = user.facebook.email;

                    usuario.save(function(err) {
                        if (err) throw err;
                		return callback(null, {'success': true,'data': user});
                    });
                }
                return callback(null, {'success': true,'data': usuario});

				    	}else{
				    		user.save(function(err) {
		                if (err) throw err;
		                return callback(null, {'success': true,'data': user});
		            });
				    	};
				    });
				}else{
					var newUser = req.user;
            newUser.facebook.id    = user.facebook.id;
            newUser.facebook.token = user.facebook.token;
            newUser.facebook.name  = user.facebook.name;
            newUser.facebook.email = user.facebook.email;

            newUser.save(function(err) {
                if (err) throw err;
                return callback(null, {'success': true,'data': newUser});
            });
				}
		break;

		// Twitter
		case 'twitter' :
				if (!req.user) {
					User.findOne({ 'twitter.id' : user.twitter.id }, function(err, usuario) {
				    	if (usuario) {
				    		if(!usuario.twitter.token){
				    			usuario.twitter.token         = user.twitter.token;
                    usuario.twitter.username    = user.twitter.username;
                    usuario.twitter.displayName = user.twitter.displayName;

                    usuario.save(function(err){
                    	if(err) throw err;
                    	return callback(null, {'success': true,'data': user});
                    });
				    		}
				    		return callback(null, {'success': true,'data': usuario});
				    	}else{
				    		user.save(function(err) {
				                if (err) throw err;
				                return callback(null, {'success': true,'data': user});
				            });
				    	};
				    });
				}else{
					var newUser = req.user;

					newUser.twitter.id = user.twitter.id;
				    newUser.twitter.token = user.twitter.token;
				    newUser.twitter.username = user.twitter.username;
				    newUser.twitter.displayName = user.twitter.displayName;

				    newUser.save(function(err) {
				    	if (err) throw err;
				    	return callback(null, {'success': true, 'data': newUser});
				    });
				};
		break;

		default:
		break;
	}
};

// Update do User
UserController.prototype.update = function(upData, callback){
	User.findById(new mongoose.Types.ObjectId(upData._id), function(err, user){
		if(err) callback(err);
		if(!user) callback(null, {success: false, message: 'Usuário não existe na Base de Dados'});
		else{
			var ident = new mongoose.Types.ObjectId(user._id);
			delete(upData._id);

			if(upData.local.password){
				encriptador.cryptPassword(upData.local.password, function(err, senha){
					upData.local.password = senha;
				});
			};

			User.findOneAndUpdate({'_id':ident},{$set: upData},function(err, result){
				if(err) return callback(err);
				callback(null, {'success': true,'message': 'Usuario actualizado com sucesso', 'data': result});
			});
		}
	});
}

// Selecionar User por id
UserController.prototype.selectById = function(id, callback){
	User.findById(new mongoose.Types.ObjectId(id), function(err, usuario){
		if(err) return callback(err);
		if(!usuario) return callback(null, {'success': false, 'message': 'Usuario com o id dado, nao foi encontrado.'});
		callback(null, {'success': true, 'message': '', data: usuario});
	});
}

// Validar login
UserController.prototype.validateLogin = function(email, password, callback) {
	User.findOne({'local.email': email}, function(err, user){
		if (err) return callback(err);
		if (!user) return callback(null, {'success': false, 'message': 'Nome do usuario errado.'});

		encryptor.comparePassword(password, user.local.password, function(err, isValid){
			if (err) return callback(err);
			if (!isValid){
				encryptor.cryptPassword(password, function(err, senha){
					console.log("Hardccoded pass: "+senha+" vs user pass: "+user.local.password);
				});
				console.log(isValid);
				return callback(null, {'success': false, 'message': 'Senha incorrecta.'});
			}else{
				return callback(null, {'success': true, 'message': 'Usuario autenticado com sucesso.', data: user});
			}
		});
	});
};

// Validar Password...
UserController.prototype.validatePassword = function(user, password, callback) {
	User.findOne({'_id': mongoose.Types.ObjectId(user)}, function(err, usuario){
		if (err) return callback(err);

		encryptor.comparePassword(password, usuario.password, function(err, isValid){
			if (err) return callback(err);
			callback(null, isValid);
		});
	})
};


module.exports = exports = new UserController();
