var users = []
var n = 0

module.exports = {
	'r':function(coord,user,res){
		
			res.writeHead(200,{'Content-type':'text/plain'})
			res.end(Object.keys(users).length.toString())
			users[n] = {'user':user,'coord':coord}
			console.log("Registered "+users[n].user+" with id "+n+"\n\n")
			n++
		},
	'l':function(res){
				res.writeHead(200,{'Content-type':'text/plain'})
				res.end(JSON.stringify(users))
				console.log("Listed Users \n\n")
		},
	'g':function(id,res){

			if(id in users){
				res.writeHead(200,{'Content-type':'text/plain'})
				res.end(JSON.stringify(users[id]))
				console.log("Sent info from "+id+"\n\n")
			}
			else{
				res.writeHead(404,{'Content-type':'text/plain'})
				res.end("No user with "+id)
				console.log("No user with "+id+"\n\n")
			}
		},
	'p':function(id,coord,res){	
			if(id in users){
				users[id]['coord']['long'] = coord['long']
				users[id]['coord']['lat'] = coord['lat']

				res.writeHead(200,{'Content-type':'text/plain'})
				res.end("Coordinates stablished")
				console.log("Update coordinates of "+id+"\n\n")
			}
			else{
				res.writeHead(404,{'Content-type':'text/plain'})
				res.end("Id not registered")	
				console.log("No info of "+id+"\n\n")
			}
	}		
}


