export const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

export const filters = [
  { label: "Все продукты", id: "0" },
  { label: "Продукт 1", id: "1" },
  { label: "Продукт 2", id: "2" },
];

export const optionsDiagram = {
  maintainAspectRatio: false,
  aspectRatio: 0.5,
  plugins: {
    legend: {
      labels: {
        fontColor: "black",
      },
      position: "bottom",
      onClick: null,
    },
  },
  scales: {
    x: {
      ticks: {
        color: "black",
        font: {
          weight: 500,
        },
      },
    },
    y: {
      ticks: {
        color: "black",
      },
    },
  },
};

export const products = ['Продукт 1', 'Продукт 2']
