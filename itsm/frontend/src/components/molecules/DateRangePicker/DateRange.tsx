import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.css"; // Import default RSuite styles
import { useState, useEffect } from "react";
import "./DateRange.scss";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import { dateRangeReducer } from "../../../redux/reducers/dateRangeReducer";
import { ActionTypes } from "../../../redux/constants/action-types";
import { useTranslation } from "react-i18next";
interface DateRangeState {
  value: any;
}

export const DateRange = () => {
  const [dateRange, setDateRange] = useState<DateRangeState>({
    value: [null, null],
  });
  const [showCross, setShowCross] = useState(false);
  const theme = useSelector((state: any) => state.allReducers.theme.theme);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  function handleDateRangeChange(value: any) {
    setDateRange({ value });
    setIs24hrButtonClicked(false)
    setIs48hrButtonClicked(false)
    setShowCross(true);// console.log("dataRange",dateRange)
  }

  const convertJsTOUnixTime = (date: any) => {
    if (date) {
      const now = new Date(date).getTime();
      return Math.floor(now / 1000);
    }
  }

  const triggerAPI = (dateObj: any) => {
    const { epochDateRange1, epochDateRange2 } = dateObj;
    dispatch({ type: ActionTypes.SET_DATE_RANGE, payload: { epochDateRange1: epochDateRange1, epochDateRange2: epochDateRange2 } })
  }
  useEffect(() => {
    const epochDateRange1 = convertJsTOUnixTime(dateRange?.value?.[0] ?? 0);
    const epochDateRange2 = convertJsTOUnixTime(dateRange?.value?.[1] ?? 0);
    const newEpochDateRange = { epochDateRange1, epochDateRange2 };
    triggerAPI(newEpochDateRange);
  }, [dateRange]);
  useEffect(() => {
    // Set the default range to 24 hours
    const now = new Date();
    const endOfDay: any = convertJsTOUnixTime(now);
    const startOfDay = endOfDay - 86400;
    triggerAPI({ epochDateRange1: startOfDay, epochDateRange2: endOfDay })
    setIs24hrButtonClicked(true);
    setIs48hrButtonClicked(false);
  }, []);

  const styles = {
    width: 200,
    display: "block",
    // marginBottom: 10,
    // marginRight: 10,
  };

  const [is24hrButtonClicked, setIs24hrButtonClicked] = useState(false);
  const [is48hrButtonClicked, setIs48hrButtonClicked] = useState(false);
  const handleHrsButtonClick = (type: string) => {
    setIs24hrButtonClicked(type == '24hrs');
    setIs48hrButtonClicked(type == '48hrs');
    const now = new Date();
    let diff = type == '24hrs' ? 86400 : 172800;
    const endOfDay: any = convertJsTOUnixTime(now);
    const startOfDay = endOfDay - diff;
    triggerAPI({ epochDateRange1: startOfDay, epochDateRange2: endOfDay })
    setDateRange({ value: null })
  }
  const handle24hrButtonClick = () => {
    handleHrsButtonClick('24hrs');
  }

  const handle48hrButtonClick = () => {
    handleHrsButtonClick('48hrs');
  };
  const darkThemeStyles = `.rs-picker-daterange-panel { background-color: #181a1b; border: 1px solid #5a5d5e;}
  .rs-picker-daterange-header {
    border-bottom: 1px solid #5a5d5e;
    background: #303436;
    color: #8d8b8f !important;
  }
  .rs-picker-toolbar {
    background-color: #181a1b;
    border-top: 1px solid #5a5d5e;
  }
  .rs-picker-menu .rs-calendar .rs-calendar-table-cell:hover .rs-calendar-table-cell-content {
    color: #fff !important;
  }`; 
  return (
    <div className="custom-filters">
      <div className="filter-button-wrapper">
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id={`tooltip-24h`}>{`24 ${t("Hours")}`}</Tooltip>}
        >
          <button
            type="button"
            className={`filter-buttons ${is24hrButtonClicked ? "clicked" : ""}`}
            onClick={handle24hrButtonClick}
          >
            24{t('h')}
          </button>
        </OverlayTrigger>

        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip id={`tooltip-48h`} className="custom-tooltip">
              {`48 ${t("Hours")}`}
            </Tooltip>
          }
        >
          <button
            type="button"
            className={`filter-buttons ${is48hrButtonClicked ? "clicked" : ""}`}
            onClick={handle48hrButtonClick}
          >
            48{t('h')}
          </button>
        </OverlayTrigger>
      </div>
      <div >
      <style>{theme? darkThemeStyles: ''}</style>
      <DateRangePicker
        value={dateRange.value}
        onChange={handleDateRangeChange}
        showOneCalendar
        size="md"
        id="daterangdarktheme"
        // className="daterangdarktheme"
        placeholder={t("From Date~To Date")}
        style={styles}
        ranges={[]}
        cleanable={showCross}
        editable={false}
        locale={{
          ok: t("ok"),
        }}
      />
      </div>
    </div>
  );
};
