const request = require('superagent')

request.get('http://localhost:3000/branches/4', (err, res) => {
    console.log(res.body)
})

module.exports = request;