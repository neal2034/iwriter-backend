import { AppBaseEntity } from "../AppBaseEntity";
import { BeforeInsert, Column, Entity } from "typeorm";
import { saltPassword } from "../../util/encrypt";
import { UserType } from "../../config/enums/UserType";

@Entity()
export class User extends AppBaseEntity{
  @Column()
  username:string;
  @Column({nullable:true})
  password:string;
  @Column()
  type:UserType;
  @Column({type:'date',nullable:true})
  lastCallDate:Date;
  @Column({nullable:true})
  callNum:number;

  @BeforeInsert()
  async beforeInsert(){
    if (this.password) {
      this.password =  await saltPassword(this.password)
    }
  }
}