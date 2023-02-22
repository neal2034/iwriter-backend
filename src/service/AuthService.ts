import { Injectable } from "@nestjs/common";
import { UserManager } from "../manager/user/UserManager";
import { ILoginDto } from "../dto/auth/ILoginDto";
import { OLoginDto } from "../dto/auth/OLoginDto";
import { AppBaseException } from "../exception/AppBaseException";
import Errors from "../config/constant/Errors";
import { isPasswordMatch } from "../util/encrypt";
import { JwtService } from "@nestjs/jwt";
import { IRefreshTokenDto } from "../dto/auth/IRefreshTokenDto";
import { UserTokenManager } from "../manager/auth/UserTokenManager";

type RefreshToken = {
  username:string
}

@Injectable()
export class AuthService{
  constructor(private readonly userManager:UserManager, private readonly jwtService: JwtService, private readonly userTokenManager:UserTokenManager) {

  }

  async login(loginDto:ILoginDto):Promise<OLoginDto>{
    // check whether user exist and the password is match
    const user = await this.userManager.findByUsername(loginDto.username);
    if(!user){
      throw new AppBaseException(Errors.auth.UserNotExist)
    }
    if(!(await isPasswordMatch(loginDto.password, user.password))){
      throw  new AppBaseException(Errors.auth.AuthenticationError)
    }
    //generate token and refresh token
    const resultDto = await this.getRefreshToken(loginDto.username)
    this.userTokenManager.addToken({refreshToken:resultDto.refreshToken, user, rootToken:resultDto.refreshToken})
    return this.getRefreshToken(loginDto.username)

  }

  async refreshToken(refreshTokenDto:IRefreshTokenDto):Promise<OLoginDto>{
    const refreshToken = refreshTokenDto.refreshToken;
    const payload = this.jwtService.decode(refreshToken) as RefreshToken
    const username = payload.username
    const userToken = await this.userTokenManager.getToken(username, refreshToken)
    if(!userToken){
      throw new AppBaseException(Errors.auth.UnAuthorized)
    }
    if(userToken.isUsed){
      const unUsedTokens = await this.userTokenManager.listUnUsedToken(refreshToken)
      for(const token of unUsedTokens){
        token.isUsed = true
      }
      this.userTokenManager.editEntities(unUsedTokens)
      throw new AppBaseException(Errors.auth.UnAuthorized)
    }else{
      userToken.isUsed = true;
      this.userTokenManager.editEntity(userToken)
      const resultDto = await this.getRefreshToken(username)
      this.userTokenManager.addToken({refreshToken:resultDto.refreshToken, rootToken:userToken.rootToken, user:userToken.user})
      return  resultDto

    }

  }

  async getRefreshToken(username:string):Promise<OLoginDto>{
    //generate token and refresh token
    const expiration = 3 * 60 * 60; // will expire 3 hours by default
    const token = this.jwtService.sign({
      username,
      expiration,
      exp: Math.floor(Date.now()/1000 + expiration)
    })
    const refreshToken = this.jwtService.sign({ username });
    return {token, refreshToken, expiration}

  }

}