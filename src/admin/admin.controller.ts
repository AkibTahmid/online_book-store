import { Controller, Post, Get, Put, Delete, Param, Query, Body, ParseIntPipe, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminForm } from "./adminform.dto";
import { v4 as uuid } from "uuid"



@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) { }

    @Get("/panel")
    getAdmin(): any {
        return this.adminService.getIndex();
    }
    @Post('signup')
    signup() {
        return this.adminService.signup();
    }

    @Post('signin')
    signin() {
        return this.adminService.signin();
    }
    @Post('/insertuser')
    @UsePipes(new ValidationPipe())
    insertUser(@Body() mydto: AdminForm): any {
        return this.adminService.insertUser(mydto);
    }

    @Get("/finduser/:id")
    getUserByID(@Param("id", ParseIntPipe) id: number,): any {
        return this.adminService.getUserByID(id);
    }
    @Get("/finduser")
    getUserByIDName(@Query() qry: any): any {
        return this.adminService.getUserByIDName(qry);
    }

    @Put("/updateuser/")
    @UsePipes(new ValidationPipe())
    updateUser(
        @Body("name") name: string,
        @Body("id") id: number
    ): any {
        return this.adminService.updateUser(name, id);
    }

    @Put("/updateuser/:id")
    updateUserbyid(
        @Body("name") name: string,
        @Param("id", ParseIntPipe) id: number
    ): any {
        return this.adminService.updateUserbyid(name, id);
    }

    @Delete("/deleteuser/:id")
    deleteUserbyid(
        @Param("id", ParseIntPipe) id: number
    ): any {
        return this.adminService.deleteUserbyid(id);
    }

    @Post("/adduser/")
    @UsePipes(new ValidationPipe())
    addNewUser(
        @Body("id") id: number,
        @Body("name") name: string
    ): any {
        return this.adminService.addNewUser(id, name);
    }

}

