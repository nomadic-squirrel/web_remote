var express = require('express');
var router  = express.Router();
var inspect = require( 'util' ).inspect;


router.post( '/irsend', function( req, res, next ) {
	var lirc = req.app.locals.lirc;

  console.log( 'Req: ' + inspect( req.query, null, 3 ) );
  console.log( 'Remote: ' + req.query.remote + '. Cmd: ' + req.query.code );

  lirc.irsend.send_once( req.query.remote, req.query.code, function ( err, stdout, stderr ) {
  	if( err ) {
  		console.log( 'exec error: ' + err );
  	}

  	console.log( 'stdout: ' + stdout );
  } );
  

  res.status( 200 ).send( 'OK' );
});

module.exports = router;
