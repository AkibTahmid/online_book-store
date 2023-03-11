import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeForm } from "./employee.dto";
import { EmployeeEntity } from "./employee.entity";


@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(EmployeeEntity)
        private employeeRepo: Repository<EmployeeEntity>,
    ) { }


    insertEmployee(mydto: EmployeeForm): any {

        return this.employeeRepo.save(mydto);
    }
    getAdminByEmployeeID(id): any {
        return this.employeeRepo.find({
            where: { id: id },
            relations: {
                admin: true,
            },
        });
    }



}