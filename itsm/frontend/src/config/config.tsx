export const config = {
    "MYSHIFT_URL": `https://myshift.cloud4c.com/?token=`,
    "SHOP_URL": `https://shop.cloud4c.com`,
    "ENV": {
        "IS_PROD": false,
        "IS_UAT": false,
        "API_URL": `https://itsmgateway.cloud4c.com`, //node service available here...
        // "API_URL": `http://localhost:3289`, //node service available here...,
        "PROXY_API_URL": `https://itsmnbe.cloud4c.com` //node service available here...
    },
    "API": {
        "BASEURI": "https://apifactory.cloud4c.com",
        "LIMIT": 10000,
        "LOGIN": {
            "ACTION": "",
            "AUTH_KEY": "",
            "ACCESS_TOKEN": "",
            "IS_GET": true
        },
        "OPEN_TICKETS": {
            "ACTION": "ticketsByStaffid",
            "AUTH_KEY": "*Yal#45KUB+4sirL",
            "IS_GET": true
        },
        "SLA_BREACHES": {
            "ACTION": "sla_breach_by_staffid",
            "AUTH_KEY": "i_1t?J[=priv+Y$s",
            "IS_GET": true
        },
        "CLOSED_TICKETS": {
            "ACTION": "ticketsByStaffid",
            "AUTH_KEY": "E5xHP~(p+;ltR^A>",
            "IS_GET": true
        },
        "UN_ASSIGNED_TICKETS": {
            "ACTION": "unAssignedTickets",
            "AUTH_KEY": "5ZKD!$kdc$#2HTBi",
            "IS_GET": true,
            "LIMIT": 10
        },
        "TICKET_TYPES": {
            "ACTION": "type_of_tickets",
            "AUTH_KEY": "&OBYGq^p5zj9$|y5",
            "IS_GET": true
        },
        "PEND_CUSTOMER": {
            "ACTION": "getCustomerList",
            "AUTH_KEY": "V)}5_]X**)tX%K9n",
            "IS_GET": true
        },
        "CREATE_TICKET": {
            "ACTION": "freshservice_to_myshift_ticket_creation",
            "AUTH_KEY": "*Yil-f~#%^h[$#46",
            "IS_GET": false
        },
        "POST_A_WORKFLOW": {
            "ACTION": "postAWorkFlow",
            "AUTH_KEY": "*Yil-f~#%^h[$#46",
            "IS_GET": false
        },
        "OPEN_TICKETS_BY_DATE": {
            "ACTION": "get_all_open_tickets",
            "AUTH_KEY": "o35$ZBjHC2G_?3aQ",
            "IS_GET": true,
            "LIMIT": 10
        },
        "MY_TICKETS": {
            "ACTION": "tickets_by_ownerid",
            "AUTH_KEY": ">93$}cgYMyW8M~,=",
            "IS_GET": true
        },
        "DEPTS": {
            "ACTION": "get_departmentwise_opentickets_stat",
            "AUTH_KEY": "Qbie$J9O7F;Q+;_G",
            "IS_GET": true
        },
        "PRIORITY_LIST": {
            "ACTION": "get_priorities",
            "AUTH_KEY": "wlx#3NZNh#FDEs(G",
            "IS_GET": true
        },
        "AUDITLOGS_BY_ID": {
            "ACTION": "auditlogs_by_id",
            "AUTH_KEY": "c+<12C:e9Qc5#THV",
            "IS_GET": true

        },
        "RESTRICT_FORM": {
            "ACTION": "restrictform",
            "AUTH_KEY": "",
            "IS_GET": true
        },
        "WORKFLOW_BY_ID": {
            ACTION: "getWorkFlowByID",
            AUTH_KEY: "",
            IS_GET: true,
        },
        "ERROR_CODES": {
            "400": "Client sent an Invalid request, such as lacking required request body or parameter",
            "401": "Client failed to authenticate with the server",
            "404": "The requested resource does not exist",
            "403": "Client authenticated but does not have permission to access the requested resource",
            "412": "one or more conditions in the request header fields evaluated to false",
            "500": "A generic error occured on server",
            "503": "The requested service is not available",
            "0": "The requested service is not available",
            "default": "Network error or unable to access the network"
        }

    },
    "TICKET_SHORT_FORM": {
        "Incident": "INC",
        "Service Request": "SR",
        "Alert": "AL",
        "Others": "OTH",
        "Reboot Request": "RR",
        "New Implementation": "NI",
        "Problem": "PRB",
        "Change Request": "CR",
        "Problem Management": "PM",
        "Incident Management": "IM",
        "Task": "TSK",
        "TSK": "TSK",
        "Security Request": "SR",
        "SOC-Incident": "SINC",
        "SOC-Alert": "SAL",
        "SOPTSK": "STSK",
        "CMDBTSK": "CTSK",
        "SAPEWA": "SEWA",
        "SAPCWF": "SCWF",
        "SAPRCA": "SRCA",
        "SAPCSM": "SCSM",
        "De-escalation": "DE",
        "SIP": "SIP",
        "Solman-Alert": "SLM",
        "RPA": "RPA",
        "Missed Call": "MC",
        "SOC-Task": "STSK",
        "Email_Ticketing": "ET",
        "SAPHCR": "SHCR",
        "Service Request - OTH": "SR",
        "EMS": "EMS",
        "EMS - OTH": "EMS",
        "Project": "PROJ",
        "ELK": "ELK",
        "Test123": "T123",
        "TestKalpana": "TK",
        "AddOn Request": "AOR",
        "CHG": "CHG",
        "DTSHCR": "DHCR",
        "CCM": "CCM",
        "G2G": "G2G",
        "MCC": "MCC",
        "SA": "SA",
        "ADD": "ADD",
        "SDD": "SDD",
        "VAS": "VAS",
        "CDCSIP": "CDC",
        "TI": "TI",
        "GI": "GI",
        "CYD": "CYD",
        "SOCACC": "SACC",
        "SSRA": "SSRA",
        "RF": "RF",
        "PartnerSupport": "PS"
    },
    "PRIORITY_MANAGEMENT" : {
        "Formfield": [
            {
              "label": "Priority ID",
              "name": "priorityId",
              "type": "number",
              "placeholder": "Enter priority id",
              "required": true,
              "tooltips": "Priorities are listed according to their id, smallest to largest",
              "errorMessage": {
                "001": "Priority ID is required",
              }
            },
            {
              "label": "Priority Title",
              "name": "priority",
              "type": "text",
              "maxLength": 10,
              "minLength": 2,
              "placeholder": "Enter Priority title",
              "required": true,
              "tooltips": "For example, add a priority title  like High or Level 1",
              "errorMessage": {
                "001": "Priority title is required",
                "002": "Length must be 2 to 10 characters",
                "003": "Special character are not allowed"
              }
            },
            {
              "label": "Foreground Color",
              "name": "foregroundColor",
              "type": "text",
              "errorMessage": {
                "001": "Foreground Color is required",
              }
            },
            {
              "label": "Background Color",
              "name": "backgroundColor",
              "type": "text",
              "errorMessage": {
                "001": "Background Color is required",
              }
            },
          ]
    },
    "API_ERROR_MSG": {
        "https://itsmgateway.cloud4c.com/authorizeToken": "Authorization service down please try after some time",
        "https://itsmgateway.cloud4c.com/openticketsbyDate": "Open ticket by date service down please try after some time",
        "https://itsmgateway.cloud4c.com/getdepartmentwise": "Get department wise service down please try after some time",
        "https://itsmgateway.cloud4c.com/unAssignedTickets": "Unassigned tickets service down please try after some time",
        "https://itsmgateway.cloud4c.com/allTicketDetails": "All ticket details serivce down please try after some time",
        "https://itsmgateway.cloud4c.com/mytickets": "My tickets service down please try after some time",
        "https://itsmgateway.cloud4c.com/getCustomerList": "Get customer list service down please try after some time",
        "https://itsmticket.cloud4c.com/ticket/getMappedWorkflow": "Get mapped workflow service down please try after some time",
        "https://itsmgateway.cloud4c.com/ticketsByStaffid": "Tickets by staff id service down please try after some time",
        "https://itsmgateway.cloud4c.com/searchbyticket": "Search by id service down please try after some time",
        "https://itsmgateway.cloud4c.com/auditlogs_by_id": "Audit logs by id service down please try after some time",
        "https://itsmgateway.cloud4c.com/closetickets": "Close tickets service down please try after some time",
        "https://itsmgateway.cloud4c.com/restrictform": "Restrict form service down please try after some time",
        "https://itsmticket.cloud4c.com/ticket/getAllTickets": "Get all tickets service down please try after some time",
        "https://itsmworkflow.cloud4c.com/workflow/published/map-workflow": "Map workflow service down please try after some time",
        "https://itsmticket.cloud4c.com/ticket/createTicket": "Create ticket service down please try after some time",
        "https://itsmworkflow.cloud4c.com/actions/unpublished/create": "Create workflow service down please try after some time",
        "https://itsmworkflow.cloud4c.com/nodes/unpublished/update-task": "Workflow update task service down please try after some time",
        "https://itsmworkflow.cloud4c.com/nodes/unpublished/delete-task": "Workflow delete task service down please try after some time",
        "https://itsmworkflow.cloud4c.com/workflow/unpublished/save": "Workflow save task service down please try after some time",
        "https://itsmworkflow.cloud4c.com/workflow/unpublished/delete": "Workflow delete service down please try after some time",
        "https://itsmworkflow.cloud4c.com/nodes/unpublished/add-task": "Workflow Add task service down please try after some time",
        "https://itsmworkflow.cloud4c.com/workflow/unpublished/create": "Create workflow service down please try after some time",
        "https://itsmticket.cloud4c.com/ticket/updateTicket": "Update ticket service down please try after some time",
        "https://itsmgateway.cloud4c.com/getWorkFlowByID": "Fetch one workflow service down please try after some time",
        "default": "Server down please try after some time"
    }

}

