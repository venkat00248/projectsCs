import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

interface PopupProps {
  selectedAction: string;
  emailValue: string;
  emailError: string;
  setEmailValue: (value: string) => void;
  setEmailError: (error: string) => void;
  onClose: () => void;
  getActionValue: string;
  setGetActionValue: (value: string) => void;
  urlValue: string;
  setUrlValue: (value: string) => void;
  keyValue: string;
  setKeyValue: (value: string) => void;
  notificationValue: boolean;
  onFormSubmit: (value: any) => void;
  setNotificationValue: (value: boolean) => void;
  setIsPopupOpen:(value:boolean)=> void;
}

export default function Email(props: PopupProps) {
  const {
    selectedAction,
    emailValue,
    emailError,
    setEmailValue,
    setEmailError,
    onClose,
    getActionValue,
    setGetActionValue,
    urlValue,
    setUrlValue,
    keyValue,
    setKeyValue,
    notificationValue,
    setNotificationValue,
    onFormSubmit,
    setIsPopupOpen
  } = props;
  const [getActionError, setGetActionError] = useState("");
  const [urlError, setUrlError] = useState("");
  const [keyError, setKeyError] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
  };

  const handleGetActionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGetActionValue(event.target.value);
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrlValue(event.target.value);
  };

  const handleKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyValue(event.target.value);
  };

  const handleNotificationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNotificationValue(event.target.checked);
  };

  const handleBlur = () => {
    validateEmail();
  };
  const handleGetActionBlur = () => {
    validateGetAction();
  };

  const handleUrlBlur = () => {
    validateUrl();
  };

  const handleKeyBlur = () => {
    validateKey();
  };
  const validateGetAction = () => {
    if (!getActionValue || !getActionValue.trim()) {
      setGetActionError("Get action is required");
    } else {
      setGetActionError("");
    }
  };

  const validateUrl = () => {
    if (!urlValue || !urlValue.trim()) {
      setUrlError("URL is required");
    } else {
      setUrlError("");
    }
  };

  const validateKey = () => {
    if (!keyValue || !keyValue.trim()) {
      setKeyError("Key is required");
    } else {
      setKeyError("");
    }
  };


  const validateEmail = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(emailValue)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let isFormValid = true;

    if (selectedAction === "Email") {
      if (!emailValue || !emailValue.trim()) {
        setEmailError("Email is required");
        isFormValid = false;
      } else {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(emailValue)) {
          setEmailError("Invalid email address");
          isFormValid = false;
        } else {
          setEmailError("");
        }
      }
    }

    if (selectedAction === "API") {
      if (!getActionValue || !getActionValue.trim()) {
        setGetActionError("Get action is required");
        isFormValid = false;
      } else {
        setGetActionError("");
      }

      if (!urlValue || !urlValue.trim()) {
        setUrlError("URL is required");
        isFormValid = false;
      } else {
        setUrlError("");
      }

      if (!keyValue || !keyValue.trim()) {
        setKeyError("Key is required");
        isFormValid = false;
      } else {
        setKeyError("");
      }
      setIsPopupOpen(false)
      // Perform validations for other fields in a similar manner
    }

    if (isFormValid) {
      // Perform any action or submit the input values
      const formValues = {
        email: emailValue,
        getAction: getActionValue,
        url: urlValue,
        key: keyValue,
        notification: notificationValue,
      };
      console.log("Submitted values:", {
        email: emailValue,
        getAction: getActionValue,
        url: urlValue,
        key: keyValue,
        notification: notificationValue,
      });
      props.onFormSubmit(formValues);
      onClose(); // Close the popup after submission
    }
  };

  return (
    <div style={{ width: "100%", marginLeft:"8px" }}>
      {selectedAction === "Email" && (
        <div>
          <h5 style={{marginBottom:"5px"}}>{selectedAction} Action</h5>
          <TextField
            type="text"
            value={emailValue}
            onChange={handleEmailChange}
            onBlur={handleBlur}
            error={!!emailError}
            helperText={emailError}
            label="Email"
            fullWidth
            size="small"
          />
          <div style={{ marginTop: "7px" }}>
            <button
              type="submit"
              style={{ float: "right" }}
              className="btn btn-primary btn-sm"
              onClick={handleFormSubmit}
            >
              Done
            </button>
          </div>
        </div>
      )}
      {selectedAction === "API" && (
        <div>
          <h5 style={{marginBottom:"5px"}}>{selectedAction} Action</h5>
          <TextField
            type="text"
            value={getActionValue}
            onChange={handleGetActionChange}
            label="Method Type"
            fullWidth
            error={!!getActionError}
            helperText={getActionError}
            onBlur={handleGetActionBlur}
            size="small"
          />
          <br />
          <br />
          <TextField
            type="text"
            value={urlValue}
            onChange={handleUrlChange}
            onBlur={handleUrlBlur}
            label="URL"
            fullWidth
            error={!!urlError}
            helperText={urlError}
            size="small"

          />
          <br />
          <br />
          <TextField
            type="text"
            value={keyValue}
            onChange={handleKeyChange}
            onBlur={handleKeyBlur}
            label="Key"
            fullWidth
            error={!!keyError}
            helperText={keyError}
            size="small"

          />
          <div style={{ marginTop: "7px" }}>
            <button
              type="submit"
              style={{ float: "right" }}
              className="btn btn-primary btn-sm"
              onClick={handleFormSubmit}
            >
              Done
            </button>
          </div>
        </div>
      )}
      {selectedAction === "Notification" && (
        <div>
          <h5 style={{marginBottom:"5px"}}>{selectedAction} Action</h5>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={notificationValue}
                  onChange={handleNotificationChange}
                />
              }
              label={notificationValue ? 'Yes' : 'No'}
            />
          </FormGroup>

          <div style={{ marginTop: "7px" }}>
            <button
              type="submit"
              style={{ float: "right" }}
              className="btn btn-primary btn-sm"
              onClick={handleFormSubmit}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
