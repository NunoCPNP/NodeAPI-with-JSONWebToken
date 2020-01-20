const router = require('express').Router()
const verify = require('../utils/protectedRoutes')

router.get('/', verify, (req, res) => {
  res.json({ posts: { title: 'My first post', description: 'Private Data' } })
})

module.exports = router
