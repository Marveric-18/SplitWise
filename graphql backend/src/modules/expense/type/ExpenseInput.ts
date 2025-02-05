import { InputType, Field, ObjectType, Int, ID, Float } from "type-graphql";
import { IsGroupAlreadyExist } from "../../group/utils/IsGroupAlreadyExist"
import { IsExpenseAlreadyExist } from "../utils/IsExpenseAlreadyExist";
import { IsUserAlreadyExist } from "../../../modules/user/utils/IsUserAlreadyExist";
import { expenseSharedType } from "../../../entity/enumList";

@InputType()
@ObjectType()
export class SharedUserExpenseInput {
  @Field(()=> Int)
  @IsUserAlreadyExist({ message: "User not found" })
  userId!: number;

  @Field(()=> Float)
  totalShare!: number;
}

@InputType()
@ObjectType()
export class ExpenseInput {
  @Field({nullable: true})
  @IsGroupAlreadyExist({ message: "Group not found" })
  groupId?: number;

  @Field()
  title!: string;

  @Field(()=> Float)
  totalSharedExpense!: number;

  @Field(() => expenseSharedType,{nullable: true})
  expenseSharedType?: expenseSharedType;
}



@InputType()
@ObjectType()
export class ExpenseUpdateInput {
@IsExpenseAlreadyExist({message: "Expense not found"})
  @Field(()=> ID)
  expenseId?: number;

  @Field({nullable: true})
  @IsGroupAlreadyExist({ message: "Group not found" })
  groupId?: number;

  @Field(()=> Float, {nullable: true})
  totalSharedExpense?: number;

  @Field({nullable: true})
  expenseSharedType?: string;
}
