
import { IsInt, IsNotEmpty, Length, IsEmail, IsString } from "class-validator";

export class AdminForm {
    @IsNotEmpty({ message: "Your Name is must to complete Registration" })
    @IsString()
    name: string;

    @IsNotEmpty({ message: "Password Required" })
    @IsInt()
    password: string;

    @IsNotEmpty({ message: "Email is must to complete Registration" })
    @IsEmail()
    email: string;

    @IsNotEmpty({ message: "Address is must to complete Registration" })
    @IsString()
    address: string;

}