const log4js = require('log4js');
const mysql = require("./db_cfg");

class MiscSingleton {
	constructor() {
		log4js.configure({
			appenders: { 
				file: { type: 'file', filename: `serverLogs.log` },
				console: { type: 'console' },
			},
			categories: { default: { appenders: ['file', 'console'], level: 'debug' } }
		  });
		this.log = log4js.getLogger();
		this.log.fatal("Server Started");
	}
	
	dbquery(query) {
		return new Promise( (r, j) => mysql.query(query, null , (err, data) => {
			if (err) {
				this.log.error(query);
				return j(err);
			}
			r(data);
		}))
	}

	async query(query) {
		const start = new Date().getTime(); 
		const data = await this.dbquery(query);
		const time = new Date().getTime() - start;
		if (time >= 500) {
			this.log.warn(`'${query}' ends with: ${time / 1000}s`);
		}
		else {
			this.log.trace(`'${query}' ends with: ${time / 1000}s`);
		}
		return data;
	}

	roundNum(number, ends = 0) {
		return parseFloat(number.toFixed(ends));
	}

	isValueNumber(value) {
		if (typeof value !== "number") return false;
		return true;
	}

	isValueString(value) {
		if (typeof value !== "string") return false;
		return true;
	}

	getRandomInt(min = 0, max = 100) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	getTime() {
		const currentTime = new Date();
		let h = currentTime.getHours();
		let m = currentTime.getMinutes();
		let s = currentTime.getSeconds();
		if (h < 10) h = `0${h}`;
		if (m < 10) m = `0${m}`;
		if (s < 10) s = `0${s}`;
		return `${h}:${m}:${s}`;
	}

}
const miscSingleton = new MiscSingleton();
module.exports = miscSingleton;