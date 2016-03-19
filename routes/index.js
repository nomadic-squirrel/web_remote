var express = require('express');
var router  = express.Router();
var inspect = require( 'util' ).inspect;

/* GET home page. */
router.post( '/', function( req, res, next ) {
  console.log( 'Req: ' + inspect( req.query, null, 3 ) );

  res.status( 200 ).send( 'OK' );
});

module.exports = router;
