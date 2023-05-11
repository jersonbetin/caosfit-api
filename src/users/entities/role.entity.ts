import { EntityBase } from 'src/common/class/base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

export enum ROLES {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
}

@Entity({ name: 'roles' })
export class Role extends EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', unique: true, enum: ROLES })
  name: ROLES;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
