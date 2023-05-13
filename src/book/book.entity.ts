import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity("book")
export class BookEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    author: string;

    @Column()
    category: string;

    @Column()
    price: number;

}