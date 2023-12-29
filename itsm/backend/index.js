var express = require("express");
var cors = require("cors");
const http = require('http');
const socketIO = require('socket.io');
const axios = require("axios");
const config = require("./config/config");
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const getTypeTitleCounts = require('./TicketType');
const nService = require('./nfs/nfsService');
const NFSService = new nService();
require("dotenv").config();
var app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});
const { notification, formData } = require('./notification');
const OPEN_TCKTS_URL =
  "https://apifactory.cloud4c.com/list/myshift_app/type_of_tickets";
var allowlist = ["https://itsm.cloud4c.com", "http://localhost:3000"];
app.options("*", cors());
app.use(express.urlencoded());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
process.on("unhandledRejection", (error) => {
  console.error("unhandledRejection", error);
});
const postURLPart = "create/myshift_app",
  getURLPart = "list/myshift_app";
const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

io.on('connection', (socket) => {
  let socketNotification = notification;
  // Send the initial count to the client
  socket.emit('notificationCount', socketNotification.length);

  // Send the initial notifications to the client
  socket.emit('notifications', socketNotification);

  // Send mark read value notification to the client
  socket.emit("markNotifications", notification);

  // Listen for 'markAsRead' event from the client
  socket.on('markNotification', (data) => {
    if (data.type === 'single') {
      const { notificationId } = data;
      socketNotification = socketNotification.filter(
        (notification) => notification.id !== notificationId
      );
      notification.forEach((notification) => {
        if (notification.id === notificationId) {
          notification.read = true;
        }
      });
    } else if (data.type === 'all') {
      socketNotification = [];
      notification.forEach((notification) => {
        notification.read = true;
      });
    }

    io.emit('notificationCount', socketNotification.length);
    io.emit('notifications', socketNotification);
    io.emit('markNotifications', notification);
  });
});

const getTickets = async (url = "", header = "") => {
  console.log(url, header);
  try {
    return await axios.get(url, {
      headers: header,
    });
  } catch (error) {
    console.error(error);
  }
};
const post = async (url = "", data = {}, header = {}) => {
  try {
    return await axios.post(url, data, {
      headers: header,
    });
  } catch (error) {
    console.error(error);
  }
};
app.use((req, res, next) => {
  console.log(`Entered into the server :: `);
  next();
});
app.get("/openTickets", cors(), async (req, res, next) => {
  const headers = {
    "Content-Type": "application/json; charset=UTF-8",
    auth_key: "&OBYGq^p5zj9$|y5",
  };
  const tickets = await getTickets(OPEN_TCKTS_URL, headers);
  let activeTickets = [];
  if (tickets?.data?.list.length) {
    let lists = tickets.data.list;
    activeTickets = lists.filter((list) => list.record_status === "1");
    // record_status
  }
  res.json({
    msg: "This is CORS-enabled for an allowed domain.",
    data: activeTickets,
  });
});
app.get("/allTickets", cors(), async (req, res, next) => {
  // console.log(req)
  if (req.header("auth_key")) {
    const auth_key = req.header("auth_key");
    const headers = {
      "Content-Type": "application/json; charset=UTF-8",
      auth_key: auth_key,
    };
    if (req.query) {
      const queryString = req.query;
      const typeOfIncident = queryString.typeOfIncident;
      const action = queryString.action;
      let url = "";
      url = `${config.API.BASEURI}/${getURLPart}/${action}?${
        typeOfIncident === "Closed" ? "ownerid" : "staffid"
      }=${req.query.id}`;
      console.log(url);
      const tickets = await getTickets(url, headers);
      let result = tickets.data ? tickets.data : [];
      // console.log(result)
      res.json({
        msg: "This is CORS-enabled for an allowed domain.",
        data: result,
      });
    }
  }
});

