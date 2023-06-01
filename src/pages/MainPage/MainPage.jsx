import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import BasicSelect from "../../components/Select/Select";
import { months, filters, options } from "../../constants/constants";
import { Diagram } from "../../components/Diagram/Diagram";
import { getData } from "../../utils/utils";

import { style } from "./style";

import { Bar, getElementAtEvent } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const MainPage = () => {
  const [filter, setFilter] = useState(filters[0]);
  const [data, setData] = useState(null);
  const [factoryA, setFactoryA] = useState(null);
  const [factoryB, setFactoryB] = useState(null);

  const chartRef = useRef();

  useEffect(() => {
    axios.get("http://localhost:3001/products").then(({ data }) => {
      const factoryA = data.filter((item) => item.factory_id === 1);
      const factoryB = data.filter((item) => item.factory_id === 2);
      setData(getData(factoryA, factoryB));
      setFactoryA(factoryA);
      setFactoryB(factoryB);
    });
  }, []);

  const handleChange = (value) => {
    setFilter(value)
  };

  useEffect(() => {
    if (Boolean(factoryA) && Boolean(factoryB)) {
      setData(getData(factoryA, factoryB, filter));
    }
  }, [filter, factoryA, factoryB]);
  console.log('data', data)
  return (
    <div style={style.container}>
      <div style={style.filter}>
        <h4>Фильтр по типу продукции</h4>
        <BasicSelect onChange={handleChange} />
      </div>
      <div style={style.diagram}>
        {data ? <Bar options={options} data={data} ref={chartRef} /> : null}
      </div>
    </div>
  );
};
