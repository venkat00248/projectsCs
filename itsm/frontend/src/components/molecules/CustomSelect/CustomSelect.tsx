import React, { useState } from 'react';
import Select from 'react-select';

interface OptionType {
  value: string;
  label: string;
}

interface DataType {
  [key: string]: string;
}

const options: OptionType[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const data: DataType = {
  option1: 'This is data for option 1',
  option2: 'This is data for option 2',
  option3: 'This is data for option 3',
};

const CustomSelect: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selected:any) => {
    setSelectedOption(selected);
  };

  return (
    <div>
      <Select options={options} onChange={handleChange} />
      {selectedOption && <div>{data[(selectedOption as OptionType).value]}</div>}
    </div>
  );
}

export default CustomSelect;
