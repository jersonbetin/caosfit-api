import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Person } from '../entities/person.entity';
import { CreatePersonDto, UpdatePersonDto } from '../dtos/person.dto';
import { GenericService } from 'src/common/class/generic.service';

@Injectable()
export class PersonsService
  implements GenericService<Person, number, CreatePersonDto, UpdatePersonDto>
{
  constructor(
    @InjectRepository(Person) private personRepository: Repository<Person>,
  ) {}

  async create(data: CreatePersonDto): Promise<Person> {
    const newPerson = await this.personRepository.create(data);

    return this.personRepository.save(newPerson);
  }

  async update(id: number, data: UpdatePersonDto): Promise<Person> {
    const { userId } = data;
    const person = await this.personRepository.findOneBy({
      id,
      user: { id: userId },
    });

    if (!person) {
      throw new NotFoundException(`User #${userId} not found`);
    }

    this.personRepository.merge(person, data);

    return this.personRepository.save(person);
  }

  async delete(id: number): Promise<boolean> {
    const person = await this.findOne(id);

    try {
      await this.personRepository.delete(person.id);
      return true;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  findAll(): Promise<Person[]> {
    return this.personRepository.find();
  }

  async findOne(id: number): Promise<Person> {
    const person = await this.personRepository.findOneBy({
      id,
    });

    if (!person) {
      throw new NotFoundException(
        `Personal Information with id #${id} not found`,
      );
    }

    return person;
  }
}
