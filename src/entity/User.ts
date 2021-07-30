
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("account")
export class User {
    constructor(

    firstName:string,

    lastName:string,

    userName:string,

        email:string,
    password:string,

    ){
        this.firstName = firstName;
        this.password = password
        this.userName = userName
        this.lastName = lastName

        this.email = email

    }
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName:string;

    @Column()
    lastName:string;

    @Column()
    userName:string;

    @Column()
    password:string;

    @Column()
    email:string
}
