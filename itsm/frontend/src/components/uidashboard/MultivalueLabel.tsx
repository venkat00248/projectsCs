import React from "react";
import { Badge } from "react-bootstrap";
import Select, { components, MultiValueGenericProps, OptionProps } from "react-select";
import countValues from "./SelectTickets";
import second from "./dataselect.json";
import { useTranslation } from "react-i18next";
import options from "./data.json";
const first=options.ColourOptions;
const Second=second.flavouroptions;

export const MultiValueLabel = ( props:any) => {
    // console.log("first", props)
    
    const { t } = useTranslation(); 
  return (
    <div className="d-flex">
      <components.MultiValueLabel {...props.countValues}> 
      {t(props.data.value)} 
      </components.MultiValueLabel>
      <Badge bg="primary" style={{paddingTop:"6px", marginLeft:"5px", }} >
      {props.data.count}
      </Badge>
    </div>
  );
};
export const DropdownBadges = ( props:any) => {
  // console.log("first", props)

return (
  <div className="d-flex">
    <components.Option {...props.countValues}> 
    {props.data.value} 
    </components.Option>
    <Badge bg="primary" style={{paddingTop:"6px", marginLeft:"5px", }} >
    {props.data.count}
    </Badge>
  </div>
);
};