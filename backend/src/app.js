import {GraphQLServer} from 'graphql-yoga';
import axios from 'axios'
const Sequelize = require("sequelize")

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
	rating: {
		type: Sequelize.FLOAT
	},
	votes: {
		type: Sequelize.FLOAT
    },
    directorId: {
        type: Sequelize.INTEGER
    }
})

const Director = sequelize.define('director', {
    name: {
        type: Sequelize.STRING
    },

})

const typeDefs = `
    type Query {
        movies: [Movie]
        movie(id: ID, title: String): [Movie]
        director(name: String): Director
        directors: [Director]
        top10: [Movie]
    }
    type Movie {
        title: String
        genre: String
        rating: Float
        votes: Float
        imdbID: String
        id: ID!
        director: Director
    }
    type Director {
        name: String
        movies: [Movie]
    }
`

const resolvers = {
    Query: {
        movies(){
            return Movie.findAll()
        },
        movie(parent, args, ctx){
            if (args.id) {
                return Movie.findAll({where:{id: args.id}})
            }
            if (args.title) {
                return Movie.findAll({
                    where: {
                        title: {
                            [Sequelize.Op.like]: args.title
                        }
                    }
                })
            }
        },
        directors(){
            return Director.findAll()
        },
        top10(){
            return Movie.findAll({
                limit: 10,
                order: sequelize.literal('rating DESC')
            })
        }
    },
    Movie: {
        director(parent, args, ctx){
            return Director.findOne({
                where: {
                    id: parent.directorId
                }
            })
        }
    },
    Director: {
        movies(parent, args, ctx){
            return Movie.findAll({
                where: {
                    directorId: parent.id
                }
            })
        }
    }
}


const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log("live on port 4000")
})