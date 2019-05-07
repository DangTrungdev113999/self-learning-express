var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
	Name: String,
	Image: String,
	Description: String
}); // Schema để khai báo các feld có trong object, làm sạch dữ liệu, validate dữ liệu

var Product = mongoose.model('Product', productSchema, 'products');
// tên, Schema, collection muốn thao tác 


module.exports = Product;