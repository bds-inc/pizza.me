const request = require('superagent')
let   baseurl = "localhost:3000/orders"

describe('Orders API', () => {
  describe('Given the root URL', () => {
    beforeAll(done => {
      // Guarantees that there's always at least one test record
      request.post(baseurl) // 
        .send({
          "id":6000000,
          "total":6000,
          "balance":3000,
          "due_date":new Date(),
          "creation_date":new Date(),
          "modified_date":new Date(),
          "email":"email@example.com",
          "status":0
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).toBe(201)
            request.get(`${baseurl}/6000000` , (error, response) =>{
              let entry = response.body
              expect(response.status).toBe(200)
              expect(entry.id).toBe(6000000)
              expect(entry.total).toBe(6000)
              expect(entry.balance).toBe(3000)
              expect(entry.email).toBe('email@example.com')
              expect(entry.status).toBe(0)
              done()
            })
        })
    })
    
    afterAll(done => {
      request.delete(`${baseurl}/6000000`)
        .end((err, res) => {
          expect(res.status).toBe(200)
          done()
        })
      request.delete(`${baseurl}/7000000`)
        .on(err => {
          done()
        })
        .end((err, res) => {
          expect(res.status).toBe(200)
          done()
        })
    })

    it ('should be able to GET a list of all orders', (done) => {
      request.get(baseurl , (error, response) =>{
        expect(response.status).toBe(200)
        expect(response.body[0].id).not.toBeNull()
        done()
      })
    })

    it ('should be able to POST an entry', (done) => {
      request.post(baseurl)
        .send({
          "id":7000000,
          "total":6000,
          "balance":3000,
          "due_date":new Date(),
          "creation_date":new Date(),
          "modified_date":new Date(),
          "email":"email@example.com",
          "status":0
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).toBe(201)
          request.get(`${baseurl}/7000000` , (error, response) =>{
            let entry = response.body            
            expect(response.status).toBe(200)
            expect(entry.id).toBe(7000000)
            expect(entry.total).toBe(6000)
            expect(entry.balance).toBe(3000)
            expect(entry.email).toBe('email@example.com')
            expect(entry.status).toBe(0)
          })
        done()
      })
    })        
  })
        
  describe('Given a order ID', () => {
    beforeAll((done) => {
      // Record to test for DELETE
      request.post(baseurl)
        .send({
          "id":5000000,
          "total":6000,
          "balance":3000,
          "due_date":new Date(),
          "creation_date":new Date(),
          "modified_date":new Date(),
          "email":"email@example.com",
          "status":0
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).toBe(201)
          done()
        })

      // Record to test for PATCH
      request.post(baseurl)
        .send({
          "id":9000000,
          "total":6000,
          "balance":3000,
          "due_date":new Date(),
          "creation_date":new Date(),
          "modified_date":new Date(),
          "email":"email@example.com",
          "status":0
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).toBe(201)
          done()
        })
    })
    
    afterAll((done) => {
      request.delete(`${baseurl}/9000000`)
        .end((err, res) => {
          expect(res.status).toBe(200)
          done()
      })
    })
    
    it ('should be able to GET the data', (done) => {
      request.get(`${baseurl}/5000000` , (error, response) =>{
        let entry = response.body
        expect(response.status).toBe(200)
        expect(entry.id).toBe(5000000)
        expect(entry.total).toBe(6000)
        expect(entry.balance).toBe(3000)
        expect(entry.email).toBe('email@example.com')
        expect(entry.status).toBe(0)
        done()
      })            
    })
    
    it ('should be able to PATCH the data', (done) => {
      request.patch(`${baseurl}/9000000`)
        .send({"total":7000,"balance":4000,"email":"you@me.com"})
        .end((error, response) =>{
          expect(response.status).toBe(200)
          expect(response.body.id).toBe(9000000)
          expect(response.body.total).toBe(7000)
          expect(response.body.balance).toBe(4000)
          expect(response.body.email).toBe('you@me.com')
          done()
        })
    })
    
    it ('should be able to DELETE the record', (done) => {
      request.delete(`${baseurl}/5000000`)
        .end((err, res) => {
          expect(res.status).toBe(200)
          request.get(`${baseurl}/5000000`)
            .end((error, response) => {
              expect(response.status).toBe(404)
              done()
            })
        })
    })
  })  
})