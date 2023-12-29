import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  Node,
  Background,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Position,
  ReactFlowProvider,
  MarkerType,
  EdgeTypes,
  updateEdge,
} from "reactflow";
import "./index.scss";
import "./WorkFlow.scss";
import CustomNode from "./CustomNode";
import ActionNode from "./ActionNode";
import OutputNode from "./OutputNode";
import InputNode from "./InputNode";
import "reactflow/dist/style.css";
import "./WorkFlow.scss";
import { SideBar } from "./SideBar";
import CustomEdge from "./CustomEdge";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import DoneTwoToneIcon from "@mui/icons-material/DoneTwoTone";
import { Box, Drawer, SelectChangeEvent, TextField } from "@mui/material";
import Action from "./Action";
import Email from "./Email";
import { WorkFlowService } from "../../../services/WorkFlowService";
import { createNodeFunc } from "./workflowUtils";
import { toast } from "react-toastify";
import FlowModal from "./FlowModal";
import PopupComponent from "./PopupComponent";
import { config } from "../../../config/config";
import { useTranslation } from "react-i18next";
import DecisionNode from "./DecisionNode";
import { useSelector } from "react-redux";
import { useFormData } from "../API/context/FormDataProvider";
let id = 0;
const getId = () => `dndnode_${id++}`;
const initialNodes: Node[] = [
  {
    id: "1",
    type: "input",
    data: { label: "Open" },
    sourcePosition: Position.Right,
    position: { x: -240, y: 81 },
  },
  {
    id: "2",
    type: "output",
    data: { label: "Close" },
    targetPosition: Position.Left,
    position: { x: 518.5, y: 81 },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#0c2074",
    },
    style: {
      strokeWidth: 2,
      stroke: "#0c2074",
    },
  },
];

