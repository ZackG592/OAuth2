import { IsString } from "class-validator"

export class NativeLoginDTO {
    @IsString()
    email:string;

    @IsString()
    password:string;
}