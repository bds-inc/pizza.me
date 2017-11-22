const request = require( 'superagent' )
let baseurl = 'localhost:3000/branches'

describe( 'Branches API', () => {
  describe( 'Given the root URL', () => {
    it( 'should be able to return a list of all branches', ( done ) => {
      request.get( baseurl, ( error, response ) => {
        expect( response.status ).toBe( 200 )
        expect( response.body[ 0 ].id ).toBe( 8 )
        expect( response.body[ 0 ].name ).toBe( 'Kovacek Plain' )
        expect( response.body[ 0 ].location ).toBe( '163.8408' )
        expect( response.body[ 0 ].contact_info ).toBe( '279-696-6495' )
        expect( response.body[ 0 ].address ).toBe( '287 Rick Meadow' )
        done()
      } )
    } )
    it( 'should be able to add an entry', ( done ) => {
      request.post( baseurl )
            .send( { 'name': 'Test Value', 'location': '175.7120', 'contact_info': '291-144-3788', 'address': '6815 Kasarani' } )
            .set( 'Accept', 'application/json' )
            .end( ( err, res ) => {
              expect( res.status ).toBe( 201 )
              request.get( baseurl, ( error, response ) => {
                let entry = response.body.slice( -1 ).pop()

                expect( response.status ).toBe( 200 )
                expect( entry.name ).toBe( 'Test Value' )
                expect( entry.location ).toBe( 175.7120 )
                expect( entry.contact_info ).toBe( '291-144-3788' )
                expect( entry.address ).toBe( '6815 Kasarani' )
                done()
              } )
            } )
    } )

    afterAll( done => {
      request.get( baseurl, ( error, response ) => {
        let _id = response.body.slice( -1 ).pop().id
        request.delete( `${baseurl}/${_id}` )
          .end( ( err, res ) => {
            expect( res.status ).toBe( 200 )
          } )
      } )
      done()
    } )
  } )

  describe( 'given a branch ID', () => {
    it( 'should be able to GET the data', ( done ) => {
      request.get( `${baseurl}/8`, ( error, response ) => {
        expect( response.status ).toBe( 200 )
        expect( response.body.id ).toBe( 8 )
        expect( response.body.name ).toBe( 'Kovacek Plain' )
        expect( response.body.location ).toBe( '163.8408' )
        expect( response.body.contact_info ).toBe( '279-696-6495' )
        expect( response.body.address ).toBe( '287 Rick Meadow' )
        done()
      } )
    } )
    it( 'should be able to PATCH the data', ( done ) => {
      request.patch( `${baseurl}/9` )
        .send( { 'name': 'Patch Value', 'location': '154.722', 'contact_info': '254-702-3788', 'address': '6815 Mirema' } )
        .end( ( error, response ) => {
          expect( response.status ).toBe( 200 )
          expect( response.body.id ).toBe( 9 )
          expect( response.body.name ).toBe( 'Patch Value' )
          expect( response.body.location ).toBe( 154.722 )
          expect( response.body.contact_info ).toBe( '254-702-3788' )
          expect( response.body.address ).toBe( '6815 Mirema' )
          done()
        } )
    } )

    it( 'should be able to DELETE the record', ( done ) => {
      request.delete( `${baseurl}/10` )
        .end( ( err, res ) => {
          expect( res.status ).toBe( 200 )
          request.get( `${baseurl}/10` ).end( ( err, res ) => {
            expect( res.body ).toBe( 404 )
            expect( res.body ).toEqual( {} )
          } )
        } )
      done()
    } )

    afterAll( ( done ) => {
      request.patch( `${baseurl}/9"` )
        .send( { 'name': 'Keanu Track', 'location': 65.7387, 'contact_info': '919-320-7344', 'address': '2695 Heaney Place' } )
        .end( ( err, res ) => {
          expect( res.status ).toBe( 200 )
        } )
      request.post( baseurl )
        .send( { 'id': 10, 'name': 'Mraz Isle', 'location': -55.0174, 'contact_info': '247-342-0232', 'address': '04324 Georgianna Estate' } )
        .set( 'Accept', 'application/json' )
        .end( ( err, res ) => {
          expect( res.status ).toBe( 201 )
        } )
      done()
    } )
  } )
} )
