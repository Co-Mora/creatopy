import {
  Module,
} from '@nestjs/common';
import { GraphQLModule, GraphQLFactory } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    UserModule,
    GraphQLModule.forRootAsync(<ApolloDriverConfig>{
      useFactory(graphQLFactory: GraphQLFactory) {
        return {
          typePaths: ['./**/*.graphql'],
        };
      },
      autoSchemaFile: 'schema.gql',
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
    }),
  ],
})
export class AppModule {}
