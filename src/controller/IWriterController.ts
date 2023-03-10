import { Body, Controller, Get, Post } from "@nestjs/common";
import { PublicRouter } from "../config/auth/PublicRouterDecorator";
import { IWriterDto } from "../dto/question/IWriterDto";
import { IWriterService } from "../service/IWriterService";

@Controller('iwriter')
export class IWriterController{


  constructor(private iwriterService: IWriterService) {
  }

  @PublicRouter()
  @Post()
  async question(@Body() writerDto: IWriterDto){
    try {
      return await this.iwriterService.getCompletions(writerDto);
    }catch (error){
      throw error;
    }
  }


}