export const months = [
  "Янв",
  "Фев",
  "Март",
  "Апр",
  "Май",
  "Июнь",
  "Июль",
  "Авг",
  "Сент",
  "Окт",
  "Нояб",
  "Дек",
];
export const filters = [
  { label: "Все продукты", id: "0" },
  { label: "Продукт 1", id: "1" },
  { label: "Продукт 2", id: "2" },
];
export const options = {
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
