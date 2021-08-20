import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IsEmail} from "class-validator";

export enum UserRole {
    admin='admin',
    user='user'
}

@Entity({name: 'user'})
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    login: string;

    @Column()
    password: string;

    @Column({unique: true})
    @IsEmail()
    email: string;

    @Column({nullable: true})
    picture: string;

    @Column({default: 0})
    rating: number;

    @Column({default: false})
    active: boolean;

    @Column()
    verification: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.user
    })
    role: UserRole;
}