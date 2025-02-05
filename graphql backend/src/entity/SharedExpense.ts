import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinColumn, ManyToOne } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

import { User, UserInterface } from "./User";
import { Expense, ExpenseInterface } from "./Expense";
import { expenseSharedType } from "./enumList";

export interface SharedExpenseInterface {
  sharedUsers: UserInterface,
    expense: ExpenseInterface,
    totalShare: number
}


@Entity()
@ObjectType()
export class SharedExpense extends BaseEntity implements SharedExpenseInterface{
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => User)
  @ManyToOne(() => User)
  sharedUsers!: User;

  @Field(() => Expense)
  @JoinColumn()
  @ManyToOne(() => Expense, expense => expense.sharedExpenses)
  expense!: Expense;

  // @Column({ type: 'decimal', precision: 10, scale: 2 })
  @Column()
  @Field()
  totalShare: number;

  @Field()
  public get percentageSharedExpense(): String {
    return `${this.totalShare} / ${this.expense.totalSharedExpense}`;
  }
}