let $ = require('jquery')
var http = require("http");

var client_device_id = []; // holds all the device id's of client devices
var client_device_metadata = []; // holds all the device metadata of client devices

var cur_device_id = []; // holds the current unique device id list of connect devices being displayed
var cur_device_name = []; // holds the device names that are currently displayed
var cur_device_metadata = []; // holds the device metadata that is currently displayed

/* creates the metadata string that will be displayed on the UI */
function metadata_str (device) {
  return (
    'interface: ' + device.interface + "<br \>" +
    'manufacturer: ' + device.manufacturer + "<br \>" +
    'path: ' + device.path + "<br \>" +
    'product: ' + device.product + "<br \>" +
    'productId: ' + device.productId + "<br \>" +
    'release: ' + device.release + "<br \>" +
    'serialNumber: ' + device.serialNumber + "<br \>" +
    'usage: ' + device.usage + "<br \>" +
    'usagePage: ' + device.usagePage + "<br \>" +
    'vendorId: ' + device.vendorId + "<br>"
    );
}

/* acquires and process the HID data for display and client and server registration */
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
        device_id.push(id_string);
        display_names.push(devices[i].product)
        device_metadata.push(devices[i]);
      } else {
        /* the device is in the display list, so add the additional usage and usage page*/
        var idx = device_id.indexOf(id_string);
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
          sendData(JSON.stringify(cur_device_metadata[i])); // send data to server for server registration

          // console.log(cur_device_metadata[i]);
          console.log(JSON.stringify(cur_device_metadata[i]));
          // console.log(client_device_metadata); // show the client device metadata for debugging
        }
      }

      // console.log(devices); // show all metadata for debugging

      /* refresh the display */
      $('#output').empty();
      for(var i in cur_device_name) {
          $("#output").append("<li>" + (cur_device_name[i]) + "</li>")
          $("#output").append("<p>" + (metadata_str(cur_device_metadata[i])) + "</p>")
          $('p').hide();
      }

      /* function to toggle the device metadata when the product name is clicked*/
      $(document).ready(function(){
        $('li').click(function(){
          $(this).next('p').toggle();
        });
      });
  }
}

/* keep checking for devices every x ms */
setInterval(getHIDdata, 200);

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

req.write(data);
req.end();
}
