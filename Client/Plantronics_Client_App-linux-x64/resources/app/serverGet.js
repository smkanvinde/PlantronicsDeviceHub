var http = require("http");

var options = {
  "method": "GET",
  "hostname": "ec2-18-221-169-223.us-east-2.compute.amazonaws.com",
  "port": "3000",
  "path": "/api/products",
  "headers": {
    "content-type": "application/json",
    "cache-control": "no-cache",
    // "postman-token": "31790cfe-35b3-54af-8194-1a5b58256d2d"
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

// req.write(JSON.stringify({ vendorId: 48879,
//   productId: 65261,
//   path: '\\\\?\\hid#lenovovhid#1&632d18&0&0000#{4d1e55b2-f16f-11cf-88cb-001111000030}',
//   serialNumber: 'UMDF Virtual hidmini device Serial Number string',
//   manufacturer: 'UMDF Virtual hidmini device Manufacturer string',
//   product: 'UMDF Virtual hidmini device Product string',
//   release: 257,
//   interface: -1,
//   usagePage: 1,
//   usage: 12 }));
req.end();