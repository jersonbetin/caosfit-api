import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RolesService } from '../services/roles.service';
import { CreateRoleDTO, UpdateRoleDto } from '../dtos/role.dto';
import { ResponseMessage } from 'src/common/commons.decorator';
import { stg } from 'src/common/strings';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ROLES } from '../entities/role.entity';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('roles')
@Controller('roles')
@Roles(ROLES.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Get()
  @ResponseMessage(stg('find_all', { replace: { '%c': 'roles' } }))
  getAllRoles() {
    return this.roleService.findAll();
  }

  @Get(':id')
  @ResponseMessage(stg('find_one', { replace: { '%c': 'roles' } }))
  getRoleById(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage(stg('create_resource', { replace: { '%c': 'roles' } }))
  createRole(@Body() role: CreateRoleDTO) {
    return this.roleService.create(role);
  }

  @Put(':id')
  @ResponseMessage(stg('update_resource', { replace: { '%c': 'roles' } }))
  updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateRoleDto,
  ) {
    return this.roleService.update(id, data);
  }

  @Delete(':id')
  @ResponseMessage(stg('delete_resource', { replace: { '%c': 'roles' } }))
  deleteRole(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.delete(id);
  }
}
