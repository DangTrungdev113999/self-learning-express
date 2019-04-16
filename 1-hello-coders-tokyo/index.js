var express = require('express');
var app = express();

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views')

app.get('/', function(req,res) {
	res.render('index', { // tham số thứ nhất là path này tính từ ./views
		"name" : "Dang Trung" // tham số thứ hai là object
	});
})

app.get('/user', function(req,res) {
	res.render('users/index', {
		users: [
			{id:1, name: "trung"},
			{id:2, name: "nam"}
		]
	});
})

// HÀM GET LÀ LẤY require và trả về response
app.listen(port, function(){
	console.log('server listening on ' + port);
})