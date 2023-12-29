import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";

const CustomNode = ({
  data,
  isConnectable,
  targetPosition = Position.Top,
  sourcePosition = Position.Bottom
}: NodeProps) => {
  return (
    <div className="text-updater-node">
      {/* <Handle
        type="target"
        position={targetPosition}
        isConnectable={isConnectable}
        id="4"
      /> */}
      <Handle
        type="target"
        id="3"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      {data?.label}
      <Handle
        type="source"
        id="1"
        position={Position.Right}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        id="2"
        position={Position.Left}
        isConnectable={isConnectable}
      />
    </div>
  );
};

CustomNode.displayName = "CustomNode";

export default memo(CustomNode);
