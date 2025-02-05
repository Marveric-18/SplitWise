import {
  Query,
  Resolver,
  Mutation,
  Arg,
  Ctx,
  UseMiddleware,
  Int,
} from "type-graphql";

import { isAuth } from "../../middleware/AuthMiddleware";
import { MyContext } from "../../middleware/context";

import { Group } from "../../entity/Group";
import { User } from "../../entity/User";
import { Expense } from "../../entity/Expense";

import { ExpenseInput, SharedUserExpenseInput } from "./type/ExpenseInput";
import { ExpenseService } from "./expenseService";

@Resolver(Group)
export class ExpenseResolver {
  private expenseService = new ExpenseService();

  @Query(() => [Expense])
  async fetchAllExpense(
    @Arg("expenseId", ()=> Int!, {nullable: true}) expenseId?: number,
    @Arg("groupId",  ()=> Int!, {nullable: true}) groupId?: number
  ) {
    return await this.expenseService.fetchAllExpense(groupId, expenseId);
  }

  @Mutation(() => Expense)
  @UseMiddleware(isAuth)
  async registerExpense(
    @Arg("expenseInfo") expenseInfo: ExpenseInput,
    @Arg("sharedUserExpenseInfo", () => [SharedUserExpenseInput])
    sharedUserExpenseInfo: SharedUserExpenseInput[],
    @Ctx() context: MyContext
  ): Promise<Expense | null> {
    const expenseObj = await this.expenseService.createExpense(
      context.payload.user_id,
      expenseInfo,
      sharedUserExpenseInfo
    );
    return expenseObj;
  }
}
