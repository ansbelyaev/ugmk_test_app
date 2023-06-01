import React, { useState, useEffect, useCallback } from "react";

import { useParams } from "react-router-dom";

import { Circle } from "../../components/Circle/Circle";

import { months } from "../../constants/constants";

export const DetailsPage = () => {
  const [product, setProduct] = useState(null);
  const [chartData, setChartData] = useState(null);

  const { factory_id, month } = useParams();

  const factoryName = factory_id === "1" ? "А" : "Б";
  const products = ["Продукт 1", "Продукт 2"];

  const nameOfMonth = months[month - 1];

  const getProductData = useCallback(
    (factory) => {
      const oneProduct = products.map((_, index) => {
        return Number(
          factory.reduce((acc, factory) => {
            if (index === 0) return acc + factory.product1;
            else return acc + factory.product2;
          }, 0) / 1000
        ).toFixed(3);
      });
      return oneProduct;
    },
    [products]
  );

  useEffect(() => {
    fetch(`http://localhost:3001/products?factory_id=${factory_id}`).then(
      ({ data }) => {
        const fabr = data.filter((item) => item.date?.split("/")[1] === month);
        console.log(getProductData(fabr));
        setChartData(getProductData(fabr));
      }
    );
  }, [getProductData, factory_id, month]);

  return (
    <div className="statistic-page">
      <h4>
        Статистика по продукции фабрики {factoryName} за {nameOfMonth}
      </h4>
      <div className="circle-diagram">
        <Circle product={chartData} />
      </div>
    </div>
  );
};
