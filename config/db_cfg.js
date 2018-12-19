const mysql = require("mysql");
const fs = require('fs');
const db =  mysql.createPool({
	host: "localhost",       
	user: "root",
	password: "admin",
    database: "bookshop"
});

db.getConnection(function(e) {
	if (e) {
		console.log("DATABASE IS NOT WORKING");
		throw e;
	}
	else {
		console.log(`DATABASE IS WORKING`);
	}
});

module.exports = db