import {
  Table,
  Column,
  Model,
  CreatedAt,
  PrimaryKey,
  IsUUID,
} from 'sequelize-typescript';

@Table
export class User extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id: string;

  @Column
  title: string;

  @Column
  email: string;

  @Column
  password: string;

  @CreatedAt
  @Column
  createdAt: Date;
}
