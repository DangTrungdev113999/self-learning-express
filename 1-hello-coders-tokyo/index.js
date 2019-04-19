var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 3000;

var low = require('lowdb')
var FileSync = require('lowdb/adapters/FileSync')

var adapter = new FileSync('db.json')
var db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] })
  .write()


app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function(req,res) {
	res.render('index', { // tham số thứ nhất là path này tính từ ./views
		"name" : "Dang Trung" // tham số thứ hai là object
	});
})

app.get('/users', function(req,res) {
	res.render('users/index', {
		users: db.get('users').value() // đọc giá trị trong thàng defalets trên kia ra 
	});
})

app.get('/users/search', function(req, res) {
	var q = req.query.q;
	var machedUsers = db.get('users').value().filter(function(user) {
		return user.name.toLowerCase().indexOf(q.toLowerCase()) ==! -1
		// nếu q nằm trong user.name thì sẽ trả về giá trị > -1
		// nếu q không nằm trong user.name thì sẽ trả về giá trị < -1
	})
	//render
	res.render('users/index', {
		users: machedUsers
	});
})

// HÀM GET LÀ LẤY require và trả về response
app.get('/users/create', function(req, res) {
	res.render('users/create')
})

// tạo một cái en poi để có thể trả lời được khi nhận một các request 
app.post('/users/create', function(req, res) {
	// đọc và ghi vào db.json
	db.get('users').push(req.body).write();
	// cho người dùng quay về trang users
	res.redirect("/users") 
})


app.listen(port, function(){
	console.log('server listening on ' + port);
})
