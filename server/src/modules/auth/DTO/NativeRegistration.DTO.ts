import { IsString } from "class-validator";

import { NativeLoginDTO } from "./NativeLogin.DTO";


export class NativeRegistrationDTO extends NativeLoginDTO {
    @IsString()
    name:string;

    @IsString()
    surname:string;
}