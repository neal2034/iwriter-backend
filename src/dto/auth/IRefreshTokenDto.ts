import { IsNotEmpty } from "class-validator";

export class IRefreshTokenDto{
  @IsNotEmpty()
  refreshToken:string;
}