const request = require('superagent')
const random = require('../src/utils')
const {branches} = require('../src/models')

let baseurl = 'localhost:3000/api/v1/branches'

describe('Branches API', () => {
  var names = []
  var ids = []

  beforeAll(() => {
    let promises = []
    for(let i = 0; i < 5; i++){
      let branch_name = `name_at_index_${i}`
      names.push(branch_name)
      promises.push(branches.create({
        data: {
          name: branch_name,
          location: `(163.84${i}), (163.84${i})`,
          contact_info: `279-696-649${i}`,
          address: `${i} Rick Meadow`
        }
      }, {returning: 'id'})
      .then(data =>{
        ids.push(data.id)
      })
      .catch(error =>
        console.warn(error)
      )
    )}
    return Promise.all(promises).then(data => {
      console.info("Test data created!")      
    })
  })

  afterAll(() => {
    branches.destroy({
      where: {},
      truncate: true
    })
    .on("success", () =>{
      console.log("Successfully deleted all entries from the database")
    })       
    .catch(error => {
        console.warn('Failed to delete from test DB:', error);
      })    
  })

  describe('Given the root URL', () => {
    test('should be able to GET a list of all branches', () => {
      request.get(baseurl, (error, response) => {        
        let data = response.body.data                
        data.forEach((branch, index) => {
            console.log(`Expecting ${branch.data.name} toBe ${names[index]}`)
            expect(branch.data.name).toBe(names[index])
        })
        expect(response.status).toBe(200)
      })
    })

    // test('should be able to POST an entry', () => {
    //   let test_data = {
    //     name: 'Test Value',
    //     location: '(175.7120, 124.123)',
    //     contact_info: '291-144-3788',
    //     address: '6815 Kasarani'
    //   }

    //   request.post(baseurl)
    //     .send({
    //       'name': test_data.name,
    //       'location': test_data.location,
    //       'contact_info': test_data.contact_info,
    //       'address': test_data.address
    //     })
    //     .set('Accept', 'application/json')
    //     .then(res => {          
    //       let data = res.body.data          
    //       let status = res.status          
    //       expect(status).toBe(200)
    //       return branches.findById(data.id)
    //         .then(entry => {              
    //           expect(entry.data.name).toBe(test_data.name)
    //           expect(entry.data.location).toBe(test_data.location)
    //           expect(entry.data.contact_info).toBe(test_data.contact_info)
    //           expect(entry.data.address).toBe(test_data.address)              
    //         })
    //         .catch(error => {
    //           console.error(' An find error occurred:', error);
    //         })          
    //     })      
    //     .catch(error => {
    //       console.error('A POST error occurred:', error);
    //     })
    //   })        
    // })

    describe("Given a branch_id url", () => {
      test("Should be able to GET the branch data", () => {
        ids.forEach(id => {
          let url = `${baseurl}/${id}`
          request.get(url, (error, response) => {        
            let data = response.body.data
            data.forEach((branch, index) => {
                expect(branch.data.name).toBe(names[index])
            })
            expect(response.status).toBe(200)
          })
        })        
      })

      // test("Should be able to PATCH(UPDATE) the branch data", () => {

      //   let update_data = {
      //     name: 'Patch Value',
      //     location: '(100.123, 100.7120)',
      //     contact_info: '144-378-2915',
      //     address: '6815 Updated Locale'
      //   }        
      //   let promises = []        
      //   ids.forEach(id => {
      //     let url = `${baseurl}/${id}`
      //     promises.push(
      //     request.patch(url)
      //     .send({
      //       'name': update_data.name,
      //       'location': update_data.location,
      //       'contact_info': update_data.contact_info,
      //       'address': update_data.address
      //     })
      //     .set('Accept', 'application/json')
      //     .then(res => {            
      //       let data = res.body.data
      //       let status = res.status
      //       let success = res.body.success
      //       expect(res.status).toBe(200)
      //       expect(res.body.success).toBe(true)
            
      //       db.any(`select * from branches where branch_id = ${id}`)
      //         .then(data => {
      //           console.log("data is: ", data)
      //           let entry = data[0]                            
      //           expect(entry.data.name).toBe(update_data.name)
      //           expect(entry.data.location).toBe(update_data.location)
      //           expect(entry.data.contact_info).toBe(update_data.contact_info)
      //           expect(entry.data.address).toBe(update_data.address)
      //         })
      //         .catch(error => {
      //           console.error(' Could not SELECT data:', error);
      //         })                         
      //       })
      //     .catch(error => {
      //       console.error('Could not PATCH data:', error);          
      //     })
      //   )})
      //   return Promise.all(promises).then(console.log("Done!"))
      })
    })
})
