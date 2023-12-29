import Modal from 'react-bootstrap/Modal';
import { useState, useEffect, useRef, useCallback } from "react";
import { Slide, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import "./createTicket.scss";
import DynamicTicketForm from "./dynamicTicketForm";
import formJson from "./formField.json";
import { TicketTypeService } from "../../services/TicketTypeService";
import { config } from "../../config/config";
import fileObject from "./formField.json"
import axios from "axios";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import IndexedDbService from "../../services/IndexedDBService";
import { CustomToastContainer } from './Toster';
import { Spinner } from "../molecules/spinner";
import { useSelector } from 'react-redux';

export const CreateTicket = () => {
    const [showModalVal, setshowModalVal] = useState(false);
    // Initialize state variables //
    let personName: any = sessionStorage.getItem("userDetails");
    let staffId: any = sessionStorage.getItem("staffId");
    let TicketForm: any = JSON.parse(personName);
    let emailId: any = TicketForm?.email_id;
    let staffDetail: any = JSON.parse(staffId);
    const { t } = useTranslation();
    const [freshObject] = useState(formJson)
    const DeepCopy = freshObject.map((obj: any) => ({ ...obj }));
    const [formData, setFormData] = useState(DeepCopy);
    const [typeOption, setTypeOption]: any = useState([]);
    const [userformData, setuserFormData]: any = useState({
        from: emailId,
        Ticket_ID: "",
        tickettypeid: null,
        priority: null,
        customer_ticket_ref_id: null,
        subject: "",
        description: "",
        serverInfo: null,
        instance_type: "",
        customer_attachment_url: ""
    });
    const [checkSaveDraft, setSaveDraft] = useState(false);
    const [checkCreate, setCreate] = useState(false);
    const [checkVal, setCheckVal] = useState(false);
    const [error, seterror]: any = useState({});
    const [fileError, setFileError] = useState(false);
    const [fieldMsg, setFieldMsg] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const ticketID: any = config.TICKET_SHORT_FORM;
    const [uploadedFiles, setUploadedFiles]: any = useState([]);
    const allowedExtensions: any = fileObject[7].allowed_Extension;
    const [progress, setProgress] = useState({});
    const indexedDb = new IndexedDbService("customerDataList");
    const indexeDbtype = new IndexedDbService("ticketTypeList");
    const [customerDetails, setCustomer] = useState([]);
    const [themeClassName, setThemeClassName] = useState('');
    const theme = useSelector((state: any) => state.allReducers.theme.theme);   
    const flag = useSelector((state: any) => state.ticketFlag);
    // Fetch ticket types and update form data
    const handleCreate = async () => {
        const result =  await indexeDbtype.createObjectStore(['ticketType']);
        if(result == undefined) {
            const ticketType = await indexeDbtype.getAllValue('ticketType');
            if (ticketType.length == 0) {
                try {
                    // const res = await TicketTypeService.getAllTicketTypes();
                    const res:any = await TicketTypeService.getTicketType();
                    if(res?.source == 'handleSuccess') {
                        const resData = res?.data?.data || [];
                        // let formatTicketType = resData?.filter((obj:any) => obj.typetittle !== 'Others');
                        // formatTicketType.push(resData.find((obj:any) => obj.typetittle === 'Others'));
                        if (resData.length > 0) {
                            await indexeDbtype.putValue("ticketType", resData || []);
                            const indexedTicketType = await indexeDbtype.getAllValue('ticketType');
                            const list = indexedTicketType[0];
                            const mappedLists = list.map((item: any) => ({
                                // label: item.typetittle,
                                // value: item.kayakotypeid,
                                // abbreviation: ticketID[item.typetittle]
                                label: item.type,
                                value: item._id,
                                abbreviation: ticketID[item.type]
                            }));
                            formData[0].options = mappedLists;
                            setFormData([...formData]);
                            setTypeOption(mappedLists)
                        }
                    } else {
                        const filteredErrors = res?.filter((err:any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmticket.cloud4c.com/ticket/getMappedWorkflow"]);
                        toast.error(filteredErrors[0]['errorMsg'], {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        });
                    }
                } catch (error) {
                    console.error(error)
                }
            } else {
                const indexedTicketType = await indexeDbtype.getAllValue('ticketType');
                const list = indexedTicketType[0];
                // let formatTicketType = list?.filter((obj:any) => obj.typetittle !== 'Others');
                //     formatTicketType.push(list?.find((obj:any) => obj.typetittle === 'Others'));
                const mappedLists = list?.map((item: any) => ({
                    // label: item.typetittle,
                    // value: item.kayakotypeid,
                    // abbreviation: ticketID[item.typetittle]
                    label: item.type,
                    value: item._id,
                    abbreviation: ticketID[item.type]
                }));
                formData[0].options = mappedLists;
                setFormData([...formData]);
                setTypeOption(mappedLists)
            }
        } else {
            // const res = await TicketTypeService.getAllTicketTypes();
            const res:any = await TicketTypeService.getTicketType()
            if(res?.source == 'handleSuccess') {
                const resData = res?.data?.data || [];
                // let formatTicketType = resData?.filter((obj:any) => obj.typetittle !== 'Others');
                //     formatTicketType.push(resData.find((obj:any) => obj.typetittle === 'Others'));
                if (resData.length > 0) {
                    const mappedLists = resData.map((item: any) => ({
                        // label: item.typetittle,
                        // value: item.kayakotypeid,
                        // abbreviation: ticketID[item.typetittle]
                        label: item.type,
                        value: item._id,
                        abbreviation: ticketID[item.type]
                    }));
                    formData[0].options = mappedLists;
                    setFormData([...formData]);
                    setTypeOption(mappedLists)
                }
            } else {
                const filteredErrors = res?.filter((err:any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmticket.cloud4c.com/ticket/getMappedWorkflow"]);
                toast.error(filteredErrors[0]['errorMsg'], {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            }
            
        }
    }

    // Handle form reset
    function handleReset() {
        seterror({});
        setuserFormData({
            from: emailId,
            Ticket_ID: "",
            tickettypeid: null,
            priority: null,
            customer_ticket_ref_id: null,
            subject: "",
            description: "",
            serverInfo: null,
            instance_type: "",
            customer_attachment_url: ""
        })
        DeepCopy[0].options = typeOption;
        DeepCopy[3].options = customerDetails;
        setFormData([...DeepCopy]);
        setFileError(true);
        setUploadedFiles([]);
        setFileError(false);
        setSaveDraft(false);
        setCheckVal(false);
        setIsLoading(false);
    }

    function handleSubmitReset() {
        seterror({});
        setuserFormData({
            from: emailId,
            Ticket_ID: "",
            tickettypeid: null,
            priority: null,
            customer_ticket_ref_id: null,
            subject: "",
            description: "",
            serverInfo: null,
            instance_type: "",
            customer_attachment_url: ""
        })
        DeepCopy[0].options = typeOption;
        DeepCopy[3].options = customerDetails;
        setFormData([...DeepCopy]);
        setFileError(true);
        setUploadedFiles([]);
        setFileError(false);
        setSaveDraft(false);
        setIsLoading(false);
        if (checkVal == true) {
            setCheckVal(true);
        } else {
            setCheckVal(false);
        }
    }
    const handleSubValid = (value: any, changeField: any) => {
        const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
        // console.log(value, "value")
        if (!value) {
            seterror({ ...error, [changeField.id]: changeField.errorMessage["001"] });
            return;
        }
        if (value.length < 10 || value.length > 100) {
            seterror({ ...error, [changeField.id]: changeField.errorMessage["002"] });
        } else {
            seterror({ ...error, [changeField.id]: "" });
        }
        if (regex.test(value)) {
            seterror({ ...error, [changeField.id]: changeField.errorMessage["003"] });
        }
    }
    // Handle form input change //
    function handleChange(e: any, ind: any, index: any) {
        if (e?.target === undefined) {
            const { value, abbreviation } = e;
            const changeField = formData[ind];
            changeField["label"] = e;
            setFormData([...formData]);
            seterror({ ...error, [changeField.id]: false });
            if (ind === 0) {
                const now = new Date();
                // Format timestamp as DDMMYYYYHHMMSS //
                const timestamp = `${now.getDate()}${now.getMonth() + 1}${now.getFullYear()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;
                const TicketIdGeneration = abbreviation + timestamp;
                setuserFormData({ ...userformData, [formData[ind].name]: value, Ticket_ID: TicketIdGeneration });
            } else {
                setuserFormData({ ...userformData, [formData[ind].name]: value });
            }
        } else {
            const { name, value } = e?.target;
            const trimmedStr = value.replace(/^\s+/, '');
            const changeField = formData[ind];
            changeField["value"] = trimmedStr;
            setFormData([...formData])
            setuserFormData({ ...userformData, [name]: trimmedStr })
            if (name == "instance_type") {
                seterror({ ...error, [changeField.id]: false });
            }
            if (name === "subject") {
                handleSubValid(trimmedStr, changeField)
            }
        }
    }

    //Handle data and validation editor //
    const validateemail = (value: any) => {
        const values: any = value["srcElement"]?.innerText;
        const trimmedStr = values?.replace(/^\s+/, '');
        const editorVal: string = value["srcElement"]?.innerHTML;

        if (editorVal !== '<p><br></p>' || trimmedStr.length > 0) {
            seterror((preStateError: any) => ({ ...preStateError, ["description"]: false }));
        } else {
            seterror((preStateError: any) => ({ ...preStateError, ["description"]: true }));
        }
    };
    const handleEdior = (val: any) => {
        setuserFormData((prevStateDetails: any) => ({ ...prevStateDetails, ["description"]: val }));
        seterror((preStateError: any) => ({ ...preStateError, ["description"]: false }));
    }
    // Handle check for save as draft //
    const handleCheck = (e: any) => {
        setSaveDraft(e.target.checked);
    }
    // Handle check for create another //
    useEffect(() => {

        if (userformData.tickettypeid
            && userformData.priority
            && userformData.customer_ticket_ref_id
            && userformData.subject
            && userformData.serverInfo
            && userformData.instance_type
            && userformData.description !== "" && userformData.description !== "<p><br></p>"
            && error["subject"].length == 0) {
            setFieldMsg(true)
            if (checkVal == false) {
                setCreate(true);
            } else if (checkVal) {
                setCreate(false);
            }
        } else {
            setFieldMsg(false)
            setCreate(false);
        }
    }, [userformData])
    const handleCraete = (e: any) => {
        const createCheck = e.target.checked;
        setCheckVal(createCheck)
        if (createCheck && fieldMsg) {
            setCreate(false);
        } else if (createCheck == false && fieldMsg == false) {
            setCreate(false);
        } else if (createCheck == false && fieldMsg == true) {
            setCreate(true);
        } else if (createCheck == true && fieldMsg == false) {
            setCreate(false)
        }
    }
    //******* Handle error ******//
    function handleBlur(e: any, ind: any) {
        const changeField = formData[ind]
        if (changeField.label === null && changeField.value === undefined) {
            seterror({ ...error, [changeField.id]: true })
        } else if (changeField.name == "subject") {
            if (changeField.value == "") {
                seterror({ ...error, [changeField.id]: changeField.errorMessage["001"] });
            }
            if (error.subject == changeField.errorMessage["002"]) {
                seterror({ ...error, [changeField.id]: changeField.errorMessage["002"] });
            }
            if (error.subject == changeField.errorMessage["003"]) {
                seterror({ ...error, [changeField.id]: changeField.errorMessage["003"] });
            }
        } else if (changeField.value === "") {
            seterror({ ...error, [changeField.id]: true })
        } else {
            seterror({ ...error, [changeField.id]: false })
        }
    }
    function handleErrorDirn(itemElement:any) {
        const { top, bottom } = itemElement.getBoundingClientRect();
        const isInViewport = top >= 0 && bottom <= window.innerHeight;

        if (!isInViewport) {
            itemElement.scrollIntoView({ behavior: 'smooth', block: 'nearest'  });
        } else {
            itemElement.scrollIntoView({ behavior: 'smooth', block: 'nearest'  });
        }
    }
    // Handle form submit //
    const handleSubmit = async (e: any) => {

        e.preventDefault();
        const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
        if (userformData.tickettypeid == null) {
            const itemElement = document.getElementById('tickettypeid');
            if (itemElement) {
                handleErrorDirn(itemElement);
            }
            seterror((prevError: any) => ({ ...prevError, ["tickettypeid"]: true }));
            return;
        } else if (userformData.priority == null) {
            const itemElement = document.getElementById('priority');
            if (itemElement) {
                handleErrorDirn(itemElement);
            }
            seterror((prevError: any) => ({ ...prevError, ["priority"]: true }));
            return;
        } else if (userformData.customer_ticket_ref_id == null) {
            const itemElement = document.getElementById('customer_ticket_ref_id');
            if (itemElement) {
                handleErrorDirn(itemElement);
            }
            seterror((prevError: any) => ({ ...prevError, ["customer_ticket_ref_id"]: true }));
            return;
        } else if (userformData.subject == '' || error.subject !== "") {
            const itemElement = document.getElementById('subject');
            if (itemElement) {
                handleErrorDirn(itemElement);
            }
            const subError = userformData.subject;
            if (subError == "") {
                seterror({ ...error, ["subject"]: formData[4].errorMessage["001"] });
                return;
            }
            if (error.subject == formData[4].errorMessage["002"] && (subError.length < 10 || subError.length > 20)) {
                seterror({ ...error, ["subject"]: formData[4].errorMessage["002"] });
                return;
            }
            if (error.subject == formData[4].errorMessage["003"] && regex.test(subError)) {
                seterror({ ...error, ["003"]: formData[4].errorMessage["003"] });
                return;
            }
            return;
        } else if (userformData.serverInfo == null) {
            const itemElement = document.getElementById('serverInfo');
            if (itemElement) {
                handleErrorDirn(itemElement);
            }
            seterror((prevError: any) => ({ ...prevError, ["serverInfo"]: true }));
            return;
        } else if (userformData.instance_type == '') {
            const itemElement = document.getElementById('instance_type');
            if (itemElement) {
                handleErrorDirn(itemElement);
            }
            seterror((prevError: any) => ({ ...prevError, ["instance_type"]: true }));
            return;
        } else if (userformData.description == '' || userformData.description == "<p><br></p>") {
            const itemElement = document.getElementById('description');
            if (itemElement) {
                itemElement.scrollIntoView({ behavior: 'smooth'});
            }
            seterror((prevError: any) => ({ ...prevError, ["description"]: true }));
            return;
        }
        const ErrorObj = Object.values(error).filter(val => val === true);
        if (ErrorObj?.length === 0) {
            const {subject ,description, priority ,tickettypeid} = userformData
            setIsLoading(true);
                        // try{
                        //     console.log("form Data.......", userformData)
                        // const response = await TicketTypeService.createTicket({name:subject,description:description,priority:priority,tickettypeid:tickettypeid});
                        // console.log("response From Ticket......................",response)
                        // }
                        // catch(error){
                        //     console.log("error",error)
                        // }
                        try {
                            // const res = await TicketTypeService.postcreateTicketDetails(userformData);
                            const response:any = await TicketTypeService.createTicket({name:subject,description:description,priority:priority,tickettypeid:tickettypeid , serverInfo:subject});
                            if(response?.source == 'handleSuccess') {
                                const mappedWorkflow:any = await TicketTypeService.getMappedWorkflow()
                                if(mappedWorkflow?.source == 'handleSuccess') {
                                    const workFlowState  = await TicketTypeService.createWorkFlowState({
                                        ticketId:response?.data.data._id,
                                        workFlowId:mappedWorkflow?.data.data[0].workFlowId
                                    })
                                } else {
                                    const filteredErrors = mappedWorkflow?.filter((err:any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmticket.cloud4c.com/ticket/getMappedWorkflow"]);
                                    toast.error(filteredErrors[0]['errorMsg'], {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "dark",
                                    });
                                }
                                // console.log("response",response)
                                
                                // console.log("response From Ticket......................",workFlowState)
                               
                                if (response?.data?.data?.success == false) {
                                    toast.error(`${response?.data?.data?.message}`);
                                } else {
                                    toast.success(`${t("Created Successfully")}`);
                                    if (checkCreate) {
                                        setshowModalVal(false)
                                        handleSubmitReset();
                                    } else {
                                        handleSubmitReset();
                                    }
                                }
                            } else {
                                const filteredErrors = response?.filter((err:any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmticket.cloud4c.com/ticket/createTicket"]);
                                toast.error(filteredErrors[0]['errorMsg'], {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "dark",
                                });
                            }
                           
                        } catch (error) {
                            toast.error("Server not responding")
                            handleSubmitReset();
            } finally {
                // setIsLoading(false);
            }

        }

    }
    const fetchData = async () => {
        const result = await indexedDb.createObjectStore(["customerList"]);
        if(result == undefined) {
            try {
                const res:any = await TicketTypeService.getCustomerList();
                if(res?.source == "handleSuccess") {
                    await indexedDb.putValue("customerList", res?.data?.data?.list || []);
                    const getRequest = indexedDb.getAllValue("customerList");
                    const customerList = await getRequest;
                    const mappedLists = customerList[0].map((item: any, ind: any) => ({
                        label: item.customer_name,
                        value: item.id,
                    }));
                    setCustomer(mappedLists);
                    formData[3].options = mappedLists;
                    setFormData([...formData]);
                    return mappedLists;
                } else {
                    const filteredErrors = res?.filter((err:any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmgateway.cloud4c.com/getCustomerList"]);
                    toast.error(filteredErrors[0]['errorMsg'], {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
                }
                
            } catch (error) {
                console.error(error)
            }
        } else {
            const res:any = await TicketTypeService.getCustomerList();
            if(res?.source == 'handleSuccess') {
                const resData = res?.data?.data?.list || [];
                const mappedLists = resData.map((item: any, ind: any) => ({
                    label: item.customer_name,
                    value: item.id,
                }));
                setCustomer(mappedLists);
                formData[3].options = mappedLists;
                setFormData([...formData]);
                return mappedLists;
            } else {
                const filteredErrors = res?.filter((err:any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmgateway.cloud4c.com/getCustomerList"]);
                    toast.error(filteredErrors[0]['errorMsg'], {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            }
            
        }
    }
    const indexedDBrecord = async () => {
        const result = await indexedDb.createObjectStore(["customerList"]);
        if(result == undefined) {
            const getRequest = indexedDb.getAllValue("customerList");
            const customerList = await getRequest;
            // console.log(customerList, "index")
            if (staffDetail == undefined || customerList.length == 0) {
                if (staffDetail == undefined) {
                    if (customerList.length == 0) {
                        fetchData();
                    } else {
                        const mappedLists = customerList[0]?.map((item: any, ind: any) => ({
                            label: item.customer_name,
                            value: item.id,
                        }));
                        setCustomer(mappedLists);
                        formData[3].options = mappedLists;
                        setFormData([...formData]);
                    }
                } else if (customerList.length == 0) {
                    fetchData();
                } else {
                    const mappedLists = customerList[0]?.map((item: any, ind: any) => ({
                        label: item.customer_name,
                        value: item.id,
                    }));
                    setCustomer(mappedLists);
                    formData[3].options = mappedLists;
                    setFormData([...formData]);
                }
            } else {
                const mappedLists = customerList[0]?.map((item: any, ind: any) => ({
                    label: item.customer_name,
                    value: item.id,
                }));
                setCustomer(mappedLists);
                formData[3].options = mappedLists;
                setFormData([...formData]);
            }
        } else {
            fetchData()
        }
    }
    useEffect(() => {
        indexedDBrecord()
    }, []);

    useEffect(() => {
        setThemeClassName(theme ? 'darkModal tableview' : '');
    }, [theme]);
    // File upload functionality //
    const isAcceptedFile = (file: File) => {
        const extension: any = file.name.split(".").pop()?.toLowerCase();
        if (!extension) {
            return false;
        }
        if (allowedExtensions.length > 0 && !allowedExtensions.includes(extension)) {
            setFileError(true)
            return false;
        }
        return true;
    };
    const handleFileUpload = (uplaodFile: any) => {
        if (uplaodFile.length > 10 || uplaodFile.length === 0) {

            setFileError(true);
        } else if (uploadedFiles.length <= 9) {
            setFileError(false);
            let idCounter = uploadedFiles.length > 0 ? uploadedFiles[uploadedFiles.length - 1].id + 1 : 1;
            for (let i = 0; i < uplaodFile.length && i < 10; i++) {
                const file = uplaodFile[i];
                if (!isAcceptedFile(file)) {
                    continue;
                }
                setFileError(false);
                const reader = new FileReader();
                const id = idCounter++;
                reader.onload = async () => {
                    const base64: any = reader.result?.toString();
                    const extension = file.name.split(".").pop() || "";

                    try {
                        const response = await axios.post(`http://localhost:3292/upload`, { files: { id: id, base64: base64 } }, {         // http://localhost:3292/upload and ${config.ENV.API_URL} //
                            onUploadProgress: (progressEvent: any) => {
                                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                                setProgress(prevState => {
                                    return { ...prevState, [id]: percentCompleted };
                                });
                                setUploadedFiles((prevState: any) => [
                                    ...prevState,
                                    { id: id, name: file.name, size: file.size, base64: base64, extension: extension, progress: percentCompleted }
                                ]);
                            },
                        });
                    } catch (error) {
                        toast.error("File upload service down please try after some time", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                            });
                        console.error(error);
                    }
                };
                reader.readAsDataURL(file);
            }
        } else {
            setFileError(true)
        }
    }
    //   console.log(uploadedFiles, "uploadedFile")
    const handleFileDeletion = (file: any) => {
        const updatedFiles = uploadedFiles.filter((f: any) => f.id !== file);
        setUploadedFiles(updatedFiles);
        if (updatedFiles.length === 9) {
            setFileError(false)
        }
    };
    // Fetch priority details //
    const fetchPriority = async (id: any) => {
        if (id) {
            try {
                // const res = await TicketTypeService.getpriorityByTicketId(id);
                // const list = res?.data?.data?.list || [];
                // const mappedLists = list?.map((item: any) => ({
                //     label: item.prioritytitle,
                //     value: item.priorityid,
                // }));
                // formData[2].options = mappedLists;
                formData[2].options = [
                    {
                        label: 'P1 Critical',
                        value: 'P1',
                    },
                    {
                        label: 'P2 High',
                        value: 'P2',
                    },
                    {
                        label: 'P3 Normal',
                        value: 'P3',
                    },
                ];
                setFormData([...formData]);
            } catch (error) {
                console.error(error);
            }
        }
    }
    useEffect(() => {
        if (formData[2]["options"].length > 0) {
            formData[2].options = [];
            formData[2].label = null;
            setFormData([...formData]);
            setuserFormData({ ...userformData, [formData[2].name]: null });
        }
        fetchPriority(userformData.tickettypeid)
    }, [userformData.tickettypeid]);
    const handletoggle = () => {
        handleReset();
       if(flag?.flag){
        if (showModalVal == true) {
            setshowModalVal(false)
        } else {
            handleCreate()
            setshowModalVal(true)
        }
       }
    }
    const handleKeyDownForCreateTicket = useCallback((event: any) => {
        if (event.altKey && event.key.toLowerCase() === 'c') {
            handleSubmit(event);
        }
    }, [handleSubmit]);
    function handleKeyDownForOpenModal(event: any, key: string, modifier: string) {
        if (event[modifier] && event.key.toLowerCase() === key.toLowerCase()) {
            // handletoggle()
            setshowModalVal(true)
        }
    }
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDownForCreateTicket);
        document.addEventListener('keydown', (event) => handleKeyDownForOpenModal(event, 'n', 'altKey'));
        return () => {
            document.removeEventListener('keydown', handleKeyDownForCreateTicket);
            document.removeEventListener('keydown', (event) => handleKeyDownForOpenModal(event, 'n', 'altKey'));

        };
    }, [handleKeyDownForOpenModal, handleKeyDownForCreateTicket]);
    return (
        <div>
            <div>
                <button onClick={handletoggle} className='create-icon'>
                    <OverlayTrigger
                        delay={{ hide: 0, show: 30 }}
                        overlay={(props) => (
                            <Tooltip {...props}>
                                {t("Create Ticket")}
                            </Tooltip>
                        )}
                        placement="bottom"
                    >
                        <i className="mdi mdi-plus rounded-circle "></i>
                    </OverlayTrigger>
                </button>
                <Modal
                    size="lg"
                    show={showModalVal}
                    onHide={handletoggle}
                    aria-labelledby="example-modal-sizes-title-lg"
                    backdrop='static'
                    keyboard={false}
                    scrollable={true}
                    className={`custom-modal modalConatiner ${themeClassName}`}
                >
                    <Modal.Header className='custom-modal-header'>
                        <Modal.Title className= {`${theme? "darkHead": null}`} id="example-modal-sizes-title-lg">
                            {t("New Ticket")}
                        </Modal.Title>
                        <div>
                            <button className='closeCancel' onClick={handletoggle}>
                                <i className="bi bi-x-lg closeheader"></i>
                            </button>
                        </div>
                    </Modal.Header>
                    <Modal.Body className="my-modal-body">
                        <form className="ticketForm_body" id="create-course-form" noValidate>
                            <div className="modal_Body">
                                {/* <div className="form_body"> */}
                                <DynamicTicketForm
                                    handleChange={handleChange}
                                    handleEdior={handleEdior}
                                    handleBlur={handleBlur}
                                    validateemail={validateemail}
                                    error={error}
                                    userformData={userformData}
                                    formData={formData}
                                    fetchData={fetchData}
                                    fileError={fileError}
                                    handleFileUpload={handleFileUpload}
                                    handleFileDeletion={handleFileDeletion}
                                    uploadedFiles={uploadedFiles}
                                    progress={progress}
                                />
                                {/* </div> */}
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer className="custom-modal-footer">
                        <div>
                            <input className="form-check-input" type="checkbox" readOnly checked={checkSaveDraft} id="flexCheckDefault" onClick={handleCheck} style={{ marginTop: "1px" }} />
                            <label className={`form-check-label ${checkSaveDraft ? `text-black` : null}`} htmlFor="flexCheckDefault" style={{ paddingTop: "0px", marginLeft: "5px" }}>
                                {t("Save as Draft")}
                            </label>
                        </div>
                        <div className="ms-auto p-2 text-end">
                            <span className='me-3'>
                                <input className="form-check-input" type="checkbox" readOnly checked={checkVal} id="flexCreateAnother" onClick={handleCraete} style={{ marginTop: "9px" }} />
                                <label className={`form-check-label ${checkVal ? `text-black` : null}`} htmlFor="flexCreateAnother" style={{ paddingTop: "2px", marginLeft: "5px" }}>
                                    {t("Create another")}
                                </label>
                            </span>
                            {
                                (checkSaveDraft) ?

                                    <button type="button" className="btn btn-success" data-bs-dismiss="modal" data-testid="btns-Cancel" >
                                        {t("Save as Draft")}
                                    </button> :
                                    <button type="submit" onClick={handleSubmit} className="btn btn-primary" data-testid="btns-submit" disabled={isLoading}>
                                        {t("Create Ticket")} {isLoading && <Spinner />}
                                    </button>
                            }

                            <button type="button" className="btn btn-secondary ms-3" name="reset" onClick={handleReset}>
                                {t("Clear")}
                            </button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>
            <div className='tosterContainer'>
                <CustomToastContainer
                    position="top-right"
                    autoClose={3000}
                    closeButton={false}
                    transition={Slide}
                />
            </div>
        </div>
    );
}