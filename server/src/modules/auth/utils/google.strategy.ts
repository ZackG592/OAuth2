import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Profile, Strategy} from 'passport-google-oauth20'
import { AuthService } from "../auth.service";
import { SafeUserData } from "src/common/types/safeUserData";


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService:AuthService){
        super({
            clientID:process.env.CLIENT_ID ?? '',
            clientSecret:process.env.CLIENT_SECRECT ?? '',
            callbackURL:process.env.CALLBACK_URL ?? '',
            scope: ['profile','email'],
        })
    }
    
    async validate(accessToken:string, refreshToken:string, profile: Profile): Promise<SafeUserData | false> {
        const email = profile._json.email
        if(!email){
            return false
        }

        const user = await this.authService.findUser(email)

        if(user){
            return {email:user.email, userID:user.id}
        }

        const createdUser = await this.authService.OAuth2CreateUser(email)

        if(!createdUser){
            return false
        }

        return {email:createdUser.email, userID:createdUser.id}
    }
}