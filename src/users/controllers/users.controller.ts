import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { ResponseMessage } from 'src/common/commons.decorator';
import { stg } from 'src/common/strings';
import { PersonalInformationDto, UpdateUserDto } from '../dtos/user.dto';
const NAME = 'users';
@ApiTags(NAME)
@Controller(NAME)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @ResponseMessage(stg('find_all', { replace: { '%c': NAME } }))
  getAllUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ResponseMessage(stg('find_one', { replace: { '%c': NAME } }))
  getRoleById(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post('personal-information')
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage(stg('create_resource', { replace: { '%c': NAME } }))
  createUser(@Body() data: PersonalInformationDto) {
    return this.userService.createUserPersonalInformation(data);
  }

  @Put(':id')
  @ResponseMessage(stg('update_resource', { replace: { '%c': NAME } }))
  updateRole(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  @ResponseMessage(stg('delete_resource', { replace: { '%c': NAME } }))
  deleteRole(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
