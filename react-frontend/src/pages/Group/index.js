import React, { useEffect, useState } from "react";
import useAuth, { AuthProvider } from "../../utils/useAuth";
import graphQLClient from "../../graphql/client";
import { FETCH_GROUP_BY_USER, FETCH_GROUP_IF_USER_ADMIN } from "../../graphql/group/query";
import GroupList from "../../components/Group/GroupList";
import { Tabs, Tab } from "@mui/material";

const Group = () => {
  const { loading, user, isLoggedIn, login } = useAuth(AuthProvider);
  const [groupList, setGroupList] = useState([]);
  const [tab, setTab] = useState("all_groups");

  const handleTabChange = (event, selectedTab) => {
    setTab(selectedTab);
  };


  useEffect(() => {
    if (isLoggedIn() && user) {
      let query = FETCH_GROUP_BY_USER;
      if (tab === "my_groups") query = FETCH_GROUP_IF_USER_ADMIN;
      graphQLClient
        .fetchQuery({
          query: query,
          auth: true,
        })
        .then(({ data }) => {
          const actualData = tab === "my_groups" ? data?.fetchGroupByAdminID : data?.fetchGroupByUserID;
        
          if (!actualData || actualData?.length == 0)
            return;
          setGroupList(actualData);
        })
        .catch((error) => console.log(error));
    }
  }, [tab, isLoggedIn, user]);

  return (
    <div>
      <Tabs value={tab} onChange={handleTabChange}>
        <Tab label="All Groups" value={"all_groups"} />
        <Tab label="My Groups" value={"my_groups"} />
      </Tabs>
      <GroupList groupList={groupList}/>
    </div>
  );
};

export default Group;
