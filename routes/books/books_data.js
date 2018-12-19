const express = require('express');
const router = express.Router();
const connection = require('../../config/db_cfg')
const _dirname = 'D:/yura_bookshop';

router.get('/book-data', function(req, res, next) {
	connection.query('SELECT * from goods', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.parse(JSON.stringify(results)));
	});
});

router.get('/boo/:id', function(req, res, next) {	
	const getId = req.params.id;
	console.log(getId)
	let sql = 'SELECT * FROM goods WHERE id = ' + connection.escape(getId);	
	
	connection.query(sql, function (error, results, fields) {
		if (error) throw error;		
		res.send(JSON.parse(JSON.stringify(results)));
	})
});

module.exports = router;
