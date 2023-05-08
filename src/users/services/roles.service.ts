import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from '../entities/role.entity';
import { GenericService } from 'src/common/class/generic.service';
import { CreateRoleDTO, UpdateRoleDto } from '../Dtos/role.dto';

@Injectable()
export class RolesService
  implements GenericService<Role, number, CreateRoleDTO, UpdateRoleDto>
{
  constructor(@InjectRepository(Role) private roleRepo: Repository<Role>) {}

  async create(data: CreateRoleDTO): Promise<Role> {
    const { name } = data;
    const role = await this.roleRepo.findOneBy({ name });

    if (role)
      throw new ConflictException(`Role with name ${name} already exist!`);

    const newRole = await this.roleRepo.create(data);

    return this.roleRepo.save(newRole);
  }

  async update(id: number, data: UpdateRoleDto): Promise<Role> {
    const role = await this.findOne(id);

    await this.roleRepo.merge(role, data);

    return this.roleRepo.save(role);
  }

  async delete(id: number): Promise<boolean> {
    await this.findOne(id);

    try {
      await this.roleRepo.delete(id);

      return true;
    } catch (e) {
      throw new Error(e);
    }
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepo.find();
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.roleRepo.findOneBy({ id });

    if (!role) throw new NotFoundException(`Role with id ${id} not found`);

    return role;
  }
}
