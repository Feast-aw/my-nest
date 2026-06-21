import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
@Entity()
export class IdCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 18 })
  cardNo: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  birthday: Date;

  @Column()
  email: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
