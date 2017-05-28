var months = [ "january", "february", "march", "april", "may",
 "june", "july", "august", "september", "october",
  "november", "december" ];

const express = require('express');

const app = express();

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
})

app.get('*', function (req, res) {
	let url = req.url.split('%20');
	var date;
	var unix;
	var natural;

	console.log("process.env: " + process.env);

	if (url.length === 3
		&& months.indexOf(url[0].substring(1).toLowerCase()) != -1
		&& parseInt(url[1]) <= 31
		&& url[2].length === 4) {
		// URL represents a natural language date
		let year = parseInt(url[2]);
		let month = months.indexOf(url[0].substring(1).toLowerCase());
		let day = parseInt(url[1]);
		date = new Date(year, month, day);
		console.log('day: ' + day);
	} else if (url.length === 1
		&& !isNaN(url[0].substring(1))) {
		// URL represents a unix time
		date = new Date(parseInt(url[0].substring(1)) * 1000);
	}
	if (date) {
		unix = date.getTime() / 1000;
		natural = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
	} else {
		unix = null;
		natural = null;
	}
	let result = { 'unix': unix, 'natural': natural };
  	res.send(result);
})

app.listen(process.env.PORT || 3000, function () {
  console.log('timestamp listening on port 3000!')
})