import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { SetCookie } from "../generics/setCookie.generic";
import { Response } from "express";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class SetCookieInterceptor implements NestInterceptor {

    constructor(private readonly jwtSerivce:JwtService){}

    intercept(context: ExecutionContext, next: CallHandler<any>):Observable<any> {

        const response = context.switchToHttp().getResponse() as Response

        return next.handle().pipe(
            map((data:SetCookie<any>) => { 

                const jwtToken = this.jwtSerivce.sign(data.data)

                response.cookie(data.cookieName, jwtToken, {
                    secure:process.env.IS_SECURE_COOKIE === 'TRUE',
                    httpOnly:true,
                    sameSite:'strict'
                })

               const dataToReturn = data.data
               console.log(data?.redirect)
               if(data?.redirect){
                    return response.redirect(data.redirect)
                }
               return dataToReturn
            })
        )
    }
}