const express = require('express')
const booksController = require('../controller/bookController')


function routes(Book) {
	const bookRouter = express.Router()
	const controller  = booksController(Book); 
	bookRouter.route('/book')
		.post(controller.post)
		.get(controller.get)

	bookRouter.use('/book/:bookId', (req, res, next) => {
		Book.findById(req.params.bookId, (err, book) => {
			if (err) {
				return res.send(err)
			}
			if (book) {
				req.book = book
				return next();
			}
			return res.sendStatus(201)
		})
	})

	bookRouter.route('/book/:bookId')
		.get((req, res) => {
			const returnBook = req.book.toJSON()
			returnBook.links ={}
			const genre = req.book.genre.replace(' ', '%20')
			returnBook.links.FilterByGenre = `http://${req.headers.host}/api/book/?genre=${genre}`
			res.json(returnBook)

		})
		.put((req, res) => {

			const book = req.book
			book.author = req.body.author
			book.title = req.body.title
			book.genre = req.body.genre
			req.book.save((err) => {
				if (err) {
					return res.send(err)
				}
				return res.json(book)
			})
		})
		.patch((req, res) => {

			const {
				book
			} = req
			if (req.body._id) {
				delete req.body._id
			}
			Object.entries(req.body).forEach(item => {
				const key = item[0]
				const value = item[1]
				book[key] = value
			})

			req.book.save((err) => {
				if (err) {
					return res.send(err)
				}
				return res.json(book)
			})
		})
		.delete((req, res) => {
				req.book.remove((err) => {
						if (err) {
							return res.send(err)
						}
						return res.sendStatus(204)
					})


				})

				 return bookRouter;
		}

	module.exports = routes