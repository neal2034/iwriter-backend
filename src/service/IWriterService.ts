import { Injectable } from "@nestjs/common";
import { IWriterDto } from "../dto/question/IWriterDto";
import { UserManager } from "../manager/user/UserManager";
import { User } from "../domain/user/User";
import { UserType } from "../config/enums/UserType";
import { Tone } from "../config/enums/Tone";
import { UnAuthorizedException } from "../exception/UnAuthorizedException";
import { ResponseLength } from "../config/enums/ResponseLength";
import { Modal } from "../config/enums/Modal";
import { Configuration, OpenAIApi } from "openai";
import { CompletionManager } from "../manager/iwriter/CompletionManager";
import { Completion } from "../domain/iwriter/Completion";
import {CALL_LIMIT_FOR_FREE} from '../config/constant/SysConstant'
import { ExtendCallLimitException } from "../exception/ExtendCallLimitException";
import { ConfigService } from "@nestjs/config";
import { OpenApiServerException } from "../exception/OpenApiServerException";


@Injectable()
export class IWriterService{
  constructor(private userManager: UserManager, private completionManager:CompletionManager, private config:ConfigService) {
  }

  async getCompletions(writerDto: IWriterDto){
    // check whether user exist, if not, create the user
    const user = await this.createUserIfNotExist( writerDto.id)

    // check user limit number for each day
    const callNum = await  this.completionManager.getTodayCompletionNum(user.id);
    if(callNum >= CALL_LIMIT_FOR_FREE){
        throw new ExtendCallLimitException();
    }


    // validate parameters accord user type
    if(user.type === UserType.FREE){
      if(writerDto.tone !== Tone.Activity && writerDto.tone!= Tone.Encouraging && !writerDto.tone ){
        throw new UnAuthorizedException();
      }
      if(!writerDto.lenLimit && writerDto.lenLimit!=ResponseLength.THOUSAND){
        throw new UnAuthorizedException();
      }
      if(!writerDto.modal && writerDto.modal!=Modal.DAVINCI && writerDto.modal!=Modal.CURIE){
        throw  new UnAuthorizedException();
      }
    }


    // get completions via openapi, record and return
    const apiKey = this.config.get<string>('API_KEY')
    const configuration = new Configuration({
      apiKey: apiKey
    });

    const openai = new OpenAIApi(configuration);
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003", //TODO model should change accord user select
        prompt: writerDto.prompt,
        temperature: 0.6,
      });
      if(response.status === 200){
        console.log("success get result");
        const usage = response.data.usage
        const completion = new Completion()
        completion.completion = response.data.choices[0].text;
        completion.prompt = writerDto.prompt;
        completion.promptTokens = usage.prompt_tokens;
        completion.completionTokens = usage.completion_tokens;
        completion.totalTokens = usage.total_tokens;
        completion.model = response.data.model;
        completion.user = user;
        await this.completionManager.addEntity(completion);
      }

    }catch (error){
      throw new OpenApiServerException();
    }


  }

  async createUserIfNotExist(username:string){
    const user = await this.userManager.findByUsername(username)
    if(!user){
      const newUser = new User();
      newUser.username = username;
      newUser.type = UserType.FREE;
      await this.userManager.addEntity(newUser)
      return newUser;
    }else {
      return user;
    }
  }

}