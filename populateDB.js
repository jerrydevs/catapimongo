const axios = require('axios')
const cats = require('./cats.json')
const POST_URL = 'http://localhost:3005/v1/images'

cats.forEach(async (cat) => {
  try {
    const res = await axios.post(POST_URL, cat)
    return res
  } catch (error) {
    console.error(error)
  }
})
