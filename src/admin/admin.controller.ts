import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Post, Put, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe, Session, UseGuards, Res, Header, HttpCode } from "@nestjs/common";
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { SessionGuard } from './session.guard';
import { AdminService } from "./admin.service";
import { AdminForm } from "./adminform.dto";
import { v4 as uuid } from "uuid"
import { EmployeeForm } from 'src/employee/employee.dto';
import { EmployeeService } from 'src/employee/employee.service';
import { AdminFormUpdate } from './adminformupdate.dto';
import { SigninForm } from "./signindto";
import { BookForm } from "src/book/book.dto";
import { BookEntity } from "src/book/book.entity";
import { BookService } from "src/book/book.service";


@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService, private employeeService: EmployeeService, private bookService: BookService) { }

    @Get("/index")
    getAdmin(): any {
        return this.adminService.getIndex();
    }

    @Get("/employee/index")
    getEmployee(): any {
        return this.employeeService.getIndex();
    }

    @Get("/book/index")
    getBook(): any {
        return this.bookService.getIndex();
    }

    @Post('/insertadmin')
    @UsePipes(new ValidationPipe())
    insertUser(@Body() mydto: AdminForm): any {
        return this.adminService.insertUser(mydto);
    }

    @Post('/book/insertbook')
    @UsePipes(new ValidationPipe())
    insertBook(@Body() mydto: BookForm): any {
        return this.bookService.addBook(mydto);
    }

    @Get("/book/findbook/:id")
    getBookByID(@Param("id", ParseIntPipe) id: number,): any {
        return this.bookService.getBookByID(id);
    }

    @Get("employee/findemployee/:id")
    getEmployeeByID(@Param("id", ParseIntPipe) id: number,): any {
        return this.employeeService.getEmployeeByID(id);
    }

    @Get("/findadmin/:id")
    getAdminByID(@Param("id", ParseIntPipe) id: number,): any {
        return this.adminService.getUserByID(id);
    }
    @Get("/findadmin")
    getUserByIDName(@Query() qry: any): any {
        return this.adminService.getUserByIDName(qry);
    }

    @Put('/updateadmin/')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    updateAdmin(@Session() session, @Body('name') name: string): any {
        console.log(session.email);
        return this.adminService.updateUser(name, session.email);
    }

    @Put("/updateadmin/:id")
    @UsePipes(new ValidationPipe())
    updateAdminbyid(
        @Body() mydto: AdminFormUpdate,
        @Param('id', ParseIntPipe) id: number,
    ): any {
        return this.adminService.updateUserbyid(mydto, id);
    }

    @Delete("/deleteadmin/:id")
    deleteAdminbyid(@Param('id', ParseIntPipe) id: number): any {
        return this.adminService.deleteUserbyid(id);

    }


    @Post("/instertemployee/")
    @UsePipes(new ValidationPipe())
    insertEmployee(@Body() employeedto: EmployeeForm): any {
        return this.employeeService.insertEmployee(employeedto);
    }

    @Get('/findemployeesbyadmin/:id')
    getEmployeeByAdminID(@Param('id', ParseIntPipe) id: number): any {
        return this.adminService.getEmployeesByAdminID(id);
    }

    @Get('/findadminbyemployee/:id')
    getAdminByEmployeeID(@Param('id', ParseIntPipe) id: number): any {
        return this.employeeService.getAdminByEmployeeID(id);
    }
    @Get('/getimage/:name')
    getImages(@Param('name') name, @Res() res) {
        res.sendFile(name, { root: './uploads' })
    }
    @Post('/signup')
    @UseInterceptors(FileInterceptor('image',
        {
            storage: diskStorage({
                destination: './uploads',
                filename: function (req, file, cb) {
                    cb(null, Date.now() + file.originalname)
                }
            })

        }))
    signup(@Body() mydto: AdminForm, @UploadedFile(new ParseFilePipe({
        validators: [
            new MaxFileSizeValidator({ maxSize: 1600000 }),
            new FileTypeValidator({ fileType: /(png|jpg|jpeg)$/ }),
        ],
    }),) file: Express.Multer.File) {

        mydto.filename = file.filename;
        console.log(mydto)
        return this.adminService.signup(mydto);
    }
    @Post('/signin')
    @UsePipes(new ValidationPipe())
    async signin(@Session() session, @Body() mydto: SigninForm) {
        const res = await (this.adminService.signin(mydto));
        if (res == true) {
            session.email = mydto.email;
            return (session.email);
        }
        else {
            throw new UnauthorizedException({ message: "invalid credentials" });
        }
    }
    @Get('/signout')
    signout(@Session() session) {
        if (session.destroy()) {
            return { message: "You are logged out of the System" };
        }
        else {
            throw new UnauthorizedException("Invalid Actions");
        }
    }
    @Post('/sendemail')
    sendEmail(@Body() mydata) {
        return this.adminService.sendEmail(mydata);
    }

}

