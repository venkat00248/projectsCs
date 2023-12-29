import { Col } from "react-bootstrap";
import Select from "react-select";
import editfields from "./editData.json";
import { useTranslation } from "react-i18next";
export const EditTicket = ({ ticket }: any) => {

  const { t } = useTranslation();
  return (
    <div className="mt-1 p-3">
      <div className="row">
        {editfields.map((item: any) => (
          <div className="col-sm-6" key={item.id}>
            <Col className="pb-1" key={item.id}>
              <div>
                <label>{t(item.title)}</label>
              </div>
            </Col>
            <Col className="pb-3" sm={8}>
              <Select
                options={item.options}
                name={item.name}
                defaultValue={
                  item.options.find(
                    (option: any) => option.value === ticket[item.name]
                  ) || item.options[0]
                }
              />
            </Col>
          </div>
        ))}
      </div>
      <div style={{ paddingBottom: "30px" }}>
        <button
          type="button"
          className="btn btn-primary"
          style={{ float: "right" }}
          disabled
        >
          {t("Update")}
        </button>
      </div>
    </div>
  );
};
export default EditTicket;
