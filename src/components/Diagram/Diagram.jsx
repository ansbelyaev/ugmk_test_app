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
  const ref = useRef();
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
