import { Sequelize } from 'sequelize-typescript';
import { User } from '../users/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'sqlite',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'password',
        database: 'creatopy',
      });
      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];