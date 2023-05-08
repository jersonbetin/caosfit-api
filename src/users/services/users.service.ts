import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, FindOptionsWhere } from 'typeorm';
import { hashSync } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { GenericService } from 'src/common/class/generic.service';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../Dtos/user.dto';

@Injectable()
export class UsersService
  implements GenericService<User, string, CreateUserDto, UpdateUserDto>
{
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(data: CreateUserDto): Promise<User> {
    const { username, email, password } = data;
    const user = await this.userRepo.findOneBy({ username, email });

    if (user) {
      throw new ConflictException(
        `User with username ${username} or email ${email} already exist!`,
      );
    }

    const passwordHash = await hashSync(password, 10);
    data.password = passwordHash;
    data.id = uuidv4();

    const newUser = await this.userRepo.create(data);

    return this.userRepo.save(newUser);
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const { username, email } = data;
    const where: FindOptionsWhere<User> = { id: Not(id) };

    if (username) where.username = username;
    if (email) where.email = email;

    const users = await this.userRepo.find({ where });
    if (!users.length) {
      throw new ConflictException(
        `User with username ${username} or email ${email} already exist!`,
      );
    }

    const user = await this.userRepo.findOneBy({ id });
    await this.userRepo.merge(user, data);

    return this.userRepo.save(user);
  }

  async delete(id: string): Promise<boolean> {
    await this.findOne(id);

    try {
      await this.userRepo.delete(id);

      return true;
    } catch (e) {
      throw new Error(e);
    }
  }

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findOne(id: string): Promise<User> {
    const role = await this.userRepo.findOneBy({ id });

    if (!role) throw new NotFoundException(`Role with id ${id} not found`);

    return role;
  }
}
