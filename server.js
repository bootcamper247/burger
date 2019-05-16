//Dependencies --- npm install <pkg> 
var express = require("express");
var exphbs = require("express-handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/burgers_controller.js");

// Create an instance of express.
var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Middleware for serving static content(html/css) from the "public" dir
app.use(express.static("public"));

// middleware for parsing request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars as the default templating engine.
// The next two lines specify what the view engine is for this app and what the extension is that is used for the templates and layouts. We pass one option to express-handlebars, defaultLayout, setting the default layout to be main. This way, we could have different versions of our app with different layouts, for example, one using Bootstrap and another using Foundation.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//apply the routes to our application
app.use(routes);

// Start the server so that it can begin listening to client requests on port specified above
app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});
