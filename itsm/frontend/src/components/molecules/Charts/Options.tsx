export const signOptions = (data: any) => ({
  title: {
    text: "Ticket Status",
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c}"
  },
  legend: {
    orient: 'vertical',
    left:"left",
    top: "12%"
  },
  xAxis: {
    type: "category",
    name: "x",
    splitLine: { show: false },
    data: ["Open", "Close", "SLA"]
  },
  grid: {
    left: "7%",
    right: "65%",
    bottom: "40%",
    containLabel: true
  },
  yAxis: {
    type: "log",
    name: "y",
    minorSplitLine: {
      show: true
    }
  },
  series: [
    {
      name: "Log2",
      type: "line",
      data: data.series1
    },
    {
      name: "Log3",
      type: "line",
      data: data.series2
    },
    {
      name: "Log1/2",
      type: "line",
      data: data.series3
    }
  ]
});

export const pieOptions = (data: any, lang?:any) => {
  let title;
  if(lang !== null && data?.text !== undefined) {
    const parts = data?.text.split(' ');
    // Extract the phrases
    const startDate = parts.slice(4,5).join(' '); // 'Start Date'
    const endDate = parts.slice(6, 7).join(' '); // 'End Date'
    if(lang.value == 'hindi') {
      title = `पिछले सप्ताह के आंकड़े  ${startDate} को ${endDate}`;
    } else {
      title = `Last week data from  ${startDate} to ${endDate}`;
    }
  }

  return(
    {color: ['#ee6666', '#5470c2', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#5470c2', '#ea7ccc'],
    tooltip: {},
     // enable the chart to resize when the window is resized
    animation: true,
    animationDurationUpdate: 1000,
    animationEasingUpdate: "cubicInOut",
    // enable the chart to resize when the window is resized
    grid: {
      left: "0%",
      right: "0%",
      bottom: "0%",
      containLabel: true,
    },
    // legend: {
    //   data: data.xaxis,
    //   orient: 'vertical',
    //   left:"left",
    //   top: "8%"
    // },
    title: {
      text: title,
      left: 'center',
      top:'1%'
    },  
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '70%',
        top:'7%',
        center: ['50%', '48%'],
        data: data.pieSeries,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]}
  )
};

export const   barOptions =(data: any) => ({
  title: {
    text: 'Bar Chart',
  },
  tooltip: {},
  grid: {
    left: '5%',
    right: '65%',
    bottom: '45%',
    top: '9%',
    containLabel: false
  },
  xAxis: {
    type: 'category',
    data: ['Open', 'Close', 'SLA']
  },
  yAxis: {
    type: 'value',
    axisLine: {
      show: true
    },
  },
  series: [
    {
      name: 'Ticket status',
      type: 'bar',
      center: ['17%', '25%'],
      data: [
        {name: "Open", value: "10"}, 
        {name: "Close", value: "30"}, 
        {name: "SLA", value: "5"}
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ],
});