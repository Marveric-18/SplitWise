import React, { useEffect } from "react";

import { List } from "@mui/material";
import CollapsedListItem from "../../components/Global/CollapsedListItem";
import UserDetailTab from "../../components/User/UserDetailTab";

// make it for generic GroupList
const UserList = ({ userList}) => {
  
  return (
    <div>
      <List>
        {userList.map((user) => (
          <CollapsedListItem
            item_id={user.id}
            item_header={user.fullName}
            itemComponent={<UserDetailTab userDetail={user} />}
          />
        ))}
      </List>
    </div>
  );
};

export default UserList;
