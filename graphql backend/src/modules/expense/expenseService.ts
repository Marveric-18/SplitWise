import { Group } from "../../entity/Group";
import { User } from "../../entity/User";
import { Expense } from "../../entity/Expense";

import { IsUserExistsById } from "../user/utils/IsUserAlreadyExist";
import { ExpenseInput, SharedUserExpenseInput } from "./type/ExpenseInput";
import { IsUserFromGroup } from "../group/utils/IsUserFromGroup";
import { SharedExpense } from "../../entity/SharedExpense";

import { In } from "typeorm";

export class ExpenseService {
  async createSharedExpense(
    expenseObj: Expense,
    sharedExpenses: SharedUserExpenseInput[]
  ): Promise<SharedExpense[]> {
    const allSharedExpenseObj: SharedExpense[] = [];
    for (let eachShare of sharedExpenses) {
      const sharedExpenseObj = SharedExpense.create({});
      const userObj = await User.findOne({ where: { id: eachShare.userId } });
      if (!userObj)
        throw new Error(
          `User with user id ${eachShare.userId} in the share is not a valid user`
        );
      sharedExpenseObj.expense = expenseObj;
      sharedExpenseObj.sharedUsers = userObj;
      sharedExpenseObj.totalShare = eachShare.totalShare;
      await sharedExpenseObj.save();

      allSharedExpenseObj.push(sharedExpenseObj);
    }
    return allSharedExpenseObj;
  }

  // create an Expense
  async createExpense(
    expenseAddedBy: number,
    expenseInputInfo: ExpenseInput,
    sharedExpenses: SharedUserExpenseInput[]
  ): Promise<Expense> {
    const { groupId, title, totalSharedExpense, expenseSharedType } =
      expenseInputInfo;

    const groupObj = await Group.findOne({ where: { group_id: groupId } });
    if (!groupObj || !groupId) {
      throw new Error("Expense Group not found");
    }
    if (totalSharedExpense <= 0) {
      throw new Error("Total Shared Expense Amount cant be negative");
    }

    const requestingUser = await User.findOne({
      where: { id: expenseAddedBy },
    });
    if (!requestingUser) {
      throw new Error("Requesting User does not exist");
    }

    const isUserFromGroup = await IsUserFromGroup(expenseAddedBy, groupId);
    if (!isUserFromGroup) {
      throw new Error("Cant add Expense to this Group");
    }

    for (let eachShare of sharedExpenses) {
      if (!(await IsUserExistsById(eachShare.userId))) {
        throw new Error(
          `User with user id ${eachShare.userId} in the share is not a valid user`
        );
      }
    }
    const expenseObj = Expense.create({});

    expenseObj.group = groupObj;
    expenseObj.title = title;
    expenseObj.totalSharedExpense = totalSharedExpense;
    expenseSharedType && (expenseObj.expenseSharedType = expenseSharedType);
    expenseObj.addedBy = requestingUser;
    expenseObj.sharedExpenses = [];
    await expenseObj.save();

    const allSharedExpenseObj: SharedExpense[] = await this.createSharedExpense(
      expenseObj,
      sharedExpenses
    );

    const newExpenseObj = await Expense.findOne({
      where: { id: expenseObj.id },
      relations: ["addedBy", "sharedExpenses", "group"],
    });
    if (!newExpenseObj) {
      throw new Error("Expense Object not created");
    }
    newExpenseObj.sharedExpenses = allSharedExpenseObj;
    await newExpenseObj.save();

    groupObj.totalExpenses = groupObj.totalExpenses + totalSharedExpense;
    await groupObj.save();
    return newExpenseObj;
  }

  async fetchAllExpense(
    groupId: number | undefined,
    expenseId: number | undefined
  ): Promise<Expense[]> {
    const filterObj: { [key: string]: any } = {};
    if (expenseId) filterObj["id"] = expenseId;
    if (groupId) {
      const groupRelatedExpense = await Expense.createQueryBuilder("expense")
        .leftJoinAndSelect("expense.group", "group")
        .where("expense.group.group_id = :groupId", { groupId: groupId })
        .getMany();

      const allExpensesIds = groupRelatedExpense.map(
        (eachExpense) => eachExpense.id
      );
      filterObj["id"] = In(allExpensesIds);
    }

    const allExpenses = await Expense.find({
      where: filterObj,
      relations: {
        group: true,
        addedBy: true,
        sharedExpenses : {
          sharedUsers: true,
        }
      }
    });
    if (!allExpenses)
      throw new Error("Something went wrong! No Expenses found");
    return allExpenses;
  }

  // Function: update expense
  // Updates Total Share and SharedExpense
  // Deletes The Removed Shared Expense

  // Function: Delete Expense
  // Removes all the Expense

  // Function append Shared Expense to Expense
}
