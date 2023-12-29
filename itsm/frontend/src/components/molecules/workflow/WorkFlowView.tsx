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
import { Box, SelectChangeEvent, TextField } from "@mui/material";
import Action from "./Action";
import Email from "./Email";
import { WorkFlowService } from "../../../services/WorkFlowService";
import { createNodeFunc } from "./workflowUtils";
import { toast } from "react-toastify";
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
  inputnode:InputNode,
  outputnode:OutputNode
};
const edgeTypes: EdgeTypes = {
  custom: CustomEdge,
};
const WorkFlowView = (props:any) => {
    const { selectedWorkFlow } = props
  const reactFlowWrapper = useRef(null);
  // console.log("welcomeeeeee",selectedWorkFlow.wf)
  const data = JSON.parse(selectedWorkFlow.wf);

const nodesArray = data.nodes;
const edgesArray = data.edges;
  const [nodes, setNodes, onNodesChange] = useNodesState(nodesArray);
  const [edges, setEdges, onEdgesChange] = useEdgesState(edgesArray);
 
  return (
    <div className="dndflow" style={{ height: "500px", width: "100%" }}>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
            edgeTypes={edgeTypes}
            nodeTypes={nodeTypes}
          >
            <Controls />
            <Background />
          </ReactFlow>
        </div>
     </div>
  );
};

export default WorkFlowView;
