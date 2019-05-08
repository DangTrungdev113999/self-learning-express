require('dotenv').config()

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
// var csurf = require('csurf');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/express-demo', { useNewUrlParser: true });

var userRoute = require('./routes/route.user');
var authRoute = require('./routes/route.auth');
var productRoute = require('./routes/route.product');
var cartRoute = require('./routes/route.cart');
// var transferRoute = require('./routes/router.transfer')

var apiProductRoute = require('./api/routes/product.route')

var authMiddleware = require('./middleware/login.middleware');
var sessionMiddleware = require('./middleware/session.middleware.js');

var app = express();

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); // không hỗ trợ mutilpart/form-data
app.use(bodyParser.urlencoded({ extended: true})); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware); // kiểm tra xem có cookies nào chưa, nếu chưa thì tạo.
// app.use(csurf({ cookie: true })); đang lỗi



app.use(express.static('public')) // static file

app.get('/', function(req, res) {
    res.render('index', { // tham số thứ nhất là path này tính từ ./views
        "name": "Dang Trung" // tham số thứ hai là object
    });
})

app.use('/users', authMiddleware.requireAuth, userRoute); // phải nhớ exports router thì mới dùng được, cái này để đánh dấu route bắt đầu bằng /users 
app.use('/product', productRoute);
app.use('/auth', authRoute);
app.use('/cart', cartRoute);
// app.use('/transfer', authMiddleware.requireAuth, transferRoute);

app.use('/api/product', apiProductRoute);

app.listen(port, function() {
    console.log('server listening on ' + port);
})