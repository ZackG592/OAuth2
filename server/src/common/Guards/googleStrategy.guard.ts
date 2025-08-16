import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


@Injectable()
export class GoogleAuthGuard  extends AuthGuard('google'){

    constructor() {
    super({
      session: false 
    });
  }

    async canActivate(context: ExecutionContext){
        const isCanActivate = await super.canActivate(context) as boolean

        const httpContext = context.switchToHttp()
        const request = httpContext.getRequest()

        await super.logIn(request)

        return isCanActivate
    }
}