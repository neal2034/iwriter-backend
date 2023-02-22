import { BaseDataManager } from "../BaseDataManager";
import { UserToken } from "../../domain/auth/UserToken";
import { Injectable } from "@nestjs/common";
import { User } from "../../domain/user/User";
import { plainToClass } from "class-transformer";

@Injectable()
export class UserTokenManager extends BaseDataManager<UserToken>(UserToken){

  async addToken(tokenObj:{refreshToken:string, rootToken:string, user:User}){
    const userToken = plainToClass(UserToken, tokenObj)
    await this.addEntity(userToken)
  }

  async getToken(username:string, refreshToken:string){
    return this.getOneEntity({
      relations:{user:true},
      where:{
        user: {username},
        refreshToken
      }
    })
  }

  async listUnUsedToken(rootToken:string){
    return this.listEntity({
      where:{
        rootToken,
        isUsed:false
      }
    })
  }
}