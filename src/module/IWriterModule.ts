import { Module } from "@nestjs/common";
import { IWriterController } from "../controller/IWriterController";
import { IWriterService } from "../service/IWriterService";
import { UserModule } from "./UserModule";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Completion } from "../domain/iwriter/Completion";
import { CompletionManager } from "../manager/iwriter/CompletionManager";

@Module({
  imports:[UserModule, TypeOrmModule.forFeature([Completion])],
  controllers:[IWriterController],
  providers: [IWriterService,CompletionManager]
})
export class IWriterModule{}