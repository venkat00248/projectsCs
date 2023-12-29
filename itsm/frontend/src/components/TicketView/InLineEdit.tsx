import React, { useEffect, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import './InLineEdit.scss'
const InlineEdit = ({ initialValue, options, onChange }:any) => {
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
    useEffect(()=>{
      setValue(initialValue)
    },[initialValue])
  const handleInputChange = (e:any) => {
    setValue(e.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const selectedOption = options.find((option:any) => option.label === value);
    // console.log("options",selectedOption);

    onChange(selectedOption);
    // onChange(value);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setValue(initialValue);
    setIsEditing(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  if (isEditing) {
    return (
      <div>
        <select  value={value} onChange={handleInputChange} className="form-select py-1 pe-4 border-1 rounded-0" aria-label="Default select example">
          {options.map((option:any) => (
            <option key={option} value={option.label}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="actionWrapper">
        <div className="actionss">
          <button onClick={handleSaveClick} style={{marginRight:"5px"}}>
            {/* save */}
            <CheckIcon />
          </button>
          <button onClick={handleCancelClick}>
          <CloseIcon/>
            {/* cancel */}
            {/* <CloseIcon /> */}
          </button>
        </div>
        </div>
      </div>
    );
  }

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <span>{value}</span>
      {isHovered && (
        <CreateIcon
          onClick={handleEditClick}
          style={{ width: "18px", height: "18px" }}
        />
      )}
      {/* <EditIcon
        onClick={handleEditClick}
        style={{ width: "18px", height: "18px" }}
      /> */}
    </div>
  );
};

export default InlineEdit;
