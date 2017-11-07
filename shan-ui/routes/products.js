var express = require('express');
var router = express.Router();

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
        connection.query("SELECT * FROM hub WHERE Id='" + id + "' LIMIT 1", function(err, rows) {
            if (!err && rows.length > 0) {
                res.json(rows[0]);
            } else {
                res.json([]);
            }
        });
        connection.release();
    });
});

//delete product
router.delete('/:id', function(req, res, next) {
    pool.getConnection(function(err, connection) {
        var id = req.params.id;
        connection.query("DELETE FROM hub WHERE Id='" + id + "'", function(err, rows) {
            if (!err) {
                res.json({
                    "status": true
                });
            } else {
                res.json([]);
            }
        });
        connection.release();
    });
});

//update product
router.put('/:id', function(req, res, next) {
    pool.getConnection(function(err, connection) {
        var postBody = req.body;
        var productId = req.params.id;
        var vid = postBody.vendorId;
        var pid = postBody.productId;
        var uid = postBody.userId;
        var comp = postBody.userCompany;
        var ser = postBody.serialNumber;
        var manu = postBody.manufacturer;
        var prod = postBody.product;
        var rel = postBody.release;
        var intr = postBody.interface;
        var upage = postBody.userPage;
        var usage = postBody.usage;
        connection.query("UPDATE hub SET `vendorId`='" + vid + "', `productId`='" + pid + "', `userId`='" + uid + "', `userCompany`='" + comp + "', `serialNumber`='" + ser + "', `manufacturer`='" + manu + "', `product`='" + prod + "', `release`='" + rel + "', `interface`='" + intr + "', `usagePage`='" + upage + "', `usage`='" + usage + "' WHERE Id='" + productId + "'", function(err, rows) {
            if (rows.affectedRows) {
                connection.query("SELECT * FROM hub WHERE Id='" + productId + "' LIMIT 1", function(err, rows) {
                    if (!err && rows.length > 0) {
                        res.json(rows[0]);
                    } else {
                        res.json([]);
                    }
                });
                connection.release();
            }
        });
        connection.release();
    });
});

module.exports = router;
