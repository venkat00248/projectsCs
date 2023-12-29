import { memo, useContext } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import './ActionNode.scss'
const ActionNode = ({
  data,
  isConnectable
}: NodeProps) => {
  return (
    <div className="text-updater-node">
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        id="4"
      />
      <Handle
        type="target"
        id="1"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <div className="actionNode">
      {data?.label}
      </div>
      <Handle
        type="source"
        id="1"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        id="2"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
};

ActionNode.displayName = "ActionNode";

export default memo(ActionNode);
