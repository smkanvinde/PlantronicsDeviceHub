
$(document).ready(function(){
  $('#sendAllBtn').click(function(){
    var http = require("http");
    var HID = require('./nodehid.js');
    var devicesLocal = cur_device_metadata;

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

    for(i=0; i < devicesLocal.length; i++){
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


      // req.write(JSON.stringify(METADATA.metadata(0)));
      req.write(JSON.stringify(devicesLocal[i]));

      req.end();
    }

  });
});
