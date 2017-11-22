const {branches} = require('../models')
const express = require('express')
const router = express.Router()
const utils = require('../utils')

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

// Sanity check
router.get('/about', (req, res) =>
  res.json({success:true, message:"About branches!"})
)

// Home page route for branches
router.route('/')
  // Add a branch:
  .post((req, res) => {
    let body = req.body
    branches.create({data: utils.sanitize(req.body)}, {returning: "id"})
    .then(data => {
      res.json({ success: true, data })
    })
    .catch(error =>
      res.json({ success:false, error: error.message || error })
    )
  })
  // Get all branches
  .get((req, res) => {
    branches.findAll()
      .then(data => {
        res.json({ success: true, data })
      })
      .catch(error =>
        res.json({ success:false, error: error.message || error })
      )
  })

// 
router.route('/:branch_id')
  // get branch info by ID:
  .get((req, res) => {
    branches.findById(req.params.branch_id)
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
    branches.update({data: utils.sanitize(req.body)}, {
      where: {
        id: req.params.branch_id
      }
    })
    .then(data =>
      res.json({ success:true, message:`Updated ${data} row(s)` })
    )
    .catch(error =>
      res.json({ success:false, error: error.message || error })
    )                          
  })
  // Remove  branch by its ID:
  .delete((req, res) => {
    branches.destroy({
      where: {
        id: req.params.branch_id
      }
    })
      .then(rowDeleted =>
        res.json({ success:true, message: `Delete ${rowDeleted} row(s)` })
      )
      .catch(error =>
        res.json({ success:false, error: error.message || error })
      )
  })

// find a branch by ID (TODO: And any other filters required):
get('/find/id=:id', req => db.branches.find(+req.params.id))

module.exports = router
