const express      = require('express')
const app          = express.Router()
const branches     = require('./branches')
const bodyParser   = require('body-parser')

/* The following imports have not been implemented yet! */
// const users        = require('./users')
// const pizzas       = require('./pizzas')
// const groups       = require('./groups')
// const parcels      = require('./parcels')
// const transactions = require('./transactions')
// const permissions  = require('./permissions')

// Serve static content using express
app.use(express.static(__dirname + '/public'))

// We'll need body parser for POST information.
// TO DO: Add body parser as dependency in package.json
app.use(bodyParser.urlencoded({'extended':'true'}))
app.use(bodyParser.json())
app.use(bodyParser.json({type:'application/vnd.api+json'}))

// Sanity check for our api
app.get('/', (req, res) => {
  res.json({success:true, message:'Got a request to the main API url'})
})

app.use('/branches', branches)
/* The following routes have not been implemented yet! */
// app.use('/users', users)
// app.use('/transactions', transactions)
// app.use('/pizzas', pizzas)
// app.use('/parcels', parcels)
// app.use('/groups', groups)
// app.use('/permissions', permissions)

module.exports = app
