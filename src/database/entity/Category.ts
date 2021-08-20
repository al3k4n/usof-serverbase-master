import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity({name: 'category'})
export class Category extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;
}