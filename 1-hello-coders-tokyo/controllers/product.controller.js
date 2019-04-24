var db = require('../db');

module.exports.index = function(req, res) {
	var page =  parseInt(req.query.page) || 1; // n
	var perPage = 8; // x

	var start = (page - 1) * perPage;
	var end = page * perPage;

	var drop = (page - 1) * perPage;

	var Previous = page - 1;
	var next = page + 1;

	var length = db.get('products').value().length
	var startGame = 1;
	var endGame =  Math.ceil(length/perPage);

    res.render('products/index', {
    	// cách 1
     //    products: db.get('products').value().slice(start, end)
     
     	// cách 2
     	products: db.get('products').drop(drop).take(perPage).value(),
     	
     	Previous: Previous,
     	next: next,
     	startGame: startGame,
     	endGame: endGame

    });
}
