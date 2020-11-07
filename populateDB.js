const axios = require('axios')
const cats = require('./cats.json')
require('dotenv').config()
const POST_URL = 'https://catapimongo.herokuapp.com/v1/images'

cats.forEach(async (cat) => {
  try {
    const res = await axios.post(POST_URL, cat)
    return res
  } catch (error) {
    console.error(error)
  }
})
