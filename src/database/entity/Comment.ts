import {BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "@entity/User";
import {Post} from "@entity/Post";


@Entity({name: 'comment'})
export class Comment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @OneToOne(() => User)
    author: number;

    @Column()
    @OneToOne(() => Post)
    post: number

    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    publish_date: Date;

    @Column()
    content: string;
}