const db = require('../db').db
const express = require('express')
const router = express.Router()

// Authentication middleware here?

// Helper get function
function get(url, handler) {
  router.get(url, (req, res) => {
    handler(req)
      .then(data =>
        res.json({success:true, data:data})
      ).catch(error =>
        res.json({success:false, error: error.message || error })
      )
  })
}

// About route for branches.
router.get('/about', (req, res) =>
  res.json({success:true, message:"About branches!"})
)

// Home page route for branches
get('/', () => db.branches.all())

module.exports = router
