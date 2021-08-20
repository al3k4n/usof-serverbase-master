import {BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "@entity/User";

export enum EntityType {
    post = 'post',
    comment = 'comment'
}

@Entity({name: 'like'})
export class Like extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @OneToOne(() => User)
    @JoinColumn()
    author: number;

    @Column()
    entity_id: number;

    @Column({
        type: "enum",
        enum: EntityType,
    })
    content: EntityType;
}