import { ApolloServer } from 'apollo-server';
import dataSources from './datasources/dataSources';

import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const server = new ApolloServer({ typeDefs, resolvers, dataSources });

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
