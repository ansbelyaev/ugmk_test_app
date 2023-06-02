import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { getData } from "../../utils/utils";
import BasicSelect from "../../components/Select/Select";
import { filters, optionsDiagram } from "../../constants/constants";

import { style } from "./style";

import { Bar, getElementAtEvent } from "react-chartjs-2";
import {
  Title,
  Legend,
  Tooltip,
  BarElement,
  LinearScale,
  CategoryScale,
  Chart as ChartJS,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const savedData = localStorage.getItem('filter');

export const MainPage = () => {
  const [filter, setFilter] = useState(savedData ?? filters[0].id);
  const [data, setData] = useState(null);
  const [factoryA, setFactoryA] = useState(null);
  const [factoryB, setFactoryB] = useState(null);
  const navigate = useNavigate();
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

  const onClick = (event) => {
    const [clickFabric] = getElementAtEvent(chartRef.current, event)
    if (!clickFabric) return;

    const factory_id = clickFabric.datasetIndex + 1;
    const month = clickFabric.index + 1;
    navigate(`/details/${factory_id}/${month}`);
  }

  return (
    <div style={style.container}>
      <div style={style.filter}>
        <h4>Фильтр по типу продукции</h4>
        <BasicSelect actualValue={savedData} onChange={handleChange} />
      </div>
      <div style={style.diagram}>
        {data ? <Bar options={optionsDiagram} data={data} onClick={onClick} ref={chartRef} /> : null}
      </div>
    </div>
  );
};
