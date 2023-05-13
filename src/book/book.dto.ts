import { IsNotEmpty, IsInt, Length, IsEmail } from "class-validator";

export class BookForm {

    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    author: string;

    @IsNotEmpty()
    category: string;

    @IsNotEmpty()
    price: number;



}