import { Module } from "@nestjs/common";
import { UserManager } from "../manager/user/UserManager";
import { AuthService } from "../service/AuthService";
import { AuthController } from "../controller/AuthController";
import { JwtModule } from "@nestjs/jwt";
import { JWT_SECRET } from "../config/constant/SysConstant";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../domain/user/User";
import { JwtStrategy } from "../config/auth/JwtStrategy";
import { UserTokenManager } from "../manager/auth/UserTokenManager";
import { UserToken } from "../domain/auth/UserToken";

@Module({
  imports:[JwtModule.register({secret: JWT_SECRET}), TypeOrmModule.forFeature([User, UserToken])],
  controllers:[AuthController],
  providers:[UserManager, AuthService, JwtStrategy, UserTokenManager]
})
export class AuthModule{}