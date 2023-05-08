import { EntityBase } from 'src/common/class/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Role } from './role.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class User extends EntityBase {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
