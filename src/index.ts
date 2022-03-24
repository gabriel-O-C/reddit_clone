import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constanst';
import { Post } from './entities/Post';
import microConfig from './mikro-orm.config';
const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();
  // const post = orm.em.fork({}).create(Post, {title: 'My first reddit post',});
  // orm.em.persistAndFlush(post);
  const posts = await orm.em.fork({}).find(Post, {});
  console.log(posts);
}
main();