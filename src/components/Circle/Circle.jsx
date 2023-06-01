import React from "react";

import { Pie } from "react-chartjs-2";

export const Circle = ({ data }) => {
  const pieDiagramData = {
    labels: ["Продукт 1", "Продукт 2"],
    datasets: [{
      data,
      backgroundColor: ["#008001", "#FEA500"],
      hoverBackgroundColor: ["#008001", "#FEA500"]
    }]
  };

  const pieDiagram = (
    <Pie
      options={{
        plugins: {
          legend: {
            position: 'bottom',
          },
          tooltips: {
            enabled: false
          },
        }
      }}
      data={pieDiagramData}
    />
  );
  return pieDiagram;
};

