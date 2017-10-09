let $ = require('jquery')

/*************** output the list of device names ********************/
var cur_device_list = [];

function getHIDdata() {
  var device_list = [];
  var display_names = [];

  var HID = require('./nodehid.js');
  var devices = HID.devices();
  for (i = 0; i < devices.length; i ++) {
      var id = ['serialNumber: ' + devices[i].serialNumber,
        'vendorID: ' + devices[i].vendorId,
        'product: ' + devices[i].product];
      var id_string = id.join(", ");
      if(!device_list.includes(id_string)) {
        device_list.push(id_string);
        display_names.push(devices[i].product)
      }
  }

  if (!(cur_device_list.length == device_list.length &&
        cur_device_list.every(function(u, i) {
        return u === device_list[i];}))) {
      cur_device_list = device_list;
      console.log(cur_device_list)
      $('#output').empty();
      $('#output').append("<ul></ul>");

      for(var i in display_names) {
          var li = "<li>";
          $("ul").append(li.concat(display_names[i]))
      }
  }
}

setInterval(getHIDdata, 400);

// $(document).ready(function(){
//   $('#devices').click(function(){
//     $('#output').toggle();
//   });
// });

// prototype of the object cointaining device information
// function device_obj () {
//   this.vendorId = 'Unknown',
//   this.productId = 'Unknown',
//   this.path = 'Unknown',
//   this.serialNumber = 'Unknown',
//   this.manufacturer = 'Unknown',
//   this.product = 'Unknown',
//   this.release = 'Unknown',
//   this.interface = 'Unknown',
//   this.usagePage = 'Unknown',
//   this.usage = 'Unknown'
// }

// /************************* parse the data *********************************/
// var devices_string = JSON.stringify(devices);
// var devices_string = devices_string.substring(2, devices_string.length - 2);
// var devices_string = devices_string.replace(/\"/g, '');
//
// var object_strings = devices_string.split(",{"); // splits the Objects
//
// var device_list = [];
// var device_objects = [];
// for (i=0; i < object_strings.length; i++) {
//   var device = object_strings[i];
//   var device_data = device.split(",");
//   var device_object = new device_obj();
//
//   for(j=0; j < device_data.length; j++) {
//     var data = device_data[j].split(":");
//     switch (data[0]) {
//       case "vendorId":
//         device_object.vendorId = data[1];
//         break;
//       case "productId":
//         device_object.productId = data[1];
//         break;
//       case "path":
//         device_object.path = data[1];
//         break;
//       case "serialNumber":
//         device_object.serialNumber = data[1];
//         break;
//       case "manufacturer":
//         device_object.manufacturer = data[1];
//         break;
//       case "product":
//         device_object.product = data[1];
//         break;
//       case "release":
//         device_object.release = data[1];
//         break;
//       case "interface":
//         device_object.interface = data[1];
//         break;
//       case "usagePage":
//         device_object.usagePage = data[1];
//         break;
//       case "usage":
//         device_object.usage = data[1];
//         break;
//       default:
//         console.log(data[0] + " is not a valid device metadata");
//     }
//   }
//
//   if(!device_list.includes(device_object.serialNumber)) {
//     device_list.push(device_object.serialNumber);
//     device_objects.push(device_object);
//   }
// }
//
//
// /*************** output the list of device names ********************/
// var output_list = [];
// for (i = 0; i < device_objects.length; i ++) {
//   output_list.push(device_objects[i].product);
// }
// $('#output').text(output_list.join(", "))
