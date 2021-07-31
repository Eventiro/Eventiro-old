import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  maxMembers: number;

  @Column()
  joinedMembers: number;

  @Column()
  description: string;

  @Column()
  location: string;

  @ManyToOne(() => User, (user) => user.events)
  user: User;
}