app.get("/allTicketDetails", cors(), async (req, res, next) => {
  if (req.query) {
    const queryString = req.query;
    const API = config.API;
    const headers = {
      "Content-Type": "application/json; charset=UTF-8",
      auth_key: "",
    };
    const listOfTickets = [
      {
        type: "Open",
        key: API.OPEN_TICKETS.AUTH_KEY,
        action: API.OPEN_TICKETS.ACTION,
      },
      {
        type: "Closed",
        key: API.CLOSED_TICKETS.AUTH_KEY,
        action: API.CLOSED_TICKETS.ACTION,
      },
      {
        type: "SLA",
        key: API.SLA_BREACHES.AUTH_KEY,
        action: API.SLA_BREACHES.ACTION,
      },
    ];
    const API_BASE_URL = config.API.BASEURI;
    let sid = req.query.id;
    let url = "";
    let result = [],
      allOpenTickets = [];
    let index = [0];
    const p1Ids = [];
    const p2Ids = [];
    const p3Ids = [];
    const header = {
      "Content-Type": "application/json; charset=UTF-8",
      auth_key: API.PRIORITY_LIST.AUTH_KEY,
    };
    let priorityurl = "";
    priorityurl = `${API_BASE_URL}/list/myshift_app/${API.PRIORITY_LIST.ACTION}`;
    const getpriorities = await getTickets(priorityurl, header);
    // console.log("list", getpriorities.data);
    if (getpriorities?.data?.list) {
      const filteredData = getpriorities.data.list.filter((item) => {
        if (item.prioritytitle === "P1 Critical") {
          p1Ids.push(item);
          // console.log("p1", p1Ids)
          return false;
        } else if (item.prioritytitle === "P2 High") {
          p2Ids.push(item);
          return false;
        } else if (item.prioritytitle === "P3 Normal") {
          p3Ids.push(item);
          return false;
        }
      });
    }
    let p1 = [];
    let p2 = [];
    let p3 = [];

    for (let ticket of listOfTickets) {
      headers.auth_key = ticket.key;
      sid = req.query.id;
      url = `${API_BASE_URL}/${getURLPart}/${ticket.action}?${
        ticket.type === "Closed" ? "ownerid" : "staffid"
      }=${sid}`;
      const tickets = await getTickets(url, headers);
      console.log(`url:; ${url}, index :: ${index}`);
      if (tickets.data && tickets.data.list) {
        const list = tickets.data.list;
        if (ticket.type == "Open") {
          allOpenTickets = tickets.data.list;
          p1 = list.filter((item) => {
            return p1Ids.some((priorityItem) => {
              return priorityItem.priorityid.toString() === item.priorityid;
            });
          });
          p2 = list.filter((item) => {
            return p2Ids.some((priorityItem) => {
              return priorityItem.priorityid.toString() === item.priorityid;
            });
          });
          p3 = list.filter((item) => {
            return p3Ids.some((priorityItem) => {
              return priorityItem.priorityid.toString() === item.priorityid;
            });
          });
          result.push({
            title:
              ticket.type == "SLA" ? `${ticket.type} Breaches` : ticket.type,
            p1: p1,
            p2: p2,
            p3: p3,
          });
        } else if (ticket.type == "SLA") {
          p1 = [];
          p2 = [];
          p3 = [];
          p1 = list.filter((item) => {
            return p1Ids.some((priorityItem) => {
              return priorityItem.priorityid.toString() === item.priorityid;
            });
          });
          p2 = list.filter((item) => {
            return p2Ids.some((priorityItem) => {
              return priorityItem.priorityid.toString() === item.priorityid;
            });
          });
          p3 = list.filter((item) => {
            return p3Ids.some((priorityItem) => {
              return priorityItem.priorityid.toString() === item.priorityid;
            });
          });
          result.push({
            title: `${ticket.type} Breaches`,
            p1: p1,
            p2: p2,
            p3: p3,
          });
        }
      } else {
        result.push({
          title: ticket.type == "SLA" ? `${ticket.type} Breaches` : ticket.type,
          p1: [],
          p2: [],
          p3: [],
        });
      }
      index++;
    }
    res.json({
      msg: "This is CORS-enabled for an allowed domain.",
      data: result,
      openTickets: allOpenTickets,
    });
  }
});

app.get("/mytickets", cors(), async (req, res, next) => {
  if (req.query) {
    const queryString = req.query;
    const API = config.API;
    const headers = {
      "Content-Type": "application/json; charset=UTF-8",
      auth_key: API.OPEN_TICKETS.AUTH_KEY,
    };
    const API_BASE_URL = config.API.BASEURI;
    let sid = req.query.id;
    let url = "";
    let index = 0;
    url = `${API_BASE_URL}/list/myshift_app/${API.OPEN_TICKETS.ACTION}?staffid=${sid}`;
    const tickets = await getTickets(url, headers);
    const typeTitleCounts = getTypeTitleCounts(tickets.data.list);
    res.json({
      msg: "This is CORS-enabled for an allowed domain.",
      data: tickets.data,
      typeTitleCounts: typeTitleCounts,
    });
  }
});

