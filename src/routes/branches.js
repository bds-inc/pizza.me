const db = require('../db').db
const express = require('express')
const router = express.Router()

// Authentication middleware here?

// Home page route for branches
router.get('/', (req, res) => {
  res.json({success:true, "Branches home page!"})
})

module.exports = router
