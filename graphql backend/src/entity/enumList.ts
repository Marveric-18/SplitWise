import { registerEnumType } from "type-graphql";

enum expenseSharedType {
  EQUAL = "EQUAL",
  PERCENTAGE = "PERCENTAGE",
  AMOUNT = "AMONT",
}

registerEnumType(expenseSharedType, {
  name: "ExpenseSharedTypeEnum", // This should match the name used in your GraphQL schema
  description: "Type of expense sharing", // Optional description
});

export { expenseSharedType };
