import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ROLES } from '../entities/role.entity';

export class CreateRoleDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'role name' })
  @IsEnum(ROLES)
  readonly name: ROLES;
}

export class UpdateRoleDto extends PartialType(CreateRoleDTO) {}
