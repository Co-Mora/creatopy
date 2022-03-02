import * as bcrypt from 'bcryptjs';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: typeof User,
  ) {}

  findAll(): Promise<User[]> {
    try {
      return this.userRepository.findAll<User>();
    } catch (e) {
      console.error(e.message);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneById(id: number): Promise<User | Object> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user)
        return { message: 'User not found.', statusCode: HttpStatus.NOT_FOUND };
      return user;
    } catch (e) {
      console.error(e.message);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(createCatDto: CreateUserDto): Promise<User> {
    const { title, email, password } = createCatDto;
    const user = new User();
    let dataSaved: any;

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    user.title = title;
    user.email = email;
    user.password = hashed;

    return user
      .save()
      .then((data) => {
        dataSaved = data;
        return dataSaved.dataValues;
      })
      .catch((error) => {});
  }

  async userSignin(userLoginDto: UserLoginDto): Promise<User> {
    const { email, password: attemptedPassword } = userLoginDto;
    try {
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) throw new HttpException(
        'User not found',
        HttpStatus.NOT_FOUND,
      );

      const validPassword = await bcrypt.compare(
        attemptedPassword,
        user.password,
      );
      if (!validPassword)
        throw new HttpException(
          'Password does not match',
          HttpStatus.BAD_REQUEST,
        );

      return user;
    } catch (e) {
      console.error(e.message);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async resetPassword({ email, password }): Promise<Object> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      const userUpdated = await this.userRepository.update(
        { password: hashed },
        { where: { id: user.id } },
      );

      return userUpdated;
    } catch (e) {
      console.error(e.message);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
