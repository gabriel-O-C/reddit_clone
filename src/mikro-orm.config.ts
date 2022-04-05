import { __prod__ } from "./constanst";
import { Post } from "./entities/Post";
import { MikroORM } from '@mikro-orm/core';
import path from "path";
import { User } from "./entities/User";
export default {
    dbName: 'reddit_clone',
    migrations: {
    path: path.join(__dirname, './migrations'), 
    glob: '!(*.d).{js,ts}',
    },
    allowGlobalContext: true,
    entities: [Post, User],
    debug: !__prod__,
    type: 'postgresql',
    user: 'root',
    password: 'root',
} as Parameters<typeof MikroORM.init>[0];