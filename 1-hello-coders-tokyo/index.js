var express = require('express');
var bodyParser = require('body-parser');
var userRoute = require('./routes/route.user')
var app = express();

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static('public')) // static file

app.get('/', function(req,res) {
	res.render('index', { // tham số thứ nhất là path này tính từ ./views
		"name" : "Dang Trung" // tham số thứ hai là object
	});
})

app.use('/users', userRoute); // phải nhớ exports router thì mới dùng được, cái này để đánh dấu route bắt đầu bằng /users 

app.listen(port, function(){
	console.log('server listening on ' + port);
})
