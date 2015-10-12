var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	// Define Category Schema here.

	name:{
		type:String,
		required:'Category name is required'
	},
	description:{
		type:String,
		required:'A description for the Category is required'
	}

});

module.exports = exports = mongoose.model('Category', schema);