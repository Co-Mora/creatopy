import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolvers } from './user.resolvers';
import { userProviders } from './user.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, UserResolvers, ...userProviders],
})
export class UserModule {}