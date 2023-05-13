import { Injectable, HttpStatus, HttpException } from "@nestjs/common";
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
    getIndex(): any {
        return this.employeeRepo.find();;

    }

    async getEmployeeByID(id) {

        const data = await this.employeeRepo.findOneBy({ id });
        console.log(data);
        if (data !== null) {
            return data;
        }
        else {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
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