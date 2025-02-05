import React, { useEffect } from "react";

import { List } from "@mui/material";
import CollapsedListItem from "../../components/Global/CollapsedListItem";
import ExpenseDetailTab from "../../components/Expense/ExpenseTabDetail";

// make it for generic GroupList
const ExpenseList = ({ expenseList}) => {
  
  return (
    <div>
      <List>
        {expenseList.map((eachExpense) => (
          <CollapsedListItem
            item_id={eachExpense.id}
            item_header={eachExpense?.title}
            itemComponent={<ExpenseDetailTab expenseDetail={eachExpense} />}
          />
        ))}
      </List>
    </div>
  );
};

export default ExpenseList;
