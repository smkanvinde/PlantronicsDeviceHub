$(document).ready(function(){
  $('#registerUserData').click(function(){

    console.log('inside the add user script');
    var http = require("http");
    var currentUser = global.localStorage.getItem("new_username");;
    var currentUserPassword = global.localStorage.getItem("new_password");

    console.log(currentUser);
    console.log(currentUserPassword);

var options = {
  "method": "POST",
  "hostname": "ec2-18-221-169-223.us-east-2.compute.amazonaws.com",
  "port": "3000",
  "path": "/userapi/users/",
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
    console.log("Success Registering Current User:");
    console.log(body.toString());
  });
});

req.write(JSON.stringify({ userID: currentUser, password: currentUserPassword }));
req.end();

    });
  });
