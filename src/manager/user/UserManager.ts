import { BaseDataManager } from "../BaseDataManager";
import { User } from "../../domain/user/User";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserManager extends BaseDataManager<User>(User){


  async findByUsername(username:string):Promise<User>{
    return  this.getOneEntity({where:{username}})
  }


}