'use strict'

const express = require('express')
const app     = express()
const routes  = require('./src/routes')

// Sanity check
app.get('/', (req, res) => {
  res.json({success:true, message:'Welcome to the pizza.me API!'})
})

app.use('/api/v1/', routes);

// process.env.PORT lets the port be set by Heroku. (REQUIRED!!!)
const port = process.env.port || 3000 

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})
