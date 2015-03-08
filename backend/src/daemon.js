


/*
 *	URL Parser 
 *
 *	Web server services
 *
 *
 * */
var url = require('url')
var services = require('./services')


/*
 *	Error message
 *
 * */
function send_error(res){
		res.writeHead(404, {'Content-Type': 'text/plain'})
		res.end("Malformed request request verb=h for help")
}


/*
 *	Verb options
 *
 *
 * */
var verbs = {
	'h':function(req,res){
			res.writeHead(200, {'Content-Type': 'text/plain'})
			res.write("Help Menu:\n\nVerbs:\n")
			res.write("\n\th -> This help message\n")
			res.write("\n\tr -> register\n\t\t parameters:\n\t\t\tuser: username\n\t\t\tid: unique id\n")
			res.write("\n\tl -> list users, no more parameters, gets users and id's\n")
			res.write("\n\tg -> get info\n\t\tparameters:\n\t\t\tid: id of a given user\n")
			res.write("\n\tp -> push coordinates to server\n\t\tparameters:\n\t\t\tid: unique id\n\t\t\tlong and lat\n")
		
			res.end()
		},
	'r':function(query,res){
			if(Object.keys(query).length == 3 && 'id' in query && 'user' in query)
					services['r'](query['id'],query['user'],res)
			else
				send_error(res)
		},
	'l':function(query,res){
			if(Object.keys(query).length == 1)
				services['l'](res)
			else
				send_error(res)
		},
	'g':function(query,res){
			if(Object.keys(query).length == 2 && 'id' in query)
				services['g'](query['id'],res)
			else
				send_error(res)
		},
	'p':function(query,res){
			if(Object.keys(query).length == 4 && 'id' in query && 'long' in query && 'lat' in query)
				services['p'](query['id'],{
					'long':query['long'],
					'lat':query['lat']
				}, res)
			else
				send_error(res)
		}
}



/*
 *	parsing verb function
 *
 * */
module.exports = function(req,res){
	
	var url_parts = url.parse(req.url,true)
	
	var query = url_parts.query
		
	if('verb' in query && query['verb'] in verbs){

		var verb = query['verb']
		verbs[verb](query,res)		
	}
	else
		send_error(res)	
}

