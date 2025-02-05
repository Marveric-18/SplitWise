import React, { useEffect, useState } from "react";
import { Typography, TextField } from "@mui/material";

import { makeStyles } from "@mui/styles";
import InputField from "../../Global/InputField";
import List from '@mui/material/List';
import SelectInputPair from "../../Global/SelectInputPair";
import UserListMultiSelection from "../../Global/UserListMultiSelection";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from '@mui/material/Button';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Stack from '@mui/material/Stack';
import { handlerTextInput, handlerNumberInput } from "../../Utils/HandlerFunctions";

const useStyles = makeStyles({
  rootContainer: {
    display: "block",
    padding: 0,
  },
  root: {
    display: "block",
    padding: 10,
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
});

const defaultExpenseFormHandler = {
  title: {
    label: "Title",
    input: {
      value: "",
      error: ""
    },
    type: "text",
    handler: handlerTextInput
  },
  totalExpense: {
    label: "Total Amount",
    input: {
      value: 0,
      error: ""
    },
    type: "number",
    handler: handlerNumberInput(10, 100000)
  },
  expenseSharedType: {
    label: "Shared Type",
    input: {
      value: "",
      error: ""
    },
    type: "select",
    options: [
      { label: "CUSTOM", value: "CUSTOM" },
      { label: "EQUAL", value: "EQUAL" },
    ],
    handler: handlerTextInput
  },
};

const ExpenseFormStep2 = ({
  expenseSharedType,
  groupUsers,
  totalExpense,
  sharedUserExpense,
  setSharedUserExpense,
}) => {
  const [checked, setChecked] = React.useState([]);
  const [formDone, setFormDone] = React.useState(false);
  // const [equalSplit, setEqualSplit]

  useEffect(() => {
    if(expenseSharedType !== "EQUAL") return;
    if(checked.length <= 0){
      setFormDone(false);
    }else{
      //calculate and set sharedExpense for selected Users
    }
  },([checked]));

  const handleUserSelect= (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleUserExpense = ({index, userId, totalShare}) => {
    const nextSharedUserState = sharedUserExpense.map((each_share, i) => {
      if(index === i) return {
        totalShare,
        userId
      }
    })
    setSharedUserExpense(nextSharedUserState)
  }

  const addUserExpense = ({index, userId, totalShare}) => {
    setSharedUserExpense([
      ...sharedUserExpense,
      {userId: userId, totalShare: totalShare}
    ])
  }

  return (
    <>
      <div
          style={{
            display: "block",
            width: "70%",
            margin: "0 auto",
            marginBottom: "2%",
          }}
        >
        {groupUsers.map((each_user) => {
            return(
              <SelectInputPair 
                value={each_user.id}
                label={each_user.fullName}  
                checked={checked}
                handleToggle={handleUserSelect}  
              />
            )
        })}
      </div>
      <Stack direction="row" spacing={2}>
          <Button variant="contained" endIcon={<NavigateNextIcon />}>
            ADD EXPENSE
          </Button>
        </Stack>
    </>
  );
};


const ExpenseFormStep1 = ({form, setForm, handleNext}) => {
    const handleInputChange = (fieldName, fieldValue) => {
      const handler = form[fieldName].handler;
    
      // Invoke the handler function
      const { value, error}  = handler(fieldValue);
      setForm({
        ...form,
        [fieldName]: {
          ...form[fieldName],
          input: {
            ...form[fieldName].input,
            value: value,
            error: error || ''
          },
        },
      });
      
    };

    const checkFormError = (formState) => {
      for (const field in formState) {
        if (formState[field].error || formState[field].input.error) {
          return true;
        }
      }
      return false;
    }
  
    return(
    <>
        {Object.keys(form).map((formField) => (
          <InputField
            label={form[formField]?.label}
            defaultValue={form[formField]?.input.value}
            error={form[formField]?.input.error}
            type={form[formField]?.type}
            handlerFun={handleInputChange}
            fieldName={formField}
            options={form[formField]?.options || []}
          />
        ))}

        <Stack direction="row" spacing={2}>
          <Button variant="contained" endIcon={<NavigateNextIcon/>} onClick={handleNext} disabled={checkFormError(form)}>
            NEXT
          </Button>
        </Stack>
    </>);
}

const AddExpense = ({ groupId, groupUsers }) => {
  const classes = useStyles();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState(defaultExpenseFormHandler);
  const [sharedUserExpense, setSharedUserExpense] = useState([]);

  useEffect(() => {
    // console.log("Form: ",  JSON.stringify(form, 0, 2));
  }, [form]);

  const handleNext = () => {
      const isError = checkFormError(form);
      if(isError){

      }
      
  }

  const checkFormError = (formState) => {
    for (const field in formState) {
      if (formState[field].error || formState[field].input.error) {
        return true;
      }
    }
    return false;
  }

  // const handleInputChange = (fieldName, value) => {
  //   setForm({
  //     ...form,
  //     [fieldName]: {
  //       ...form[fieldName],
  //       value: value,
  //     },
  //   });
  // };

  return (
    <div className={classes.rootContainer}>
      <div className={classes.root}>
        <div
          className={classes.row}
          style={{ width: "100%", margin: "0 auto" }}
        >
          <Typography style={{ textAlign: "center" }} variant={"h5"}>
            Add Expense
          </Typography>
        </div>

        { (step === 0) && (
          <ExpenseFormStep1 form={form} setForm={setForm} handleNext={handleNext}/>
          )
        }
        { (step === 1) && ( 
          <ExpenseFormStep2 
              sharedUserExpense={sharedUserExpense}
              setSharedUserExpense={setSharedUserExpense}
              groupUsers={groupUsers}  
              totalExpense={form.totalExpense || 0}
              expenseSharedType={form.expenseSharedType}
          />
        )}

      </div>
    </div>
  );
};

export default AddExpense;

{
  /* <InputLabel htmlFor="my-input">Email address</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
        <FormHelperText id="my-helper-text">
          We'll never share your email.
        </FormHelperText> */
}
