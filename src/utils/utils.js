import { months, products } from "../constants/constants";

export const getDataByMonth = (factory, filter) => {
    return months.map((item, i) => {
      return Number(factory.reduce((acc, factory) => {
        if (factory.date?.split('/')[1] === String(i + 1)) {
          if (filter === '1') {
            return acc + factory.product1
          } else if (filter === '2') {
            return acc + factory.product2
          }
          return acc + factory.product1 + factory.product2 + factory.product3
        }
        return acc;
      }, 0) / 1000).toFixed(3);
    })
  }

export const getData = (factoryOne, factoryTwo, filter) => {
    const data1 = getDataByMonth(factoryOne, filter)
    const data2 = getDataByMonth(factoryTwo, filter)
    return {
      labels: months,
      datasets: [
          {
              label: 'Фабрика А',
              backgroundColor: 'red',
              borderColor: 'red',
              data: data1
          },
          {
              label: 'Фабрика Б',
              backgroundColor: 'blue',
              borderColor: 'blue',
              data: data2
          }
      ]
    };
}

export const getProductData = (factory) => {
  const product = products.map((_, i) => {
    return Number(factory.reduce((acc, factory) => {
      if (i === 0) return acc + factory.product1;
      else return acc + factory.product2;
    }, 0) / 1000).toFixed(3);
  });
  return product;
}