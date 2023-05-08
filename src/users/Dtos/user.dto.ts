import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { CreatePersonDto } from './person.dto';

export class CreateUserDto {
  @IsUUID()
  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly password: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly roleId: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class PersonalInformationDto extends IntersectionType(
  CreateUserDto,
  CreatePersonDto,
) {}
