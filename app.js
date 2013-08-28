var express = require('express')
	, index   = require('./routes/index')
	, util		= require('util')
	, http		= require('http')
	, path		= require('path')
	
// setup app
var app = express();

// configure app
app.configure(function(){
	app.set('port', process.env.PORT || 2001);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('your secret here'));
	app.use(express.session());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

exports.path = 'http://localhost:' + app.get('port');

// setup paths to views
app.get('/', index.index);

// setup paths to functions



/* ---------------------------------------- */

// setup server
var server = http.createServer(app);

server.listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});
