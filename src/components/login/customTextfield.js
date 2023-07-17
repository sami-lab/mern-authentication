import React from "react";
import TextField from "@mui/material/TextField";

const CustomTextField = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
}) => {
  return (
    <TextField
      fullWidth
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      variant='outlined'
      size='small'
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: (theme) => theme.palette.common.dark,
          borderRadius: 0,
        },
        "& .MuiInputBase-input": {
          color: (theme) => theme.palette.common.white,
        },
        "& fieldset": {
          border: 0,
          padding: "8px",
        },
        "& .MuiOutlinedInput-root.Mui-focused fieldset": {
          border: (theme) => `1px dotted ${theme.palette.common.white}`,
        },
        "& .MuiFormLabel-root": {
          color: (theme) => theme.palette.common.white,
        },

        "& .css-md26zr-MuiInputBase-root-MuiOutlinedInput-root": {
          borderRadius: "none !important",
        },
      }}
    />
  );
};

export default CustomTextField;
