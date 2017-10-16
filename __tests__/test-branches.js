const request = require( 'superagent' )
let baseurl = 'localhost:3000/branches'

describe( 'Branches API', () => {
  describe( 'Given the root URL', () => {
    beforeAll( done => {
      // Guarantees that there's always at least one test record
      request.post( baseurl )
        .send( { id: 6000000, 'name': 'Kovacek Plain', 'location': '163.8408', 'contact_info': '279-696-6495', 'address': '287 Rick Meadow' } )
        .set( 'Accept', 'application/json' )
        .end( ( err, res ) => {
          expect( res.status ).toBe( 201 )
          request.get( `${baseurl}/6000000`, ( error, response ) => {
            let entry = response.body
            expect( response.status ).toBe( 200 )
            expect( entry.id ).toBe( 6000000 )
            expect( entry.name ).toBe( 'Kovacek Plain' )
            expect( entry.location ).toBe( 163.8408 )
            expect( entry.contact_info ).toBe( '279-696-6495' )
            expect( entry.address ).toBe( '287 Rick Meadow' )
            done()
          } )
        } )
    } )

    afterAll( done => {
      request.delete( `${baseurl}/6000000` )
        .end( ( err, res ) => {
          expect( res.status ).toBe( 200 )
          done()
        } )
      request.delete( `${baseurl}/7000000` )
        .end( ( err, res ) => {
          expect( res.status ).toBe( 200 )
          done()
        } )
    } )

    it( 'should be able to GET a list of all branches', ( done ) => {
      request.get( baseurl, ( error, response ) => {
        expect( response.status ).toBe( 200 )
        expect( response.body[ 0 ].id ).not.toBeNull()
        done()
      } )
    } )

    it( 'should be able to POST an entry', ( done ) => {
      request.post( baseurl )
        .send( {
          id: 7000000,
          'name': 'Test Value',
          'location': '175.7120',
          'contact_info': '291-144-3788',
          'address': '6815 Kasarani'
        } )
        .set( 'Accept', 'application/json' )
        .end( ( err, res ) => {
          expect( res.status ).toBe( 201 )
          request.get( `${baseurl}/7000000`, ( error, response ) => {
            let entry = response.body
            expect( response.status ).toBe( 200 )
            expect( entry.name ).toBe( 'Test Value' )
            expect( entry.location ).toBe( 175.7120 )
            expect( entry.contact_info ).toBe( '291-144-3788' )
            expect( entry.address ).toBe( '6815 Kasarani' )
          } )
          done()
        } )
    } )
  } )

  describe( 'Given a branch ID', () => {
    beforeAll( ( done ) => {
      // Record to test for DELETE
      request.post( baseurl )
        .send( {
          'id': 5000000,
          'name': 'Keanu Track',
          'location': 65.7387,
          'contact_info': '919-320-7344',
          'address': '2695 Heaney Place'
        } )
        .set( 'Accept', 'application/json' )
        .end( ( err, res ) => {
          expect( res.status ).toBe( 201 )
          done()
        } )

      // Record to test for PATCH
      request.post( baseurl )
        .send( {
          'id': 9000000,
          'name': 'Test Value',
          'location': '175.7120',
          'contact_info': '291-144-3788',
          'address': '6815 Kasarani'
        } )
        .set( 'Accept', 'application/json' )
        .end( ( err, res ) => {
          expect( res.status ).toBe( 201 )
          done()
        } )
    } )

    afterAll( ( done ) => {
      request.delete( `${baseurl}/9000000` )
        .end( ( err, res ) => {
          expect( res.status ).toBe( 200 )
          done()
        } )
    } )

    it( 'should be able to GET the data', ( done ) => {
      request.get( `${baseurl}/5000000`, ( error, response ) => {
        expect( response.status ).toBe( 200 )
        expect( response.body.id ).toBe( 5000000 )
        expect( response.body.name ).toBe( 'Keanu Track' )
        expect( response.body.location ).toBe( 65.7387 )
        expect( response.body.contact_info ).toBe( '919-320-7344' )
        expect( response.body.address ).toBe( '2695 Heaney Place' )
        done()
      } )
    } )

    it( 'should be able to PATCH the data', ( done ) => {
      request.patch( `${baseurl}/9000000` )
        .send( { 'name': 'Patch Value', 'location': '154.722', 'contact_info': '254-702-3788', 'address': '6815 Mirema' } )
        .end( ( error, response ) => {
          expect( response.status ).toBe( 200 )
          expect( response.body.id ).toBe( 9000000 )
          expect( response.body.name ).toBe( 'Patch Value' )
          expect( response.body.location ).toBe( 154.722 )
          expect( response.body.contact_info ).toBe( '254-702-3788' )
          expect( response.body.address ).toBe( '6815 Mirema' )
          done()
        } )
    } )

    it( 'should be able to DELETE the record', ( done ) => {
      request.delete( `${baseurl}/5000000` )
        .end( ( err, res ) => {
          expect( res.status ).toBe( 200 )
          request.get( `${baseurl}/5000000` )
            .end( ( error, response ) => {
              expect( response.status ).toBe( 404 )
              done()
            } )
        } )
    } )
  } )
} )
