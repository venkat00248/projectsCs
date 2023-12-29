import * as React from "react";
import './WorkFlowList.scss'
import { Link } from 'react-router-dom';
import { Drawer } from '@mui/material';
import Box from "@mui/material/Box";
import WorkFlow from "./WorkFlow";
import { WorkFlowService } from "../../../services/WorkFlowService";
import { DateFormatForWF } from "../../Utils/DateFormat";
import CloseIcon from "@mui/icons-material/Close";
import WorkFlowView from "./WorkFlowView";
import CustomModal from "../ConfirmModal/CustomModal";
import { Badge, Button } from "react-bootstrap";
import Checkbox from "@mui/material/Checkbox";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import Tooltip from '@mui/material/Tooltip';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { useTranslation } from "react-i18next";
import { i18n } from "../../../Translations/i18n";
import { filterWorkFlowbyItem } from "../../Utils/FilterTableRecord";
import FilterComponent from "../FilterComponent/filterComponent";
import { Select } from "../../uidashboard/Imports";

type Anchor = "bottom";
interface DataTableProps {
  headers: string[];
  data: Record<string, any>[];
  onSelectRow: (selectedRows: Record<string, any>[]) => void;
  rowsPerPage: number;
  itemsPerPageOptions: number[];
  setData: (data: any) => void;
}


