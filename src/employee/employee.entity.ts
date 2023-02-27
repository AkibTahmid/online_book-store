import { AdminEntity } from 'src/admin/admin.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity("employee")
export class EmployeeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    address: string;

    //@ManyToOne(() => AdminEntity, (admin) => admin.employees)
    //admin: AdminEntity

}