import { width } from "@mui/system";

export const handleBlur = (
  value: string,
  errorCodes: Record<string, string>,
  regex: RegExp
) => {
  if (!value) {
    return errorCodes["001"];
  } else if (value.length < 5) {
    return errorCodes["002"];
  } else if (!regex.test(value)) {
    return errorCodes["003"];
  } else {
    return "";
  }
};

const dateFormat = (formatN: number) => {
  if (isNaN(formatN)) return formatN;
  return formatN < 10 ? `0${formatN}` : formatN;
};
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const formattedDate = `${dateFormat(
    day
  )}-${dateFormat(month)}-${year} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
};

export const inputValidation = (str: string, rex: any) => {
  // remove white spaces
  // str = str.replace(/\s/g, '');
  // remove non-alphanumeric characters
  // str = str.replace(rex, '');
  return str;
}

export const customStyles = {
  rows: {
    style: {
      minHeight: "50px", // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
      backgroundColor: "rgb(144, 144, 144)",
      color: "white",
      fontSize: "15px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
    },
  },
  pagination: {
    style: {
      color: "black",
      minWidth: "0px"
    }
  }

};
export const externalOrgStyles = {
  backgroundColor: "#Eee7e4", // Light red background color
};
// Define conditional row styles
export const conditionalRowStyles = [
  {
    // Apply externalOrgStyles to rows with orgtype === "Yes"
    when: (row: any) => row.userstaffid == sessionStorage.staffId,
    style: externalOrgStyles,
  },
];

