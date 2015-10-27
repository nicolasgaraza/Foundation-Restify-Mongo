
var restify = require('restify')
,config = require('../config.js').app
,fs = require('fs');

var controllers = {}, 
controllers_path = process.cwd() + '/serverapp/controllers';

fs.readdirSync(controllers_path).forEach(function (file) {
    if (file.indexOf('.js') != -1) {
        controllers[file.split('.')[0]] = require(controllers_path + '/' + file)
    }
});


var server = restify.createServer({
  //certificate: fs.readFileSync('path/to/server/certificate'),
  //key: fs.readFileSync('path/to/server/key'),
  name: 'Foundation-Restify-Mongo'
});


server
    .use(restify.acceptParser(server.acceptable))
    .use(restify.queryParser())
    .use(restify.dateParser(60))
    .use(restify.CORS())
    .use(restify.bodyParser());

if(config.SERVE_STATIC_CONTENT)
    require('./staticContentServer.js')(server);

function send(req, res, next) {
	res.send('hello ' + req.params.name);
	return next();
}

server.post('/hello', function create(req, res, next) {
	res.send(201, Math.random().toString(36).substr(3, 8));
	return next();
});
server.put('/hello', send);
server.get('/hello/:name', send);
server.head('/hello/:name', send);
server.del('hello/:name', function rm(req, res, next) {
	res.send(204);
	return next();
});

server.get('/todo', controllers.todo.getTodos);
server.post('/todo', controllers.todo.createTodo);

server.on('InternalServer', function (req, res, err, cb) {
  err.body = 'something is wrong!';
  return cb();
});


var port = config.PORT || 8080;
server.listen(port, function (err) {
    if (err)
        console.error(err)
    else
        console.log('App is ready at : ' + port)
})

if (process.env.environment == 'production'){
    process.on('uncaughtException', function (err) {
        console.error(JSON.parse(JSON.stringify(err, ['stack', 'message', 'inner'], 2)))
    });
}
