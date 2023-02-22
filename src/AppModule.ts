import { Module, ValidationPipe } from "@nestjs/common";
import { AppConfigModule } from "./module/AppConfigModule";
import { DbOrmConfigModule } from "./module/DbOrmConfigModule";
import { GlobalExceptionFilter } from "./config/filter/GlobalExceptionFilter";
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { ResponseTransformInterceptor } from "./inteceptor/ResponseTransformInterceptor";
import { UserModule } from "./module/UserModule";
import { UserService } from "./service/UserService";
import { AuthModule } from "./module/AuthModule";
import { JwtAuthGuard } from "./config/auth/JwtAuthGuard";
import { IWriterModule } from "./module/IWriterModule";

@Module({
  imports: [AppConfigModule,DbOrmConfigModule,UserModule, AuthModule, IWriterModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass:GlobalExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass:ResponseTransformInterceptor
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ],
})
export class AppModule {
  constructor(private readonly userService:UserService) {
  }
}
