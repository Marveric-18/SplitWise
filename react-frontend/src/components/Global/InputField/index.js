import React from "react";

import { TextField, Select, InputLabel, MenuItem, FormControl } from "@mui/material";

const InputField = ({
  type,
  fieldName,
  label,
  defaultValue,
  handlerFun,
  options,
  error
}) => {
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "5%",
          width: "100%",
          marginBottom: "10px",
        }}
      >
        {(type === "text" || type === "number") && (
          <TextField
            key={fieldName}
            variant="outlined"
            label={label}
            value={defaultValue}
            error={error}
            onChange={(e) => handlerFun(fieldName, e.target.value)}
            inputProps={{
              style: {
                // height: "10px",
                minWidth: 240
              },
            }}
          />
        )}

        {type === "select" && options?.length > 0 && (
          <FormControl sx={{ minWidth: 268}}>
            <InputLabel key={fieldName} id={`id-${fieldName}-label`}>
              {label}
            </InputLabel>
            <Select
              key={`select-${fieldName}`}
              labelId={`id-${fieldName}-label`}
              id={`id-${fieldName}`}
              value={defaultValue}
              label={label}
              onChange={(e) => handlerFun(fieldName, e.target.value)}
              
            >
              <MenuItem key="default" value="">
                <em>{label}</em>
              </MenuItem>
              {options.map((each_option) => (
                <MenuItem key={each_option.value} value={each_option.value}>
                  {each_option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </div>
    </React.Fragment>
  );
};

export default InputField;
