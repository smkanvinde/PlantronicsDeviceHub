var http = require("http");
let $ = require('jquery');

var username = global.localStorage.getItem("new_username"); // contains the current user logged in

var client_device_id = []; // holds all the device id's of client devices
var client_device_metadata = []; // holds all the device metadata of client devices

var cur_device_id = []; // holds the current unique device id list of connect devices being displayed
var cur_device_name = []; // holds the device names that are currently displayed
var cur_device_metadata = []; // holds the device metadata that is currently displayed

var DB_devices = []; // holds all devices in the database

/* creates the metadata string that will be displayed on the UI */
function metadata_str (device) {
  return (
    "<li class='list-group-item' font color = '#ffffff' style='background-color: #bf5700'>" + 'interface: ' + device.interface + "</li>" +
    "<li class='list-group-item' font color = '#ffffff' style='background-color: #bf5700'>" + 'manufacturer: ' + device.manufacturer + "</li>" +
    "<li class='list-group-item' font color = '#ffffff' style='background-color: #bf5700'>" + 'path: ' + "<br/>\u{2022} " + device.path.replace(/, /g, '<br/>\u{2022} ') + "<br/></li>" +
    "<li class='list-group-item' font color = '#ffffff' style='background-color: #bf5700'>" + 'product: ' + device.product + "</li>" +
    "<li class='list-group-item' font color = '#ffffff' style='background-color: #bf5700'>" + 'productId: ' + device.productId + "</li>" +
    "<li class='list-group-item' font color = '#ffffff' style='background-color: #bf5700'>" + 'release: ' + device.release + "</li>" +
    "<li class='list-group-item' font color = '#ffffff' style='background-color: #bf5700'>" + 'serialNumber: ' + device.serialNumber + "</li>" +
    "<li class='list-group-item' font color = '#ffffff' style='background-color: #bf5700'>" + 'usage: ' + device.usage + "</li>" +
    "<li class='list-group-item' font color = '#ffffff' style='background-color: #bf5700'>" + 'usagePage: ' + device.usagePage + "</li>" +
    "<li class='list-group-item' font color = '#ffffff' style='background-color: #bf5700'>" + 'vendorId: ' + device.vendorId + "</li>"
    );
}

//style='background-color: #bf5700'>
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

function getDBData() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", "http://ec2-18-221-169-223.us-east-2.compute.amazonaws.com:3000/api/products", false ); // false for synchronous request
  xmlHttp.send( null );
  DB_devices = JSON.parse(xmlHttp.responseText);
}

function getSpecifcData(id) {

  // if(id) {
  //   console.log(id)
  //   var xmlHttp = new XMLHttpRequest();
  //   var link = "http://ec2-18-221-169-223.us-east-2.compute.amazonaws.com:3000/api/products" + "/" + id;
  //   xmlHttp.open( "GET", link, false ); // false for synchronous request
  //   xmlHttp.send( null );
  //   return JSON.parse(xmlHttp.responseText);
  // }

  getDBData(); // get all the devices in the database
  /* look for the device with the correct id */
  for(i = 0; i < DB_devices.length; i++) {
     if(DB_devices[i]._id == id) { return DB_devices[i];}
   }
}

function updateSpecifcData() {

}

/* initializes the client device metadata with the data in MongoDB */
function initClientMetadata() {
  /* parse through each device in the database */
  getDBData(); // get all the devices in the database
  for(i = 0; i < DB_devices.length; i++) {
     /* if the devices belongs to the user, add it to the client devices */
     if(DB_devices[i].userId == username) {
       /* generates the unique device id (Serial, VID, PID) */
       var id = ['serialNumber: ' + DB_devices[i].serialNumber,
                 'vendorID: ' + DB_devices[i].vendorId,
                 'product: ' + DB_devices[i].productId];
       var id_string = id.join(", ");
       device_idx = client_device_id.indexOf(id_string);

       if(device_idx == -1) {
         /* device in the database isn't in the client database, add it */
         client_device_id.push(id_string);
         client_device_metadata.push(DB_devices[i]);
       }
     }
   }

   /* keep checking for devices every x ms */
   setInterval(getHIDdata, 200);

   /* keep checking for updates every x ms */
   //setInterval(updateClientMetadata, 1000);
}

/* updates client device metadata if any changes were made in MongoDB */
function updateClientMetadata() {
  /* assumes server has the most recent information */
  for(i = 0; i < client_device_metadata.length; i++) {
    updatedData = getSpecifcData(client_device_metadata[i]._id);
    if(!(typeof updatedData === "undefined")) {
      client_device_metadata[i] = updatedData;
      // console.log(client_device_metadata[i]);
      var id = ['serialNumber: ' + client_device_metadata[i].serialNumber,
                'vendorID: ' + client_device_metadata[i].vendorId,
                'product: ' + client_device_metadata[i].productId];
      var id_string = id.join(", ");
      client_device_id[i] = id_string;
    }
  }
}

/**** acquires and process the HID data for display and client/server registration ****/
function getHIDdata() {
  var device_id = []; // contains the unique device id of each deivce (Serial, VID, PID)
  var device_metadata = []; // contains all the metadata for each unique device
  var HID = require('./nodehid.js');
  var devices = HID.devices();

  /* acquires the device metadata, and parses it to find each unique device that is currently connected. */
  for (i = 0; i < devices.length; i ++) {
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
      device_metadata.push(devices[i]);
    } else {
      /* the device is in the display list, so add the additional usage and usage page*/
      var idx = device_id.indexOf(id_string);
      device_metadata[idx].path = device_metadata[idx].path + ', ' + devices[i].path;
      device_metadata[idx].usage = device_metadata[idx].usage + ', ' + devices[i].usage;
      device_metadata[idx].usagePage = device_metadata[idx].usagePage + ', ' + devices[i].usagePage;
    }
  }

  var new_cur_display_name = [];
  var new_cur_device_metadata = [];
  for(i = 0; i < device_id.length; i ++) {
    /* update the client device metadata if a unregistered device was connected,
       and send that information to the server for registration*/
    device_idx = client_device_id.indexOf(device_id[i]);
    if(device_idx == -1) {
      /* the device is not currently in the client list, so add and register it */
      client_device_id.push(device_id[i]); // add it to client device list
      client_device_metadata.push(device_metadata[i]); // save the device metadata
      sendData(device_metadata[i]); // send data to server for server registration
    } else {
      /* generate what will be displayed, uses whats stored in the client database */
      new_cur_device_metadata.push(client_device_metadata[device_idx]);
      new_cur_display_name.push(client_device_metadata[device_idx].product);
    }
  }

  /* update the display, if the device list has changed*/
  if (!((cur_device_metadata.length == new_cur_device_metadata.length) &&
        cur_device_metadata.every(function(u, i) {
        return JSON.stringify(u) === JSON.stringify(new_cur_device_metadata[i]);}))) {
      /* update the current display lists */
      cur_device_metadata = new_cur_device_metadata;
      cur_device_name = new_cur_display_name;

      /* refresh the display */
      $('#output').empty();
      for(var i in cur_device_name) {
          $("#output").append("<ul class='panel panel-default' font color = '#ffffff' style='background-color: #bf5700'>" + (cur_device_name[i]))
          $("#output").append("<div class = 'panel-body' ' font color = '#ffffff' style='background-color: #bf5700'>" + (metadata_str(cur_device_metadata[i])) + "<div>" + "</ul>");
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

initClientMetadata(); // start the client device page
