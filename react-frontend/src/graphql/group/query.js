import { gql } from "@apollo/client";

export const FETCH_GROUP_BY_USER = gql`
  query FetchGroupByUserID {
    fetchGroupByUserID {
      group_id
      name
      getCountUsers
      getCountExpenses
      groupAdmin {
        email
        fullName
      }
      users {
        email
        fullName
      }
      totalExpenses
    }
  }
`;

export const FETCH_GROUP_IF_USER_ADMIN = gql`
  query FetchGroupByAdminID {
    fetchGroupByAdminID {
      group_id
      name
      getCountUsers
      getCountExpenses
      groupAdmin {
        email
        fullName
      }
      users {
        email
        fullName
      }
      totalExpenses
    }
  }
`;

export const FETCH_GROUP_BY_GROUP_ID = gql`
  query FetchGroupByID(
    $groupId: Int!
    $adminInfo: Boolean!
    $userListInfo: Boolean!
    $expenseListInfo: Boolean!
  ) {
    fetchGroupByID(groupId: $groupId) {
      group_id
      name
      totalExpenses
      getCountUsers
      getCountExpenses
      groupAdmin @include(if: $adminInfo) {
        email
        firstName
        fullName
        lastName
        id
      }
      users @include(if: $userListInfo) {
        id
        fullName
        email
        firstName
        lastName
        birthDate
      }
      expense @include(if: $expenseListInfo) {
        id
        expenseSharedType
        totalSharedExpense
        addedBy {
          email
          id
          fullName
        }
      }
    }
  }
`;
