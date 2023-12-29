import React, { useState } from "react";
import { Input } from "./Input";
import { errorCodes } from "../../constants/constants";
import { handleBlur } from "../../Utils/Utils";
export const SampleInput = () => {
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const regex = /^[A-Za-z]+$/;
  const onBlur = () => {
    const error = handleBlur(value, errorCodes, regex);
    setErrorMessage(error);
  };

  return (
    <div className="App">
      <Input
        value={value}
        label="Your Name"
        errorMessage={errorMessage}
        onChange={handleChange}
        onBlur={onBlur}
      />
    </div>
  );
};
