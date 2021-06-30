import React from "react";
import OrganizationChart from "@dabeng/react-orgchart";

import EmployeeCard from "./EmployeeCard";

const DragDropChart = ({ hierarchy }) => {
  return (
    <OrganizationChart
      datasource={hierarchy}
      draggable={true}
      collapsible={false}
      NodeTemplate={({ nodeData }) => {
        const selectNode = () => {
          console.log(
            nodeData.name +
              " - " +
              nodeData.designation +
              ", from " +
              nodeData.team +
              " team."
          );
        };
        return (
          <div onClick={selectNode}>
            <EmployeeCard {...nodeData} />
          </div>
        );
      }}
    />
  );
};

export default DragDropChart;
