import { Controller, Post, Get, Put, Delete, Param, Query, Body, ParseIntPipe, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminForm } from "./adminform.dto";
import { v4 as uuid } from "uuid"
import { EmployeeForm } from 'src/employee/employee.dto';
import { EmployeeService } from 'src/employee/employee.service';
import { AdminFormUpdate } from './adminformupdate.dto';



@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService, private employeeService: EmployeeService) { }

    @Get("/index")
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

    @Get("/findadmin/:id")
    getAdminByID(@Param("id", ParseIntPipe) id: number,): any {
        return this.adminService.getUserByID(id);
    }
    @Get("/findadmin")
    getUserByIDName(@Query() qry: any): any {
        return this.adminService.getUserByIDName(qry);
    }

    @Put("/updateadmin/")
    @UsePipes(new ValidationPipe())
    updateAdmin(@Body('name') name: string, @Body('id') id: number): any {
        return this.adminService.updateUser(name, id);
    }

    @Put("/updateuser/:id")
    @UsePipes(new ValidationPipe())
    updateAdminbyid(
        @Body() mydto: AdminFormUpdate,
        @Param('id', ParseIntPipe) id: number,
    ): any {
        return this.adminService.updateUserbyid(mydto, id);
    }

    @Delete("/deleteuser/:id")
    deleteAdminbyid(@Param('id', ParseIntPipe) id: number): any {
        return this.adminService.deleteUserbyid(id);

    }


    @Post("/instertemployee/")
    @UsePipes(new ValidationPipe())
    insertEmployee(@Body() employeedto: EmployeeForm): any {
        return this.employeeService.insertEmployee(employeedto);
    }

    // @Get('/findemployeesbyadmin/:id')
    // getEmployeeByAdminID(@Param('id', ParseIntPipe) id: number): any {
    //     return this.adminService.getEmployeesByAdminID(id);
    // }

    // @Get('/findadminbyemployee/:id')
    // getAdminByEmployeeID(@Param('id', ParseIntPipe) id: number): any {
    //     return this.employeeService.getAdminByEmployeeID(id);
    // }

}

