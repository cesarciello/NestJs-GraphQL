import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import * as ormOptions from './config/orm';
import RepoModule from './services/repository/repo.module';
import UserResolver from './graphql/resolvers/user.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import MessageResolver from './graphql/resolvers/message.resolver';

const graphQLImports = [UserResolver, MessageResolver];

@Module({
  imports: [
    TypeOrmModule.forRoot(ormOptions),
    RepoModule,
    ...graphQLImports,
    GraphQLModule.forRoot({
      autoSchemaFile: 'shema.gql',
      playground: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
