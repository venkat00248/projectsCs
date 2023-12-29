import { useTranslation } from "react-i18next";
import "./filterComponent.scss"
import { useEffect, useState } from "react";

const FilterComponent = ({ filterText, onFilter}:any) => {
  const { t }:any = useTranslation();
  const [isFocused, setIsFocused] = useState(true);

  const handleIcon = () => {
    if(filterText.length == 0) {
      setIsFocused(true)
    } else {
      setIsFocused(false)
    }
  }
  useEffect(() => {
    handleIcon()
  }, [filterText])
  return(
  <div className="filterSearch input-Filcontainer" 
  // style={{width: "19%",    marginBottom: "4px"}} 
    >
    <input
      className="TextField"
      id="search"
      type="text"
      placeholder={t("Filter search")}
      aria-label="Search Input"
      value={t(filterText)}
      onChange={onFilter}
    />
    <span className={`searchfilter-icon ${isFocused && filterText.length === 0 ? 'icon' : 'iconhidden'}`}>
      <i className="fa-solid fa-magnifying-glass"></i>
    </span>
  </div>
  )
};


export default FilterComponent;
