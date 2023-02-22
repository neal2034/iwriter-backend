import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Exclude } from "class-transformer";

export abstract class AppBaseEntity {
  @PrimaryGeneratedColumn()
  public id:number;
  @CreateDateColumn({name:'add_at'})
  @Exclude()
  public addAt:Date;
  @UpdateDateColumn({name:'edit_at'})
  @Exclude()
  public editAt:Date;
  @DeleteDateColumn({name:'del_at'})
  @Exclude()
  public deleteAt:Date;
}