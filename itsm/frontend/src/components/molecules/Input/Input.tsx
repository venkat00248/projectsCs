import React ,{ useState} from 'react'
import './Input.scss'
export const Input= (props:any) => {
    const [focused, setFocused] = useState(false);
    const { label, errorMessage, onChange, id, ...inputProps } = props;
  
    const handleFocus = (e:any) => {
      setFocused(true);
    };
  
    return (
      <div className="formInput">
        <label>{label}</label>
        <input className='inputComponent'
          {...inputProps}
          onChange={onChange}
          onBlur={handleFocus}
          onFocus={() =>
            inputProps.name === "confirmPassword" && setFocused(true)
          }
          focused={focused.toString()}
        />
        <span>{errorMessage}</span>
      </div>
    );
  };