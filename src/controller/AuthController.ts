import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "../service/AuthService";
import { ILoginDto } from "../dto/auth/ILoginDto";
import { PublicRouter } from "../config/auth/PublicRouterDecorator";
import { IRefreshTokenDto } from "../dto/auth/IRefreshTokenDto";


@Controller('auth')
export class AuthController{
  constructor(private authService:AuthService) {
  }

  @PublicRouter()
  @Post('login')
  async login(@Body() loginDto:ILoginDto){
    return await this.authService.login(loginDto);
  }

  @PublicRouter()
  @Post('refresh')
  async refreshToken(@Body() refreshTokenDto:IRefreshTokenDto){
    return await this.authService.refreshToken(refreshTokenDto)
  }
}