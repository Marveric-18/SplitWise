import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

import { GroupType, Group } from "./Group";
import { Expense } from "./Expense";



export type UserType = {
  firstName: string;
  lastName: string;
  email: string;
  birthDate?: Date;
  password: string;
  authToken?: string;
}

export interface UserInterface extends UserType{
  firstName: string;
  lastName: string;
  email: string;
  birthDate?: Date;
  password: string;
}


@Entity()
@ObjectType()
export class User extends BaseEntity implements UserInterface{
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  firstName!: string;

  @Field()
  @Column()
  lastName!: string;

  @Field()
  @Column("text", { unique: true })
  email!: string;

  @Field()
  @Column({ nullable: true })
  birthDate: Date;

  @Column()
  password!: string;

  @Field(()=> [Group!]!)
  @ManyToMany(() => Group, group => group.users)
  @JoinTable()
  groups: Group[];

  @Field(()=> [Group!]!)
  @OneToMany(() => Group, group => group.groupAdmin)
  adminGroups: Group[];

  @Field(()=> [Expense!]!)
  @OneToMany(() => Expense, expense => expense.addedBy)
  userExpenses: Expense[];

  @Field()
  authToken: string;

  @Field()
  public get fullName(): String {
    return `${this.firstName} ${this.lastName}`;
  }
}

