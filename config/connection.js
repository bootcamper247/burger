//Dependencies
var mysql = require("mysql");
var connection;

//info to connect Node to MySQL
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "localhost",
    port: 8889,                   
    user: "root",
    password: "root",
    database: "burgers_db"
  });
};
//code to connect Node to MySQL
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

//Export the connection
module.exports = connection;
