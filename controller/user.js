var User = require('../entities/user'),
	encryptor = require('./encryption'),
	mongoose = require('mongoose'),
	nivelUser = 3;

function UserController(){}

// Inserir novo usuario na base de dados
UserController.prototype.insert = function(user, callback) {
	User.findOne({username: user.username, name: user.name}, function(err, dbusuario){
		if(err) callback(err);
		else if(dbusuario) {
			callback(null, {success: false, message: 'Ja existe um usuario com esse nome registado.'});
		}else{
			encryptor.cryptPassword(user.password, function(err, senha){
				if(err) return callback(err);

				user.password = senha;
				var usuario = new User(user);
				usuario.save(function(err){
					if(err) return callback(err);
					callback(null, {'success': true,'message': 'Usuario registado com sucesso', 'data': usuario});
				});
			});
		};
	});	
};

// Update do User
UserController.prototype.update = function(id, newData, user, callback){
	if(newData.password){
		encriptador.cryptPassword(newData.passwd, function(err, senha){
			newData.password = senha;
			User.findOneAndUpdate({'_id': new mongoose.Types.ObjectId(id)}, {$set:newData}, function(err, updated){
				if(err) return callback(err);
				return callback(null, {'success':true, 'message': 'Usuario actualizado com successo.','data': updated});
			});
		});	
	}else{
		Usuario.findOneAndUpdate({'_id': new mongoose.Types.ObjectId(id)}, {$set:newData}, function(err, updated){
			if(err) return callback(err);

			return callback(null, {'success':true, 'message': 'Usuario actualizado com successo','data': updated});
		});
	}
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
UserController.prototype.validateLogin = function(username, password, callback) {
	User.findOne({'username': username}, function(err, user){
		if (err) return callback(err);
		if (!user) return callback(null, {'success': false, 'message': 'Nome do usuario errado.'});
		encryptor.comparePassword(password, user.password, function(err, isValid){
			if (err) return callback(err);
			if (!isValid){
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