export const WorkFlowList = () => {
  const [workFlows, setWorkFlows]: any = React.useState([]);

  const [filteredData, setfilteredData] = React.useState([]);
  const [optionsFilter, setoptionsFilter]: any = React.useState([
    { label: 'Active', value: 'active' },
    { label: 'Not Active', value: 'notActive' },
    { label: 'Published', value: 'published' },
    { label: 'UnPublished', value: 'unPublished' }
  ])
  const [selectedOption, setSelectedOption] = React.useState<any | null>(null);
  const [selectedWorkFlow, setSelectedWorkFlow] = React.useState(null);
  const [showModal, setShowModal]: any = React.useState({ show: false, message: "", item: null });
  const { t } = useTranslation();
  React.useEffect(() => {
    i18n.changeLanguage(sessionStorage.langOption);
  }, [i18n])
  const [state, setState] = React.useState({
    bottom: false
  });
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [sortConfig, setSortConfig]: any = React.useState({ key: null, direction: null });
  const [filterText, setFilterText] = React.useState("");
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [deleteLoader, setDeleteLoader] = React.useState(false)
  const [selectedItems, setSelectedItems] = React.useState<any[]>([]);
  const [selectAll, setSelectAll] = React.useState(false);
  const [deleteIcon, setDeleteIcon] = React.useState(false);
  const [refresh, setRefresh] = React.useState(true);
  // const [wfState, setWfState] = React.useState(true)
  const [active, setActive] = React.useState([""])

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
    if (open) {
      const selectedIndex: any = event.currentTarget.getAttribute("data-index");
      setSelectedWorkFlow(workFlows[selectedIndex]);
    }
  };


  const getAllWorkFlows = async () => {
    const res: any = await WorkFlowService.getAllWorkFlows()
    if (res?.source == 'handleSuccess') {
      setWorkFlows(res?.data.data.result || []);
      console.log("all workflows", res.data.data.result)
    } else {
      toast.error('Fetch all service down please try after some time', {
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
  React.useEffect(() => {
    getAllWorkFlows()
    setSelectAll(false)
    setSelectedItems([])
    // setWfState(true)
  }, [])

  React.useEffect(() => {
    getAllWorkFlows()
    setSelectAll(false)
    setSelectedItems([])
  }, [refresh === true])

  const toggleSelectAll = () => {
    const items: any = (workFlows.filter((item: any) => {
      if (item.is_active && !item.is_published) return item
    }))
    // if (items.length === 0) return setDisabled(true)
    if (items.length === 0) return
    else {
      // setDisabled(false)
      if (selectAll) {
        setSelectedItems([])
        setSelectAll(false)
      } else {
        const items: any = (workFlows.filter((item: any) => {
          if (item.is_active && !item.is_published) return item
        }))
        setSelectedItems(items)
        setSelectAll(true)
      }
    }
  }

  const toggleItemSelection = (item: any) => {
    let selectedRows
    if (selectedItems.includes(item)) {
      selectedRows = selectedItems.filter((selectedItem) => selectedItem !== item)
    } else {
      selectedRows = [...selectedItems, item];
    }
    setSelectedItems(selectedRows);
  };

  React.useEffect(() => {
    if (selectedItems.length > 0) setDeleteIcon(true)
    else setDeleteIcon(false)
  }, [selectedItems.length])

  const drawerContent = (
    <Box
      sx={{
        width: "100%",
        height: "87vh",
        display: "flex",
        // flexDirection: "column",
        // justifyContent: "center",
        // alignItems: "center"
      }}
      role="presentation"
    // onClick={toggleDrawer("bottom", false)}
    // onKeyDown={toggleDrawer("bottom", false)}
    > <button
      style={{
        position: "absolute",
        padding: "8px",
        top: 0,
        right: 2,
        zIndex: 1,
      }}
      onClick={toggleDrawer("bottom", false)}
    >
        <CloseIcon />
      </button>
      <WorkFlowView selectedWorkFlow={selectedWorkFlow} />
      {/* <WorkFlowView /> */}
    </Box>
  );

  const openConfirmationPopup = (item: any, index: any) => {
    setShowModal({ show: true, message: "Are you sure to delete the record", item: item, index: index });
  };

  const publishedPopup = (item: any, index: any) => {
    setShowModal({ show: true, message: "Are you sure to publish the record", item: item, index: index });
  };

  const handleCloseModal = async (confirm = false) => {
    const { message, item, index }: any = showModal;
    if (confirm && item) {
      if (message === "Are you sure to delete the record") {
        // Delete the record using the row data
        try {
          const res: any = await WorkFlowService?.deleteWorkFlow({
            workFlowId: item?._id,
          });
          if (res?.source == "handleSuccess") {
            const updatedWorkFlows = [...workFlows];
            updatedWorkFlows[index].is_active = false;
            setWorkFlows(updatedWorkFlows);
          } else {
            // const filteredErrors = res?.filter((err: any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmworkflow.cloud4c.com/workflow/unpublished/delete"]);
            // toast.error(filteredErrors[0]['errorMsg'], {
            //   position: "top-right",
            //   autoClose: 5000,
            //   hideProgressBar: false,
            //   closeOnClick: true,
            //   pauseOnHover: true,
            //   draggable: true,
            //   progress: undefined,
            //   theme: "dark",
            // });
          }
        } catch (error) {
          console.log("error while Deleting node", error);
        }
      } else if (message === "Are you sure to publish the record") {
        const res = await WorkFlowService?.publishWorkFlow({
          workFlowId: item?._id,
        });
        if (res) {
          const updatedWorkFlows = [...workFlows];
          updatedWorkFlows[index].is_published = true;
          setWorkFlows(updatedWorkFlows);
        }
      }
      else if (message === "Are you sure you want to delete the selected workflows") {
        setDeleteLoader(true)
        console.log(item, "items to be deletd")
        const toBeDeletedWorkflows: string[] = workFlows
          .filter((workflow: any) => selectedItems.includes(workflow))
          .map((workflow: any) => workflow?._id);
        try {
          const res = await WorkFlowService?.deleteBulkWorkflows(
            toBeDeletedWorkflows
          )
          if (res) {
            setDeleteLoader(false)

            setDeleteIcon(false)
            setSelectAll(false)
            // setRefresh(!refresh)
            toast.success('Sucessfully deleted your selected workflows', {
              position: toast.POSITION.TOP_CENTER,
              className: "toastMessage",
            });
          }
        } catch (error: any) {
          console.log("Error while deleting bulk workflows", error)
          toast.error(`${error}`, {
            position: toast.POSITION.TOP_CENTER
          })
        }
      }
      else if (message === "Are you sure you want to activate the workflow") {
        try {
          // console.log(item._id, "item to be deleted")
          setActive([...active, item._id]);
          const result: any = await WorkFlowService.activateWorkflow(
            item._id
          )
          // console.log(result, "result")
          if (result) {
            // setRefresh(true)
            // setWfState(false)

            toast.success('Sucessfully activated your selected workflows', {
              position: toast.POSITION.TOP_CENTER,
              className: "toastMessage",
            });
          }
        } catch (error: any) {
          console.log("Error while activating your workflow", error)
          toast.error(`${error}`, {
            position: toast.POSITION.TOP_CENTER,
            className: "toastMessage",
          })
        }
      }
    }
    setShowModal({ show: false, message: "", item: null });
  };

  React.useEffect(() => {
    if (workFlows) {
      setfilteredData(workFlows)
    }
  }, [workFlows])

  React.useEffect(() => {
    let filteredResults = workFlows;
    if (selectedOption) {
      filteredResults = filterWorkFlowbyItem(filteredResults, selectedOption);
    }
    if (filterText) {
      filteredResults = filteredResults.filter((ticket: any) => {
        const createdOnString = DateFormatForWF(ticket.createdAt);
        const updatedOnString = DateFormatForWF(ticket.updatedAt);
        const searchData = `${ticket.name} ${ticket.created_by} ${ticket.updatedBy}${(ticket.is_active) ? 'Active' : 'Not Active'}${createdOnString}${updatedOnString}`.toUpperCase();
        const filterData = filterText.toUpperCase();
        return searchData.includes(filterData);
      });
    }
    setfilteredData(filteredResults);
    setCurrentPage(1);
  }, [filterText, workFlows, selectedOption])

  const currentItems = filteredData?.slice(startIndex, endIndex);
  console.log(currentItems, startIndex, endIndex)
  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);

  const requestSort = (key: any) => {
    let direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    if (!sortConfig.key) {
      return currentItems;
    }

    const sortedItems = [...currentItems].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return sortedItems;
  };

  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  const handleRecords = (e: any) => {
    const newItemsPerPage = parseInt(e.target.value);
    setCurrentPage(1);
    setItemsPerPage(newItemsPerPage);
  }

  const handleSearch = (event: any) => {
    const query = event.target.value;
    setFilterText(query);
    // setCurrentPage(1);
  };

  const handleSelectChange = (selectedOption: any | null) => {
    setSelectedOption(selectedOption);
  };

  const makeWorkflowActive = (item: any) => {
    setShowModal({ show: true, message: "Are you sure you want to activate the workflow", item: item });
  }

  const deleteSelectedWorkFlows = (items: any) => {
    setShowModal({ show: true, message: "Are you sure you want to delete the selected workflows", item: items });
  }



  return (
    <div>
      <div className='wfstablemain'>
        <div className='wfstitle d-flex'>
          <h3>{t("Manage Work Flows")}</h3>
          <div className="">
            <Link to="/admin/newWorkflow">  <button type="button" className="btn btn-primary shadow-sm my-2 btn-sm btn-icon-text"> <i className="far fa-plus-square me-2"></i> {t("New Work Flow")} </button></Link>
          </div>
        </div>
        {/* <div className="wfsheader mb-0">
                <div>
                <h5 className="subtitle"><i className="fa fa-angles-right me-1"></i> List of all WF'S</h5>
                </div>
                <div className="d-flex">
                    <div className="justify-content-center">
                    <Link  to="/admin/newWorkflow">  <button type="button" className="btn btn-primary shadow-sm my-2 btn-sm btn-icon-text"> <i className="far fa-plus-square me-2"></i> New Work Flow </button></Link>
                    </div>
                </div>
          </div>  */}
        <div className="row wfs-table mt-2">
          <div className="col-12 table-container">
            <div className="table-responsive px-1">
              <span className="subtitle"><i className="fa fa-angles-right me-1"></i>{selectedOption ? t(`List of ${selectedOption.label} WF'S`) : t("List of all WF'S")}</span>
              <div className="float-left">
                {
                  deleteIcon && (
                    <Button
                      variant="contained"
                      size="sm"
                      style={{ float: "left" }}
                      onClick={() => deleteSelectedWorkFlows(selectedItems)}
                    >
                      <DeleteOutlineIcon color="error" />
                    </Button>
                  )
                }
              </div>
              <div className="searchContainer">
                <FilterComponent
                  onFilter={handleSearch}
                  filterText={filterText}
                />
                <div className="workflowDrop">
                  <Select
                    value={selectedOption}
                    onChange={handleSelectChange}
                    options={(sortedData()?.length > 0) ? optionsFilter : []}
                    placeholder={t("Select to Filter")}
                    isClearable={true}
                  />
                </div>
              </div>

              <table id="example2" className="table table-striped" style={{ width: '100%', marginBottom: '0px', marginTop: '1rem' }}>
                <thead>
                  <tr>
                    <th className="WfColumn" style={{ width: '8%' }}>
                      {
                        <Checkbox
                          onChange={toggleSelectAll}
                          checked={selectAll}
                        // disabled={disabled ? true : false}
                        />
                      }
                    </th>

                    <th className="WfColumn" style={{ width: '16%' }} onClick={() => requestSort('name')}>
                      {t("WF Name")}
                      {sortConfig.key === 'name' &&
                        <span className="sortIcon">
                          {
                            sortConfig.direction === 'asc' ?
                              <i className="fa-solid fa-sort-up"></i> : <i className="fa-solid fa-sort-down"></i>
                          }
                        </span>
                      }
                      {(sortConfig.key !== 'name' || sortConfig.key == null) &&
                        <span className="sortHoverIcon">
                          <i className="fa-solid fa-sort sortOption"></i>
                        </span>
                      }
                    </th>
                    <th className="WfColumn" style={{ width: '12%' }} onClick={() => requestSort('column2')}>
                      {t("Mapped Ticket Type")}
                      {sortConfig.key === 'column2' &&
                        <span className="sortIcon">
                          {
                            sortConfig.direction === 'asc' ?
                              <i className="fa-solid fa-sort-up"></i> : <i className="fa-solid fa-sort-down"></i>
                          }
                        </span>
                      }
                      {(sortConfig.key !== 'column2' || sortConfig.key == null) &&
                        <span className="sortHoverIcon">
                          <i className="fa-solid fa-sort sortOption"></i>
                        </span>
                      }
                    </th>
                    <th className="WfColumn" style={{ width: '13%' }} onClick={() => requestSort('created_by')}>
                      {t("Owner")} {sortConfig.key === 'created_by' &&
                        <span className="sortIcon">
                          {
                            sortConfig.direction === 'asc' ?
                              <i className="fa-solid fa-sort-up"></i> : <i className="fa-solid fa-sort-down"></i>
                          }
                        </span>}
                      {(sortConfig.key !== 'created_by' || sortConfig.key == null) &&
                        <span className="sortHoverIcon">
                          <i className="fa-solid fa-sort sortOption"></i>
                        </span>
                      }
                    </th>
                    <th className="WfColumn" style={{ width: '8%' }} onClick={() => requestSort('is_active')}>
                      {t("Status")} {sortConfig.key === 'is_active' &&
                        <span className="sortIcon">
                          {
                            sortConfig.direction === 'asc' ?
                              <i className="fa-solid fa-sort-up"></i> : <i className="fa-solid fa-sort-down"></i>
                          }
                        </span>}
                      {(sortConfig.key !== 'is_active' || sortConfig.key == null) &&
                        <span className="sortHoverIcon">
                          <i className="fa-solid fa-sort sortOption"></i>
                        </span>
                      }
                    </th>
                    <th className="WfColumn" style={{ width: '10%' }} onClick={() => requestSort('createdAt')}>
                      {t("Created Date")} {sortConfig.key === 'createdAt' &&
                        <span className="sortIcon">
                          {
                            sortConfig.direction === 'asc' ?
                              <i className="fa-solid fa-sort-up"></i> : <i className="fa-solid fa-sort-down"></i>
                          }
                        </span>}
                      {(sortConfig.key !== 'createdAt' || sortConfig.key == null) &&
                        <span className="sortHoverIcon">
                          <i className="fa-solid fa-sort sortOption"></i>
                        </span>
                      }
                    </th>
                    <th className="WfColumn" style={{ width: '10%' }} onClick={() => requestSort('updatedAt')}>
                      {t("Updated Date")} {sortConfig.key === 'updatedAt' &&
                        <span className="sortIcon">
                          {
                            sortConfig.direction === 'asc' ?
                              <i className="fa-solid fa-sort-up"></i> : <i className="fa-solid fa-sort-down"></i>
                          }
                        </span>}
                      {(sortConfig.key !== 'updatedAt' || sortConfig.key == null) &&
                        <span className="sortHoverIcon">
                          <i className="fa-solid fa-sort sortOption"></i>
                        </span>
                      }
                    </th>
                    <th style={{ width: '10%' }}>
                      {t("Is Published")}
                    </th>
                    <th className="WfColumn" style={{ width: '12%' }} onClick={() => requestSort('updatedBy')}>
                      {t("Updated By")} {sortConfig.key === 'updatedBy' &&
                        <span className="sortIcon">
                          {
                            sortConfig.direction === 'asc' ?
                              <i className="fa-solid fa-sort-up"></i> : <i className="fa-solid fa-sort-down"></i>
                          }
                        </span>}
                      {(sortConfig.key !== 'updatedBy' || sortConfig.key == null) &&
                        <span className="sortHoverIcon">
                          <i className="fa-solid fa-sort sortOption"></i>
                        </span>
                      }
                    </th>
                    <th style={{ width: '10%' }}>{t("Action")}</th>

                  </tr>
                </thead>
                <tbody>
                  {sortedData()?.length > 0 ? (
                    sortedData()?.map((item: any, index: any) => (
                      <tr key={index}>
                        {/* <td>
                          {
                            (item.is_active && !item.is_published) && (
                              <>
                               {deleteLoader && selectedItems.includes(item) ? (
                                     <div className="custom-loader"></div>
                                    ) : (
                                      
                                      <Checkbox
                                        onChange={() => toggleItemSelection(item)}
                                        checked={selectedItems.includes(item)}
                                        size="small"
                                      />
                                    )}
                              </>)
                          }
                        </td> */}

                        <td>
                          {item.is_active && !item.is_published && (
                            <>
                              {deleteLoader && selectedItems.includes(item) ? (
                                <div className="custom-loader"></div>
                              ) : (
                                (!selectedItems.includes(item) || active.includes(item._id)) && (
                                  <Checkbox
                                    onChange={() => toggleItemSelection(item)}
                                    checked={selectedItems.includes(item)}
                                    size="small"
                                  />
                                )
                              )}
                            </>
                          )}
                        </td>

                        <td>{item.name}</td>
                        <td>Ticket Type</td>
                        <td>{item.created_by}</td>
                        <td style={{ paddingTop: "10px" }} id={item._id}>
                          <Badge bg={item.is_active || (active.includes(item._id)) ? "success" : "danger"} className="w-100 badgeFont">
                            {/* {!item.is_active && !active? "Inactive" : "Active"} */}
                            {
                              item.is_active || (active.includes(item._id)) ? "Active" : "Inactive"
                            }
                          </Badge>
                        </td>

                        <td>{DateFormatForWF(item.createdAt)}</td>
                        <td> {DateFormatForWF(item.updatedAt)}</td>
                        <td>{item.is_published ? <i className="fa-regular fa-circle-check text-success"></i> : <i className="fa-regular fa-circle-xmark text-danger"></i>}</td>
                        <td>XYZ</td>

                        <td>
                          <button type="button" data-index={index} className="btn btn-primary shadow btn-xs sharp me-1" onClick={toggleDrawer("bottom", true)}><i className="fa-regular fa-eye"></i></button>

                          {/* {item.is_active && !item.is_published ? (
                            <button
                              type="button"
                              data-index={index}
                              className="btn btn-primary shadow btn-xs sharp me-1"
                              onClick={() => openConfirmationPopup(item, index)}
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          ) : null}
                          {(!item.is_published && item.is_active) && (
                            <button
                              type="button"
                              data-index={index}
                              className="btn btn-primary shadow btn-xs sharp me-1"
                              onClick={() => publishedPopup(item, index)}
                            >
                              <i className="fa-solid fa-upload"></i>
                            </button>
                          )} */}
                          {
                            (item.is_active && !item.is_published) && (
                              <button
                                type="button"
                                data-index={index}
                                className="btn btn-success shadow btn-xs sharp me-1"
                                onClick={() => publishedPopup(item, index)}
                              >
                                <Tooltip title="Publish Workflow">
                                  <i className="fa-solid fa-toggle-on"></i>
                                </Tooltip>
                              </button>
                            )
                          }
                          {!item.is_active &&
                            (<button type="button"
                              className="btn btn-danger shadow btn-xs sharp me-1"
                              onClick={() => makeWorkflowActive(item)}
                            >
                              <Tooltip title="Make this active">
                                {/* <i className="fa-solid fa-power-off"></i> */}
                                <i className="fa-solid fa-check"></i>
                              </Tooltip>
                            </button>)
                          }


                          <Drawer
                            anchor="bottom"
                            open={state["bottom"]}
                            onClose={toggleDrawer("bottom", false)}
                          >
                            {drawerContent}
                          </Drawer>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="text-center">
                        {t("Loading")}...
                      </td>
                    </tr>
                  )}

                  {/* <tr>
                                <td>Sample WF</td>
                                <td>Ticket Type</td>
                                <td>ABC </td>
                                <td><span className="border py-0 px-2 border-primary text-primary">Active</span></td>
                                <td>26/06/23</td>
                                <td> </td>
                                <td><i className="fa-regular fa-circle-check text-success"></i></td>
                                <td>XYZ</td>
                                
                                  <td>
                                    <button type="button" className="btn btn-primary shadow btn-xs sharp" onClick={toggleDrawer("bottom", true)}><i className="fa-regular fa-eye"></i></button>
                                    <Drawer
                                    anchor="bottom"
                                    open={state["bottom"]}
                                    onClose={toggleDrawer("bottom", false)}
                                    >
                                    {drawerContent}
                                    </Drawer>
                                </td> 
                            </tr>
                            <tr>
                                <td>Sample WF2</td>
                                <td>Service request</td>
                                <td>XYZ</td>
                                <td><span className="border py-0 px-2 border-primary text-primary">Active</span></td>
                                <td>25/06/23</td>
                                <td>26/06/23</td>
                                <td><i className="fa-regular fa-circle-xmark text-danger"></i></td>
                                <td>ABC</td>
                                  
                                  <td>
                                    <button type="button" className="btn btn-primary shadow btn-xs sharp me-1"><i className="fa-regular fa-eye"></i></button>
                                    <button type="button" className="btn btn-warning shadow btn-xs sharp me-1"><i className="fa-regular fa-pen-to-square"></i></button>
                                    <button type="button" className="btn btn-danger shadow btn-xs sharp me-1"><i className="fa fa-trash"></i></button>
                                    <button type="button" className="btn btn-success shadow btn-xs sharp me-1"><i className="fa-regular fa-circle-check"></i></button>
                                </td> 
                            </tr> */}

                </tbody>
              </table>
              <div className="pb-1 btnContainer">
                <span className="me-2">
                  <label style={{ fontSize: "13px", marginRight: "5px" }}>{t("Records")}</label>
                  <select value={itemsPerPage} onChange={handleRecords} className="selectBox">
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={workFlows?.length}>All</option>
                  </select>
                </span>
                <button className="preClass" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <span className="pageText">
                  {t("Page")} {currentPage} of {totalPages}
                </span>
                <button className="nextClass" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <CustomModal
          show={showModal.show}
          onHide={handleCloseModal}
          title='Warning'
          footer={
            <>
              <Button variant="danger" onClick={() => handleCloseModal(true)} style={{ padding: "3px", width: "65px" }}>
                Confirm
              </Button>
            </>
          }
        >
          <p>{showModal.message}</p>
        </CustomModal>
      </div>
    </div>

  )
}