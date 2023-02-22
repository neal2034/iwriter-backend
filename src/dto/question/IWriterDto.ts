import { BaseInDto } from "../base/BaseInDto";
import { Tone } from "../../config/enums/Tone";
import { Modal } from "../../config/enums/Modal";
import { ResponseLength } from "../../config/enums/ResponseLength";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class IWriterDto extends BaseInDto{
  @IsString()
  id:string;
  @IsString()
  prompt:string;
  @IsEnum(Tone)
  @IsOptional()
  tone:Tone;
  @IsEnum(Modal)
  @IsOptional()
  modal: Modal;
  @IsEnum(ResponseLength)
  @IsOptional()
  lenLimit: ResponseLength;
}