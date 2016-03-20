var express      = require('express');
var path         = require('path');
var logger       = require('morgan');
var winston      = require('winston');

var bodyParser   = require('body-parser');

var lirc         = require('lirc_node')

var routes = require('./routes/index');

lirc.init();

var app = express();

app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );

app.use( express.static( path.join( __dirname, 'public') ) );

app.use('/', routes );


winston.add( winston.transports.File, {
  level: 'info',
  filename: path.join( __dirname, 'web_remote.log' ),
  maxFiles: 2,
  maxsize: 2000000,
  timestamp: true,
  json: false
});

winston.info( 'Started' );


/*
function _init() {
  lirc.init();

}
*/

// _init();

app.locals.lirc    = lirc;
app.locals.winston = winston;


// catch 404 and forward to error handler
app.use( function( req, res, next ) {
  var err = new Error( 'Not Found' );
  err.status = 404;
  next( err );
});

// error handlers

// development error handler
// will print stacktrace
if ( app.get('env') === 'development') {
  app.use( function( err, req, res, next ) {
    res.status( err.status || 500 );
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use( function( err, req, res, next ) {
  res.status( err.status || 500 );
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
