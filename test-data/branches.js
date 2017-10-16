var faker = require('faker')

function generateBranches () {
  var branches = []

  for (var id = 0; id < 50; id++) {
    var name = faker.address.streetName()
    var location = (faker.address.latitude(), faker.address.longitude())
    var contact_info = faker.phone.phoneNumberFormat()
    var address = faker.address.streetAddress()

    branches.push({
      "id": id,
      "name": name,
      "location": location,
      "contact_info": contact_info,
      "address": address

    })
  }

  return { "branches": branches }
}

// json-server requires that you export
// a function which generates the data set
module.exports = generateBranches;

// {"id":1, "name":"", "location":"", "address":"", "contact_info":""}