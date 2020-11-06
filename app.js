var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var cors = require('cors')

require('dotenv').config()

var connectToDB = require('./db')
var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')

var app = express()

connectToDB()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', indexRouter)
app.use('/users', usersRouter)

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

var mongoose = require('mongoose')
const Cat = require('./models/cat')
const Vote = require('./models/vote')

app.get('/v1/images/search', async function (req, res, next) {
  try {
    const count = await Cat.count().exec()
    const random = Math.floor(Math.random() * count)

    const cat = await Cat.findOne().skip(random).exec()
    res.status(200).send(cat)
  } catch (error) {
    console.error(error)
  }
})

app.post('/v1/images', async function (req, res, next) {
  try {
    const { url, id, width, height, breeds } = req.body
    const newCat = new Cat({
      url,
      id,
      width,
      height,
      breeds,
    })

    await newCat.save()
    res.status(200).send(newCat)
  } catch (error) {
    console.error(error)
  }
})

app.get('/v1/votes', async function (req, res, next) {
  try {
    const { id, value } = req.body
    const count = await Vote.find({ id: id, value: value }).countDocuments().exec()
    // const votes = Vote.find({ id: id })

    if (count > 0) {
      res.status(200).send({ count: count })
    } else {
      res.status(200).send({ count: 0 })
    }
  } catch (error) {
    console.error(error)
  }
})

app.post('/v1/votes', async function (req, res, next) {
  try {
    // vote value 1 -> Upvote, vote value 0 -> Downvote
    const { id, value } = req.body

    const newVote = new Vote({
      id,
      value,
    })

    await newVote.save()
    res.status(200).send(newVote)
  } catch (error) {
    console.error(error)
  }
})

module.exports = app
