import { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useTranslation } from "react-i18next";
export const Tabsview = ({ ticket, componentMap, tabs }: any) => {
  // console.log(componentMap,tabs)
  const [Tabsitem, settabsitem]: any = useState(tabs?.Tabsdata);
  const [activeKey, setActiveKey]: any = useState(Tabsitem[0].id);
  const { t } = useTranslation();
  const handleTabClick = (key: any) => {
    setActiveKey(key);
  };

  return (
    <div>
      <Tabs activeKey={activeKey} onSelect={handleTabClick}>
        {Tabsitem.map((tabitem: any) => {
          const Component: any = componentMap[tabitem.name];
          return (
            <Tab key={tabitem.id} eventKey={tabitem.id} title={t(tabitem.text)}>
              <Tab.Content>
              <Component ticket = {ticket} />
              </Tab.Content>
            </Tab>
          );
        })}
      </Tabs>
    </div>
  );
};
export default Tabsview;
