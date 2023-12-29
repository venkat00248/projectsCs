import HttpApiService from "./HttpApiService";
import { config } from "../config/config";

//define the constants here...
const API_BASE = `${config.API.BASEURI}`;
const API = config.API;
const TICKET_TYPE_ENDPOINT =
  config.ENV.IS_PROD || config.ENV.IS_UAT
    ? `${API_BASE}/${API.TICKET_TYPES.IS_GET ? "list" : "create"}/myshift_app/${API.TICKET_TYPES.ACTION
    }`
    : `${config.ENV.API_URL}/openTickets`;
const getdepartmentwise =
  config.ENV.IS_PROD || config.ENV.IS_UAT
    ? `${API_BASE}/${API.TICKET_TYPES.IS_GET ? "list" : "create"}/myshift_app/${API.TICKET_TYPES.ACTION
    }`
    : `${config.ENV.API_URL}/getdepartmentwise`;

const getCustomerList =
  config.ENV.IS_PROD || config.ENV.IS_UAT
    ? `${API_BASE}/${API.PEND_CUSTOMER.IS_GET ? "list" : "create"}/icp/${API.PEND_CUSTOMER.ACTION
    }`
    : `${config.ENV.API_URL}/getCustomerList`;

const Create_Ticket_FormData =
  config.ENV.IS_PROD || config.ENV.IS_UAT
    ? `${API_BASE}/${API.CREATE_TICKET.IS_GET ? "list" : "create"}/myshift/${API.CREATE_TICKET.ACTION
    }`
    : `${config.ENV.API_URL}/createTicket`;

const Get_SLA_Details_StaffId =
  config.ENV.IS_PROD || config.ENV.IS_UAT
    ? `${API_BASE}/${API.OPEN_TICKETS.IS_GET ? "list" : "create"}/myshift_app/${API.OPEN_TICKETS.ACTION
    }`
    : `${config.ENV.API_URL}/ticketsByStaffid`;
const openticketsbyDate = config.ENV.IS_PROD || config.ENV.IS_UAT
  ? `${API_BASE}/${API.OPEN_TICKETS_BY_DATE.IS_GET ? "list" : "create"}/myshift_app/${API.OPEN_TICKETS_BY_DATE.ACTION
  }`
  : `${config.ENV.API_URL}/openticketsbyDate`;
const closeticket_By_OwnerID = config.ENV.IS_PROD || config.ENV.IS_UAT
  ? `${API_BASE}/${API.CLOSED_TICKETS.IS_GET ? "list" : "create"}/myshift_app/${API.CLOSED_TICKETS.ACTION
  }`
  : `${config.ENV.API_URL}/closetickets`;
const unAssignedTickets = config.ENV.IS_PROD || config.ENV.IS_UAT
  ? `${API_BASE}/${API.UN_ASSIGNED_TICKETS.IS_GET ? "list" : "create"}/myshift_app/${API.UN_ASSIGNED_TICKETS.ACTION
  }`
  : `${config.ENV.API_URL}/unAssignedTickets`;
const Get_Priority_By_Ticket_Id =
  config.ENV.IS_PROD || config.ENV.IS_UAT
    ? `${API_BASE}/${API.PRIORITY_LIST.IS_GET ? "list" : "create"}/myshift_app/${API.PRIORITY_LIST.ACTION
    }`
    : `${config.ENV.API_URL}/getpriorities`;
const searchbyticket = config.ENV.IS_PROD || config.ENV.IS_UAT
  ? `${API_BASE}/${API.OPEN_TICKETS_BY_DATE.IS_GET ? "list" : "create"}/myshift_app/${API.OPEN_TICKETS_BY_DATE.ACTION
  }`
  : `${config.ENV.API_URL}/searchbyticket`;
const workflowbyId = config.ENV.IS_PROD || config.ENV.IS_UAT
  ? `${API_BASE}/${API.OPEN_TICKETS_BY_DATE.IS_GET ? "list" : "create"}/myshift_app/${API.WORKFLOW_BY_ID.ACTION
  }`
  : `${config.ENV.API_URL}/getWorkFlowByID`;
 const postAWorkflow = config.ENV.IS_PROD || config.ENV.IS_UAT
  ? `${API_BASE}/${API.POST_A_WORKFLOW ? "list" : "create"}/myshift_app/${API.WORKFLOW_BY_ID.ACTION
  }`
  : `${config.ENV.API_URL}/postAWorkFlow`;
/**
 * @description creates Ticket Type class and extends the HTTP interceptor class...
 */
const auditlogsbyid = config.ENV.IS_PROD ||
    config.ENV.IS_UAT ? `${API_BASE}/${API.AUDITLOGS_BY_ID.IS_GET ? 'list' : 'create'}/myshift_app/
    ${API.AUDITLOGS_BY_ID.ACTION}` :
    `${config.ENV.API_URL}/auditlogs_by_id`;

