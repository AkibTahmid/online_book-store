import { Injectable } from "@nestjs/common";
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
    getUserByID(id): any {

        return this.adminRepo.findOneBy({ id });
    }
    getUserByIDName(qry): any {

        id: Number
        name: String
        return this.adminRepo.findOneBy({ id: qry.id, name: qry.name });
    }

    insertUser(mydto: AdminForm): any {

        const adminaccount = new AdminEntity()
        adminaccount.name = mydto.name;
        adminaccount.email = mydto.email;
        adminaccount.password = mydto.password;
        adminaccount.address = mydto.address;
        // adminaccount.filename = mydto.filename;
        return this.adminRepo.save(adminaccount);
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
        console.log(mydto.password);
        const mydata = await this.adminRepo.findOneBy({ email: mydto.email });
        const isMatch = await bcrypt.compare(mydto.password, mydata.password);
        if (isMatch) {
            return 1;
        }
        else {
            return 0;
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