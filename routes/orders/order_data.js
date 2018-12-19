const express = require('express');
const router = express.Router();
const connection = require('../../config/db_cfg')

router.get('/order-data', function(req, res, next) {
	connection.query('SELECT * from orders', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.parse(JSON.stringify(results)));
	});
});

router.get('/status/new', function(req, res, next) {
	let sql = 'SELECT * FROM orders WHERE status = 1'	
	connection.query(sql, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.parse(JSON.stringify(results)));
	});
});

router.get('/status/ongoing', function(req, res, next) {
	let sql = 'SELECT * FROM orders WHERE status = 2'	
	connection.query(sql, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.parse(JSON.stringify(results)));
	});
});

router.get('/status/done', function(req, res, next) {
	let sql = 'SELECT * FROM orders WHERE status = 3'	
	connection.query(sql, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.parse(JSON.stringify(results)));
	});
})

router.get('/status/canceled', function(req, res, next) {
	let sql = 'SELECT * FROM orders WHERE status = 4'	
	connection.query(sql, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.parse(JSON.stringify(results)));
	});
})


module.exports = router;
