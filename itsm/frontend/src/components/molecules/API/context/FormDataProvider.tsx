import React, { createContext, useContext, useState } from "react";
type Anchor = "top" | "left" | "bottom" | "right";
const FormDataContext = createContext<any>(null);

export const useFormData = () => useContext(FormDataContext);

export const FormDataProvider = ({ children }: any) => {
  const [rows, setRows] = useState([
    { id: 0, isVisible: true, key: "", value: "" },
  ]);
  const [headers, setHeaders] = useState([
    { id: 0, isVisible: true, key: "", value: "" },
  ]);
  const [queryParams, setQueryParams] = useState([
    { id: 0, isVisible: true, key: "", value: "" },
  ]);
  const [postFormData, setPostFormData] = useState([
    { id: 0, isVisible: true, key: "", value: "" },
  ]);
  const [urlEncoded, setUrlEncoded] = useState([
    { id: 0, isVisible: true, key: "", value: "" },
  ]);
  const [url, setUrl] = useState("");
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [method, setMethod] = useState("");
  const [successMsg , setSuccessMsg] = useState("")
const [listOfAPIs , setListOfAPIs] = useState<any>([])
const [state, setState] = React.useState({
  top: false,
  left: false,
  bottom: false,
  right: false,
});
const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      if (!open) {
        // Reset successMsg when closing the drawer
        setSuccessMsg("");
      }

      setState({ ...state, [anchor]: open });
    };
  const [err, setErr] = useState({
    urlErr: "",
    methodErr: ""
  })
  const [body, setBody] = useState('{\n\t\n}');
  const [disabled, setDisbaled] = useState({
    test: true,
    save: true
  })
  // const [bulkEdit, setBulkEdit] = useState<any>([
  //   { id: 0, isVisible: true, key: "", value: "" },
  // ])
  const [bulkEdit, setBulkEdit] = useState<any>("")
  // const [body, setBody] = useState<any>()
  const [authType,setAuthType] = useState("Inherit auth from parent")
  const [authValues,setAuthValues] = useState({
    bearer:"",
    username:"",
    password:""
  })
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [actionId, seActionId] = useState("");
  return (
    <FormDataContext.Provider
      value={{
        rows,
        setRows,
        url,
        setUrl,
        query,
        setQuery,
        headers,
        setHeaders,
        queryParams,
        setQueryParams,
        postFormData,
        setPostFormData,
        urlEncoded,
        setUrlEncoded,
        response,
        setResponse,
        method,
        setMethod,
        listOfAPIs , setListOfAPIs ,
        state, setState ,
        toggleDrawer,
        body,
        setBody,
        err,
        setErr,
        disabled,
        setDisbaled,
        bulkEdit,
        setBulkEdit,
        authValues,
        setAuthValues,
        authType,
        setAuthType,
        selectedTaskId, setSelectedTaskId ,
        actionId, seActionId ,
        successMsg , setSuccessMsg
      }}
    >
      {children}
    </FormDataContext.Provider>
  );
};

export default FormDataProvider;
