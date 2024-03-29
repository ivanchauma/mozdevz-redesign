var bcrypt = require('bcrypt-nodejs');

exports.cryptPassword = function(password, callback) {
   bcrypt.genSalt(10, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(password, salt, null,function(err, hash) {
      return callback(err, hash);
    });

  });
};

exports.comparePassword = function(password, userPassword, callback) {
  bcrypt.compare(password, userPassword, function(err, isPasswordMatch) {
    if (err) return callback(err);
    return callback(null, isPasswordMatch);
  });
};