app.get("/closetickets", cors(), async (req, res, next) => {
  try {
    if (req.query) {
      const queryString = req.query;
      console.log(queryString, "querystring");
      const API = config.API;
      const headers = {
        "Content-Type": "application/json; charset=UTF-8",
        auth_key: API.CLOSED_TICKETS.AUTH_KEY,
      };
      const API_BASE_URL = config.API.BASEURI;
      let id = req.query.ownerid;
      // console.log(id, "id")
      let url = "";
      let index = 0;
      url = `${API_BASE_URL}/list/myshift_app/${API.CLOSED_TICKETS.ACTION}?ownerid=${id}`;
      const tickets = await getTickets(url, headers);
      // console.log(`tickets`, tickets.data);
      const typeTitleCounts = getTypeTitleCounts(tickets.data.list);
      res.json({
        msg: "This is CORS-enabled for an allowed domain.",
        data: tickets.data,
        typeTitleCounts: typeTitleCounts,
      });

      // res.status(400).sendStatus(401)
    }
  } catch (error) {
    res.json({ data: { errmsg: "Request failed with status code 401" } });
  }
});

app.get("/openticketsbyDate", cors(), async (req, res, next) => {
  const API_BASE_URL = config.API.BASEURI;
  const API = config.API;
  const headers = {
    "Content-Type": "application/json; charset=UTF-8",
    auth_key: API.OPEN_TICKETS_BY_DATE.AUTH_KEY,
  };
  const { limit, offset, start_date, end_date } = req.query;
  const url = `${API_BASE_URL}/list/myshift_app/${API.OPEN_TICKETS_BY_DATE.ACTION}?limit=${limit}&offset=${offset}&start_date=${start_date}&end_date=${end_date}`;
  //  console.log("url",url)
  try {
    const response = await axios.get(url, { headers });
    const typeTitleCounts = getTypeTitleCounts(response.data.list);
    res.json({ data: response.data, typeTitleCounts: typeTitleCounts });
  } catch (error) {
    next(error);
  }
});
app.get("/unAssignedTickets", cors(), async (req, res, next) => {
  const API_BASE_URL = config.API.BASEURI;
  const API = config.API;
  const headers = {
    "Content-Type": "application/json; charset=UTF-8",
    auth_key: API.UN_ASSIGNED_TICKETS.AUTH_KEY,
  };
  const { limit, offset } = req.query;
  const url = `${API_BASE_URL}/list/myshift_app/${API.UN_ASSIGNED_TICKETS.ACTION}?limit=${limit}&offset=${offset}`;
  //  console.log("url",url)
  try {
    const response = await axios.get(url, { headers });
    const typeTitleCounts = getTypeTitleCounts(response.data.list);
    res.json({ data: response.data, typeTitleCounts: typeTitleCounts });
  } catch (error) {
    next(error);
  }
});
app.get("/authorizeToken", cors(), async (req, res, next) => {
  try {
    console.log(
      `authenticate service triggerred :: ${JSON.stringify(req.query)}`,
      req.params
    );
    const queryString = req.query;
    const API = config.API;
    let headers = {
      "Content-Type": "application/json; charset=UTF-8",
      auth_key: API.LOGIN.AUTH_KEY,
      Authorization: queryString.token,
    };
    const API_BASE_URL = config.API.BASEURI;
    let url = "";
    url = `${API_BASE_URL}/${postURLPart}/${API.LOGIN.ACTION}`;
    console.log(url, headers);
    if (queryString.token != "") {
      const userDetails = await post(url, {}, headers);
      // console.log(`userDetails `, userDetails.data);
      let mod_userDetails = { isAdmin: false };
      if (userDetails.data) {
        mod_userDetails = { ...userDetails.data.user };
        url = `${API_BASE_URL}/${getURLPart}/${API.USER_DETAILS.ACTION}?staffid=${userDetails.data?.user?.staffid}`;
        headers = {
          "Content-Type": "application/json; charset=UTF-8",
          auth_key: API.USER_DETAILS.AUTH_KEY,
        };
        console.log(url, headers);
        //to fetch the admin details
        const user_details_staff = await getTickets(url, headers);
        const u_data = user_details_staff?.data?.list[0];
        // console.log(u_data.isadmin);       
        
        // console.log(`mod_userDetails: :`,JSON.stringify(mod_userDetails));
        // mod_userDetails.isAdmin = user_details_staff?.list[0]?.isadmin;
        try{
          // NFSService.main().then(r => {
          //     console.log('NFS connection ended.');  
                          
          // });
          console.log(`files ::: `);
          let tenantD = await NFSService.getTenantData();
          // NFSService.getTenantData().then(data => {
          //   console.log(`data :: `, JSON.stringify(data));
          // });
          mod_userDetails = { ...mod_userDetails, isAdmin: u_data.isadmin, t_data: tenantD }
        } catch (err) {
          console.error(err);
        }
        
      }
      console.log(`before sending to response ::: `);
      res.json({
        msg: "This is CORS-enabled for an allowed domain.",
        data: mod_userDetails || {},
      });
    } else {
      res.json({ data: { errmsg: "Request failed with status code 401" } });
    }
  } catch (err) {
    res.json({ errorMessage: { errmsg: "Token is invalid" } });
  }
});

