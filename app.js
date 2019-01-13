var express = require('express'),
  routes = require('./routes'),
  http = require('http'),
  path = require('path'),
  stylus=require('stylus');

var app = express();
//var mysql =  require('mysql');
//var sqlConnection =  mysql.createConnection({
 //   host : "localhost",
  //  user : "root",
   // password: ""
  //});
//sqlConnection.connect();
//sqlConnection.query("create database if not exists nodeDB");
//sqlConnection.query("insert into anno_log values('"+a+"','"+b+"','"+c+"')",function(err,res){ if(err){ // console.log(err);} else { console.log(res[0]); }});
app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser({uploadDir:__dirname+'/public/images/'}));
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(stylus.middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
  //app.use(express.bodyParser({uploadDir:'/path/to/temporary/directory/to/store/uploaded/files'}));
});

app.configure('development', function() {
  app.use(express.errorHandler());
});

// basic route
app.get('/', routes.index);
app.get('/control',routes.control);

// create the socket server
var server = http.createServer(app),
io = require('socket.io').listen(server);

// listen on the express port
server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
  
});

// io.enable('browser client minification'); // send minified client
// io.enable('browser client etag'); // apply etag caching logic based on version number
// io.enable('browser client gzip'); // gzip the file
// io.set('log level', 1); // reduce logging
io.sockets.on('connection', function (client) {
  // listen for device move

  client.on('devicemove', function (data) {
    // on devicemove then move square
    client.broadcast.emit('movesquare', data);
	client.on('changeImage',function(data){
		console.log('asda'+data);
	});
  });
  
});