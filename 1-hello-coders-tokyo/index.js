var express = require('express');
var app = express();
var port = 3000;

app.get('/', function(require,response) {
	response.send('hello coders.tokyo');
})

app.get('/user', function(require,response) {
	response.send('<h1>hello coders.tokyo</h1>');
})

// HÀM GET LÀ LẤY require và trả về response

app.listen(port, function(){
	console.log('server listening on ' + port);
})