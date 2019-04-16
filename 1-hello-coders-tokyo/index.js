var express = require('express');
var app = express();

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

var users = [
		{id:1, name: "trung"},
		{id:2, name: "nam"}
	];

app.get('/', function(req,res) {
	res.render('index', { // tham số thứ nhất là path này tính từ ./views
		"name" : "Dang Trung" // tham số thứ hai là object
	});
})
 
app.get('/user', function(req,res) {
	res.render('users/index', {
		users: users
	});
})

app.get('/user/search', function(req, res) {
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

	var search = document.getElementById('search');
	search.value = q;
})

// HÀM GET LÀ LẤY require và trả về response
app.listen(port, function(){
	console.log('server listening on ' + port);
})