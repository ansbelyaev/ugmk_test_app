import React from "react";

import { Pie } from "react-chartjs-2";

const options = {
  plugins: {
    legend: {
      position: "bottom",
    },
    tooltips: {
      enabled: false,
    },
  },
};

export const Circle = ({ data }) => {
  const pieData = {
    labels: ["Продукт 1", "Продукт 2"],
    datasets: [
      {
        data,
        backgroundColor: ["green", "orange"],
        hoverBackgroundColor: ["green", "orange"],
      },
    ],
  };

  const pieDiagram = (
    <Pie
      options={options}
      data={pieData}
    />
  );
  return pieDiagram;
};
