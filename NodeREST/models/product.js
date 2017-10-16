// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var productSchema = new mongoose.Schema({
    vendorID: Number,
    productID: Number,
    path: String,
    serialNumber: String,
    manufacturer: String,
    product: String,
    release: Number,
    interface: Number,
    usagePage: Number,
    usage: Number

});

// Return model
module.exports = restful.model('Products', productSchema);
