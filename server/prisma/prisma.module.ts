import { Global, Injectable } from "@nestjs/common";



@Global()
@Injectable()
export class PrismaModule {
  static forRoot() {
    return {
      module: PrismaModule,
      providers: [],
      exports: [],
    };
  }
}