const nodeTypes = {
  custom: CustomNode,
  action: ActionNode,
  inputnode: InputNode,
  outputnode: OutputNode,
  decision:DecisionNode
};
const edgeTypes: EdgeTypes = {
  custom: CustomEdge,
};
const DynamicWorkFlow = () => {
  const workflowName = useSelector((state: any) => state.workFlowReducer.name.name);   
  const {selectedTaskId, setSelectedTaskId} = useFormData()
  console.log("theme", workflowName)
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodeName, setNodeName] = useState("");
  const [nodeId, setNodeId] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEdgeId, setSelectedEdgeId] = useState("");
  const [showEdgePopup, setShowEdgePopup] = useState(false);
  const [showActionPopup, setShowActionPopup] = useState(false);
  const [showEdgePopupDelete, setShowEdgePopupDelete] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [edgeLabel, setEdgeLabel] = useState("");
  const [selectedAction, setSelectedAction] = React.useState("");
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [emailError, setEmailError] = useState("");
  const [getActionValue, setGetActionValue] = useState("");
  const [urlValue, setUrlValue] = useState("");
  const [keyValue, setKeyValue] = useState("");
  const [notificationValue, setNotificationValue] = useState(false);
  const [actionData, setActionData] = useState();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [sidebar, setSideBar] = useState(true);
  const [workFlowID, setWorkFlowID] = useState<String>("");
  const {t} = useTranslation()
  const handleActionChange = (event: SelectChangeEvent) => {
    setSelectedAction(event.target.value);
    setIsPopupOpen(selectedAction !== null);
    console.log(event.target.value, "sele");
  };
  const handlePopupClose = () => {
    setSelectedAction("");
    setEmailValue("");
    setEmailError("");
    setIsPopupOpen(false); // Close the popup
  };
  const handleEdgeClick = (edgeId: any) => {
    setSelectedEdgeId(edgeId);
    const clickedEdge: any = edges.find((edge) => edge.id === edgeId);
    setEdgeLabel(clickedEdge.label || "");
    setShowEdgePopup(true);
    setShowEdgePopupDelete(true);
  };
  const handleFormSubmit = async (formValues: any) => {
    const updatedNodes = nodes.map((n) => {
      if (n.id === nodeId) {
        // Update the node with the popup data
        return {
          ...n,
          data: {
            ...n.data,
            popupData: formValues,
          },
        };
      }
      return n;
    });
    try {
      const res:any = await WorkFlowService.addAction({
        taskId: selectedTaskId,
        workFlowId: workFlowID,
        actionData: {
          type: "email",
          payload: formValues,
        },
      });
      if(res?.source !== "handleSuccess") {
        const filteredErrors = res?.filter((err:any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmworkflow.cloud4c.com/workflow/unpublished/create"]);
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
      // console.log("res from form Values", formValues);
    } catch (error) {
      console.log("error while Deleting node", error);
    }

    setNodes(updatedNodes);
    // Access the form values here()

    // setActionData(formValues)
    // console.log("Submitted form values:", nodes);
  };
  const updateEdgeLabel = () => {
    setEdges((prevEdges) =>
      prevEdges.map((edge) => {
        if (edge.id === selectedEdgeId) {
          return { ...edge, label: edgeLabel };
        }
        return edge;
      })
    );

    setShowEdgePopup(false);
  };
  const handleNodeClick = (node: any) => {
    if (Array.isArray(node) && node.length > 0) {
      const [selectedNode] = node;
      const { id, type, position, _id, data } = selectedNode;
      setPopupPosition(position);
      setNodeId(id);
      setSelectedNodeId(id);
      setSelectedTaskId(_id);
      setIsDrawerOpen(true);
      setNodeName(data.label);
      // console.log("id,", id);
      // console.log("type,", type);
      setSideBar(false);
      // if (id !== "1" && id !== "2") {
      if (type === "action" || type==="inputnode" || type==="outputnode" || type=="decision") {
        setShowActionPopup(true);
        setShowPopup(false);
      } else {
        setShowPopup(true);
        setShowActionPopup(false);
      }
      // }
    }
  };
  useEffect(() => {
    const updateNodeName = async () => {
      if (nodeName !== "") {
        setNodes((nds) =>
          nds.map((node) => {
            if (node.id === nodeId) {
              node.data = {
                ...node.data,
                label: nodeName,
              };
            }
            return node;
          })
        );
        try {
          const res:any = await WorkFlowService.updateTask({
            taskId: selectedTaskId,
            workFlowId: workFlowID,
            taskData: {
              name: nodeName,
            },
          });
          if(res?.source !== "handleSuccess") {
            const filteredErrors = res?.filter((err:any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmworkflow.cloud4c.com/nodes/unpublished/update-task"]);
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
          // console.log("res", res);
        } catch (error) {
          console.log("error while Deleting node", error);
        }
      }
    };
    updateNodeName();
  }, [nodeName, setNodes]);
  const onConnect = useCallback(
    (params: Edge | Connection) => {
      const { source, target } = params;
      const isEdgeExist = edges.some(
        (edge) => edge.source === source && edge.target === target
      );
      if (!isEdgeExist) {
        const newEdge = {
          id: getId(),
          source,
          target,
          type: "step",
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: "#0c2074",
          },
          style: {
            strokeWidth: 2,
            stroke: "#0c2074",
          },
        };
        const updatedEdges: any = [...edges, newEdge];
        setEdges(updatedEdges);
        // console.log("Updated edges:", updatedEdges);
      }
    },
    [edges]
  );

  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    async (event: any) => {
      event.preventDefault();

      const reactFlowBounds = (
        reactFlowWrapper?.current as HTMLDivElement | null
      )?.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = (reactFlowInstance as any)?.project({
        x: event.clientX - reactFlowBounds?.left!,
        y: event.clientY - reactFlowBounds?.top!,
      });
      const newNode: any = {
        id: getId(),
        type,
        position,
        data: { label: `${type}` },
      };
      if (type === "inputnode") {
        newNode.isStart = true;
      }
      if (type === "outputnode") {
        newNode.isEnd = true;
      }
      // setNodes((nds) => nds.concat(newNode));
      const updatedNode = await createNodeFunc(newNode, workFlowID);
      // console.log("updated",newNode)

      if (updatedNode) {
        // console.log(`111111111 updated Node :: `, updatedNode);
        setNodes((nds) => nds.concat(updatedNode));
      }
    },
    [reactFlowInstance, workFlowID]
  );
  useEffect(() => {
    async function fetchData() {
      const data = JSON.parse(sessionStorage.userDetails);
      const fullname = data.fullname;
      try {
        const response:any = await WorkFlowService.createWorkFlow({
          wf: {},
          created_by: fullname,
          ticket_type_id: "12",
          name: "workflowName",
          description: "This is a TASK Ticket workflow",
          is_active: true,
          is_published: false,
        });
console.log("response", response)
        if (response?.source == "handleSuccess") {
          setWorkFlowID(response.data.data.result._id);
          // console.log("result", setWorkFlowID(response.data.data.result._id));
          // console.log("response create workflow", response);
          return response; // Return the updated node with the returned ID
        } else {
          const filteredErrors = response?.filter((err:any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmworkflow.cloud4c.com/actions/unpublished/create"]);
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
          console.error("Error creating node:");
          return null;
        }
      } catch (error) {
        console.error("Error creating node:", error);
        return null;
      }
    } 
    fetchData();
  }, []);
  // console.log("workflowid", workFlowID);
  const onNodeDragStopHandler = (event: any, node: any, nodeId: any) => {
    handleNodeClick(nodeId);
    // console.log("Node position changed:", node.position);
    // console.log("Node position changed:", node);
  };
  const [selectedNodeId, setSelectedNodeId] = useState("");
  // const [selectedTaskId, setSelectedTaskId] = useState("");
  const deleteNode = async () => {
    setNodes((prevNodes) =>
      prevNodes.filter((node) => node.id !== selectedNodeId)
    );
    if (edges.length >= 1) {
      setEdges((prevEdges) =>
        prevEdges
          ? prevEdges.filter(
              (edge) =>
                edge.source !== selectedNodeId && edge.target !== selectedNodeId
            )
          : []
      );
    }
    try {
      const res:any = await WorkFlowService.deleteTask({
        taskId: selectedTaskId,
        workFlowId: workFlowID,
      });
      if(res?.source !== "handleSuccess") {
        const filteredErrors = res?.filter((err:any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmworkflow.cloud4c.com/nodes/unpublished/delete-task"]);
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
      // console.log("res", res);
    } catch (error) {
      console.log("error while Deleting node", error);
    }

    // setShowPopup(false);
  };
  const deleteEdge = () => {
    if (edges.length >= 1) {
      setEdges((prevEdges) =>
        prevEdges.filter((edge) => edge.id !== selectedEdgeId)
      );
    }
    setShowEdgePopup(false);
  };
  const closeActionHandler = () => {
    setShowActionPopup(false);
    setSideBar(true);
    setSelectedAction("");
  };
  const onEdgeUpdate = useCallback(
    (oldEdge: any, newConnection: any) =>
      setEdges((els) => updateEdge(oldEdge, newConnection, els)),
    []
  );
  const onNodeHandler = (evt: any) => {
    setNodeName(evt.target.value);
  };
  const submitWorkflow = async () => {
    try {
      const response:any = await WorkFlowService.saveWorkFlow({
        // workFlowId:"649be87e71c9a06cb1289bda",
        workFlowId: workFlowID,
        workFlowJson: { nodes: nodes, edges: edges },
      });
      if (response?.source == "handleSuccess") {
        toast.success(` workflow Created Successfully`);
        // console.log("res", response);
        return response; // Return the updated node with the returned ID
      } else {
        const filteredErrors = response?.filter((err:any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmworkflow.cloud4c.com/workflow/unpublished/save"]);
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
        console.error("Error creating node:");
        return null;
      }
    } catch (error) {
      console.log("error", error);
    }
    // console.log(nodes, edges, actionData);
  };
  return (
    <div className="dndflow" style={{ height: "500px", width: "100%" }}>
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={(instance: any) => setReactFlowInstance(instance)}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onEdgeUpdate={onEdgeUpdate}
            onNodeDragStop={onNodeDragStopHandler} // Updated event handler
            // fitView
            edgeTypes={edgeTypes}
            nodeTypes={nodeTypes}
            onEdgeClick={(event, edge) => {
              handleEdgeClick(edge.id);
            }}
            // style={{borderRight:"1px solid #ddd"}}
          >
            <Controls />
            <Background />
          </ReactFlow>
                  </div>
        {sidebar && <SideBar />}
        {/* <Drawer
          anchor="right"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        > */}

        {!sidebar && (
          <Box
            sx={{
              width: 254,
              position: "relative",
              height: "90vh",
              paddingTop: "14px",
              right: "10px",
              paddingLeft: "10px",
              borderLeft: "1px solid #ddd",
            }}
          >
            {/* Place your content for the drawer here */}
            {showPopup && (
              <div>
                <PopupComponent
                  // showPopup={showPopup}
                  setSideBar={setSideBar}
                  nodeName={nodeName}
                  setNodeName={setNodeName}
                  deleteNode={deleteNode}
                />
              </div>
            )}
            {showActionPopup && (
              <div>
                <div>
                  {/* <ActionView/> */}
                  <Action
                    setSideBar={setSideBar}
                    setNodeName={setNodeName}
                    selectedAction={selectedAction}
                    onActionChange={handleActionChange}
                    closeActionHandler={closeActionHandler}
                    onNodeHandler={onNodeHandler}
                    nodeName={nodeName}
                    deleteNode={deleteNode}
                  />
                </div>
              </div>
            )}
            {isPopupOpen && (
              <div className="">
                <Email
                  setIsPopupOpen={setIsPopupOpen}
                  selectedAction={selectedAction}
                  onClose={handlePopupClose}
                  emailValue={emailValue}
                  emailError={emailError}
                  setEmailValue={setEmailValue}
                  setEmailError={setEmailError}
                  getActionValue={getActionValue}
                  setGetActionValue={setGetActionValue}
                  urlValue={urlValue}
                  setUrlValue={setUrlValue}
                  keyValue={keyValue}
                  setKeyValue={setKeyValue}
                  notificationValue={notificationValue}
                  setNotificationValue={setNotificationValue}
                  onFormSubmit={handleFormSubmit}
                />
              </div>
            )}
          </Box>
        )}
        {/* </Drawer> */}

        {showEdgePopup && (
          <div
          // style={{
          //   position: "absolute",
          //   left: popupPosition.x + 550,
          //   top: popupPosition.y + 190,
          // }}
          >
            <div className="popup">
              <div style={{ marginBottom: "30px" }}>
                <button
                  style={{ float: "right" }}
                  className="btn btn-secondary"
                  onClick={() => setShowEdgePopup(false)}
                >
                  <CloseTwoToneIcon />
                </button>
              </div>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  "& > :not(style)": { m: 1 },
                }}
              >
                <TextField
                  id="outlined-basic"
                  fullWidth
                  label="Edge label"
                  variant="outlined"
                  value={edgeLabel}
                  onChange={(evt:any) => setEdgeLabel(evt.target.value)}
                />
                <button className="btn btn-primary " onClick={updateEdgeLabel}>
                  Update
                </button>
                <button
                  className="btn btn-secondary "
                  onClick={() => setShowEdgePopup(false)}
                >
                  Cancel
                </button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  "& > :not(style)": { m: 1 },
                }}
              >
                <p style={{ marginRight: "45px" }}>delete this edge?</p>
                <button className="btn btn-primary" onClick={deleteEdge}>
                  Delete
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowEdgePopup(false)}
                >
                  Cancel
                </button>
              </Box>
            </div>
          </div>
        )}
      </ReactFlowProvider>
      <div className="submitWrapper">
        <button
          onClick={() => {
            // Button action for bottom left button
          }}
          className="btn btn-primary btn-sm"
        >
          {t("Save")}
        </button>

        <button className="btn btn-primary btn-sm" onClick={submitWorkflow}>
          {t("Submit")}
        </button>
              </div>
    </div>
  );
};

export default DynamicWorkFlow;
