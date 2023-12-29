import React from 'react';
import { FormControlLabel, Checkbox, TextField } from '@mui/material';
import './ActionView.scss'
const ActionView = () => {

  const [inputs, setInputs] = React.useState([
    { label: 'Email', checked: false, value: '' },
    { label: 'Notification', checked: false },
    { label: 'JSON', checked: false },
    { label: 'API', checked: false, value1: '', value2: '',value3:'' },
  ]);

  const handleInputChange = (index:any, event:any) => {
    const newInputs = [...inputs];
    newInputs[index].value = event.target.value;
    setInputs(newInputs);
  };

  const handleCheckboxChange = (index:any) => {
    const newInputs = [...inputs];
    newInputs[index].checked = !newInputs[index].checked;
    setInputs(newInputs);
  };

  const handleInput1Change = (index:any, event:any) => {
    const newInputs = [...inputs];
    newInputs[index].value1 = event.target.value;
    setInputs(newInputs);
  };

  const handleInput2Change = (index:any, event:any) => {
    const newInputs = [...inputs];
    newInputs[index].value2 = event.target.value;
    setInputs(newInputs);
  };
  const handleInput3Change = (index:any, event:any) => {
    const newInputs = [...inputs];
    newInputs[index].value3 = event.target.value;
    setInputs(newInputs);
  };

  return (
    <div className='ActionView'>
      {inputs.map((input, index) => (
        <div key={index}>
          <FormControlLabel
            control={
              <Checkbox
                checked={input.checked}
                onChange={() => handleCheckboxChange(index)}
              />
            }
            label={input.label}
          />
          {index === 0 && (
             <div className='apiForm'>
            <TextField
              value={input.value}
              onChange={(event) => handleInputChange(index, event)}
              label="Email"
            />
            </div>
          )}
          {index === 2 && (
            <div className='apiForm'>
               <TextField
              type="text"
              value={input.value3}
              onChange={(event) => handleInput3Change(index, event)}
              label="Get"
              fullWidth
            />
            <br />
              <TextField
                value={input.value1}
                onChange={(event) => handleInput1Change(index, event)}
                label="URL"
                className='urlField'
              />
              <br />
              <TextField
                value={input.value2}
                onChange={(event) => handleInput2Change(index, event)}
                label="Key"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ActionView;
