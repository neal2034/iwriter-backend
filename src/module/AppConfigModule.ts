import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { resolve } from "path";
import * as fs from "fs";
import * as Joi from '@hapi/joi'

/**
 * make sure env file exist, otherwise throw exception
 * @param dest
 */
const getEnvPath = (dest:string):string=>{
  const filename =`.${process.env.NODE_ENV}.env`;
  const configFilePath:string = resolve(`${dest}/${filename}`)
  if(!fs.existsSync(configFilePath)){
    throw new Error('no env file founded')
  }
  return  configFilePath
}

const envPath = getEnvPath(`${__dirname}/../config/env`)

@Module({
  imports:[ConfigModule.forRoot({
    envFilePath: envPath,
    isGlobal:true,
    validationSchema: Joi.object({
      PORT: Joi.number().required(),
      BASE_URL: Joi.string().required(),
      DATABASE_HOST: Joi.string().required(),
      DATABASE_NAME: Joi.string().required(),
      DATABASE_USER: Joi.string().required(),
      DATABASE_PASSWORD: Joi.string().required(),
      DATABASE_PORT: Joi.number().required(),
      SYNCHRONIZE: Joi.boolean().required(),
    })
    }
  )]
})
export class AppConfigModule{}