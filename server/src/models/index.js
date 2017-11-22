const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const CONFIG = require('../config')
const db = {}

const env = process.env.SETUP || "PROD"
const config = env === "DEV"? CONFIG.dev: CONFIG.prod

const sequelize = new Sequelize(
    config.database,
    config.user,
    config.password,
    config.options    
)

sequelize
  .authenticate()
  .then(() => {
    console.log("Successfully connected to the database!")
  })
  .catch(error => {
    console.warn("Unable to connect to the database!")
  })

fs
  .readdirSync(__dirname)
  .filter((file) =>
    file !== "index.js" && file === "branches.js" // TODO: Remove last conditional on this line
  )
  .forEach((file) => {    
    const model = sequelize.import(path.join(__dirname, file))
    db[file.slice(0, -3)] = model
  })

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
