import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IsNotEmpty, IsString } from 'class-validator';
import { ProfileService } from 'src/services/profile.service';

class loginUser {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

@Controller()
export class LoginController {
  constructor(private profileService: ProfileService) {}
  @Post('login')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  async login(@Body() body: loginUser) {
    try {
      const { email, password } = body;
      const token = this.profileService.login(email, password);
      if (!!token) {
        return token;
      }
      return null;
    } catch (e) {
      console.log(e);
    }
  }

  @Post('signup')
  // @UsePipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //   }),
  // )
  async signup(@Body() body) {
    try {
      console.log('here');
      const { email, password, username } = body;
      const token = this.profileService.signup(email, password, username);
      if (!!token) {
        return token;
      }
      return null;
    } catch (e) {
      console.log(e);
    }
  }
}
