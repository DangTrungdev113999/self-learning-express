// var db = require('../db');

var Product = require('../../models/product.model')

module.exports.index = async function(req, res) {

    var products = await Product.find();// trả về các product trong database
    res.json(products)
};
