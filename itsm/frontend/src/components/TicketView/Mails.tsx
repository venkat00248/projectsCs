import { Accordion, OverlayTrigger, Tooltip } from "react-bootstrap";
import mails from "./Mails.json";
import { useState } from "react";
import moment from "moment";
import EmailContents from "./EmailContents";
import { useTranslation } from "react-i18next";
export const Mails = ({ ticket }: any) => {
  const [tickets, settickets]: any = useState(mails.mails);
  const [forward, setforward]: any = useState(false);
  const { t } = useTranslation();
  return (
    <div>
      {!forward && (
        tickets.map((tkt: any, index: number) => (
          <Accordion
            key={index}
            className="custom-accordion"
            defaultActiveKey={index === 0 ? "0" : "1"}
            alwaysOpen={tkt.ticketid === tkt.ticketid[0]}
          >
            <Accordion.Item eventKey={"0"}>
              <Accordion.Header className="cmn-styles">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "1150px",
                    margin: "13px",
                    marginLeft: "2px",
                  }}
                >
                  <div>{tkt.fullname}</div>
                  <div>
                    {" "}
                    {moment(tkt.createdon, "YYYY-MM-DD HH:mm:ss").format(
                      "Do MMMM YYYY h:mm a"
                    )}
                  </div>

                </div>
              </Accordion.Header>
              <Accordion.Body style={{
                display: "flex ",
                justifyContent: "space-between"
              }}>
                <p>{tkt.content}</p>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id={`tooltip-reload`}>
                      {t("Forward Email")}
                    </Tooltip>
                  }
                >
                  <i
                    className="fa fa-share"
                    onClick={() => setforward(true)}
                    style={{ height: "25px", "float": "right", cursor: "pointer" }}
                  ></i>
                </OverlayTrigger>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ))
      )
      }
      {forward && (<div>
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
              setforward(false)

            }}
          ></i>

        </OverlayTrigger>
        <br />
        <EmailContents isForward={true} />
      </div>)}
    </div>
  )
}
export default Mails;