import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity } from "./admin.entity"
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { EmployeeService } from "src/employee/employee.service";
import { EmployeeEntity } from "src/employee/employee.entity";
import { MailerModule } from "@nestjs-modules/mailer";



@Module({
    imports: [MailerModule.forRoot({
        transport: {
            host: 'smtp.gmail.com',
            port: 465,
            ignoreTLS: true,
            secure: true,
            auth: {
                user: 'akib.tahmid19@gmail.com',
                pass: '************'
            },
        }
    }),
    TypeOrmModule.forFeature([AdminEntity, EmployeeEntity])],
    controllers: [AdminController],
    providers: [AdminService, EmployeeService]
})
export class AdminModule {

}
