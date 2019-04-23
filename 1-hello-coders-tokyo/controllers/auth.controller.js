var md5 = require('md5');

var db = require('../db'); // do không nằm chung folder nên phải ra ngoài folder

module.exports.login = function(req, res) {
	res.render('auth/login')
}

module.exports.postlogin = function(req, res) {
	var email = req.body.email;
	var password = req.body.password;

	var user = db.get('users').find({email: email}).value();

	if(!user) {
		res.render('auth/login',{
			errors: [
				'User doew not exist'
			],
			values: req.body
		});
		return;
	  }

	  var hashedPassword = md5(password);

	 if (user.password !== hashedPassword) {
	 	res.render('auth/login', {
	 		errors: [
	 			'wrong password'
	 		],
	 		values: req.body
	 	});
	 	return;
	 }


	 res.cookie('userId', user.id, {
	 	signed: true
	 });
	 res.redirect('/users');
}

