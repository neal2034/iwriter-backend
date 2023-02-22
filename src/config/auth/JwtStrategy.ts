import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import { JWT_SECRET } from "../constant/SysConstant";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET
    });
  }

  validate(payload:any){
    return {username: payload.username}
  }
}