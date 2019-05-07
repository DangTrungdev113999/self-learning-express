var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	email: String,
	password: String,
	name: String,
	avatar: String,
	phone: String
}); // Schema để khai báo các feld có trong object, làm sạch dữ liệu, validate dữ liệu

var User = mongoose.model('User', userSchema, 'users');
// tên, Schema, collection muốn thao tác 

module.exports = User
