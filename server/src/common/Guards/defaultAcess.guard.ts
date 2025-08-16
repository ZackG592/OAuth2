import { AuthService } from './../../modules/auth/auth.service';
import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from 'express';
import COOKIE_CONSTANTS from '../constants/COOKIE_CONSTANTS';
import { JwtService } from '@nestjs/jwt';
import { SafeUserData } from '../types/safeUserData';


@Injectable()
export class DefaultAccessGuard implements CanActivate {

  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const accessToken = request.cookies?.[COOKIE_CONSTANTS.ACCESS_TOKEN];

    if (!accessToken) {
      throw new BadRequestException('No access token provided');
    }

    let payload: SafeUserData;
    try {
      payload = this.jwtService.verify<SafeUserData>(accessToken);
      console.log('Decoded payload:', payload);
    } catch (err) {
      throw new BadRequestException('Token expired or invalid');
    }

    const user = this.authService.findUser(payload.email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    return true;
  }
}
