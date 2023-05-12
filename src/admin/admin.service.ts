import { Injectable, HttpStatus, HttpException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { AdminForm } from "./adminform.dto";
import { Repository } from 'typeorm';
import { AdminEntity } from "./admin.entity";
import { AdminFormUpdate } from "./adminformupdate.dto";
import { MailerService } from "@nestjs-modules/mailer/dist";
import * as bcrypt from 'bcrypt';



@Injectable({})

export class AdminService {

    constructor(
        @InjectRepository(AdminEntity)
        private adminRepo: Repository<AdminEntity>,
        private mailerService: MailerService
    ) { }

    getIndex(): any {
        return this.adminRepo.find();;

    }
    async getUserByID(id) {

        const data = await this.adminRepo.findOneBy({ id });
        console.log(data);
        if (data !== null) {
            return data;
        }
        else {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
    }
    getUserByIDName(qry): any {

        return this.adminRepo.findOneBy({ id: qry.id, name: qry.name });
    }

    async insertUser(mydto) {
        const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(mydto.password, salt);
        mydto.password = hassedpassed;
        return this.adminRepo.save(mydto);
    }

    updateUser(name, email): any {
        return this.adminRepo.update({ email: email }, { name: name });
    }

    updateUserbyid(mydto: AdminFormUpdate, id): any {
        return this.adminRepo.update(id, mydto);
    }

    deleteUserbyid(id): any {

        return this.adminRepo.delete(id);
    }

    addNewUser(id, name): any {
        return "User with id " + id + " & name " + name + " added"
    }

    getEmployeesByAdminID(id): any {
        return this.adminRepo.find({
            where: { id: id },
            relations: {
                employees: true,
            },
        });
    }

    async signup(mydto) {
        const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(mydto.password, salt);
        mydto.password = hassedpassed;
        return this.adminRepo.save(mydto);
    }

    async signin(mydto) {

        if (mydto.email != null && mydto.password != null) {
            const mydata = await this.adminRepo.findOneBy({ email: mydto.email });
            const isMatch = await bcrypt.compare(mydto.password, mydata.password);
            if (isMatch) {
                return true;
            }
            else {
                return false;
            }
        } else {
            return false;
        }

    }

    async sendEmail(mydata) {
        return await this.mailerService.sendMail({
            to: mydata.email,
            subject: mydata.subject,
            text: mydata.text,
        });

    }
}