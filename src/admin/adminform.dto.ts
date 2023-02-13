
import { IsInt, IsNotEmpty, Length, IsEmail, IsString } from "class-validator";

export class AdminForm {
    @IsNotEmpty({ message: "Please enter your id" })
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsInt()
    Password: string;

    @IsEmail()
    email: string;

    @IsString()
    Address: string;

}