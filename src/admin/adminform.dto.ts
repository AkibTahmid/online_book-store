
import { IsInt, IsNotEmpty, Length, IsEmail, IsString } from "class-validator";

export class AdminForm {
    @IsNotEmpty({ message: "Your ID is must to complete Registration" })
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