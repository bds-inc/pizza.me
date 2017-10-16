const express      = require('express')
const app          = express.Router()
const bodyParser   = require('body-parser')

/* Routes */
const branches     = require('./branches')
// const users        = require('./users')
// const pizzas       = require('./pizzas')
// const groups       = require('./groups')
// const parcels      = require('./parcels')
// const transactions = require('./transactions')
// const permissions  = require('./permissions')

// Serve static content using express
app.use(express.static(__dirname + '/public'))

// We'll need body parser for POST information.
app.use(bodyParser.urlencoded({'extended':'true'}))
app.use(bodyParser.json())
app.use(bodyParser.json({type:'application/vnd.api+json'}))

// Sanity check for our api
// TODO: Cors checks here to verify authenticity of the request
app.get('/', (req, res) => {
  res.json({success:true, message:'Got a request to the main API url'})
})

/* Routes assignment */
app.use('/branches', branches)
// app.use('/users', users)
// app.use('/transactions', transactions)
// app.use('/pizzas', pizzas)
// app.use('/parcels', parcels)
// app.use('/groups', groups)
// app.use('/permissions', permissions)

module.exports = app
