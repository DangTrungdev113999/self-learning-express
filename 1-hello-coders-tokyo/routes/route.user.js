var express = require('express');
var shortid = require('shortid');


var db = require('../db') // do không nằm chung folder nên phải ra ngoài folder

var router = express.Router();

router.get('/', function(req,res) { 
	res.render('users/index', {
		users: db.get('users').value() // đọc giá trị trong thàng defalets trên kia ra 
	});
})

// cái routing này để tìm kiếm
router.get('/search', function(req, res) {  // đường dẫn bắt đầu bằng users nội tại
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
router.get('/create', function(req, res) {
	res.render('users/create')
})

// cả thàng này gọi là routing, cái này là dyamic routing
router.get('/:id', function(req, res) {
	var id = req.params.id // params khác với query
	var user = db.get('users').find({ id: id }).value()

	// sau đó render ra
	res.render('users/view', {
		user: user
	})
})

// tạo một cái en poi để có thể trả lời được khi nhận một các request 
router.post('/create', function(req, res) {
	req.body.id = shortid.generate();
	// đọc và ghi vào db.json
	db.get('users').push(req.body).write();
	// cho người dùng quay về trang users
	res.redirect("/users") 
})

module.exports = router;