const uploadEndPoint = 
config.ENV.IS_PROD || config.ENV.IS_UAT
  ? `${API_BASE}/${API.CREATE_TICKET.IS_GET ? "list" : "create"}/myshift/${API.CREATE_TICKET.ACTION
  }`
  : `${config.ENV.API_URL}/upload`;
const restrictform = config.ENV.IS_PROD || config.ENV.IS_UAT
? `${API_BASE}/${API.RESTRICT_FORM.IS_GET ? "list" : "create"}/myshift_app/${API.RESTRICT_FORM.ACTION}`
: `${config.ENV.API_URL}/restrictform`;

const TicketService = "https://itsmticket.cloud4c.com/ticket"
const workFlowService = "https://itsmworkflow.cloud4c.com/workflow/published"
// const TicketService = "http://localhost:8080/ticket"
export class TicketType extends HttpApiService {
  constructor() {
    super(`${API_BASE}`);
  }

  //#region Ticket Type
  getTicketTypeById = (id: number) => {
    return this.get(`${TICKET_TYPE_ENDPOINT}/${id}`);
  };
  //fetches all ticket types
  getAllTicketTypes = () => {
    const response = this.get(`${TICKET_TYPE_ENDPOINT}`);
    return response;
  };

  getTicketType = () => {
    const response = this.get(`${TicketService}/getMappedWorkflow`);
    return response;
  };
  getOpenTicketsByDateRange(startLimit: number, endLimit: number, startDate: number, endDate: number) {
    const response = this.get(`${openticketsbyDate}?limit=${startLimit}&offset=${endLimit}&start_date=${startDate}&end_date=${endDate}`);
    return response;
  }
  getUnAssignedTickets(limit: number, offset: number) {
    const response = this.get(`${unAssignedTickets}?limit=${limit}&offset=${offset}`);
    return response;
  }
  getSerachResultsByTicket(rfcno: string) {
    const response = this.get(`${searchbyticket}?rfcno=${rfcno}`);
    return response;
  }

  getDeptOpenTicket = () => {
    return this.get(
      `${getdepartmentwise}?key=${API.DEPTS.AUTH_KEY}`
    );
  };

  getCustomerList = () => {
    return this.get(
      `${getCustomerList}?key=${API.PEND_CUSTOMER.ACTION}`
    );
  };

  getSLADetailsByStaffId = (id: number) => {
    return this.get(
      `${Get_SLA_Details_StaffId}?staffid=${id}`
    )
  }

  getAuditLogsById = (id: any) => {

    return this.get(`${auditlogsbyid}?ticketid=${id}`);
  }
  postcreateTicketDetails = (data: any) => {
    // return this.post(
    //   `${Create_Ticket_FormData}`, data,
    //   {
    //     headers: { "auth_key": API.CREATE_TICKET.AUTH_KEY }
    //   }
    // )
    return this.get(`${Create_Ticket_FormData}`, {
      params: data
    })
  };
  createTicket = (data: any) => {

    return this.post(`${TicketService}/createTicket`, data)
  };
  mapTicketType = (data: any) => {

    return this.post(`${TicketService}/mapTicketType`, data)
  };
  createTicketType  = (data: any) => {
    return this.post(`${TicketService}/createTicketType`, data)
  };
  deleteTicketTypeMapping  = (data: any) => {
    return this.post(`${TicketService}/deleteTicketTypeMapping`, data)
  };
  listAllTicketTypes = () => {

    return this.get(`${TicketService}/getAllTicketTypes`)
  };
  updateTicket = (data: any) => {

    return this.update(`${TicketService}/updateTicket`, data)
  };
  getMappedWorkflow = () => {

    return this.get(`${TicketService}/getMappedWorkflow`)
  };
  postAWorkflowItem = (data: any) => {

    return this.get(`${postAWorkflow}`, {
      params: data
    })
  };
  getAllTickets  = () => {

    return this.get(`${TicketService}/getAllTickets`)
  };
  createWorkFlowState = (data: any) => {

    return this.post(`${workFlowService}/create-state`, data)
  };
  getpriorityByTicketId = (id: number) => {
    return this.get(
      `${Get_Priority_By_Ticket_Id}?ticket_typeid=${id}`
    )
  }

  getcloseTicketByOwnerId = (id: any) => {
    return this.get(
      `${closeticket_By_OwnerID}?ownerid=${id}`
    )
  }

  sendUploadData = (data:any) => {
    return this.get(`${uploadEndPoint}`, {
      params: data
    })
  }

  getRestrictForm = () => {
    return this.get(`${restrictform}`)
  }
  getWorkFlowById = (id: any) => {
    return this.get(
      `${workflowbyId}?id=${id}`
    )
  }

}

export const TicketTypeService = new TicketType();