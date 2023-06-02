import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { getData } from "../../utils/utils";
import FilterSelect from "../../components/Select/FilterSelect";
import { filters, optionsDiagram } from "../../constants/constants";

import style from "./style.module.css";

import { Bar, getElementAtEvent } from "react-chartjs-2";
import {
  Title,
  Legend,
  Tooltip,
  BarElement,
  LinearScale,
  CategoryScale,
  Chart as ChartJS,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const savedData = localStorage.getItem("filter");

export const MainPage = () => {
  const [filterId, setFilterId] = useState(savedData ?? filters[0].id);
  const [diagramData, setDiagramData] = useState(null);
  const [factoryA, setFactoryA] = useState(null);
  const [factoryB, setFactoryB] = useState(null);
  const navigate = useNavigate();
  const chartRef = useRef();

  useEffect(() => {
    axios.get("http://localhost:3001/products").then(({ data: products }) => {
      const factoryA = products.filter(({ factory_id }) => factory_id === 1);
      const factoryB = products.filter(({ factory_id }) => factory_id === 2);
      setDiagramData(getData(factoryA, factoryB));
      setFactoryA(factoryA);
      setFactoryB(factoryB);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("filter", filterId);

    if (Boolean(factoryA) && Boolean(factoryB)) {
      setDiagramData(getData(factoryA, factoryB, filterId));
    }
  }, [filterId, factoryA, factoryB]);

  const onClick = (event) => {
    const [clickFabric] = getElementAtEvent(chartRef.current, event);
    if (!clickFabric) return;

    const factory_id = clickFabric.datasetIndex + 1;
    const month = clickFabric.index + 1;
    navigate(`/details/${factory_id}/${month}`);
  };

  return (
    <div className={style.container}>
      <div className={style.filter}>
        <h4>Фильтр по типу продукции</h4>
        <FilterSelect
          filterId={filterId}
          onChange={setFilterId}
        />
      </div>
      <div className={style.diagram}>
        {diagramData && (
          <Bar
            options={optionsDiagram}
            data={diagramData}
            onClick={onClick}
            ref={chartRef}
          />
        )}
      </div>
    </div>
  );
};
