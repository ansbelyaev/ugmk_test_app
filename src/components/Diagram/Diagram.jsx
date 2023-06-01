import React, { useRef } from "react";

import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
);

export const Diagram = ({
  data,
  monthsNames,
  handleClickNavigate,
}) => {
  console.log(data)
  const ref = useRef();
  // const barChartData = {
  //   labels: monthsNames,
  //   datasets: [
  //     {
  //       data: firstProductData,
  //       label: 'Фабрика А',
  //       borderColor: "#3333ff",
  //       backgroundColor: "rgb(254, 0, 3)",
  //     },
  //     {
  //       data: secondProductData,
  //       label: 'Фабрика Б',
  //       borderColor: "#ff3333",
  //       backgroundColor: "#0100FE",
  //     }
  //   ]
  // };

  return (
    <Bar
      type="bar"
      width={130}
      height={50}
      options={{
        plugins: {
          legend: {
            position: 'bottom',
          }
        },
      }}
      onClick={(e) => handleClickNavigate(e, ref)}
      data={data}
      ref={ref}
    />
  );
};
