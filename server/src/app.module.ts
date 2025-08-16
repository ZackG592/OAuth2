import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [AuthModule,PrismaModule,
    JwtModule.register({
      global:true,
      secret: process.env.JWT_SECRET_KEY || 'defaultSecret', 
      signOptions: { expiresIn: process.env.JWT_EXPIERS_IN  || '24h'},    
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
