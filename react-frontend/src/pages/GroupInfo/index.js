import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuth, { AuthProvider } from "../../utils/useAuth";
import graphQLClient from "../../graphql/client";
import { FETCH_GROUP_BY_GROUP_ID } from "../../graphql/group/query";
import { Button, Grid, Modal, Typography } from "@mui/material";
import CustomLabel from "../../components/Global/CustomLabel";
import CustomInput from "../../components/Global/CustomInput";
import AdminCard from "../../components/User/AdminCard";
import { makeStyles } from "@mui/styles";
import { Tabs, Tab } from "@mui/material";
import UserList from "../UserList";
import { FETCH_EXPENSE_BY_GROUP } from "../../graphql/expense/query";
import ExpenseList from "../ExpenseList";
import { AddCircle, PersonAdd } from "@mui/icons-material";
import { Box } from "@mui/system";
import AddExpense from "../../components/Expense/AddExpenseForm";

const DefaultState = {
  adminInfo: true,
  userListInfo: true,
  expenseListInfo: false,
};

const useStyles = makeStyles({
  rootContainer: {
    display: "block",
    padding: 0,
  },
  root: {
    display: "flex",
    padding: 0,
  },
  divContainer: {
    width: "50%",
  },
  row: {
    width: "100%",
    marginBottom: "10px",
  },
  label: {
    width: "40%",
    marginRight: "0%",
  },
  input: {
    width: "60%",
  },
  tabList: {
    width: "90",
  },
  createButton: {
    width: "10",
    marginLeft: "auto",
    paddingRight: "10px",
  },
  modalStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    padding: "3% 0% 3% 0%",
    // height: strex/,
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
  },
});

const GroupInfo = ({ props }) => {
  const { loading, user, isLoggedIn } = useAuth(AuthProvider);
  const [groupInfo, setGroupInfo] = useState(null);
  const [expenseList, setExpenseList] = useState([]);
  const [groupState, setGroupState] = useState(DefaultState);
  const [tab, setTab] = useState("users");
  const [openModal, setOpenModal] = useState(false);
  const { groupId } = useParams();
  const classes = useStyles();

  useEffect(() => {
    if (!isLoggedIn() || !groupId) {
      return;
    }
    if (tab === "users") {
      graphQLClient
        .fetchQuery({
          query: FETCH_GROUP_BY_GROUP_ID,
          auth: true,
          variables: {
            groupId: parseInt(groupId),
            ...groupState,
          },
        })
        .then(({ data }) => {
          const groupInfo = data?.fetchGroupByID;
          if (!groupInfo) return;
          setGroupInfo(groupInfo);
        })
        .catch((error) => {
          console.log("Error", error);
        });
    } else if (tab === "expenses") {
      graphQLClient
        .fetchQuery({
          query: FETCH_EXPENSE_BY_GROUP,
          auth: true,
          variables: {
            groupId: parseInt(groupId),
          },
        })
        .then(({ data }) => {
          const expenseList = data?.fetchAllExpense;
          if (!expenseList) return;
          setExpenseList(expenseList);
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
  }, [groupId, groupState, user]);

  const handleTabChange = (event, selectedTab) => {
    if (selectedTab === "users") {
      setGroupState((prev) => ({
        ...prev,
        userListInfo: true,
      }));
    } else {
      setGroupState((prev) => ({
        ...prev,
        userListInfo: false,
      }));
    }
    setTab(selectedTab);
  };

  const handleModal = () => {
    setOpenModal((prev) => !prev);
  };

  return (
    <div className={classes.rootContainer}>
      <div className={classes.root}>
        <div className={classes.divContainer}>
          <div className={classes.row} style={{ display: "flex" }}>
            <div className={classes.label}>
              <CustomLabel label={"Name"} />
            </div>
            <div className={classes.input}>
              <CustomInput inputValue={groupInfo?.name} readOnly={true}/>
            </div>
          </div>

          <div className={classes.row} style={{ display: "flex" }}>
            <div className={classes.label}>
              <CustomLabel label={"Total Expense"} />
            </div>
            <div className={classes.input}>
              <CustomInput inputValue={groupInfo?.totalExpenses} readOnly={true}/>
            </div>
          </div>

          <div className={classes.row} style={{ display: "flex" }}>
            <div className={classes.label}>
              <CustomLabel label={"Total Users"} />
            </div>
            <div className={classes.input}>
              <CustomInput inputValue={groupInfo?.getCountUsers} readOnly={true}/>
            </div>
          </div>

          <div className={classes.row} style={{ display: "flex" }}>
            <div className={classes.label}>
              <CustomLabel label={"Total Expenses"} />
            </div>
            <div className={classes.input}>
              <CustomInput inputValue={groupInfo?.getCountExpenses} readOnly={true}/>
            </div>
          </div>

          <div className={classes.row}>
            <AdminCard
              name={groupInfo?.groupAdmin.fullName}
              email={groupInfo?.groupAdmin.email}
              onClick={() => {}}
            />
          </div>
        </div>
        <div className={classes.divContainer}>
          <p style={{ margin: "auto" }}>Hey</p>
        </div>
      </div>

      <div className={classes.row}>
        <Tabs value={tab} onChange={handleTabChange}>
          <Tab label="Users" value={"users"} />
          <Tab label="Expenses" value={"expenses"} />
          <div className={classes.createButton}>
            <Button
              style={{ backgroundColor: "#36454F", color: "white" }}
              variant="contained"
              startIcon={tab === "users" ? <PersonAdd /> : <AddCircle />}
              onClick={handleModal}
            >
              {tab === "users" ? "Add Users" : "Add Expense"}
            </Button>
          </div>
        </Tabs>

        {tab === "users" && <UserList userList={groupInfo?.users || []} />}
        {tab === "expenses" && <ExpenseList expenseList={expenseList || []} />}
      </div>
      <Modal
        open={openModal}
        onClose={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Box className={classes.modalStyle}>
          {tab === "users" && <p>Add User Coming soon</p>}
          {tab === "expenses" && <AddExpense  groupId={groupInfo?.group_id}  groupUsers={groupInfo?.users}/>}
        </Box>
      </Modal>
    </div>
  );
};

export default GroupInfo;
