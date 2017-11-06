// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var productSchema = new mongoose.Schema({
    vendorId: Number,
    productId: Number,
    userId: String,
    userCompany: String,
    path: String,
    serialNumber: String,
    manufacturer: String,
    product: String,
    release: Number,
    interface: Number,
    usagePage: String,
    usage: String,
    generic1: String,
    generic2: String,
    generic3: Number

});

// Return model
module.exports = restful.model('Products', productSchema);
