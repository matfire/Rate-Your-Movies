import {GraphQLServer} from 'graphql-yoga';

const movies = [{
    title:"test",
    id:1
},
{
    title:"test2",
    id:2
}]

const typeDefs = `
    type Query {
        movie(id: ID): Movie!
        movies: [Movie]
    }
    type Movie {
        title: String
        genre: String
        rating: Float
        id: ID!
    }
`

const resolvers = {
    Query: {
        movie(parent, args, ctx, info) {
            console.log(args)
            return movies.filter((instance) => {
                if (instance.id == args.id)
                    return instance
            })
        },
        movies() {
            return movies
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