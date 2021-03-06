import "reflect-metadata"
import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constanst';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import microConfig from './mikro-orm.config';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/posts';
import { UserResolver } from "./resolvers/user";
const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();
  const app = express();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }) 
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({app});
  app.listen(3001, () => {
    console.log('App is up and running on localhost:3001')
  })
}

main();