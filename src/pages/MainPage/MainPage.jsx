import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import BasicSelect from "../../components/Select/Select";
import { months, filters } from "../../constants/constants";
import { Diagram } from "../../components/Diagram/Diagram";
import { getData } from "../../utils/utils";

import { style } from "./style";

import { getElementAtEvent } from "react-chartjs-2";

const savedFilter = JSON.parse(localStorage.getItem("filter"));

export const MainPage = () => {
  const [filter, setFilter] = useState(savedFilter ?? filters[0]);
  const [data, setData] = useState(null);
  const [factoryA, setFactoryA] = useState(null);
  const [factoryB, setFactoryB] = useState(null);
  const [firstProductData, setFirstProductData] = useState(null);
  const [secondProductData, setSecondProductData] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState("all");

  const navigate = useNavigate();

  const handleClickNavigate = useCallback(
    (event, ref) => {
      const clickfactory = getElementAtEvent(ref.current, event)?.[0];
      if (clickfactory) {
        const factory_id = clickfactory.datasetIndex + 1;
        const month = clickfactory.index + 1;
        navigate(`/details/${factory_id}/${month}`);
      }
    },
    [navigate]
  );

  const monthsProductData = useCallback(
    (factoryData) =>
      months.map((_, i) => {
        const selectedMonth = factoryData?.filter(
          (item) => item.date?.split("/")[1] === String(i + 1)
        );
        let sum = 0;
        selectedMonth?.forEach((element) => {
          if (selectedProduct === "first") {
            sum += element.product1;
          } else if (selectedProduct === "second") {
            sum += element.product2;
          } else {
            sum += element.product1 + element.product2 + element.product3;
          }
        });
        return Number(sum / 1000).toFixed(3);
      }),
    [selectedProduct]
  );

  const putFactorysData = useCallback(
    (factoryAProducts, factoryBProducts) => {
      setFirstProductData(monthsProductData(factoryAProducts));
      setSecondProductData(monthsProductData(factoryBProducts));
    },
    [monthsProductData]
  );

  useEffect(() => {
    axios.get("http://localhost:3001/products").then(({ data }) => {
      const factoryA = data.filter((item) => item.factory_id === 1);
      const factoryB = data.filter((item) => item.factory_id === 2);
      setData(getData(factoryA, factoryB));
      setFactoryA(factoryA);
      setFactoryB(factoryA);
    });
  }, []);

  const onChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  return (
    <div style={style.container}>
      <div style={style.filter}>
        <h4>Фильтр по типу продукции</h4>
        <BasicSelect onChange={onChange} />
      </div>
      <div style={style.diagram}>
        {factoryA && factoryB && (
          <Diagram
            data={data}
            monthsNames={months}
            handleClickNavigate={handleClickNavigate}
          />
        )}
      </div>
    </div>
  );
};
