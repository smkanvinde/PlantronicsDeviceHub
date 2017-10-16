$(document).ready(function(){
  $('#getData').click(function(){
    var http = require("http");

    var options = {
      "method": "GET",
      "hostname": "ec2-18-221-169-223.us-east-2.compute.amazonaws.com",
      "port": "3000",
      "path": "/api/products",
      "headers": {
        "content-type": "application/json",
        "cache-control": "no-cache",
      }
    };

    var req = http.request(options, function (res) {
      var chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
      });
    });

    req.end();

  });
});
