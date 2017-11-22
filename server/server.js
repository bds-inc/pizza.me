'use strict'

const express = require('express')
const app     = express()
const routes  = require('./src/routes')
const {sequelize} = require('./src/models')

// Sanity check
app.get('/', (req, res) => {
  res.json({success:true, message:'Welcome to the pizza.me API!'})
})

app.use('/api/v1/', routes);

// process.env.PORT lets the port be set by Heroku. (REQUIRED!!!)
const port = process.env.port || 3000 

sequelize.sync({logging: console.log})
  .then(() => {
    app.listen(port)
    console.info(`Listening on port ${port}!`)
  })
