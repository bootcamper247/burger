//This file contains the methods that'll execute the necessary MySQL commands in the controllers

//Dependencies
var connection = require("./connection.js");

// Code for the Object Relational Mapper (ORM)
// The ?? signs are for swapping out table or column names
// The ? signs are for swapping out other values
// These help avoid SQL injection - https://en.wikipedia.org/wiki/SQL_injection

var orm = {
    //var cb is the callback func being passed from burger.js
    selectAll: function (tableName, cb) {
        var queryString = "SELECT * FROM ??";
        connection.query(queryString, [tableName], function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    insertOne: function (tableName, cols, vals, cb) {
        var queryString = "INSERT INTO ?? (??, ??) VALUES (?, ?)";
        connection.query(queryString, [tableName, cols[0], cols[1], vals[0], vals[1]], function (err, result) {
            if (err) throw err;
            //console.log(result);
            cb(result);
        });
    },
    updateOne: function (tableName, cols, vals, cb) {
        var queryString = "UPDATE ?? SET ?? = ? WHERE ?? = ? "
        connection.query(queryString, [tableName, cols[0], vals[0], cols[1], vals[1]], function (err, result) {
            if (err) throw err;
            cb(result);
        }
        );
    }
};

//Export the ORM object
module.exports = orm;
