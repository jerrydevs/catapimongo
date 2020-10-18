var mongoose = require('mongoose')
var Schema = mongoose.Schema
var CatSchema = new Schema({
  id: {
    type: String,
  },
  url: { type: String },
  width: {
    type: Number,
  },
  height: {
    type: Number,
  },
  breeds: [
    {
      name: {
        type: String,
      },
    },
  ],
})

module.exports = mongoose.model('cat', CatSchema)
