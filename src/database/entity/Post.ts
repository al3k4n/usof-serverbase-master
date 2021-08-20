import {BaseEntity, Column, Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Category} from "@entity/Category";
import {User} from "@entity/User";


enum PostStatus {
    active = 'active',
    inactive = 'inactive'
}

@Entity({name: 'post'})
export class Post extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    publish_date: Date;

    @Column({
        type: "enum",
        enum: PostStatus,
        default: PostStatus.active
    })
    status: PostStatus;

    @Column()
    content: string;

    @Column()
    @OneToOne(() => User)
    author: number

    @Column("int", {array: true})
    @ManyToMany(() => Category)
    categories: Category[]
}