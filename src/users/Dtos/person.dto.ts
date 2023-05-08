import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePersonDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsOptional()
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @IsString()
  @IsOptional()
  readonly address: string;

  @IsString()
  @IsUUID()
  @IsOptional()
  readonly userId: string;
}

export class UpdatePersonDto extends PartialType(CreatePersonDto) {}
