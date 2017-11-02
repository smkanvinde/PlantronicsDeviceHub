let $ = require('jquery');
var http = require("http");
// require('bootstrap');

var username = "Jason"; // contains the current user logged in

var client_device_id = []; // holds all the device id's of client devices
var client_device_metadata = []; // holds all the device metadata of client devices

var cur_device_id = []; // holds the current unique device id list of connect devices being displayed
var cur_device_name = []; // holds the device names that are currently displayed
var cur_device_metadata = []; // holds the device metadata that is currently displayed

var DB_devices = []; // holds all devices in the database

/* creates the metadata string that will be displayed on the UI */
function metadata_str (device) {
  return (
    "<li class='list-group-item'>" +
    'interface: ' + device.interface + "</li>" +
    "<li class='list-group-item'>" +
    'manufacturer: ' + device.manufacturer + "</li>" +
    "<li class='list-group-item'>" +
    'path: ' + device.path + "</li>" +
    "<li class='list-group-item'>" +
    'product: ' + device.product + "</li>" +
    "<li class='list-group-item'>" +
    'productId: ' + device.productId + "</li>" +
    "<li class='list-group-item'>" +
    'release: ' + device.release + "</li>" +
    "<li class='list-group-item'>" +
    'serialNumber: ' + device.serialNumber + "</li>" +
    "<li class='list-group-item'>" +
    'usage: ' + device.usage + "</li>" +
    "<li class='list-group-item'>" +
    'usagePage: ' + device.usagePage + "</li>" +
    "<li class='list-group-item'>" +
    'vendorId: ' + device.vendorId + "</li>"
    );
}

/***************************** HTTP functions *********************************/
function sendData(data) {
  var options = {
    "method": "POST",
    "hostname": "ec2-18-221-169-223.us-east-2.compute.amazonaws.com",
    "port": "3000",
    "path": "/api/products",
    "headers": {
      "content-type": "application/json",
      "cache-control": "no-cache"
    }
  };

  var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);
      console.log("HTTP return");
      console.log(body.toString());
    });
  });

  req.write(JSON.stringify(data));
  req.end();
}

function getData() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", "http://ec2-18-221-169-223.us-east-2.compute.amazonaws.com:3000/api/products", false ); // false for synchronous request
  xmlHttp.send( null );
  DB_devices = JSON.parse(xmlHttp.responseText);
}


/******************** initalize the client devices based on username ******************/
getData();

/* parse through each device in the database */
for(i = 0; i < DB_devices.length; i++) {
 /* if the devices belongs to the user, add it to the client devices */
 if(DB_devices[i].userId == username) {
   /* generates the unique device id (Serial, VID, PID) */
   var id = ['serialNumber: ' + DB_devices[i].serialNumber,
             'vendorID: ' + DB_devices[i].vendorId,
             'product: ' + DB_devices[i].productId];
   var id_string = id.join(", ");

   if(!client_device_id.includes(id_string)) {
     client_device_id.push(id_string);
     client_device_metadata.push(DB_devices[i]);
   }
 }
}



/**** acquires and process the HID data for display and client and server registration ****/
function getHIDdata() {
  var device_id = []; // contains the unique device id of each deivce (Serial, VID, PID)
  var display_names = []; // contains the name of the devices that will be displayed
  var device_metadata = []; // contains all the metadata for each unique device

  /* acquires the device metadata, and parses it to find each unique device that is currently connected. */
  var HID = require('./nodehid.js');
  var devices = HID.devices();
  for (i = 0; i < devices.length; i ++) {
    /* if the metadata is valid and the device is not internal, process the data */
    if((devices[i].interface || devices[i].manufacturer  || devices[i].path  ||
       devices[i].product  || devices[i].productId  || devices[i].release  || devices[i].serialNumber ||
       devices[i].usage || devices[i].usagePage || devices[i].vendorId) && (devices[i].interface != -1)) {

      /* generates the unique device id (Serial, VID, PID) */
      var id = ['serialNumber: ' + devices[i].serialNumber,
                'vendorID: ' + devices[i].vendorId,
                'product: ' + devices[i].productId];
      var id_string = id.join(", ");

      /* checks to see if the device metadata corresponds to a new or existing device */
      if(!device_id.includes(id_string)) {
        /* a new device not in our display list was detected, add it to the display list */
        devices[i].userId = username; // add username to the metadata
        device_id.push(id_string);
        display_names.push(devices[i].product)
        device_metadata.push(devices[i]);
      } else {
        /* the device is in the display list, so add the additional usage and usage page*/
        var idx = device_id.indexOf(id_string);
        device_metadata[idx].path = device_metadata[idx].path + ',<br/> ' + devices[i].path;
        device_metadata[idx].usage = device_metadata[idx].usage + ', ' + devices[i].usage;
        device_metadata[idx].usagePage = device_metadata[idx].usagePage + ', ' + devices[i].usagePage;
      }
    }
  }

  /* update the display and send device metadata, if the device list has changed*/
  if (!(cur_device_id.length == device_id.length &&
        cur_device_id.every(function(u, i) {
        return u === device_id[i];}))) {

      /* update the current display lists */
      cur_device_id = device_id;
      cur_device_metadata = device_metadata;
      cur_device_name = display_names;

      /* update the client device metadata if a new device was connected,
         and send that information to the server for registration */
      for(i = 0; i < cur_device_id.length; i ++) {
        if(!client_device_id.includes(cur_device_id[i])) {
          /* the device is not currently in the client list, so add and register it */
          client_device_id.push(cur_device_id[i]); // add it to client device list
          client_device_metadata.push(cur_device_metadata[i]); // save the device metadata
          sendData(cur_device_metadata[i]); // send data to server for server registration
        }
      }

      /* refresh the display */
      $('#output').empty();
      // $("output").append("<div>");
      for(var i in cur_device_name) {
          $("#output").append("<ul class='panel panel-default'>" + (cur_device_name[i]))
          $("#output").append("<div class = 'panel-body'>" + (metadata_str(cur_device_metadata[i])) + "<div>" + "</ul>")
      }
      $('ul').next('div').hide();

      /* function to toggle the device metadata when the product name is clicked*/
      $(document).ready(function(){
        $('ul').click(function(){
          $(this).next('div').toggle();
        });
      });
  }
}

/* keep checking for devices every x ms */
setInterval(getHIDdata, 200);
