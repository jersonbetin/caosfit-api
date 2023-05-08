import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'role name' })
  name: string;
}

export class UpdateRoleDto extends PartialType(CreateRoleDTO) {}
