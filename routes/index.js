var express = require('express');
var router  = express.Router();
var inspect = require( 'util' ).inspect;


router.post( '/irsend', function( req, res, next ) {

	var lirc    = req.app.locals.lirc;
	var winston = req.app.locals.winston;

	winston.info(  'Remote: ' + req.query.remote + '. Cmd: ' + req.query.code );

  // We should probably sanitize the inputs here. 
  // Unless we can get lirc_node to use something other than exec
  lirc.irsend.send_once( req.query.remote, req.query.code, function ( err, stdout, stderr ) {

  	if( err ) {
  		winston.error( 'Error running send_once: ' + err );
  		res.status( 500 ).send( 'It broke' );
  		return;

  	}

  	res.status( 200 ).send( 'OK' );

  } );
  
  // It's probably ok. We won't really know 
  // because of the async nature of this stuff
  //res.status( 200 ).send( 'OK' );
});

module.exports = router;
