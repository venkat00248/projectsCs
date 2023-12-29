import { components } from "react-select";
import { Badge } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export const Option = (props: any) => { 
  const { t } = useTranslation(); 
  return (
    <components.Option {...props}>
       {t(props.data.value)} 
      <Badge bg="primary" style={{ paddingTop: "6px", marginLeft: "5px" }}>
        {props.data.count}
      </Badge>
    </components.Option>
  );
};
