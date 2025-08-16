import { Controller, Get, Post, Req,Body, UseGuards, UseInterceptors } from "@nestjs/common";
import { SetCookie } from "src/common/generics/setCookie.generic";
import { GoogleAuthGuard } from "src/common/Guards/googleStrategy.guard";
import COOKIE_CONSTANTS from '../../common/constants/COOKIE_CONSTANTS'
import { RequestWithSafeUserData } from "src/common/types/requestWithUser";
import { SetCookieInterceptor } from "src/common/Interceptors/SetCookie.interceptor";
import { NativeLoginDTO } from "./DTO/NativeLogin.DTO";
import { NativeRegistrationDTO } from "./DTO/NativeRegistration.DTO";
import { AuthService } from "./auth.service";
import { SafeUserData } from "src/common/types/safeUserData";
import { DefaultAccessGuard } from "src/common/Guards/defaultAcess.guard";


@Controller('auth')
export class AuthController{
    constructor(private readonly authSerivce:AuthService){}

    @Get('protected')
    @UseGuards(DefaultAccessGuard)
    async returnData(){
        return {'message': 'You have access'}
    }

    @Get('google/login')
    @UseGuards(GoogleAuthGuard)
    async handleLogin() {
        return {'message':'redirected'}
    }

    @Get('google/redirect')
    @UseGuards(GoogleAuthGuard)
    @UseInterceptors(SetCookieInterceptor)
    async handleRedirect(@Req() req: RequestWithSafeUserData):Promise<SetCookie<SafeUserData>>{
        return {cookieName:COOKIE_CONSTANTS.ACCESS_TOKEN, data: req.user}
    }   

    @Post('native/login')
    @UseInterceptors(SetCookieInterceptor)
    async handleNativeLogin(@Body() body:NativeLoginDTO):Promise<SetCookie<SafeUserData>>{
        const user = await this.authSerivce.nativeLogin(body)
        return {data:{email:user.email, userID:user.id},cookieName:COOKIE_CONSTANTS.ACCESS_TOKEN}

    }

    @Post('native/registration')
    @UseInterceptors(SetCookieInterceptor)
    async handleNativeRegistration(@Body() body:NativeRegistrationDTO):Promise<SetCookie<SafeUserData>>{
        const user = await this.authSerivce.NativeRegistration(body)
        return {data:{email:user.email, userID:user.id}, cookieName:COOKIE_CONSTANTS.ACCESS_TOKEN}
    }
}