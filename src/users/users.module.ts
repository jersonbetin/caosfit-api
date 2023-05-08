import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { RolesService } from './services/roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { RolesController } from './controllers/roles.controller';
import { UsersController } from './controllers/users.controller';
import { PersonsService } from './services/persons.service';
import { Person } from './entities/person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Person])],
  providers: [UsersService, RolesService, PersonsService],
  controllers: [RolesController, UsersController],
})
export class UsersModule {}
