import { months } from "../constants/constants";

export const getDataByMonth = (fabr, filter) => {
    return months.map((item, i) => {
      return +(fabr.reduce((acc, fab) => {
        if (fab.date?.split('/')[1] === String(i + 1)) {
          if (filter === '1') {
            return acc + fab.product1
          }
          if (filter === '2') {
            return acc + fab.product2
          }
          return acc + fab.product1 + fab.product2 + fab.product3
        }
        return acc;
      }, 0) / 1000).toFixed(3);
    })
  }

export const getData = (fabricOne, fabricTwo, filter) => {
    const dataFabricOne = getDataByMonth(fabricOne, filter)
    const dataDabricTwo = getDataByMonth(fabricTwo, filter)
    return {
      labels: months,
      datasets: [
          {
              label: 'Фабрика А',
              backgroundColor: 'red',
              borderColor: 'red',
              data: dataFabricOne
          },
          {
              label: 'Фабрика Б',
              backgroundColor: 'blue',
              borderColor: 'blue',
              data: dataDabricTwo
          }
      ]
    };
}