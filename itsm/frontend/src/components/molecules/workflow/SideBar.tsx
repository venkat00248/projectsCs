import React from 'react';
import { useTranslation } from "react-i18next";

export const  SideBar = () => {
  const { t } = useTranslation();
  const onDragStart = (event:any, nodeType:any) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">{t("You can drag these nodes to the pane on the right.")}</div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'inputnode')} draggable>
        {t("Input Node")}
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'action')} draggable>
        {t("Action Node")}
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'outputnode')} draggable>
        {t("Output Node")}
      </div>
      <div className="dndnode decision" onDragStart={(event) => onDragStart(event, 'decision')} draggable>
        Decision
      </div>
    </aside>
  );
};
