//************************** */
// DEPENDENCIES
//************************** */

require("dotenv").config()
require("./config/db") //bring in our db config
const express = require("express")
const morgan = require("morgan") //logger

const app = express();
const { PORT = 3013 } = process.env;

//Brink in our model
const Book = require("./models/Book")

//************************** */
// MIDDLEWARE
//************************** */
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false }))


//************************** */
// ROUTES & ROUTER
//************************** */
//Index- GET render all books
app.get("/books", async (req, res) => {
    //find all of the books
    let books = await Book.find({})

    //render all of the books to index.ejs
    res.render("index.ejs", {
        books: books.reverse()
    })
})

//New- GET for the form to create a new book
app.get("/books/new", (req, res) => {
    res.render("new.ejs")
})

//Create - POST
app.post("/books", async (req, res) => {
    try {
        if (req.body.completed === "on") {
            //if checked
            req.body.completed = true
        } else {
            //if not checked
            req.body.completed = false
        }
        let newBook = await Book.create(req.body)
        res.redirect("/books")


    } catch (err) {
        res.send(err)
    }
})
// Show - GET rendering only one book
app.get("/books/:id", async (req, res) => {
    // find a book by _id
    let foundBook = await Book.findById(req.params.id) // the request params object

    console.log(foundBook)
    // render show.ejs with the foundBook
    res.render("show.ejs", {
        book: foundBook
    })
})

//**************************** */
// SERVER LISTENER
//**************************** */
app.listen(PORT, () => console.log(`Listening to the sounds of ${PORT}`))