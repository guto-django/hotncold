var users = {}

module.exports = {
	'r':function(id,user,res){
			console.log(users)
			if(id in users){
				res.writeHead(404,{'Content-type':'text/plain'})
				res.end("Id already registered")
			}
			else{
				users[id] = {'name':user,'lat':0,'long':0}
				res.writeHead(200,{'Content-type':'text/plain'})
				res.end("Registered the user")
	
			}
			console.log(users)
		},
	'l':function(res){
				res.writeHead(200,{'Content-type':'text/plain'})
				res.end(JSON.stringify(users))
		},
	'g':function(id,res){

			if(id in users){
				res.writeHead(200,{'Content-type':'text/plain'})
				res.end(JSON.stringify(users[id]))
			}
			else{
				res.writeHead(404,{'Content-type':'text/plain'})
				res.end("No user with "+id)
	
			}
		},
	'p':function(id,lon,lat,res){	
			if(id in users){
				users[id]['long'] = lon
				users[id]['lat'] = lat
				res.writeHead(200,{'Content-type':'text/plain'})
				res.end("Coordinates stablished")
			}
			else{
				res.writeHead(404,{'Content-type':'text/plain'})
				res.end("Id not registered")	
			}
	}		
}

