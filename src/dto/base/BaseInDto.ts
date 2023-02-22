import { ClassConstructor, plainToClass } from "class-transformer";

export class BaseInDto {
  toEntity(cls:ClassConstructor<any>){
    return plainToClass(cls, this)
  }
}