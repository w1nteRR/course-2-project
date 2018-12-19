const express = require('express');
const router = express.Router();
const connection = require('../../config/db_cfg')


router.get('/cart-data', function(req, res, next) {
	connection.query('SELECT * from cart', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.parse(JSON.stringify(results)));
	});
});



module.exports = router;
