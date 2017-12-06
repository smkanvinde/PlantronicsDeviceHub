let $ = require('jquery')

var HID = require('./nodehid.js');
var devices = HID.devices();

$('#output').text(JSON.stringify(devices))