import { EntityBase } from 'src/common/class/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { Role } from './role.entity';
import { Person } from './person.entity';

@Entity({ name: 'users' })
export class User extends EntityBase {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  username: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToOne(() => Person, (person) => person.user)
  person: Person;
}
