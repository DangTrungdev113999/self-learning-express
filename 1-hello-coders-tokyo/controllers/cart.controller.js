var db = require('../db');

module.exports.addToCart = function(req, res, next) {
	var productId = req.params.productId;
	var sessionId = req.signedCookies.sessionId;

	if (!sessionId) {
		res.redirect('/product');
		return;
	}

	var count = db
		.get('sessions')
		.find({Id: sessionId})
		.get('cart.' + productId, 0)
		.value();

	db.get('sessions')
	  .find({Id: sessionId})
	  .set('cart.' + productId, count + 1)
	  .write();

	res.locals.count = db
		.get('sessions')
		.find({Id: sessionId})
		.get('cart.' + productId, count)
		.value();;

	res.redirect('/product');
	next();
}

module.exports.listItems = function(req, res, next) {
	res.render('cart/listItems')
}