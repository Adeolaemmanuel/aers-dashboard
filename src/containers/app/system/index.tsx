import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import Stages from "./stages";
import Designation from "./designation";
import React from "react";
import EditAndUpdate from "./editAndUpdate";

const system = [
  {
    label: "Stages",
    value: "stages",
    Component: Stages,
  },
  {
    label: "Designation",
    value: "designation",
    Component: Designation,
  },
];

const System: React.FC<ViewSystemProps> = ({}) => {
  const [showModal, setShowModal] = React.useState(false);
  const [dto, setDto] = React.useState<any>();
  const [systemVal, setSystemVal] = React.useState<System>();

  return (
    <React.Fragment>
      <Tabs value="html">
        <TabsHeader>
          {system.map(({ label, value }) => (
            <Tab key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {system.map(({ value, Component }) => (
            <TabPanel key={value} value={value}>
              <Component
                handleClick={(val) => {
                  setSystemVal(value as System);
                  if (typeof val === "object") {
                    setShowModal(val.show);
                    delete val.show;
                    setDto(val);
                  }
                  if (typeof val === "boolean") {
                    setShowModal(val);
                    setDto('')
                  }
                }}
              />
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
      <EditAndUpdate
        open={showModal}
        dto={dto}
        system={systemVal!}
        handleClick={() => setShowModal(!showModal)}
      />
    </React.Fragment>
  );
};

export default System;
