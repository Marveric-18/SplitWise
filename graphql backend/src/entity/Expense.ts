import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
  OneToMany,
  JoinColumn,
  Column
} from "typeorm";
import { Field, ObjectType, ID } from "type-graphql";

import { Group, GroupInterface } from "./Group";
import { SharedExpense } from "./SharedExpense";
import { expenseSharedType } from "./enumList";
import { User } from "./User";

export interface ExpenseInterface {
  group: GroupInterface;
  totalSharedExpense: number;
}

@Entity()
@ObjectType()
export class Expense extends BaseEntity implements ExpenseInterface {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Group)
  @ManyToOne(() => Group)
  @JoinColumn()
  group!: Group;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @Field()
  totalSharedExpense: number;

  @Column({nullable: true})
  @Field(()=> String, {nullable: true})
  title: string;

  @Column({
    type: 'enum',
    enum: expenseSharedType,
    default: expenseSharedType.EQUAL,
  })
  @Field()
  expenseSharedType: string;

  @Field(() => User)
  @JoinColumn()
  @ManyToOne(() => User, user => user.userExpenses)
  addedBy! : User

  // @Column()
  @Field(() => [SharedExpense]) // Define the type of the relationship
  @OneToMany(() => SharedExpense, (sharedExpense) => sharedExpense.expense)
  sharedExpenses!: SharedExpense[];
}
