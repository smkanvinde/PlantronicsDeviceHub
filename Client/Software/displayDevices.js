let $ = require('jquery')

/*************** output the list of device names ********************/
var cur_device_list = [];
var cur_device_name = [];
var cur_device_metadata = [];

function metadata_str (device) {
  return (
    'vendorId: ' + device.vendorId + "<br \>" +
    'productId: ' + device.productId + "<br \>" +
    'path: ' + device.path + "<br \>" +
    'serialNumber: ' + device.serialNumber + "<br \>" +
    'manufacturer: ' + device.manufacturer + "<br \>" +
    'release: ' + device.release + "<br \>" +
    'interface: ' + device.interface
    );
}

function getHIDdata() {
  var device_list = [];
  var display_names = [];
  var device_metadata = [];

  var HID = require('./nodehid.js');
  var devices = HID.devices();
  for (i = 0; i < devices.length; i ++) {
      var id = ['    serialNumber: ' + devices[i].serialNumber,
        'vendorID: ' + devices[i].vendorId,
        'product: ' + devices[i].product];
      var id_string = id.join(", ");
      if(!device_list.includes(id_string)) {
        device_list.push(id_string);
        display_names.push(devices[i].product)
        device_metadata.push(metadata_str(devices[i]));
      }
  }

  if (!(cur_device_list.length == device_list.length &&
        cur_device_list.every(function(u, i) {
        return u === device_list[i];}))) {
      cur_device_list = device_list;
      cur_device_metadata = device_metadata;
      cur_device_name = display_names;

      $('#output').empty();

      for(var i in cur_device_name) {
          var li = "<li>";
          var p = "<p>";
          var li_end = "</li>";
          var p_end = "</p>";

          $("#output").append(li + (cur_device_name[i]) + li_end)
          $("#output").append(p + (cur_device_metadata[i]) + p_end)
          $('p').hide();
      }
      $(document).ready(function(){
        $('li').click(function(){
          $(this).next('p').toggle();
        });
      });
  }
}

setInterval(getHIDdata, 400);
