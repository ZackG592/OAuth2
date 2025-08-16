import { NativeRegistrationDTO } from './DTO/NativeRegistration.DTO';
import { BadRequestException, Injectable } from "@nestjs/common"
import { PrismaService } from "prisma/prisma.service"
import { NativeLoginDTO } from "./DTO/NativeLogin.DTO"
import { User } from '@prisma/client';
import {compare, hashSync} from 'bcrypt'


@Injectable()
export class AuthService {
    constructor(private readonly prisma:PrismaService){}


    async findUser(email:string) {
        const user = await this.prisma.user.findUnique({
            where:{email:email}
        })

        if(!user){
            return false
        }

        return user
    }

    async OAuth2CreateUser(email:string){
        const newUser = await this.prisma.user.create({
            data: {
                email
            }
        })

        return newUser
    }


    
    async nativeLogin(data: NativeLoginDTO): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: { email: data.email }
        });

        if(!user){
            throw new BadRequestException('No such user with such email')
        }

        if (!user?.password) {
            throw new BadRequestException('Looks like your account hasn`t password, try to enter with Google and add password');
        }

        const isPasswordValid = await compare(data.password, user.password);

        if (!isPasswordValid) {
            throw new BadRequestException('Wrong password or email');
        }

        return user;
    }



    async NativeRegistration(data:NativeRegistrationDTO):Promise<User>{
        const hashedPassword = hashSync(data.password, 10)

        const user = this.prisma.user.create({
            data:{
                ...data,
                password:hashedPassword
            }
            
        })

        return user
    }
}