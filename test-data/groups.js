var faker = require('faker')

function generateGroups () {
  var groups = []

  for (var id = 0; id < 50; id++) {
    var name = faker.company.companyName()

    groups.push({
      "id": id,
      "name": name
    })
  }

  return { "groups": groups }
}

// json-server requires that you export
// a function which generates the data set
module.exports = generateGroups;

// {"id":1, "name":""}