const express  = require('express')
const app      = express.Router()
const branches = require('./branches')

// Serve static content using express
app.use(express.static(__dirname + '/public'))

// We'll need body parser for POST information.
// TO DO: Add body parser as dependency in package.json

// Sanity check for our api
app.get('/', (req, res) => {
  res.json({success:true, message:'Got a request to the main API url'})
})

app.use('/branches', branches)

module.exports = app
