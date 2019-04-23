var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var userRoute = require('./routes/route.user');
var authRoute = require('./routes/route.auth');

var authMiddleware = require('./middleware/login.middleware');

var app = express();

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser('dfsjdlkfoiuwseo1231'));


app.use(express.static('public')) // static file

app.get('/', function(req, res) {
    res.render('index', { // tham số thứ nhất là path này tính từ ./views
        "name": "Dang Trung" // tham số thứ hai là object
    });
})

app.use('/users', authMiddleware.requireAuth, userRoute); // phải nhớ exports router thì mới dùng được, cái này để đánh dấu route bắt đầu bằng /users 
app.use('/auth', authRoute);

app.listen(port, function() {
    console.log('server listening on ' + port);
})