import React, { useState, useEffect, useRef, ReactNode } from "react";
import "./Export.scss";
import { useTranslation } from "react-i18next";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
type Option = {            //options must be array of object with label and value key//
    label: string;
    value: string;
  };
  
  type Props = {
    options: any;
    buttonLabel?: string;  // for label optional
    handleExprtItem: (value: string) => void;
    icon?: any | ReactNode; // added icon prop optional
    defaultvalue?: string   // export type optional
  };

export function CustomExport({ options, buttonLabel, handleExprtItem,  icon = "fa-solid fa-download", defaultvalue }: Props) {
    const [showMenu, setShowMenu] = useState(false);
    const componentRef = useRef<HTMLDivElement>(null);
    const [defaultOption, setDefaultOption]:any = useState({})
    const { t } = useTranslation();
    useEffect(() => {
        if(defaultvalue === "xls") {
            setDefaultOption({ label: "XLSX", value: "xls" })
        } if(defaultvalue === "csv") {
            setDefaultOption({ label: "CSV", value: "csv" })
        }
    }, [])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
            setShowMenu(false);
        }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
        document.removeEventListener("click", handleClickOutside);
        };
    }, [componentRef]);

    const toggleMenu: React.MouseEventHandler<HTMLButtonElement> = () => {
        setShowMenu(!showMenu);
    };

    const handleOptionSelect = (option: Option) => {
        // console.log(option, "option")
        handleExprtItem(option.value);
        setShowMenu(false);
    };
    return (
        <div className="custom-select" ref={componentRef}>
        <button onClick={options.length > 0 ? toggleMenu : () => handleOptionSelect(defaultOption)} className="downLoad">
            {buttonLabel}
            <OverlayTrigger
                  delay={{ hide:0, show: 30 }}
                  overlay={(props) => (
                      <Tooltip {...props}>
                          {t("Export to")}
                      </Tooltip>
                  )}
                  placement="top"
                  >
                  <i className={icon}></i>
            </OverlayTrigger>
        </button>
        {(showMenu) && (
            <div className="menu">
            <ul>
                {
                (options?.length > 0)? options.map((option:any) => {
                    return(
                        <li key={option.value} onClick={() => handleOptionSelect(option)}>
                           {(option.value == "xls")? 
                                <span className="bi bi-filetype-xlsx fileIcon"></span>:
                                <span className="bi bi-filetype-csv fileIcon"></span>}
                           {option.label}
                        </li>
                    )
                } 
                ):null
                }
            </ul>
            </div>
        )}
        </div>
    );
}
