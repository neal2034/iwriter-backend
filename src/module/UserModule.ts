import { Module } from "@nestjs/common";
import { UserService } from "../service/UserService";
import { UserManager } from "../manager/user/UserManager";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../domain/user/User";

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  providers:[UserService,UserManager],
  exports:[UserService,UserManager]
})
export class UserModule{}