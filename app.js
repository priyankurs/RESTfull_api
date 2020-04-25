const express = require('express')
const mongoose = require('mongoose')
const Book = require('./models/bookModel')
const db = mongoose.connect("mongodb://localhost/bookAPI")
const app = express();
const bookRouter = require('./routes/booksRouter')(Book);
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use('/api', bookRouter)

const port = process.env.PORT || 3000


app.get('/', (req, res) => {
	res.send("Welcome Home or House")
})


app.listen(port, () => {
	console.log("My heart is a mess")
})
