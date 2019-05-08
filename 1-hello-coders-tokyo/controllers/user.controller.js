var User = require('../models/user.model.js');

module.exports.index = async function(req, res) {
    var users = await User.find();
    res.render('users/index', {
        users: users
    });
}

module.exports.search = async function(req, res) { // đường dẫn bắt đầu bằng users nội tại
    var users = await User.find();
    var q = req.query.q;
    var machedUsers = users.filter(function(user) {
    return user.name.indexOf(q) ==! -1
    // nếu q nằm trong user.name thì sẽ trả về giá trị > -1
    // nếu q không nằm trong user.name thì sẽ trả về giá trị < -1
    })
    //render
    res.render('users/index', {
        users: machedUsers
    });
}

module.exports.create = async function(req, res) {
    res.render('users/create')
}

module.exports.get = async function(req, res) {
    var id = req.params.id // params khác với query
    var user = await User.findById(id);
    // sau đó render ra
    res.render('users/view', {
        user: user
    })
}

module.exports.postCreate = async function(req, res) {
    var users = await User.find();
    req.body.avatar = req.file.path.split('\\').slice(1).join('\\');
    
   users.push(req.body);
    // cho người dùng quay về trang users
    res.redirect("/users")
}