const fs = require("fs")
const Sequelize = require("sequelize")
const axios = require("axios")
const mysql = require("mysql")

var content = fs.readFileSync("result.json")

var movies_parsed = JSON.parse(content)


const sequelize = new Sequelize("movie_api", "root", "", {
	host: "localhost",
	dialect: "mysql",
	operatorAliases: false,

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
})
sequelize.authenticate().then(() =>{console.log("success")})

const Movie = sequelize.define('movie', {
	title: {
		type: Sequelize.STRING
	},
	imdbID: {
		type: Sequelize.STRING
	},
	posterUrl: {
		type: Sequelize.STRING
	},
	rating: {
		type: Sequelize.FLOAT
	},
	votes: {
		type: Sequelize.FLOAT
	}
})


const Director = sequelize.define('director', {
    name: {
        type: Sequelize.STRING
    }
})

Movie.belongsTo(Director)
Director.hasMany(Movie)

async function save_movies() {
	const movies = []
	for (var i=16000; i < 17000; i++) {
		let mv = axios.get("http://www.omdbapi.com/?apikey=89e83b22&i=" + movies_parsed[i].imdbId)
		movies.push(mv)
	}
	console.log("requests queued")
	let res = await axios.all(movies)//.catch((err) => {console.log(err)})
	return await res

}
/*
Director.sync({force:true}).then(() => {
	console.log("director created")
})
Movie.sync({force:true}).then(() =>{
	console.log("movie created")
	save_data_to_db()
})*/
save_data_to_db()
/*	
	for (var i=0; i < res.length; i++) {
		var director = Director.findOrCreate({name: res[i].data.Director})
		var movie = Movie.create({
			title: res[i].data.Title,
			imdbID: movies_parsed[i].imdbId,
			rating: movies_parsed[i].ratings,
			votes: movies_parsed[i].votes
		})
		director.addMovie(movie)
	}}).catch(err => {console.log(err)})
}) */

async function get_director(name){
	return await Director.findOrCreate({where : {name: name}})
}


async function save_data_to_db(){
	movies_data = await save_movies()
	for (var i=0; i <movies_data.length; i++){
		let director = await get_director(movies_data[i].data.Director)
		Movie.create({
			title: movies_data[i].data.Title,
			imdbID: movies_parsed[i].imdbId,
			rating: movies_parsed[i].rating,
			votes: movies_parsed[i].votes,
			posterUrl: "http://img.omdbapi.com/?i=" + movies_parsed[i].imdbId + "&apikey=89e83b22",
			directorId: director[0].dataValues.id
		})
	}
}

/*
save_movies().then(res => {
	for (var i=0; i < res.length; i++) {
			var a = this.res
			let director = get_director(res[i].data.Director)
			//await director
			/*Movie.create({
				title: res[i].data.Title,
				imdbID: movies_parsed[i].imdbId,
				rating: movies_parsed[i].rating,
				votes: movies_parsed[i].votes,
				posterUrl: "http://img.omdbapi.com/?i=" + movies_parsed[i].imdbId + "&apikey=89e83b22"
			}).then((movie) => {
				sequelize.query("update movies set directorId as " + director.id + " where id=" + movie.id)
			})
		}}).catch(err => {console.log(err)})/*
/*
for(var i=0; i < 5; i++) {
	axios.get("http://www.omdbapi.com/?i=" + movies_parsed[i].imdbId +"&apikey=89e83b22").then((res) => {
		console.log(res.data.Title)
		Movie.create({
			title: res.data.title,
			imdbID: movies_parsed[i].imdbId,
			rating: movies_parsed[i].ratings,
			votes: movies_parsed[i].votes
		})
	})
}
*/