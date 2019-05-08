var shortid = require('shortid');

var db = require('../db.js');

module.exports = async function(req, res, next) {

	var sessionId = shortid.generate();
	if(!req.signedCookies.sessionId) {
		res.cookie('sessionId', sessionId, {
	 		signed: true
		});

		db.get('sessions').push({
			Id: sessionId
		}).write();
	}

	next()
}