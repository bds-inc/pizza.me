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
router.route('/')
  // Add a branch:
  .post((req, res) => {
    let body = req.body
    db.branches.insert({
      name         : body.name,
      address      : body.address,
      location     : body.location,
      contact_info : body.contact_info
    })
      .then(
        res.json({ success:true, data })
      )
      .catch(error => 
        res.json({ success:false, error: error.message || error })
      )
  })
  // Get all branches
  .get((req, res) => {
    db.branches.all(req)
      .then(data =>
        res.json({ success: true, data })
      )
      .catch(error =>
        res.json({ success: true, data })
      )
  })

// 
router.route('/:branch_id')
  // get branch info by ID:
  .get((req, res) => {
    db.branches.find(req.params.branch_id)
      .then(data =>
        res.json({ success:true, data })
      )
      .catch(error =>
        res.json({ success:false, error: error.message || error })
      )
  })
  // Update the branch given its ID:
  .patch((req, res) => {
    let body = req.body
    db.branches.update({
      name         : body.name,
      address      : body.address,
      location     : body.location,
      contact_info : body.contact_info
    })
      .then(data =>
        res.json({ success:true, data })
      )
      .catch(error =>
        res.json({ success:false, error: error.message || error })
      )
  })
  // Remove  branch by its ID:
  .delete((req, res) => {
    db.branches.remove(req.params.branch_id)
      .then(data =>
        res.json({ success:true, data })
      )
      .catch(error =>
        res.json({ success:false, error: error.message || error })
      )
  })

// find a branch by ID:
get('/find/id=:id', req => db.branches.find(+req.params.id))

module.exports = router
