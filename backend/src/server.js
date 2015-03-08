
/*
 *	http for http server
 *
 * */
var http = require('http')
var daemon = require('./daemon')


/*
 *	Assert IP from wlp interface
 *
 * */
var os = require('os')

var ifaces = os.networkInterfaces()

var servip = ifaces['wlp3s0'][0]['address']


/*
 *	Modules that describe the services available
 *	
 * */


/*
 *	The server
 *
 * */

http.createServer(function(req,res){

	console.log("Recieved "+req.url+"\n\n")
	daemon(req,res)

}).listen(1337,servip)

console.log("Listenning port 1337 at "+servip)


