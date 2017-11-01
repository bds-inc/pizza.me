const request = require('superagent')
const db = require('../src/db').db
const random = require('../src/utils')

let baseurl = 'localhost:3000/api/v1/branches'

describe('Branches API', () => {
  var names = []

  beforeAll(() => {    
    for(let i = 0; i < 5; i++){
      var branch_name = `name_at_index_${i}` // random.random_word(5)
      names.push(branch_name);
      db.branches.insert({
        id: i,
        name: branch_name,
        location: `163.84${i}`,
        contact_info: `279-696-649${i}`,
        address: `${i} Rick Meadow`
      })
        .then(data =>
          console.info("Successful! ", data)
        )
        .catch(error =>
          console.warn(error)
        )
    }    
  })

  afterAll(() => {
    db.result('delete from branches')
      .then(data => {                
        console.log("The data is: ", data)
      })
      .catch(error => {
        console.log('Oops!:', error);
      })    
  })

  describe('Given the root URL', () => {
    test('should be able to GET a list of all branches', () => {
      request.get(baseurl, (error, response) => {        
        let data = response.body.data        
        data.forEach((branch, index) => {
            console.log(`expecting ${branch.name} of index ${index} toBe ${names[index]}`)
            expect(branch.name).toBe(names[index])
        })
        expect(response.status).toBe(200)
      })
    })

    // test('should be able to POST an entry', () => {
    //   let address = '6815 Kasarani'
    //   request.post(baseurl)
    //     .send({
    //       id: 7000000,
    //       'name': 'Test Value',
    //       'location': '175.7120',
    //       'contact_info': '291-144-3788',
    //       'address': address
    //     })
    //     .set('Accept', 'application/json')
    //     .end((err, res) => {          
    //       db.branches.any(`select * from branches where address = ${address}`)
    //         .then(entry => {
    //           console.log("The returned entry is: ", entry)
    //           // expect(entry.name).toBe('Test Value')
    //           // expect(entry.location).toBe(175.7120)
    //           // expect(entry.contact_info).toBe('291-144-3788')
    //           // expect(entry.address).toBe('6815 Kasarani')
    //         })            
    //         expect(res.status).toBe(201)  
    //       })          
    //     })
    })    
})
