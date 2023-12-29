import DataTable from "react-data-table-component";
import './AuditLogs.scss'
import { TicketTypeService } from "../../services/TicketTypeService";
import { useState, useEffect } from 'react';
import GovernanceDataTable from "./GovernanceDataTable";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { config } from "../../config/config";
import { toast } from "react-toastify";
export const AuditLogs = () => {
  const { t } = useTranslation();

  const [auditdata, setauditdata]: any = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);  
  const auditlogsdata= async()=>{
    setIsRefreshing(true);
    const id=sessionStorage.getItem("ticketId");
    const res:any = await TicketTypeService.getAuditLogsById(id);
    if(res?.source == 'handleSuccess') {
      const resdata:any = await res.data.data.list || [];
      resdata.sort((a:any, b:any) => new Date(b.createdon).getTime() - new Date(a.createdon).getTime());

      if(resdata){
        setIsRefreshing(false);
        setauditdata(res?.data?.data?.list || [])
        return resdata;
      }
    } else {
      const filteredErrors = res?.filter((err:any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmgateway.cloud4c.com/auditlogs_by_id"]);
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
  }
  const handleRefresh = () => {
    auditlogsdata();
  };
  useEffect(() => {
    auditlogsdata();
  },[])
  
    return(
     
<div className="mainAuditConatiner">
 <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip id={`tooltip-refresh`}>
          {t("Refresh")}
        </Tooltip>
      }
    >
      {isRefreshing ? (
          <i className="fa-solid fa-arrows-rotate rotate"
            onClick={handleRefresh}
            style={{
              fontSize: "18px",
              // marginLeft:"1220px",
              marginTop: "15px",
              marginBottom: "6px",
              float:"right",
              cursor: "pointer",
            }}
          >
          </i>
        ) : (
          <i className="fa-solid fa-arrows-rotate"
            onClick={handleRefresh}
            style={{
              fontSize: "18px",
              // marginLeft:"1220px",
              marginTop: "15px",
              marginBottom: "6px",
              float:"right",
              cursor: "pointer",
            }}
          >
          </i>
        )}
  </OverlayTrigger>

      <GovernanceDataTable data={auditdata} />

    </div>
  )
}
export default AuditLogs;