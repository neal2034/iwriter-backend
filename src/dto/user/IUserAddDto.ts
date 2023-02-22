import { IsString } from "class-validator";
import { BaseInDto } from "../base/BaseInDto";

export class IUserAddDto extends BaseInDto{
  @IsString()
  username:string;
  @IsString()
  password:string;
}