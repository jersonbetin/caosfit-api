import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/services/users.service';
import { PayloadToken } from '../models/common.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async generateToke(user: User) {
    const {
      role: { name },
      id,
    } = user;
    const payload: PayloadToken = { role: name, sub: id };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user,
    };
  }

  async singIn(username: string, pass: string): Promise<User | null> {
    const user = await this.userService.findByUsername(username);

    if (user) {
      const { password } = user;
      const match = await compare(pass, password);

      if (match) {
        return user;
      }
    }

    return null;
  }
}
