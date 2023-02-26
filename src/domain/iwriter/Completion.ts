import { AppBaseEntity } from "../AppBaseEntity";
import { User } from "../user/User";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Completion extends AppBaseEntity{
  @Column()
  prompt:string;
  @Column({type:"text"})
  completion:string;
  @Column()
  promptTokens:number;
  @Column()
  completionTokens:number;
  @Column()
  totalTokens:number;
  @Column()
  model:string;
  @ManyToOne(()=>User)
  @JoinColumn({name:'user_id',referencedColumnName:'id'})
  user:User;
}