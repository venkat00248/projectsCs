import React, { useEffect } from 'react';
import * as echarts from 'echarts';

interface ChartProps {
  options: any;
  id: string;
  styleData: any;
}

export const Charts: React.FC<ChartProps> = ({ options, id, styleData }) => {
  useEffect(() => {
    const myChartContainer = document.getElementById(id);

    if (myChartContainer) {
      const myChart = echarts.init(myChartContainer);

      // Use the options passed as prop
      myChart.setOption(options);

      // add an event listener to the window to resize the chart
      const resizeHandler = () => {
        myChart.resize();
      };
      window.addEventListener('resize', resizeHandler);

      return () => {
        window.removeEventListener('resize', resizeHandler);
        myChart.dispose();
      };
    }
  }, [options]);

  return <div id={id} style={styleData}></div>;
};
