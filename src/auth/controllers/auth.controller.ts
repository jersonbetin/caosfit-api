import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { User } from 'src/users/entities/user.entity';
import { ResponseMessage } from 'src/common/commons.decorator';
import { stg } from 'src/common/strings';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ResponseMessage(stg('login_success'))
  async login(@Request() req) {
    return this.authService.generateToke(req.user as User);
  }
}
