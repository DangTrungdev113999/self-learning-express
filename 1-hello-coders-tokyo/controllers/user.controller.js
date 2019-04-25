var db = require('../db') // do không nằm chung folder nên phải ra ngoài folder
var shortid = require('shortid');

module.exports.index = function(req, res) {
    res.render('users/index', {
        users: db.get('users').value() // đọc giá trị trong thàng defalets trên kia ra 
    });
}

module.exports.search = function(req, res) { // đường dẫn bắt đầu bằng users nội tại

    var q = req.query.q;
    var machedUsers = db.get('users').value().filter(function(user) {
        return user.name.indexOf(q) ==! -1
        // nếu q nằm trong user.name thì sẽ trả về giá trị > -1
        // nếu q không nằm trong user.name thì sẽ trả về giá trị < -1
    })
    //render
    res.render('users/index', {
        users: machedUsers
    });
}

module.exports.create = function(req, res) {
    res.render('users/create')
}

module.exports.get = function(req, res) {
    var id = req.params.id // params khác với query
    var user = db.get('users').find({ id: id }).value()

    // sau đó render ra
    res.render('users/view', {
        user: user
    })
}

module.exports.postCreate = function(req, res) {
    req.body.id = shortid.generate();
    req.body.avatar = req.file.path.split('\\').slice(1).join('\\');

    // đọc và ghi vào db.json
    db.get('users').push(req.body).write();
    // cho người dùng quay về trang users
    res.redirect("/users")
}