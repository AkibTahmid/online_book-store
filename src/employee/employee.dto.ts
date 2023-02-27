import { IsNotEmpty, IsInt, Length, IsEmail } from "class-validator";

export class EmployeeForm {


    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsInt()
    password: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    adminid: number;



}