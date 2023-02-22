import { Injectable } from "@nestjs/common";
import { UserManager } from "../manager/user/UserManager";
import { IUserAddDto } from "../dto/user/IUserAddDto";
import { User } from "../domain/user/User";
import { UserExistException } from "../exception/UserExistException";

@Injectable()
export class UserService{
  constructor(private readonly userManager:UserManager) {
  }


  async addUser(addDto:IUserAddDto){
    const existUser = await this.userManager.findByUsername(addDto.username)
    if(existUser){
      throw new UserExistException()
    }
    const user = addDto.toEntity(User)
    await this.userManager.addEntity(user)
  }

  async getUserByName(username:string):Promise<User>{
    return this.userManager.findByUsername(username);
  }

}