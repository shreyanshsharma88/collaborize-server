import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findUser(email: string) {
    try {
      const user = this.userRepository.findOne({ where: { email: email } });
      return user ?? null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async addUser(
    username: string,
    password: string,
    email: string,
  ): Promise<User> {
    try {
      const user = new User();
      user.name = username;
      user.password = password;
      user.email = email;

      return await this.userRepository.save(user);
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async signup(username: string, password: string, email: string) {
    try {
      const user = await this.findUser(email);
      if (user) {
        return null;
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await this.addUser(username, hashedPassword, email);
      jwt.sign(
        {
          email,
          userId: newUser.user_id,
        },
        process.env.SECRET_KEY as string,
        { expiresIn: '1d' },
      );
      return newUser;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async login(password: string, email: string): Promise<string | null> {
    try {
      const user = await this.findUser(email);
      if (!user) {
        return null;
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const token = jwt.sign(
          { email, userId: user.user_id },
          process.env.SECRET_KEY as string,
          { expiresIn: '1d' }, // Optional: Set an expiration time for the token
        );
        return token;
      }

      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
