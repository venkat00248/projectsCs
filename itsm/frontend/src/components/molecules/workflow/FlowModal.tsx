// FlowModal.js
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const FlowModal = ({ inputs, handleInputChange, handleSubmit ,resetInputs}:any) => {

  const initial = {
    input1: '',
    input2: '',
    input3: '',
    input4: '',
  }
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrors(initial); 
    resetInputs()
  };
  useEffect(() => {
    const handleOutsideClick = (e:any) => {
      if (e.target.classList.contains('modal-overlay')) {
        handleClose();
      }
    };

    if (open) {
      window.addEventListener('click', handleOutsideClick);
    }

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [open, handleClose]);
  const [errors, setErrors] = useState(initial);
  const validateInputs = () => {
    const errors = {...initial};

    // Perform validation for each input field
    if (!inputs.input1) {
      errors.input1 = 'Input 1 is required';
    }
    if (!inputs.input2) {
      errors.input2 = 'Input 2 is required';
    }
    if (!inputs.input3) {
      errors.input3 = 'Input 3 is required';
    }
    if (!inputs.input4) {
      errors.input4 = 'Input 4 is required';
    }

    // Add more validation rules for other fields if needed

    setErrors(errors);

    // Return true if there are no errors, otherwise false
    return Object.keys(errors).length === 0;
  };
  const handleInputBlur = (e:any) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    const errorsCopy:any = { ...errors };
  
    if (!inputValue) {
      errorsCopy[inputName] = `${inputName} is required`;
    } else {
      errorsCopy[inputName] = '';
    }
  
    setErrors(errorsCopy);
  };
  const handleFormSubmit = () => {
    const isValid = validateInputs();

    if (isValid) {
      handleSubmit();
      handleClose();
    }
  };
  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Add Node
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2 id="modal-title">New Node</h2>
          <TextField
            label="Input 1"
            name="input1"
            value={inputs.input1}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={!!errors.input1}
            helperText={errors.input1}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Input 2"
            name="input2"
            value={inputs.input2}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={!!errors.input2}
            helperText={errors.input2}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Input 3"
            name="input3"
            value={inputs.input3}
            onChange={handleInputChange}
            error={!!errors.input3}
            helperText={errors.input3}
            onBlur={handleInputBlur}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Input 4"
            name="input4"
            value={inputs.input4}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={!!errors.input4}
            helperText={errors.input4}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" onClick={handleFormSubmit}>
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default FlowModal;
