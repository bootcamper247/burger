//Dependencies
var express = require("express");

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

//get an instance of Router to use the routing APIs
var router = express.Router();

// Create the routes and set up logic within those routes as required.
router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        var hbsObject = {
            selectAllQuerydata: data      
        };
        res.render("index", hbsObject);
    });
});

// Create a new burger entry
router.post("/", function (req, res) {

    burger.insertOne(["burger_name", "devoured"], [req.body.burgerName, false], function (result) {
        //Send back the ID of the new burger to the client
        //res.json({ id: result.insertId });
        res.redirect("/");
    });
});

router.put("/", function (req, res) {
    console.log("inside router.put --> id " + req.body.idToUpdate);
    var eatenId = req.body.idToUpdate;
    burger.updateOne(["devoured", "id"], [true, eatenId], function (result) {
        if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        }
        res.status(200).end();
    });  
});

// Export routes for server.js to use.
module.exports = router;
