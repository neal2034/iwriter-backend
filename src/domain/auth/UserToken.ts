import { AppBaseEntity } from "../AppBaseEntity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { User } from "../user/User";

@Entity()
export class UserToken extends AppBaseEntity{
  @Column()
  refreshToken:string;
  @ManyToOne(()=>User)
  @JoinColumn({name:'user_id',referencedColumnName:'id'})
  user:User;
  @Column({default:false})
  isUsed:boolean;
  @Column()
  rootToken:string;
}