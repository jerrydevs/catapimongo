var mongoose = require('mongoose')
var Schema = mongoose.Schema
var VoteSchema = new Schema({
  id: {
    type: String,
  },
  value: {
    type: Number,
  },
})

module.exports = mongoose.model('vote', VoteSchema)
