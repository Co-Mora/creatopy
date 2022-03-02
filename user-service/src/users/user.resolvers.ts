import { UseGuards } from '@nestjs/common';
import { Query, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { User } from './user.entity';
import { UserService } from './user.service';

const pubsub = new PubSub();

@Resolver('User')
export class UserResolvers {
  constructor(private readonly usersService: UserService) {}

  @Query()
  async getUsers() {
    return await this.usersService.findAll();
  }

  @Query('user')
  async findOneById(obj, args, context, info): Promise<User | Object> {
    const { id } = args;
    return await this.usersService.findOneById(id);
  }

  @Mutation('signup')
  async signup(obj, args: User, context, info): Promise<User> {
    const createdUser = await this.usersService.create(args);
    pubsub.publish('userCreated', { userCreated: createdUser });
    return createdUser;
  }

  @Mutation('signin')
  async signin(obj, args: User, context, info): Promise<User> {
    const userLogined = await this.usersService.userSignin(args);
    pubsub.publish('userLogined', { userLogined });
    return userLogined;
  }

  @Mutation('resetPassword')
  async resetPassword(
    obj,
    args: { email: string; password: string },
    context,
    info,
  ): Promise<Object> {
    const userLogined = await this.usersService.resetPassword(args);
    pubsub.publish('userLogined', { userLogined });
    return userLogined;
  }

  @Subscription('userCreated')
  userCreated() {
    return {
      subscribe: () => pubsub.asyncIterator('userCreated'),
    };
  }
}
