module.exports = {
    ENV: {
        IS_PROD: false,
        IS_UAT: false,
    },
    API: {
        BASEURI: "https://apifactory.cloud4c.com",
       
        LOGIN: {
            ACTION: "deserialize_token",
            AUTH_KEY: "ot{|+lk{i32-L#NS",
            ACCESS_TOKEN: "",
            IS_GET: false
        },
        OPEN_TICKETS: {
            ACTION: "tickets_by_staffid",
            AUTH_KEY: "*Yal#45KUB+4sirL",
            IS_GET: true
        },
        SLA_BREACHES: {
            ACTION: "sla_breach_by_staffid",
            AUTH_KEY: "i_1t?J[=priv+Y$s",
            IS_GET: true
        },
        CLOSED_TICKETS: {
            ACTION: "closed_tickets_by_staffid",
            AUTH_KEY: "E5xHP~(p+;ltR^A>",
            IS_GET: true
        },
        UN_ASSIGNED_TICKETS: {
            ACTION: "open_unassigned_tickets_by_date",
            AUTH_KEY: "5ZKD!$kdc$#2HTBi",
            IS_GET: true
        },
        TICKET_TYPES: {
            ACTION: "type_of_tickets",
            AUTH_KEY: "&OBYGq^p5zj9$|y5",
            IS_GET: true
        },
        MY_TICKETS: {
            ACTION: "tickets_by_ownerid",
            AUTH_KEY: ">93$}cgYMyW8M~,=",
            IS_GET: true
        },
        PEND_CUSTOMER: {
            ACTION: "get_customer_list",
            AUTH_KEY: "V)}5_]X**)tX%K9n",
            IS_GET: true  
         },    
        OPEN_TICKETS_BY_DATE: {
            ACTION: "open_tickets_by_date",
            AUTH_KEY: "gc?awvM4&{5ou:Nb",
            IS_GET: true
        },
        UN_ASSIGNED_TICKETS: {
            ACTION: "open_unassigned_tickets_by_date",
            AUTH_KEY: "5ZKD!$kdc$#2HTBi",
            IS_GET: true
        },
        CREATE_TICKET: {
            ACTION: "freshservice_to_myshift_ticket_creation",
            AUTH_KEY: "*Yil-f~#%^h[$#46",
            IS_GET: false
        },
        DEPTS: { 
            ACTION: "get_departments",
            AUTH_KEY: ".u($$j2A-!WK)q}?",
            IS_GET: true
        },
        USER_DETAILS: {
            ACTION: "get_user_details_by_staffid",
            AUTH_KEY: "?%qPnitUK-9jz@dq",
            IS_GET: true
        },
        DEPTS_MYSHIFT: {
            ACTION: "get_departments_myshift",
            AUTH_KEY: "W9!$5OOfKjvhpiiw",
            IS_GET: true
        },
        PRIORITY_LIST: { 
            ACTION: "getpriorities", 
            AUTH_KEY: "wlx#3NZNh#FDEs(G", 
            IS_GET: true 
        },
        SEARCH_BY_TICKET: {
            ACTION: "fetchdata",
            AUTH_KEY: "e10adc3949ba59abbe56e057f20f883e",
            IS_GET: true
        },
        ERROR_CODES: {
            401: "We are unable to proceed due to API not responding",
            200: "",
            404: "We are unable to proceed due to API not responding"
        },
        AUDITLOGS_BY_ID:{
            ACTION:"auditlogs_by_id",
            AUTH_KEY:"c+<12C:e9Qc5#THV",
            IS_GET:true
        }

    },
    NFS: {
        CONF: {
        host: '10.10.121.57',
        port: '2232',
        username: 'adm.nuthanj',
        password: "Welcome@12345$#$"
      },
      DIR: '/nfs/Automation/app-modernization/defaault-tenant'
    }

}