app.get("/searchbyticket", cors(), async (req, res, next) => {
  try {
    const auth_key = req.query.key;
    const API = config.API;
    const query = req.query;
    const rfcno = query?.rfcno;
    const headers = {
      "Content-Type": "application/json; charset=UTF-8",
      "auth-key": "e10adc3949ba59abbe56e057f20f883e",
    };
    const API_BASE_URL = config.API.BASEURI;

    let url = "";
    url = `https://api.ctrls.in/index.php/keol_api/ticket_tatcalculation_kfin/${API.SEARCH_BY_TICKET.ACTION}?rfcno=${rfcno}`;

    const searchbyticket = await getTickets(url, headers);
    res.json({
      msg: "This is CORS-enabled for an allowed domain.",
      data: searchbyticket.data.data || {},
    });
    // res.status(400).sendStatus(412)
  } catch (err) {
    console.log(err);
  }
});
app.get("/getdepartmentwise", cors(), async (req, res, next) => {
  try {
    // console.log(req)
    console.log("triggered", req.query.key);
    const auth_key = req.query.key;
    const API = config.API;
    const headers = {
      "Content-Type": "application/json; charset=UTF-8",
      auth_key: API.DEPTS_MYSHIFT.AUTH_KEY,
    };
    const API_BASE_URL = config.API.BASEURI;
    let url = "";
    url = `${API_BASE_URL}/${getURLPart}/${API.DEPTS_MYSHIFT.ACTION}`;
    console.log("dept", url);
    const dept_wise_open_tickets = await getTickets(url, headers);
    // console.log("val", dept_wise_open_tickets.data);
    res.json({
      msg: "This is CORS-enabled for an allowed domain.",
      data: dept_wise_open_tickets.data || {},
    });
    // res.status(400).sendStatus(412)
  } catch (err) {
    console.log(err);
  }
});
app.get("/createTicket", cors(), async (req, res, next) => {
  try {
    console.log(`createTicket service triggerred :: `);
    const reqBody = req.query || {};
    const API = config.API;
    const headers = {
      "Content-Type": "application/json; charset=UTF-8",
      auth_key: API.CREATE_TICKET.AUTH_KEY,
    };
    const API_BASE_URL = config.API.BASEURI;
    let url = "";
    url = `${API_BASE_URL}/${getURLPart}/${API.CREATE_TICKET.ACTION}`;
    console.log(url, headers);
    if (Object.keys(reqBody)) {
      // res.json({msg:"success", data: []})
      const result = await post(url, reqBody, headers);
      res.json({
        msg: "This is CORS-enabled for an allowed domain.",
        data: result.data || {},
      });
    } else {
      res.json({ data: { errmsg: "Request failed with status code 401" } });
      // res.json({msg:"success", data: req})
    }
  } catch (err) {}
});
app.get("/getcustomerlist", cors(), async (req, res, next) => {
  try {
    // console.log(req)
    console.log("triggered", req.query.key);
    const auth_key = req.query.key;
    const API = config.API;
    const headers = {
      "Content-Type": "application/json; charset=UTF-8",
      auth_key: API.PEND_CUSTOMER.AUTH_KEY,
    };
    const API_BASE_URL = config.API.BASEURI;
    let url = `${API_BASE_URL}/list/icp/${API.PEND_CUSTOMER.ACTION}`;
    // check if query parameter 'customer_name' and 'search' is present and search length is at least 3
    if (req.query.customer_name && req.query.search && req.query.search >= 3) {
      url = `${API_BASE_URL}/list/icp/${API.PEND_CUSTOMER.ACTION}?customer_name=${req.query.customer_name}&search=${req.query.search}`;
    } else {
      url = `${API_BASE_URL}/list/icp/${API.PEND_CUSTOMER.ACTION}`;
    }
    console.log("customerlist", url);
    const get_customer_list = await getTickets(url, headers);
    // console.log("val", get_customer_list.data);
    res.json({
      msg: "This is CORS-enabled for an allowed domain.",
      data: get_customer_list.data || {},
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/tickets_by_staffid", cors(), async (req, res, next) => {
  try {
    // console.log(req)    console.log("opentickets", req.query);
    const query = req.query;
    const sId = query?.staffid;
    const API = config.API;
    const headers = {
      "Content-Type": "application/json; charset=UTF-8",
      auth_key: API.OPEN_TICKETS.AUTH_KEY,
    };
    const API_BASE_URL = config.API.BASEURI;
    let url = "";
    url = `${API_BASE_URL}/list/myshift_app/${API.OPEN_TICKETS.ACTION}?staffid=${sId}`;
    const tickets_by_staffid = await getTickets(url, headers);
    console.log("open", tickets_by_staffid.data);
    res.json({
      msg: "This is CORS-enabled for an allowed domain.",
      data: tickets_by_staffid.data || {},
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/getCustomerList", cors(), async (req, res, next) => {
  try {
    // console.log(req)
    console.log("triggered", req.query.key);
    const auth_key = req.query.key;
    const API = config.API;
    const headers = {
      "Content-Type": "application/json; charset=UTF-8",
      auth_key: API.PEND_CUSTOMER.AUTH_KEY,
    };
    const API_BASE_URL = config.API.BASEURI;
    let url = `${API_BASE_URL}/list/myshift_app/${API.PEND_CUSTOMER.ACTION}`;

    // check if query parameter 'customer_name' and 'search' is present and search length is at least 3
    if (req.query.customer_name && req.query.search && req.query.search >= 3) {
      url = `${API_BASE_URL}/list/myshift_app/${API.PEND_CUSTOMER.ACTION}?customer_name=${req.query.customer_name}&search=${req.query.search}`;
    } else {
      url = `${API_BASE_URL}/list/myshift_app/${API.PEND_CUSTOMER.ACTION}`;
    }

    console.log("customerlist", url);
    const getCustomerList = await getTickets(url, headers);
    // console.log("val", getCustomerList.data);
    res.json({
      msg: "This is CORS-enabled for an allowed domain.",
      data: getCustomerList.data || {},
    });
  } catch (err) {
    console.log(err);
  }
});

// app.get("/tickets_by_staffid", cors(), async (req, res, next) => {
//   try {
//     // console.log(req)
//     console.log("opentickets", req.query);
//     const auth_key = req.query;
//     const API = config.API;
//     const headers = {
//       "Content-Type": "application/json; charset=UTF-8",
//       auth_key: API.OPEN_TICKETS.AUTH_KEY,
//     };
//     const API_BASE_URL = config.API.BASEURI;
//     let url = "";
//      url = `${API_BASE_URL}/list/myshift_app/${API.OPEN_TICKETS.ACTION}?staffid=${req.query.staffid}`;
//     const tickets_by_staffid = await getTickets(url, headers);
//     console.log("open", tickets_by_staffid.data);
//     res.json({
//       msg: "This is CORS-enabled for an allowed domain.",
//       data: tickets_by_staffid.data || {},
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });
app.get("/tickets_by_staffid", cors(), async (req, res, next) => {
  try {
    // console.log(req)
    console.log("opentickets", req.query);
    const auth_key = req.query;
    const API = config.API;
    const headers = {
      "Content-Type": "application/json; charset=UTF-8",
      auth_key: API.OPEN_TICKETS.AUTH_KEY,
    };
    const API_BASE_URL = config.API.BASEURI;
    let url = "";
    url = `${API_BASE_URL}/list/myshift_app/${API.OPEN_TICKETS.ACTION}?staffid=${req.query.staffid}`;
    const tickets_by_staffid = await getTickets(url, headers);
    // console.log("open", tickets_by_staffid.data);
    res.json({
      msg: "This is CORS-enabled for an allowed domain.",
      data: tickets_by_staffid.data || {},
    });
  } catch (err) {
    console.log(err);
  }
});

//File API for ticket creation//

const storage = multer.diskStorage({
  destination: "./upload/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
});
app.post("/upload", cors(), upload.single("files"), function (req, res) {
  const file = req.files;
  const metadata = req.body.metadata;
  res.status(200).send("Files uploaded successfully!");
});

app.get("/ticketsByStaffid", cors(), async (req, res, next) => {
  try {
    // console.log(req)
    console.log("opentickets", req.query);
    const auth_key = req.query;
    const API = config.API;
    const headers = {
      "Content-Type": "application/json; charset=UTF-8",
      auth_key: API.OPEN_TICKETS.AUTH_KEY,
    };
    const API_BASE_URL = config.API.BASEURI;
    let url = "";
    url = `${API_BASE_URL}/list/myshift_app/${API.OPEN_TICKETS.ACTION}?staffid=${req.query.staffid}`;
    const ticketsByStaffid = await getTickets(url, headers);
    // console.log("open", ticketsByStaffid.data);
    res.json({
      msg: "This is CORS-enabled for an allowed domain.",
      data: ticketsByStaffid.data || {},
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/getpriorities", cors(), async (req, res, next) => {
  try {
    console.log("getpriorities", req.query);
    const query = req.query;
    const index = query?.ticket_typeid;
    const API = config.API;
    const headers = {
      "Content-Type": "application/json; charset=UTF-8",
      auth_key: API.PRIORITY_LIST.AUTH_KEY,
    };
    const API_BASE_URL = config.API.BASEURI;
    let url = "";
    url = `${API_BASE_URL}/list/myshift_app/${API.PRIORITY_LIST.ACTION}?ticket_typeid=${index}`;
    const getpriorities = await getTickets(url, headers);
    // console.log("list", getpriorities.data);
    res.json({
      msg: "This is CORS-enabled for an allowed domain.",
      data: getpriorities.data || {},
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/auditlogs_by_id", cors(), async (req, res, next) => {
  try {
    console.log("auditlogs", req.query);
    const auth_key = req.query;
    const API = config.API;

    const headers = {
      "Content-Type": "application/json; charset=UTF-8",
      auth_key: API.AUDITLOGS_BY_ID.AUTH_KEY,
    };
    const API_BASE_URL = config.API.BASEURI;
    let url = "";
    console.log(req.query);
    url = `${API_BASE_URL}/list/myshift_app/${API.AUDITLOGS_BY_ID.ACTION}?ticketid=${req.query.ticketid}`;
    const auditlogsbyid = await getTickets(url, headers);
    // console.log("audit", auditlogsbyid.data);
    res.json({
      msg: "This is CORS-enabled for an allowed domain.",
      data: auditlogsbyid.data || {},
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/restrictform", cors(), async (req, res) => {
  res.json(formData);
})

app.get("/getWorkFlowByIdn", cors(), async (req, res) => {
  const headers = {
    "Content-Type": "application/json; charset=UTF-8",    
  };
  console.log(req.query);
  const API_BASE_URL = `https://itsmworkflow.cloud4c.com/workflow/getWorkFlowByID?id=${req.query.id}`;
  let url = API_BASE_URL;
  
  // url = `${API_BASE_URL}/list/myshift_app/${API.AUDITLOGS_BY_ID.ACTION}?ticketid=${req.query.ticketid}`;
  const data = await getTickets(url, headers);

  // console.log("audit", auditlogsbyid.data);
  res.json({
    msg: "This is CORS-enabled for an allowed domain."
    
  });
});
server.listen(process.env.PORT, function () {
  console.log(`CORS-enabled web server listening on port ${process.env.PORT}`);
});
