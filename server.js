let express = require("express")
let request = require('request')
let Database = require("better-sqlite3")
let app = express()
var baseurl = 'https://api.themoviedb.org/3';
const db = new Database("cache.db", {fileMustExist:true})

function getTime(url) {
	var now = new Date()
	let result;
	if (url.includes("trending") || url.includes("upcoming") || url.includes("now_playing") || url.includes("person/day")) {
		result = new Date(now)
		result.setDate(now.getDate() + 1)
	} else {
		result = new Date(now)
		result.setDate(now.getDate() + 7)
	}
	return result
}

app.use(function(req, res) {
	var url = req.url
	console.log("processing url:", url)
	let row = db.prepare('select result, expires from cache where request=?').get(url)
			var fetch_from_tmdb = true;
			var now = Date.now();
			if (row) {
				console.log("Row in Cache")
				var ts_expires = new Date(row.expires).getTime()
				if (now < ts_expires) {
					console.log("Ok, row expires in " + (ts_expires - now)/1000 + " seconds")
					console.log(row.expires)
					res.send(row.result)
					fetch_from_tmdb = false;
				} else {
					console.log('Row expired ' + (now - ts_expires)/1000 + ' seconds ago, let\'s fetch it again...');
					db.prepare('delete from cache where request=?').run(url);
				}
			}
			if (fetch_from_tmdb) {
				let time = getTime(url)
				request(
					{
						uri: encodeURI(baseurl + url),
						headers: {"Accept": "application/json"}
					},
					function(err2, res2, body){
						let row = db.prepare('insert into cache (request, result, expires) values (?, ?, ?)').run(url,JSON.stringify(body),time.toDateString())
						res.json(body)
					}
				)
			}
		})


app.listen(6789, () => console.log("Listening on port 6789"))