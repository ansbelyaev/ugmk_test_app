import React, { useState, useEffect } from "react";

import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { months } from "../../constants/constants";
import { getProductData } from "../../utils/utils";
import { useParams } from "react-router-dom";
import { Circle } from "../../components/Circle/Circle";

import style from "./style.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export const DetailsPage = () => {
  const { factory_id, month: monthNumber } = useParams();
  const [chartData, setChartData] = useState(null);

  const factory = factory_id === "1" ? "А" : "Б";

  const selectedMonth = months[monthNumber - 1];

  useEffect(() => {
    axios
      .get(`http://localhost:3001/products?factory_id=${factory_id}`)
      .then(({ data: products }) => {
        const fabr = products.filter(
          ({ date }) => new Date(Date.parse(date)).getMonth() === +monthNumber
        );
        setChartData(getProductData(fabr));
      });
  }, [factory_id, monthNumber]);

  return (
    <div className={style.wrap}>
      <div>
        <h4>
          Статистика по продукции фабрики {factory} за {selectedMonth}
        </h4>
      </div>
      <div className={style.circle}>
        <Circle data={chartData} />
      </div>
    </div>
  );
};
