#!/usr/bin/python
# -*- coding: utf-8 -*-

import json
import MySQLdb as mdb
import sys

con = mdb.connect('localhost','ubuntu','utsd4','devicehub');

with open('dbexport.json') as data_file:
	data = json.load(data_file)


for k in data:
    mongoIdVar = None
    vendorIdVar = None
    productIdVar = None
    userIdVar = None
    userCompanyVar = None
    pathVar = None
    serialNumberVar = None
    manufacturerVar = None
    productVar = None
    releaseVar = None
    interfaceVar = None
    usagePageVar = None
    usageVar = None
    for j in k: #vendorId, product, productId, usage, serialNumber, userId, interface, __v, release, path, _id, usagePage, manufacturer
        #print j, ":", k[j]
        if j == "vendorId":
            vendorIdVar = k[j]
        elif j == "product":
            productVar = k[j]
        elif j == "productId":
            productIdVar = k[j]
        elif j == "usage":
            usageVar = k[j]
        elif j == "serialNumber":
            serialNumberVar = k[j]
        elif j == "userId":
            userIdVar = k[j]
        elif j == "interface":
            interfaceVar = k[j]
        elif j == "userCompany":
            userCompanyVar = k[j]
        elif j == "release":
            releaseVar = k[j]
        elif j == "_id":
            mongoIdVar = k[j]
            #if type(mongoIdVar) is dict:
            #    mongoIdVar = k[j]['$oid']
            #print type(k[j])
            #temp = "$oid"
            #if type(k[j]) is unicode:
            #    mongoIdVar = k[j]['$oid']
            #else:
            #    mongoIdVar = k[j]
            #print "m = %s" % mongoIdVar
            tmp = "$oid"
            if tmp in mongoIdVar:
                mongoIdVar = k[j]['$oid']
            #if (k[j]['$oid']):
            #    mongoIdVar = k[j]['$oid']
            #else:
                #mongoIdVar = k[j];
        elif j == "usagePage":
            usagePageVar = k[j]
        elif j == "manufacturer":
            manufacturerVar = k[j]
        elif j == "path":
            pathVar = k[j]
    print "\n"
    #print "mongoId = %s" % mongoIdVar
    #print "vendorId = %d" % vendorIdVar
    #print "productId = %d" % productIdVar
    #print "userId = %s" % userIdVar
    #print "userCompany = %s" % userCompanyVar
    #print "path = %s" % pathVar
    #print "serialNumber = %s" % serialNumberVar
    #print "manufacturer = %s" % manufacturerVar
    #print "product = %s" % productVar
    #print "release = %d" % releaseVar
    #print "interface = %d" % interfaceVar
    #print "usagePage = %s" % usagePageVar
    #print "usage = %s" % usageVar

    with con:
        cur = con.cursor()
    #step 1: search sql table on userId and serialNumber. If present, update.
        if userIdVar == None and serialNumberVar != None:
            cur.execute("UPDATE hub SET `mongoId` = %s, `userCompany` = %s, `path` = %s, `manufacturer` = %s, `product` = %s, `release` = %s, `interface` = %s, `usagePage` = %s, `usage` = %s WHERE `userId` IS NULL AND `serialNumber` = %s, AND `vendorId` = %s AND `productID = %s", (mongoIdVar,userCompanyVar,pathVar,manufacturerVar,productVar,releaseVar,interfaceVar,usagePageVar,usageVar,serialNumberVar,vendorIdVar,productIdVar))
        elif userIdVar != None and serialNumberVar == None:
            cur.execute("UPDATE hub SET `mongoId` = %s, `userCompany` = %s, `path` = %s, `manufacturer` = %s, `product` = %s, `release` = %s, `interface` = %s, `usagePage` = %s, `usage` = %s WHERE `userId` = %s AND `serialNumber` IS NULL AND `vendorId` = %s AND `productId` = %s", (mongoIdVar,userCompanyVar,pathVar,manufacturerVar,productVar,releaseVar,interfaceVar,usagePageVar,usageVar,userIdVar, vendorIdVar,productIdVar))
        elif userIdVar == None and serialNumberVar == None:
            cur.execute("UPDATE hub SET `mongoId` = %s, `userCompany` = %s, `path` = %s, `manufacturer` = %s, `product` = %s, `release` = %s, `interface` = %s, `usagePage` = %s, `usage` = %s WHERE `userId` IS NULL AND `serialNumber` IS NULL AND `vendorId` = %s AND `productId` = %s", (mongoIdVar,userCompanyVar,pathVar,manufacturerVar,productVar,releaseVar,interfaceVar,usagePageVar,usageVar,vendorIdVar,productIdVar))
        else:
            cur.execute("UPDATE hub SET `mongoId` = %s, `userCompany` = %s, `path` = %s, `manufacturer` = %s, `product` = %s, `release` = %s, `interface` = %s, `usagePage` = %s, `usage` = %s WHERE `userId` = %s AND `serialNumber` = %s AND `vendorId` = %s and `productId` = %s", (mongoIdVar,userCompanyVar,pathVar,manufacturerVar,productVar,releaseVar,interfaceVar,usagePageVar,usageVar,userIdVar,serialNumberVar,vendorIdVar,productIdVar))
    #else step 2: add new device to table
        if cur.rowcount == 0:
            cur.execute("INSERT INTO hub(`mongoId`, `vendorId`, `productId`, `userId`, `userCompany`, `path`,  `serialNumber`, `manufacturer`, `product`, `release`, `interface`, `usagePage`, `usage`) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", (mongoIdVar,vendorIdVar,productIdVar,userIdVar,userCompanyVar,pathVar,serialNumberVar,manufacturerVar,productVar,releaseVar,interfaceVar,usagePageVar,usageVar))
            # duplicates are ignored
            cur.execute("DELETE h1 FROM `hub` h1, `hub` h2 WHERE h1.id > h2.id AND h1.mongoId = h2.mongoId AND h1.vendorId = h2.vendorId AND h1.productId = h2.productId AND h1.userId = h2.userId AND h1.release = h2.release AND h1.interface = h2.interface AND h1.usagePage = h2.usagePage AND h1.usage = h2.usage") 
