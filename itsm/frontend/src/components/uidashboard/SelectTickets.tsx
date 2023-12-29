import React, { useEffect } from 'react';
import second from "./dataselect.json"
import options from "./data.json";
import Select from 'react-select';
import { MultiValueLabel } from './MultivalueLabel';
import { Option } from './DropdownBadges';
import { useTranslation } from "react-i18next";
const first=options.ColourOptions;
const Second=second.flavouroptions;
export const countvalues=[...first,...Second]


export default function AllticketsSelect({ticketTypes,changedata}:any){
  let categories = [ticketTypes].sort((a:any, b:any) => a.label.localeCompare(b.label));
  const convertedCategories = [];

  for (const category in categories[0]) {
    convertedCategories.push({
      value: category,
      label: category,
      count: categories[0][category]
    })
  }
  convertedCategories.sort((a:any, b:any) => a.label.localeCompare(b.label));
  const {t}= useTranslation()
  const GroupedOptions = [
    {
      // label: t('Internal'),
      options: convertedCategories,
        
    }
    // ,
    // {
    //   label: t('External'),
    //   options: Second,
    // },
  
  ];
  // useEffect(()=>{console.log("data",first,Second)},[GroupedOptions]);
  return (
    <Select
      // isMulti 
      className="basic-multi-select"
      components={{ MultiValueLabel,Option}}
      classNamePrefix="select"
      options={GroupedOptions}
      onChange={(ev)=>changedata(ev)}
      // defaultValue={{label:first[0].label,value:first[0].value ,count:first[0].count}}
    isClearable={true}
    isSearchable={true}
    placeholder={t("Select One")}
    />
  );
};
