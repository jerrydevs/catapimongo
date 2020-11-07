const ENDPOINTS = {
  GET_CAT_URL: 'https://catapimongo.herokuapp.com/v1/images/search',
  VOTES_URL: 'https://catapimongo.herokuapp.com/v1/votes',
}

const catImg = document.getElementById('cat-image')
const upvoteButton = document.getElementById('upvoteButton')
const downvoteButton = document.getElementById('downvoteButton')
const upvoteSpan = document.getElementById('upvote-counts')
const downvoteSpan = document.getElementById('downvote-counts')

const setCatImg = (imgURL) => {
  catImg.src = imgURL
}

const getCatImage = async () => {
  const res = await axios.get(ENDPOINTS.GET_CAT_URL)
  return res.data
}

// value = 1 for upvotes, value = 0 for downvotes
const getImageVotes = async (id, value) => {
  const res = await axios.get(`${ENDPOINTS.VOTES_URL}/${id}/${value}`)

  return res.data
}

const addVotingButtonEventListener = (buttonElement, voteType, imgId) => {
  buttonElement.addEventListener('click', async function () {
    console.log('button clicked')
    const res = await fetch(ENDPOINTS.VOTES_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: imgId,
        value: voteType,
      }),
    })
    const json = await res.json()
    location.reload()
    console.log('my res', json)
    return json
  })
}

const setVoteCounts = (upvotes, downvotes) => {
  upvoteSpan.textContent = upvotes
  downvoteSpan.textContent = downvotes
}

getCatImage().then(async (data) => {
  const res = data
  setCatImg(res.url)
  const upvotes = await getImageVotes(res.url, 1)
  const downvotes = await getImageVotes(res.url, 0)
  setVoteCounts(upvotes.count, downvotes.count)
  addVotingButtonEventListener(upvoteButton, 1, res.id)
  addVotingButtonEventListener(downvoteButton, 0, res.id)
})
