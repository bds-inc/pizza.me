const request = require('superagent')
const db = require('../src/db').db
const random = require('../src/utils')

let baseurl = 'localhost:3000/api/v1/branches'

describe('Branches API', () => {
  beforeAll(done => {
    for(let i = 0; i < 5; i++){
      db.branches.insert({
        id: i,
        name: random.random_word(5),
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
    done()    
  });
  afterAll(done => {
    db.any('select * from branches')
      .then(data => {        
        data.forEach(branch => db.branches.remove(branch.id))
      })
      .catch(error => {
        console.log('Oops!:', error);
      })
      done()
  })
  describe('Given the root URL', () => {

    it('should be able to GET a list of all branches', (done) => {
      request.get(baseurl, (error, response) => {
        expect(response.status).toBe(200)
        console.log("The data is: ", response.body)
        // expect(response.body[0].id).not.toBeNull()
        done()
      })
    })

    // it('should be able to POST an entry', (done) => {
    //   request.post(baseurl)
    //     .send({
    //       id: 7000000,
    //       'name': 'Test Value',
    //       'location': '175.7120',
    //       'contact_info': '291-144-3788',
    //       'address': '6815 Kasarani'
    //     })
    //     .set('Accept', 'application/json')
    //     .end((err, res) => {
    //       expect(res.status).toBe(201)
    //       request.get(`${baseurl}/7000000`, (error, response) => {
    //         let entry = response.body
    //         expect(response.status).toBe(200)
    //         expect(entry.name).toBe('Test Value')
    //         expect(entry.location).toBe(175.7120)
    //         expect(entry.contact_info).toBe('291-144-3788')
    //         expect(entry.address).toBe('6815 Kasarani')
    //       })
    //       done()
    //     })
    // })
  })  
})