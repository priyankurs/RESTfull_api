const mongoose = require('mongoose')

const {
	Schema
} = mongoose

const bookModel = new Schema({

	authour: {
		type: "String"
	},
	book: {
		type: "String"
	},
	genre: {
		type: "String"
	},
	read: {
		type: "Boolean",
		default: false
	}

})


module.exports = mongoose.model('Book', bookModel)