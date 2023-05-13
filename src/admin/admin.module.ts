import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity } from "./admin.entity"
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { EmployeeService } from "src/employee/employee.service";
import { EmployeeEntity } from "src/employee/employee.entity";
import { BookService } from "src/book/book.service";
import { BookEntity } from "src/book/book.entity";
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
                pass: 'password'
            },
        }
    }),
    TypeOrmModule.forFeature([AdminEntity, EmployeeEntity, BookEntity])],
    controllers: [AdminController],
    providers: [AdminService, EmployeeService, BookService]
})
export class AdminModule {

}
