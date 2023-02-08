import { Injectable } from "@nestjs/common";
import { AdminForm } from "./adminform.dto";


@Injectable({})

export class AdminService {

    getIndex(): string {
        return "Admin Panel";

    }
    signup() {
        return 'I am Signed Up';
    }
    signin() {
        return 'I am Signed in';
    }
    getUserByID(id): any {

        return "UserID is " + id;
    }
    getUserByIDName(qry): any {

        id: Number
        name: String
        return "UserID is " + qry.id + " and UserName is " + qry.name;
    }

    insertUser(mydto: AdminForm): any {

        return "Admin Inserted name: " + mydto.name + " and userid is " + mydto.id;
    }

    updateUser(name, id): any {
        return "Admin updated name: " + name + " and userid is " + id;
    }
    updateUserbyid(name, id): any {
        return "Update user where id " + id + " and change name to " + name;
    }
    deleteUserbyid(id): any {

        return "Delete userid is " + id;
    }
    addNewUser(id, name): any {
        return "User with id " + id + " & name " + name + " added"
    }

}