var supertest = require('super-test-as-promised')
var request   = supertest('http://localhost:3000')
var assert    = require('chai').assert;

describe('Backend API', function() {
  it ('should return the list of users', function () {
    return request.get('/api/v1/users').
      expect(200)
  })
})

describe('Backend API Tests', () => {
  it('should return the list of branches', () => {
    return request.get('/api/v1/branches').
      expect(200)
  });


})
