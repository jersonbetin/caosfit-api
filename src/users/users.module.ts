import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { RolesService } from './services/roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { RolesController } from './controllers/roles.controller';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [UsersService, RolesService],
  controllers: [RolesController, UsersController],
})
export class UsersModule {}
