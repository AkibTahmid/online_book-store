
import { IsInt, IsNotEmpty, Length, IsEmail, IsString } from "class-validator";

export class SigninForm {

    @IsNotEmpty({ message: "Email is must to complete Registration" })
    @IsEmail()
    email: string;

    @IsNotEmpty({ message: "Password Required" })
    password: string;

}