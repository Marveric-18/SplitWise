import { gql } from "@apollo/client";

export const FETCH_EXPENSE_BY_GROUP = gql`
  query FetchExpenseByGroup($expenseId: Int, $groupId: Int) {
    fetchAllExpense(expenseId: $expenseId, groupId: $groupId) {
      id
      title
      totalSharedExpense
      group {
        group_id
        name
      }
      sharedExpenses {
        sharedUsers {
          id
          fullName
        }
        totalShare
      }
      expenseSharedType
      addedBy {
        id
        fullName
      }
    }
  }
`;
