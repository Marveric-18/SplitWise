import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, ManyToOne, JoinColumn, ObjectId, OneToMany } from "typeorm";
import { Field, Float, ID, ObjectType } from "type-graphql";

import { User, UserType } from "./User";
import { Expense } from "./Expense";

export type GroupType  = {
    name: string;
    groupAdmin: UserType;
    users: UserType[];
    totalExpenses: number | null;
}


export interface GroupInterface extends GroupType{
    name: string;
    groupAdmin: UserType;
    users: UserType[];
    totalExpenses: number | null;
}


@ObjectType()
@Entity()
export class Group extends BaseEntity implements GroupInterface{
  @Field(()=> ID)
  @PrimaryGeneratedColumn()
  group_id!: number;

  @Field()
  @Column()
  name!: string;

  // Only Admin can change Admin
  @Field(()=> User)
  @ManyToOne(() => User, user => user.adminGroups)
  @JoinColumn()
  groupAdmin: User;

  // Everyone can Add Expenses
  @Field(() => [Expense!]!)
  @OneToMany(() => Expense, expense => expense.group, {onDelete: "CASCADE"} )
  expense: Expense[] | [];

  // Any Group User can Add another User, Only Admin can Remove User, 
  @Field(() => [User!]!)
  @ManyToMany(() => User, user => user.groups)
  users: User[];

  @Field(()=> Float)
  @Column()
  totalExpenses: number;


  @Field()
  public getCountExpenses (): String {
    return `${this.expense.length}`;
  }

  @Field()
  public getCountUsers (): String {
    return `${this.users.length}`;
  }
}