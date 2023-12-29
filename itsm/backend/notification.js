let notification = [
    {
      id: 1,
      username: "Karteek Vemula",
      ticketID: "TSK101233792",
      ticketActivity: "24th May 2023 5:17 PM",
      ticketStatus: "Open",
      dateTime: "Just now",
      action: "Mark as read",
      read: false
    },
    {
      id: 2,
      username: "MaheshChandra",
      ticketID: "TSK101233834",
      ticketActivity: "02 Jan 2018 - 5:19 pm",
      ticketStatus: "Closed",
      dateTime: "6:12min",
      action: "Mark as read",
      read: false
    },
    {
      id: 3,
      username: "Venkat Prasad",
      ticketID: "TSK101234124",
      ticketActivity: "02 Jan 2018 - 5:19 pm",
      ticketStatus: "Open",
      dateTime: "2 mins ago",
      action: "Mark as read",
      read: false
    },
    {
      id: 4,
      username: "Mogal",
      ticketID: "TSK101234488",
      ticketActivity: "02 Jan 2018 - 5:19 pm",
      ticketStatus: "Open",
      dateTime: "20min",
      action: "Mark as read",
      read: false
    },
    {
      id: 5,
      username: "Rajeswari",
      ticketID: "SOCAL00169684",
      ticketActivity: "02 Jan 2018 - 5:19 pm",
      ticketStatus: "Pending on Customer",
      dateTime: "5:12min",
      action: "Mark as read",
      read: false
    },
    {
      id: 6,
      username: "Rasi",
      ticketID: "TSK101234538",
      ticketActivity: "02 Jan 2018 - 5:19 pm",
      ticketStatus: "Closed",
      dateTime: "25:30min",
      action: "Mark as read",
      read: false
    },
    {
      id: 7,
      username: "Hari",
      ticketID: "TSK101234542",
      ticketActivity: "02 Jan 2018 - 5:19 pm",
      ticketStatus: "Open",
      dateTime: "5:12min",
      action: "Mark as read",
      read: false
    },
    {
      id: 8,
      username: "Teja",
      ticketID: "TSK101234546",
      ticketActivity: "02 Jan 2018 - 5:19 pm",
      ticketStatus: "Closed",
      dateTime: "5:12min",
      action: "Mark as read",
      read: false
    },
    {
      id: 9,
      username: "Shanmukha",
      ticketID: "TSK101234552",
      ticketActivity: "02 Jan 2018 - 5:19 pm",
      ticketStatus: "Closed",
      dateTime: "5:12min",
      action: "Mark as read",
      read: false
    },
  ];
let formData = [
  {
    "id": "1",
    "name": "RPSUG",
    "title": "Restrict priority to specific user groups",
    "subtitle": "if enabled, only the user groups below will be able to see (and if applicable, select) this priority",
    "value": "",
    "type": "radio",
    "radioOption": [
        {
        "title": "Yes",
        "field_value": "Yes"
        },
        {
        "title": "No",
        "field_value": "No"
        }
    ]
  },
  {
    "id": "2",
    "name": "automation",
    "title": "Automation",
    "subtitle": "",
    "value": "",
    "type": "radio",
    "radioOption": [
        {
        "title": "Yes",
        "field_value": "Yes"
        },
        {
        "title": "No",
        "field_value": "No"
        }
    ]
  },
  {
    "id": "3",
    "name": "fis",
    "title": "FIS",
    "subtitle": "",
    "value": "",
    "type": "radio",
    "radioOption": [
        {
        "title": "Yes",
        "field_value": "Yes"
        },
        {
        "title": "No",
        "field_value": "No"
        }
    ]
  },
  {
    "id": "4",
    "name": "guest",
    "title": "Guest",
    "subtitle": "",
    "value": "",
    "type": "radio",
    "radioOption": [
        {
        "title": "Yes",
        "field_value": "Yes"
        },
        {
        "title": "No",
        "field_value": "No"
        }
    ]
  },
  {
    "id": "5",
    "name": "ifl",
    "title": "IFL",
    "subtitle": "",
    "value": "",
    "type": "radio",
    "radioOption": [
        {
        "title": "Yes",
        "field_value": "Yes"
        },
        {
        "title": "No",
        "field_value": "No"
        }
    ]
  },
  {
    "id": "6",
    "name": "RSP",
    "title": "Rapid Support team",
    "subtitle": "",
    "value": "",
    "type": "radio",
    "radioOption": [
        {
        "title": "Yes",
        "field_value": "Yes"
        },
        {
        "title": "No",
        "field_value": "No"
        }
    ]
  },
  {
    "id": "7",
    "name": "readonly",
    "title": "Readonly",
    "subtitle": "",
    "value": "",
    "type": "radio",
    "radioOption": [
        {
        "title": "Yes",
        "field_value": "Yes"
        },
        {
        "title": "No",
        "field_value": "No"
        }
    ]
  },
  {
    "id": "8",
    "name": "regs",
    "title": "Registered",
    "subtitle": "",
    "value": "",
    "type": "radio",
    "radioOption": [
        {
        "title": "Yes",
        "field_value": "Yes"
        },
        {
        "title": "No",
        "field_value": "No"
        }
    ]
  },
  {
    "id": "9",
    "name": "email1",
    "title": "hariprasad.swain@cloud4c",
    "subtitle": "",
    "value": "",
    "type": "radio",
    "radioOption": [
        {
        "title": "Yes",
        "field_value": "Yes"
        },
        {
        "title": "No",
        "field_value": "No"
        }
    ]
  },
  {
    "id": "10",
    "name": "email2",
    "title": "hariprasad.swain@cloud4c",
    "subtitle": "",
    "value": "",
    "type": "radio",
    "radioOption": [
        {
        "title": "Yes",
        "field_value": "Yes"
        },
        {
        "title": "No",
        "field_value": "No"
        }
    ]
  },
  ]

module.exports = {
  notification,
  formData
};