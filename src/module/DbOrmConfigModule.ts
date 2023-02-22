import { Inject, Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";

class TypeOrmConfig implements TypeOrmOptionsFactory{
  @Inject(ConfigService)
  private readonly config:ConfigService;

  createTypeOrmOptions(connectionName?: string): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.config.get<string>('DATABASE_HOST'),
      port: this.config.get<number>('DATABASE_PORT'),
      username: this.config.get<string>('DATABASE_USER'),
      password: this.config.get<string>('DATABASE_PASSWORD'),
      database: this.config.get<string>('DATABASE_NAME'),
      entities: [],
      synchronize: this.config.get<boolean>('SYNCHRONIZE'),
      autoLoadEntities: true,
    };;
  }
}

@Module({
  imports:[TypeOrmModule.forRootAsync({useClass: TypeOrmConfig})]
})
export class DbOrmConfigModule{}