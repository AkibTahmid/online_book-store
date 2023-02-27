
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmployeeEntity } from "./employee.entity";



@Module({
    imports: [TypeOrmModule.forFeature([EmployeeEntity])],
    controllers: [],
    providers: [],

})

export class EmployeeModule { }