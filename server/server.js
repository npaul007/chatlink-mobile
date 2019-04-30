// engine
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').createServer(app);  
const io = require('socket.io')(server);

app.use(express.static('./'));

app.use(bodyParser.urlencoded({extended: true}));

server.listen(process.env.PORT || 3000,function(){
	console.log("Chatlink server up and running!");
}); 

io.on('connection', function(client) {  	
    client.on('join', function(data) {
        console.log(data);
	});
	
	client.on('msgToServer', function(msgObj) {
		console.log(msgObj);
    	io.sockets.emit(JSON.parse(msgObj).roomId,msgObj);
	});
});