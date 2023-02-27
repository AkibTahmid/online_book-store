import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { AdminForm } from "./adminform.dto";
import { Repository } from 'typeorm';
import { AdminEntity } from "./admin.entity";
import { AdminFormUpdate } from "./adminformupdate.dto";


@Injectable({})

export class AdminService {

    constructor(
        @InjectRepository(AdminEntity)
        private adminRepo: Repository<AdminEntity>,
    ) { }

    getIndex(): any {
        return this.adminRepo.find();;

    }
    signup() {
        return 'I am Signed Up';
    }
    signin() {
        return 'I am Signed in';
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
        return this.adminRepo.save(adminaccount);
    }

    updateUser(name, id): any {
        console.log(name + id);
        return this.adminRepo.update(id, { name: name });
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

    //getEmployeesByAdminID(id): any {
    //   return this.adminRepo.find({
    //   where: { id: id },
    //   relations: {
    //       employees: true,
    //    },
    // });
    // }
}