#!/usr/bin/python
# -*- coding: utf-8 -*-

import MySQLdb as mdb
import sys

con = mdb.connect('localhost','ubuntu','utsd4','devicehub');

with con:
    cur = con.cursor()
    cur.execute("DROP TABLE hub")
    cur.execute("CREATE TABLE hub(`Id` INT PRIMARY KEY AUTO_INCREMENT, `mongoId` TEXT, `vendorId` BIGINT, `productId` BIGINT, `userId` TEXT, `userCompany` TEXT, `serialNumber` TEXT, `manufacturer` TEXT, `product` TEXT, `release` BIGINT, `interface` BIGINT, `usagePage` TEXT, `usage` TEXT)")
