import { Card, Accordion, OverlayTrigger, Tooltip } from "react-bootstrap";
import "./Communication.scss";
import mails from "./Mails.json";
import { useEffect, useState } from "react";
import Mails from "./Mails";
import DataGovernanace from "./DataGovernance";
import { EmailContents } from "./EmailContents";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
export const Communication = (ticket: any) => {
  const [tickets, settickets]: any = useState(mails.mails);
  const [sendemail, setsendemail] = useState(false);
  const { t } = useTranslation();
  const handleRefresh = () => {
    settickets(mails.mails);
  };
  useEffect(() => {
    handleRefresh();
  });
  const theme = useSelector((state: any) => state.allReducers.theme.theme);
  const [themeClassName, setThemeClassName] = useState('');
 useEffect(() => {
    setThemeClassName(theme ? 'tableview' : '');
  }, [theme]);
  // console.log("tickettype view", ticket.ticket);
  return (
    <div style={{ marginTop: "10px" }} className={`${themeClassName}`}>
      <Card className={`${themeClassName}`}>
        <Card.Title className="cmn-card">
          <div className="email-buttons">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id={`tooltip-sendemail`}>{t("Send Email")}</Tooltip>}
            >
              <i
                className="fa-solid fa-envelope"
                style={{
                  fontSize: "15px",
                  margin: "0px 10px",
                  cursor: "pointer",
                }}
                onClick={() => setsendemail(true)}
              ></i>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id={`tooltip-addnote`}>{t("Add Note")}</Tooltip>}
            >
              <i
                className="fa-sharp fa-solid fa-pen-to-square"
                style={{
                  fontSize: "15px",
                  margin: "0px 10px",
                  cursor: "pointer",
                }}
              ></i>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id={`tooltip-reload`}>{t("Refresh")}</Tooltip>}
            >
              <i
                className="fa-solid fa-arrows-rotate"
                onClick={handleRefresh}
                style={{
                  fontSize: "15px",
                  margin: "0px 10px",
                  cursor: "pointer",
                }}
              ></i>
            </OverlayTrigger>
          </div>
        </Card.Title>
        <Card.Body>
          {!sendemail && <Mails {...ticket} />}
          {sendemail && (
            <div>
              <OverlayTrigger
                delay={{ hide: 0, show: 30 }}
                overlay={(props) => <Tooltip {...props}>{t("Close")}</Tooltip>}
                placement="bottom"
              >
                <i
                  className={"fa-solid fa-xmark border rounded-3 border-2 border"}
                  style={{
                    fontSize: "15px",
                    cursor: "pointer"
                    , color: "red",
                    float: "right",
                    margin: "0px",
                    backgroundColor: `rgba(128, 0, 0, 0.1)`,
                    padding: "4px"
                  }}
                  onClick={() => {
                    setsendemail(false)

                  }}
                ></i>

              </OverlayTrigger>
              <br />
              <EmailContents isForward={false} />
            </div>)}
          <div
            style={{ borderTop: "1px solid grey", margin: "25px 0px" }}
          ></div>
          <DataGovernanace {...ticket} />
        </Card.Body>
      </Card>
    </div>
  );
};
export default Communication;
