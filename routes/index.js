var express = require('express');
var router  = express.Router();
var inspect = require( 'util' ).inspect;



/* GET home page. */
router.post( '/', function( req, res, next ) {
	var lirc = req.app.locals.lirc;

  console.log( 'Req: ' + inspect( req.query, null, 3 ) );
  console.log( 'Remote: ' + req.params.remote + '. Cmd: ' + req.params.code );

  lirc.irsend.send_once( req.params.remote, req.params.code, function () {} );
  

  res.status( 200 ).send( 'OK' );
});

module.exports = router;
