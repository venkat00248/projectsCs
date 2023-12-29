/**
 * @description imports will declare here...
 */
import HttpApiService from "./HttpApiService";
import { config } from "../config/config";


//define the constants here...
const API_BASE = `${config.API.BASEURI}`;
const API = config.API;
let TICKET_ENDPOINT = config.ENV.IS_PROD ||
    config.ENV.IS_UAT ? `${API_BASE}/${API.TICKET_TYPES.IS_GET ? 'list' : 'create'}/myshift_app/` :
    `${config.ENV.API_URL}/`;
/**
 * @description creates Ticket Type class and extends the HTTP interceptor class...
 */
 
export class DashboardStatService extends HttpApiService {
    constructor() {
        super(`${API_BASE}`);
    }

    /**
     * @description method to fetch data by ticket status...
     * @param id 
     * @param typeOfTic 
     */
    getTicketsDataByStaffId = (id: number, typeOfTic: string = "") => {
        try {
            console.log(`getTicketsDataByStaffId :: typeOfTic :: ${typeOfTic}, id :: ${id}`);
            let configuration = (typeOfTic === "SLA") ? { config: { auth_key: API.SLA_BREACHES.AUTH_KEY }, endPoint: API.SLA_BREACHES.ACTION } :
                (typeOfTic === "Open" ? ({ config: { auth_key: API.OPEN_TICKETS.AUTH_KEY }, endPoint: API.OPEN_TICKETS.ACTION }) :
                    (typeOfTic === "Closed" ? ({ config: { auth_key: API.CLOSED_TICKETS.AUTH_KEY }, endPoint: API.CLOSED_TICKETS.ACTION }) :
                        (typeOfTic === "pCustomer" ? ({ config: { auth_key: API.PEND_CUSTOMER.AUTH_KEY }, endPoint: API.PEND_CUSTOMER.ACTION }) :
                            { config: { auth_key: API.SLA_BREACHES.AUTH_KEY }, endPoint: API.SLA_BREACHES.ACTION })));
            // configuration.endPoint = `${configuration.endPoint} ? typeOfIncident = typeOfTic & staffid = ${id}`

            configuration.endPoint = config.ENV.IS_PROD ||
                config.ENV.IS_UAT ? `${API_BASE}/${API.TICKET_TYPES.IS_GET ? 'list' : 'post'}/myshift_app/${configuration.endPoint} ? typeOfIncident = typeOfTic & staffid = ${id}` :
                `${config.ENV.API_URL}/allTickets?typeOfIncident=${typeOfTic}&id=${id}&action=${configuration.endPoint}`;

                console.log(`configuration :: `, configuration);

              const header =  {
                    headers: {auth_key: configuration.config.auth_key}                    
                  }
            return this.get(configuration.endPoint);

        } catch (err) {
             throw err;
            
        }
    }

    getAllTicketsStats = (id: number) => {
        // const configuration: any = config.ENV.IS_PROD ||
        // config.ENV.IS_UAT ? `${API_BASE}/${API.TICKET_TYPES.IS_GET ? 'list' : 'post'}/myshift_app/${configuration.endPoint} ? typeOfIncident = typeOfTic & staffid = ${id}` :
        // `http://localhost:4000/allTickets?typeOfIncident=${typeOfTic}&id=${id}&action=${configuration.endPoint}`;

        const ALL_ENDPOINTS = `${config.ENV.API_URL}/allTicketDetails?id=${id}`;
        return this.get(ALL_ENDPOINTS);
    }

    getTicketsDataByOwnerId = (id: number) => {
        try{
            const ALL_ENDPOINTS = `${TICKET_ENDPOINT}mytickets?id=${id}`;
            return this.get(ALL_ENDPOINTS);
        } catch (err) {
            throw err;
        }
    }
    /**
     * 
     * @param id 
     */
    getAllSLABreachesByStaffId = (id: number) => {
        try {
            TICKET_ENDPOINT += `${API.SLA_BREACHES.ACTION}`;
            this.get(TICKET_ENDPOINT, { auth_key: API.SLA_BREACHES.AUTH_KEY });
        } catch (err) {
            console.log("## EXCEPTION OCCURRED :: getAllSLABreachesByStaffId :: ", id);
            throw err;
        }
    }
    /**
     * 
     * @param id 
     */
    getAllOpenIncidentsByStaffId = (id: number) => {
        try {
            TICKET_ENDPOINT += `${API.OPEN_TICKETS.ACTION}`;
        } catch (err) {
            console.log("## EXCEPTION OCCURRED :: getAllOpenIncidentsByStaffId :: ", id);
            throw err;
        }
    }
    /**
     * 
     * @param id 
     */
    getAllClosedIncidentsByStaffId = (id: number) => {
        try {
            TICKET_ENDPOINT += `${API.CLOSED_TICKETS.ACTION}`;

        } catch (err) {
            console.log("## EXCEPTION OCCURRED :: getAllClosedIncidentsByStaffId :: ", id);
            throw err;
        }
    }
    /**
     * @description Get all tickets with count of incidents which status as 'Pending ON Customer'
     * @param id 
     */
    getAllPendCustomerIncidentsByStaffId = (id: number) => {
        try {
            TICKET_ENDPOINT += `${API.OPEN_TICKETS.ACTION}`;
        } catch (err) {
            console.log("## EXCEPTION OCCURRED :: getAllPendCustomerIncidentsByStaffId :: ", id);
            throw err;
        }
    }

}

export const DashboardStatsService = new DashboardStatService();

