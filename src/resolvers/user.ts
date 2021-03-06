import { User } from '../entities/User';
import { MyContext } from 'src/types';
import {Resolver, Mutation, Arg, InputType, Field, Ctx} from 'type-graphql';
import argon2 from 'argon2';
@InputType()
class UserNamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async Register(
    @Arg("options") options: UserNamePasswordInput,
    @Ctx() {em}: MyContext
  ){
    const hashedPassword = await argon2.hash(options.password)
    const user = em.fork().create(User,
       {
         username: options.username, 
         password: hashedPassword
       });
       await em.fork().persistAndFlush(user);
       return user;
  }
}