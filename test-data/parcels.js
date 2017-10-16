var faker = require('faker')

function generateParcels () {
  var parcels = []

  for (var id = 0; id < 50; id++) {
        sent_by = faker.random.number(),
        received = faker.random.boolean(),
        received_on = faker.date.recent(),
        sent_on = faker.date.past(),
        branch_from = faker.random.number(),
        description = faker.lorem.sentence(),
        modified = new Date()

    parcels.push({
      "id": id,
      "sent_by": sent_by,
      "received": received,
      "received_on": received_on,
      "sent_on": sent_on,
      "branch_from": branch_from,
      "description": description,
      "modified": modified
    })
  }

  return { "parcels": parcels }
}

// json-server requires that you export
// a function which generates the data set
module.exports = generateParcels;

// { "id": id,"sent_by": sent_by,"received": received,"received_on": received_on,"sent_on": sent_on,"branch_from": branch_from,"description": description,"modified": modified}