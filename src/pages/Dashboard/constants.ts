export const chartTypesMapping = {
  line: 'line',
  columnStacked: 'bar',
  bar: 'bar',
  pie: 'pie',
  donut: 'pie',
};

export const chartsColors = ['#B09280', '#EAE62F', '#698AC5', '#262626', '#F2A900', '#FF6B6B', '#4CAF50', '#FF9800'];

export const getChartTitleStr = (key: string) => {
  return key
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2') // insert space between lowercase and uppercase
    .replace(/^./, (char) => char.toUpperCase());
};

export const getChartTitle = (key: string) => {
  return {
    text: getChartTitleStr(key),
    left: 'center',
    textStyle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  };
};
