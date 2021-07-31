import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { User } from "./User";
import { Event } from "./Event";

@Entity()
export class JoinRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.joinRequests)
  user: User;

  @ManyToOne(() => Event, (event) => event.joinRequests)
  event: Event;

  @Column()
  message: string;

  @Column({ default: "PENDING" })
  status: string;
}
