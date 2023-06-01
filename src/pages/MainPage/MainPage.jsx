import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import BasicSelect from "../../components/Select/Select";
import { months } from '../../constants/constants';
import { Diagram } from "../../components/Diagram/Diagram"

import { style } from "./style";

import { getElementAtEvent } from 'react-chartjs-2';

export const MainPage = () => {
  // const [filter, setFilter] = useState(null);
  const [factoryA, setFactoryA] = useState(null);
  const [factoryB, setFactoryB] = useState(null);
  const [firstProductData, setFirstProductData] = useState(null);
  const [secondProductData, setSecondProductData] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState('all');

  // const options = {
  //   maintainAspectRatio: false,
  //   aspectRatio: 0.5,
  //   plugins: {
  //       legend: {
  //           labels: {
  //               fontColor: 'black',
  //           },
  //           position: 'bottom',
  //           onClick: null
  //       }
  //   },
  //   scales: {
  //       x: {
  //           ticks: {
  //               color: 'black',
  //               font: {
  //                   weight: 500
  //               }
  //           }
  //       },
  //       y: {
  //           ticks: {
  //               color: 'black'
  //           }
  //       }
  //   }
  // };

  const navigate = useNavigate();
  // const filterRef = useRef(); 

  // const onClick = (event) => {
  //   const [clickFabric] = getElementAtEvent(filterRef.current, event)
  //   if (!clickFabric) return;

  //   const factory_id = clickFabric.datasetIndex + 1;
  //   const month = clickFabric.index + 1;
  //   navigate(`/details/${factory_id}/${month}`);
  // }

  const handleClickNavigate = useCallback((event, ref) => {
    const clickfactory = getElementAtEvent(ref.current, event)?.[0];
    if (clickfactory) {
      const factory_id = clickfactory.datasetIndex + 1;
      const month = clickfactory.index + 1;
      navigate(`/details/${factory_id}/${month}`);
    }
  }, [navigate]);

  const monthsProductData = useCallback((factoryData) => months.map((_, i) => {
    const selectedMonth = factoryData?.filter(item => item.date?.split('/')[1] === String(i + 1));
    let sum = 0;
    selectedMonth?.forEach(element => {
      if (selectedProduct === 'first') {
        sum += element.product1;
      } else if (selectedProduct === 'second') {
        sum += element.product2;
      } else {
        sum += element.product1 + element.product2 + element.product3;
      }
    });
    return Number(sum / 1000).toFixed(3);
  }), [selectedProduct]);

  const putFactorysData = useCallback((factoryAProducts, factoryBProducts) => {
    setFirstProductData(monthsProductData(factoryAProducts));
    setSecondProductData(monthsProductData(factoryBProducts));
  }, [monthsProductData])

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((response) => response.json())
      .then((data) => {
        setFactoryA(data?.filter((item) => item.factory_id === 1));
        setFactoryB(data?.filter((item) => item.factory_id === 2));
      });
      putFactorysData(factoryA, factoryB);
  }, [factoryA, factoryB, putFactorysData]);

  const onChange = (event) => {
    setSelectedProduct(event.target.value);
  }

  return (
    <div style={style.container}>
      <div style={style.filter}>
        <h4>Фильтр по типу продукции</h4>
        <BasicSelect onChange={onChange} />
      </div>
      <div style={style.diagram}>
      {(factoryA && factoryB) && (
          <Diagram
            firstProductData={firstProductData}
            secondProductData={secondProductData}
            monthsNames={months}
            handleClickNavigate={handleClickNavigate}
          />
        )}
      </div>
    </div>
  );
};
