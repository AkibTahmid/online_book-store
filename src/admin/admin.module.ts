import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity } from "./admin.entity"
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { EmployeeService } from "src/employee/employee.service";
import { EmployeeEntity } from "src/employee/employee.entity";



@Module({
    imports: [TypeOrmModule.forFeature([AdminEntity, EmployeeEntity])],
    controllers: [AdminController],
    providers: [AdminService, EmployeeService]
})
export class AdminModule {

}