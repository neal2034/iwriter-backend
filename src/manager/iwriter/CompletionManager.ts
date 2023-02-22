import { BaseDataManager } from "../BaseDataManager";
import { Completion } from "../../domain/iwriter/Completion";
import { Injectable } from "@nestjs/common";
import { Between } from "typeorm";

@Injectable()
export class CompletionManager extends BaseDataManager<Completion>(Completion){

  async getTodayCompletionNum(userId:number){

    const start = new Date();
    start.setUTCHours(0,0,0,0);

    const end = new Date();
    end.setUTCHours(23,59,59,999);
    
   return  this.countEntity({
      relations: {user:true},
      where:{
        user: {id:userId},
        addAt: Between(start,end)
      }
    })
  }
}