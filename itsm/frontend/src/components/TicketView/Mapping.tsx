import ActivityPoc from "./ActivityPocLogs";
import AuditLogs from "./AuditLogs";
import Document from "./Document";
import Followup from "./Followup";
import History from "./History";
import Resolution from "./Resolution";
import SopLogs from "./SopLogs";
import StaffList from "./StaffList";
import TicketTasks from "./TicketTasks";

export const Mapping:any = {
    Auditlogs:AuditLogs,
    ClosureApprovallogs:Resolution,
    Followup:Followup,
    ActivityPocLogs:ActivityPoc,
    Ticketasks:TicketTasks,
    StaffList:StaffList,
    History:History,
    SopLogs:SopLogs,
    Document:Document,
  };