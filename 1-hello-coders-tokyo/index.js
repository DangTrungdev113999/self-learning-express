var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var users = [
		{id:1, name: "trung"},
		{id:2, name: "nam"},
		{id:3, name: "hung"}
	];

app.get('/', function(req,res) {
	res.render('index', { // tham số thứ nhất là path này tính từ ./views
		"name" : "Dang Trung" // tham số thứ hai là object
	});
})
 
app.get('/users', function(req,res) {
	res.render('users/index', {
		users: users
	});
})

app.get('/users/search', function(req, res) {
	var q = req.query.q;
	var machedUsers = users.filter(function(user) {
		return user.name.toLowerCase().indexOf(q.toLowerCase()) ==! -1
		// nếu q nằm trong user.name thì sẽ trả về giá trị > -1
		// nếu q không nằm trong user.name thì sẽ trả về giá trị < -1
	})
	//render
	res.render('users/index', {
		users: machedUsers
	});
})

app.get('/users/create', function(req, res) {
	res.render('users/create')
})

// tạo một cái en poi để có thể trả lời được khi nhận một các request như vậy
app.post('/users/create', function(req, res) {
	users.push(req.body);

	// cho người dùng quay về trang users
	res.redirect("/users") 

	console.log(req.body);
	console.log(users);
})

// HÀM GET LÀ LẤY require và trả về response
app.listen(port, function(){
	console.log('server listening on ' + port);
})
