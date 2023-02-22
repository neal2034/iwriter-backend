import { IsString } from "class-validator";

export class ILoginDto {
  @IsString()
  username: string;
  @IsString()
  password: string;
}
