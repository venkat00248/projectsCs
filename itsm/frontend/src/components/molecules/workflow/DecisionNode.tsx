import { memo, useContext } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import './DecisionNode.scss'
const DecisionNode = ({
  data,
  isConnectable
}: NodeProps) => {
  return (
    <div className="decisionNode">
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        id="4"
        className="decisionRight"
      />
      <Handle
        type="target"
        id="1"
        position={Position.Left}
        isConnectable={isConnectable}
        className="decisionLeft"
      />
      <div className="actionNode">
        <div className="text">
      {data?.label}</div>
      </div>
      <Handle
        type="source"
        id="1"
        position={Position.Top}
        isConnectable={isConnectable}
        className="decisionTop"
      />
      <Handle
        type="source"
        id="2"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="decisionBottom"
      />
    </div>
  );
};

DecisionNode.displayName = "DecisionNode";

export default memo(DecisionNode);
