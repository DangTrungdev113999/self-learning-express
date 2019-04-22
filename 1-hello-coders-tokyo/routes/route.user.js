var express = require('express');

var controller = require('../controllers/user.controller.js')
var validation = require('../validation/user.validation.js')

var authMiddleware = require('../middleware/login.middleware')

var router = express.Router();

router.get('/', controller.index);

router.get('/cookies', function(req, res, next) {
	res.cookie('user-id', 12345);
	res.send('hello');
})

// cái routing này để tìm kiếm
router.get('/search', controller.search)

// HÀM GET LÀ LẤY require và trả về response
router.get('/create', controller.create)

// cả thàng này gọi là routing, cái này là dyamic routing
router.get('/:id', controller.get)

// tạo một cái en poi để có thể trả lời được khi nhận một các request 
router.post('/create', validation.postCreate, controller.postCreate)

module.exports = router;