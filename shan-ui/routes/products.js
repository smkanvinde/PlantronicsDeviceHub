var express = require('express');
var exec = require('child_process').exec;
var router = express.Router();
var http = require("http");

function execute(command,callback) {
    exec(command, function(error, stdout, stderr){
        callback(stdout);   
    });
};

//get list of product
router.get('/', function(req, res, next) {
    pool.getConnection(function(err, connection) {
        connection.query("SELECT * FROM hub", function(err, rows) {
            if (!err && rows.length > 0) {
                res.json(rows);
            } else {
                res.json([]);
            }
        });
        connection.release();
    });
});

//get product by id
router.get('/:id', function(req, res, next) {
    pool.getConnection(function(err, connection) {
        var id = req.params.id;
        connection.query("SELECT * FROM hub WHERE id='" + id + "' LIMIT 1", function(err, rows) {
            if (!err && rows.length > 0) {
                res.json(rows[0]);
            } else {
                res.json([]);
            }
        });
        connection.release();
    });
});

//update product
router.put('/:id', function(req, res, next) {
        var postBody = req.body;
        var id = req.params.id;
		var mid = postBody.mid;
        var vid = postBody.vid;
        var pid = postBody.pid;
        var uid = postBody.uid;
        var comp = postBody.comp;
        var ser = postBody.ser;
        var manu = postBody.manu;
        var prod = postBody.prod;
        var rel = postBody.rel;
        var intr = postBody.intr;
        var upage = postBody.upage;
        var usage = postBody.usage;

    	var path = "/api/products/" + mid;
    	var options = {
    	  "method": "PUT",
    	  "hostname": "localhost",
    	  "port": "3000",
    	  "path": path,
    	  "headers": {
            "content-type" : "application/json",
    	    "cache-control": "no-cache"
    	  }
    	};

	var requ = http.request(options, function (resu) {
	  var chunks = [];

	  resu.on("data", function (chunk) {
	    chunks.push(chunk);
	  });

	  resu.on("end", function () {
	    var body = Buffer.concat(chunks);
	    console.log(body.toString());
	  });
	});
	
    var buildString = "{";
    var added = false;
    if (vid != null) {
        buildString += "\n\t\"vendorId\" : " + vid;
        added = true;
    }
    if (added == true) {
        buildString += ",";
        added = false;
    }
    if (pid != null) {
        buildString += "\n\t\"productId\" : " + pid;
        added = true;
    }
    if (added == true) {
        buildString += ",";
        added = false;
    }
    if (uid != null) {
        buildString += "\n\t\"userId\" : \"" + uid + "\"";
        added = true;
    }
    if (added == true) {
        buildString += ",";
        added = false;
    }
    if (comp != null) {
        buildString += "\n\t\"userCompany\" : \"" + comp + "\"";
        added = true;
    }
    if (added == true) {
        buildString += ",";
        added = false;
    }
    if (ser != null) {
        buildString += "\n\t\"serialNumber\" : \"" + ser + "\"";
        added = true;
    }
    if (added == true) {
        buildString += ",";
        added = false;
    }
    if (manu != null) {
        buildString += "\n\t\"manufacturer\" : \"" + manu + "\"";
        added = true;
    }
    if (added == true) {
        buildString += ",";
        added = false;
    }
    if (prod != null) {
        buildString += "\n\t\"product\" : \"" + prod + "\"";
        added = true;
    }
    if (added == true) {
        buildString += ",";
        added = false;
    }
    if (rel != null) {
        buildString += "\n\t\"release\" : " + rel;
        added = true;
    }
    if (added == true) {
        buildString += ",";
        added = false;
    }
    if (intr != null) {
        buildString += "\n\t\"interface\" : " + intr;
        added = true;
    }
    if (added == true) {
        buildString += ",";
        added = false;
    }
    if (upage != null) {
        buildString += "\n\t\"usagePage\" : \"" + upage + "\"";
        added = true;
    }
    if (added == true) {
        buildString += ",";
        added = false;
    }
    if (usage != null) {
        buildString += "\n\t\"usage\" : \"" + usage + "\"";
        added = true;
    }
    if (added == true) {
        buildString += ",";
        added = false;
    }

    buildString = buildString.substring(0, buildString.length - 1); //chop off last comma
    buildString += "}";
	requ.write(buildString);
	requ.end();

   /* pool.getConnection(function(err, connection) {
       

        connection.query("UPDATE hub SET `vendorId`='" + vid + "', `productId`='" + pid + "', `userId`='" + uid + "', `userCompany`='" + comp + "', `serialNumber`='" + ser + "', `manufacturer`='" + manu + "', `product`='" + prod + "', `release`='" + rel + "', `interface`='" + intr + "', `usagePage`='" + upage + "', `usage`='" + usage + "' WHERE mongoId='" + mid + "'", function(err, rows) {
            if (rows.affectedRows) {
                connection.query("SELECT * FROM hub WHERE mongoId='" + mid + "' LIMIT 1", function(err, rows) {
                    if (!err && rows.length > 0) {
                        res.json(rows[0]);
                    } else {
                        res.json([]);
                    }
                });
                //connection.release();
            }
            //if (!err) {
            //    res.json({
            //        "status": true
            //    });
           // } else {
           //     res.json([]);
           // }
        });
        connection.release();
    });*/
    //instead of running this script, do a server post. you have all the info. TODO will need to get the mongoid. see example in Client/software/login2.html:135 and see if you can find a PUT or POST example in client
	execute('~/Collaborations/scripts/mongo-export.sh', function(output) {
    	//console.log(output);
	});
   /* 
	execute('~/Collaborations/scripts/sql-mongo.sh', function(output) {
    	console.log(output);
	});*/
    res.json({
        "status": true
    });

});

module.exports = router;
