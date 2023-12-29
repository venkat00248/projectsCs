import { Card, Accordion } from "react-bootstrap";
import Tabsview from "./Tabs";
import { Mapping } from "./Mapping";
import "./Communication.scss";
import data from "./datagovernance.json";
import { useTranslation } from "react-i18next";
export const DataGovernanace = ({ ticket }: any) => {
  const { t } = useTranslation();
  return (
    <Accordion defaultActiveKey={["0"]} alwaysOpen>
      <Card>
        <Accordion.Item eventKey="0">
          <Accordion.Header className="cmn-styles">
            {t("Governance Data")}
          </Accordion.Header>
          <Accordion.Body>
            <Tabsview {...ticket} componentMap={Mapping} tabs={data} />
          </Accordion.Body>
        </Accordion.Item>
      </Card>
    </Accordion>
  );
};
export default DataGovernanace;
