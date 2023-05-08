import { EntityBase } from 'src/common/class/base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'roles' })
export class Role extends EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
