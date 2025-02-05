import React from "react";


import { List } from "@mui/material";
import CollapsedListItem from "../../Global/CollapsedListItem";
import GroupDetailTab from "../GroupDetailTab";

// make it for generic GroupList
const GroupList = ({ groupList }) => {
  return (
    <div>
      <List>
        {groupList.map((group) => (
          <CollapsedListItem
            item_id={group.group_id}
            item_header={group.name}
            itemComponent={<GroupDetailTab groupDetail={group} />}
          />
        ))}
      </List>
    </div>
  );
};

export default GroupList;
