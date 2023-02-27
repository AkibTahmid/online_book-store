
import { IsNotEmpty, IsInt, Length, IsString } from "class-validator";

export class AdminFormUpdate {

    @IsNotEmpty()
    @IsString()
    name: string;
}