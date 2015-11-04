var restify = require('restify');

module.exports = function(server){
	console.log("Init static server");
	server.get('/home', restify.serveStatic({
  		directory: '../ClientApp/build',
  		file: 'index.html'
	}));
}