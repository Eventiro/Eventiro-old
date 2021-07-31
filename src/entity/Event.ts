import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { JoinRequest } from "./JoinRequest";
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

  @OneToMany(() => JoinRequest, (joinReq) => joinReq.event)
  joinRequests: JoinRequest[];
}
