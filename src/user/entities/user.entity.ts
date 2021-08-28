import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleType } from '../constants/role-type.constant';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: true })
  public firstName: string;

  @Column({ nullable: true })
  public lastName: string;

  @Column({ unique: true })
  public username: string;

  @Column()
  public password: string;

  @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
  public role: RoleType;

  @CreateDateColumn()
  public createdAt: Date;
}
