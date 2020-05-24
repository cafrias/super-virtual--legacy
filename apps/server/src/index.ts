import './bootstrap';

import { ApolloServer, gql } from 'apollo-server';
import dbConnect from './db/connect';

const typeDefs = gql`
  type Thing {
    name: String!
  }

  type Query {
    things: [Thing!]!
  }
`;
const dummyData = [
  {
    name: 'My THINGS!!',
  },
];

const resolvers = {
  Query: {
    things() {
      return dummyData;
    },
  },
};

function startServer(): void {
  const server = new ApolloServer({ typeDefs, resolvers });
  server.listen().then(({ url }) => {
    console.log(`Server running at ${url}`);
  });
}

dbConnect()
  .then(() => {
    startServer();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
