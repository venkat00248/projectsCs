import NewTicketview from "../TicketView/NewTicketView";
import Ticketview from "../TicketView/Ticketview";
import { DateFormat, DateFormatForWF } from "../Utils/DateFormat";
import Parser from "html-react-parser";
const checkUndefined = (value: string) => {
  if (!value) return "--";
  return value === "" || value.toLowerCase() == "null" ? "--" : value;
}

export const MappedTicketsData = (tickets: any, isSupportUnixFormat: boolean = true) => {
  return tickets?.map((ticket: any) => ({
    itilticketid: ticket.rfcno,
    username: ticket.fullname,
    deptName: ticket.dept_title,
    organization: ticket.organizationname,
    statustitle: ticket.statustitle,
    createdon: DateFormat(ticket.createdon, isSupportUnixFormat),
    prioritytitle: ticket.prioritytitle,
    userstaffid: ticket.userstaffid,
    orgtype: checkUndefined(ticket.orgtype).charAt(0).toUpperCase() + checkUndefined(ticket.orgtype).slice(1),
    createdname: ticket.createdname,
    lob_name: checkUndefined(ticket.lob_name),
    wingname: checkUndefined(ticket.wingname),
    lastactivity: DateFormat(ticket.lastactivity, isSupportUnixFormat),
    lastreplier: checkUndefined(ticket.lastreplier),
    action: <Ticketview ticket={ticket} />,
  }));
}
export const MappedTicketsData2 = (tickets: any) => {
  return tickets?.map((ticket: any) => ({
    itilticketid: ticket._id,
    username: ticket.Ticket_ID,
    deptName: ticket.dept_title,
    organization:Parser(ticket.description),
    statustitle: ticket.serverInfo,
    createdon: DateFormatForWF(ticket.createdAt),
    prioritytitle: ticket.priority,
    userstaffid: ticket.userstaffid,
    orgtype: checkUndefined(ticket.orgtype).charAt(0).toUpperCase() + checkUndefined(ticket.orgtype).slice(1),
    createdname: ticket.createdname,
    lob_name: checkUndefined(ticket.lob_name),
    wingname: checkUndefined(ticket.wingname),
    lastactivity: DateFormatForWF(ticket.updatedAt),
    lastreplier: checkUndefined(ticket.lastreplier),
    action: <NewTicketview ticket={ticket} rfcno= {ticket._id} />,
  }));
}
// {
//   "subject": "",
//   "_id": "64a40a2208614b23c76e775f",
//   "from": "",
//   "Ticket_ID": "",
//   "priority": "p1",
//   "customer_ticket_ref_id": "",
//   "name": "test",
//   "description": "test",
//   "serverInfo": "",
//   "instance_type": "",
//   "customer_attachment_url": "",
//   "createdAt": "2023-07-04T12:01:38.310Z",
//   "updatedAt": "2023-07-04T12:01:38.310Z",
//   "__v": 0
// }