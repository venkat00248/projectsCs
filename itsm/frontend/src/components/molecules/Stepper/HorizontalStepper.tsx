import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import "./HorizontalStepper.scss";

export default function HorizontalNonLinearStepper({workflow, activeStep}:any) {
  
  const handleStep = (step: number) => () => {
    // setActiveStep(step);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper alternativeLabel activeStep={activeStep} className="HorizontalStepper">
        {workflow?.map((label:any, index:any) => (
          <Step key={label?.name}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label?.name}
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
