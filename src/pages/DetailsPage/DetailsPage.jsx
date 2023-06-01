import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { style } from "./style";

import { Circle } from "../../components/Circle/Circle";
import { getProductData } from "../../utils/utils";
import { months } from "../../constants/constants";

ChartJS.register(ArcElement, Tooltip, Legend);

export const DetailsPage = () => {
  const { factory_id, month } = useParams();
  const [data, setChartData] = useState(null);

  const factoryName = factory_id === '1' ? 'А' : 'Б';

  const nameOfMonth = months[month - 1]
  useEffect(() => {
    axios
      .get(`http://localhost:3001/products?factory_id=${factory_id}`)
      .then(({ data: product }) => {
        const fabr = product.filter((item) => item.date?.split("/")[1] === month);
        setChartData(getProductData(fabr));
      });
  }, [factory_id, month]);

  return (
    <div style={style.wrap}>
      <div>
        <h4>
        Статистика по продукции фабрики {factoryName} за {nameOfMonth}
        </h4>
      </div>
      <div style={style.circle}>
        <Circle data={data} />
      </div>
    </div>
  );
};
