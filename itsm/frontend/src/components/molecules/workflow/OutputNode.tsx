import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import './ActionNode.scss'
const OutputNode = ({
  data,
  isConnectable
}: NodeProps) => {
  return (
    <div className="text-updater-node">
      <div className="actionNode">
      {data?.label}
      </div>
      <Handle
        type="target"
        id="1"
        position={Position.Left}
        isConnectable={isConnectable}
      />
    </div>
  );
};

OutputNode.displayName = "OutputNode";

export default memo(OutputNode);
