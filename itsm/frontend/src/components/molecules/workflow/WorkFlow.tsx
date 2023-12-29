import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  Node,
  addEdge,
  Background,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Position
} from "reactflow";

import CustomNode from "./CustomNode";
import "reactflow/dist/style.css";
import "./WorkFlow.scss"
import FlowModal from "./FlowModal";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "input",
    data: { label: "Open" },
    sourcePosition: Position.Right,
    position: { x: 100, y: 100 }
  },
  { id: "2", data: { label: "Activity" }, position: { x: 300, y: 100 } ,sourcePosition: Position.Right, targetPosition: Position.Left,},
  { id: "3", data: { label: "Pending on Management" }, position: { x: 600, y: 50 },sourcePosition: Position.Right, targetPosition: Position.Left},
  { id: "4", data: { label: "Pending on Customer" }, position: { x: 600, y: 150 } ,targetPosition: Position.Left,sourcePosition: Position.Right,},
  { id: "5", data: { label: "Resolved" }, position: { x: 900, y: 100 } ,targetPosition: Position.Left,sourcePosition: Position.Right},
  { id: "6", data: { label: "Closed" }, position: { x: 1100, y: 100 } ,targetPosition: Position.Left,sourcePosition: Position.Right,},
  
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" , type: 'step'},
  { id: "e2-3", source: "2", target: "3"  , type: 'step',sourceHandle: 'top'},
  // { id: "e2-4", source: "2", target: "4" , animated: true , label: 'to vary', type: 'step'},
  { id: "e2-4", source: "2", target: "4"  ,type:'step'},
  { id: "e2-5", source: "2", target: "5"  ,type:'step'},
  { id: "e3-5", source: "3", target: "5"  ,type:'step'},
  { id: "e4-5", source: "4", target: "5"  ,type:'step'},
  { id: "e5-6", source: "5", target: "6"  ,type:'step'}
];

const nodeTypes = {
  custom: CustomNode
};

const WorkFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  // const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );
  const [inputs, setInputs] = useState({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
  });
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
    
  };
  const resetInputs = () => {
    setInputs({
      input1: '',
      input2: '',
      input3: '',
      input4: '',
    });
  };
  const handleSubmit = () => {
    if (inputs && inputs.input1 && inputs.input2 && inputs.input3 && inputs.input4) {
      const newNode = { id: inputs.input1, data: { label: inputs.input2 },  position: { x: Math.random() * 500, y: Math.random() * 500 } };
      const nodeExists = nodes.some(node => node.id === newNode.id);
      if (!nodeExists) {
        setNodes(prevNodes => [...prevNodes, newNode]);
        setInputs({
          input1: '',
          input2: '',
          input3: '',
          input4: '',
        })
      }
    }
  };
  // useEffect(() => {
  //   handleSubmit();
  // }, [inputs]);
  
  return (
    <div  style={{ height: '500px', width: '100%' }}>
      {/* <FlowModal inputs={inputs} handleInputChange={handleInputChange} handleSubmit={handleSubmit}   resetInputs={resetInputs}/> */}
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
    >
      <Background />
      <Controls />
    </ReactFlow>
    </div>
  );
};

export default WorkFlow;
