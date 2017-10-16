var faker = require('faker')

function generateOrders () {
  var orders = []

  for (var id = 0; id < 50; id++) {
    var total = faker.finance.amount()
    var balance = faker.finance.amount()
    var due_date = faker.date.future()
    var creation_date = new Date() 
    var modified_date = creation_date
    var email = faker.internet.email()
    var status = 0

    orders.push({
      "id": id,
      "total": total,
      "balance": balance,
      "due_date": due_date,
      "creation_date": creation_date, 
      "modified_date": modified_date,
      "email": email,
      "status": status
    })
  }

  return { "orders": orders }
}

// json-server requires that you export
// a function which generates the data set
module.exports = generateOrders;

// {"total": total,"balance": balance,"due_date": due_date,"creation_date": creation_date,"modified_date": modified_date,"email": email,"status": status} 