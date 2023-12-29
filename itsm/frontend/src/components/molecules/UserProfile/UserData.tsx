import { useTranslation } from "react-i18next";
export const UserData = ({ data }: any) => {
    const {t}=useTranslation();
    return (
        <div>
            {data.map((detail: any, index: number) => {
                return (
                    <div className="form-group row" key={index}>
                        {Object.keys(detail).map((key: string) => {
                            return (
                                <div key={key}>
                                    <div className="form-group row">
                                        <label htmlFor={key} className="col-sm-4 col-form-label">
                                            {t(key)}
                                        </label>
                                        <label htmlFor={key} className="col-sm-1 col-form-label">
                                            :
                                        </label>
                                        <div className="col-sm-6">
                                            <div className="form-control-plaintext" id={key}>
                                                {detail[key]}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};
