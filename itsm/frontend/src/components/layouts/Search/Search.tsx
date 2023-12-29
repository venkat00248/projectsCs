import React, { useState, useEffect, useRef } from "react";
import "./Search.scss";
import { useTranslation } from "react-i18next";
import { TicketTypeService } from "../../../services/TicketTypeService";
import { View } from "../../TicketView/View";
import { Index } from "../../molecules/Loader";
import { Alert, Button } from "react-bootstrap";
import CustomModal from "../../molecules/ConfirmModal/CustomModal";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { config } from "../../../config/config";
interface Data {
  [key: string]: any;
}
export const Search = () => {
  const [value, setValue] = useState("");
  const [data, setData] = useState<{ name: string }[]>([]);
  // const [filteredData, setFilteredData] = useState<Data[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ticketLoading, setticketLoading] = useState(true)
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [inputFocused, setInputFocused] = useState(false);
  const { t } = useTranslation();
  const placeholder = t("Search here...");
  const [selectedOption, setSelectedOption] = useState<string>("Select one");
  const theme = useSelector((state: any) => state.allReducers.theme.theme);
  const [themeClassName, setThemeClassName] = useState('');
  const [searchByOptions, setSearchByOptions] = useState([
    { value: "Select one", text: "Select one" },
    { value: "Ticket ID", text: "Ticket ID" },
    { value: "Subject", text: "Subject" },
    { value: "Body", text: "Body" },
    { value: "Group Name", text: "Group Name" },
  ]);
  const [showModal, setShowModal] = useState({show: false, message: ""});
  useEffect(() => {
    setThemeClassName(theme ? 'tableview' : '');
  }, [theme]);
  const fetchData = async (rfcno: string) => {
    try {
      setIsLoading(true);
      const response:any = await TicketTypeService.getSerachResultsByTicket(rfcno);
      if (response?.source == "handleSuccess") {
        setticketLoading(false);
        setData(response.data.data.data);
      } else {
        const filteredErrors = response?.filter((err:any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmgateway.cloud4c.com/searchbyticket"]);
        toast.error(filteredErrors[0]['errorMsg'], {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }
      setIsLoading(false);
    } catch (error: any) {
      console.log("errrrrrr", error);
    }
  };
  // useEffect(() => {
  //   if (selectedOption === "Ticket ID" && value.length > 2) {
  //     fetchData(value);
  //   }
  // }, [value, selectedOption]);

  const inputRef = useRef<HTMLInputElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setInputFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  function inputValidation(str:string) {
    // remove white spaces
    str = str.replace(/\s/g, '');
    // remove non-alphanumeric characters
    str = str.replace(/[^a-zA-Z0-9]/g, '');
    return str;
  }
  const onChange = (event: any) => {
    let sanitizedValue = inputValidation(event.target.value);
    setValue(sanitizedValue);
  };
  const onKeyDown = (event: any) => {
    if (event.key === "Enter") {
      onSearch(value);
    if ((selectedOption === "Ticket ID") && value !== "" ) {         
      fetchData(value)
    }
    if(selectedOption == "Select one") {
      setShowModal({show: true, message: "Please select valid option"});
      return;
    }
    if(value == "") {
      setShowModal({show: true, message: "Please provide ticket ID."});
      return;
    }
    }
  };
  const onSearch = (searchTerm: any) => {
    setValue(searchTerm);
    setRecentSearches([
      searchTerm,
      ...recentSearches.filter((item) => item !== searchTerm),
    ]);
  };
  const onOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };
  const handleCloseModal = () => {
    setShowModal({show: false, message: ""});
  };

  return (
    <>
      <div className="search_container">
        <div className="col-md-2 pe-0 search_dropDown">
          <select
            name="docview"
            id="docview"
            className="form-select select2"
            required
            value={selectedOption}
            onChange={onOptionChange}
            style={{
            cursor: "pointer"}}
          >
            {searchByOptions.map((eOption) => (
              <option value={eOption.value} key={eOption.text}>{t(`${eOption.text}`)}</option>
            ))}
          </select>
        </div>
        <div className="boxContainer">
          <div className="elementsContainer">
            <input
              type="text"
              placeholder={placeholder}
              className="search"
              value={value}
              onChange={onChange}
              maxLength={20}
              onKeyDown={onKeyDown}
              onFocus={() => setInputFocused(true)}
              // onBlur={() => setInputFocused(false)}
            />
            {value.length >= 1 ? (
              <i
                className="fas fa-xmark cross_icon"
                onClick={() => {
                  setValue("");
                  setData([]);
                }}
              ></i>
            ) : (
              <i
                className="fas fa-search material-icons"
                onClick={() => onSearch(value)}
              ></i>
            )}
          </div>
          {/* {inputFocused && (
            <div className="recentSearches_wrapper" ref={inputRef}>
              {recentSearches.map((item) => (
                <div className="recentSearches" onClick={() => onSearch(item)}>
                  <div className="recentSearches_icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      width="17"
                      height="17"
                      className="timer"
                    >
                      <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                    </svg>
                  </div>
                  <div className="recentSearchItem">{item}</div>
                </div>
              ))}
            </div>
          )} */}
        </div>
      </div>
      <CustomModal
        show={showModal.show}
        onHide={handleCloseModal}
        title = {t("Invalid Search")}
        footer={
          <>
            <Button variant="danger" onClick={handleCloseModal} style= {{padding: "2px", width: "50px"}}>
              {t("Ok")}
            </Button>
          </>
        }
      >
      <p>{t(showModal.message)}</p>
      </CustomModal>
      {isLoading ? (
        <div className="search_Module_loader">
          <Index />
        </div>
      ) : (
        <div >
          {data?.[0] && ( 
          <div style={{ marginTop: "50px" }} className={`searchResults ${themeClassName}`}>
            <View ticket={data[0]} ticketLoading= {ticketLoading} />
            </div>)}
          {Object.values(data)[0] === null && (
            <div  style={{marginTop:"10px"}}>
              <Alert variant={"dark"}>No records found</Alert>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default Search;
