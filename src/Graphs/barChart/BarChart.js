import ReactECharts from 'echarts-for-react';
import { useState } from 'react';
import styles from './barChart.module.scss';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip } from 'recharts';
import toCurrencyAmount from '../../Helpers/toCurrencyAmount';
export default function BarChart1(){

  const options = {
    grid: { top: 20, right: 40, bottom: 20, left: 40 },
    xAxis: {
      type: "category",
      data: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
      // removes grid-lines in x-axis
      splitLine:{show:false}
    },
    yAxis: {
      type: "value",
      data: [300, 400, 500, 600, 700],
      // removes grid-lines in y-axis
      splitLine:{show:false},
    },
    series: [
      {
        data: [400, 300, 350, 200, 280],
        type: "bar",
        smooth: true
      }
    ],
    tooltip: {
      // trigger object shows dashedLine vertically
      // trigger: "axis"
    }
  }
  return (
      <div className='w-full bg-white'>
        <ReactECharts
        // style={{width:'700px',height:'400px'}}
        style={{width:'100%',height:'400px'}}
        option={options}
        // notMerge={true}
        // lazyUpdate={true}
        // theme={"theme_name"}
        // onChartReady={this.onChartReadyCallback}
        // onEvents={EventsDict}
        // opts={}
         />
      </div>
  );
}

// custom tooltip bar graph
export function BarGraphComponent({ barGraphData }) {
  const CustomTooltip = (data) => {
    const { active, payload, label } = data;
    if (active && payload && payload.length) {
      return (
        <div
          style={{ backgroundColor: `${payload[0].payload.color}` }}
          className={`relative outline-none rounded-[10px] min-w-[76px] min-h-[70px] flex flex-col items-center justify-between pb-[8px] gap-[1px] ${styles.customTooltip}`}
        >
          <span
            className={`border-b w-full justify-center items-center flex flex-col text-[12px] leading-[18px] text-ibgy1 tracking-[0.19px]`}
          >
            {`${payload[0].payload.name}`}
            {/* <span className="bg-ibwhite h-[1px] w-[74%]" /> */}
          </span>
          <span
            className={`text-[12px] leading-[18px] text-ibgy1 tracking-[0.19px]`}
          >{`$${toCurrencyAmount(payload[0].value)}`}</span>
          <span
            className={`text-[12px] leading-[18px] text-ibgy1 tracking-[0.19px]`}
          >
            {payload[0]?.payload?.totalOrders} Orders
          </span>
          <span
            style={{ backgroundColor: `${payload[0].payload.color}` }}
            className={`absolute bottom-[-6px] rotate-[45deg] w-[13px] h-[13px] rounded-[2px]`}
          />
        </div>
      );
    }
    return null;
  };
  
  const CustomizedLabel = (props) => {
    const { x, y, fill, value, width, height } = props;
    let res;
    for (let i = 0; i < barGraphData.length; i++) {
      if (barGraphData[i].amt === value) {
        res = barGraphData[i].totalOrders;
      }
    }
    const dxLength = (res)=>{
      let size= 0;
      switch(`${res}`.length){
        case 1:
         size = 25;
         break
        case 2:
          size = 20;
          break
        case 3:
          size = 23;
          break
        default:
          size=10
      }
      return size;
    }
    return (
      <text
        x={x}
        y={y}
        // dy={-6}
        dy={Math.round(height/2)}
        dx={dxLength(res)}
        fontSize="14"
        // fontFamily="sans-serif"
        fill="#000"
        textAnchor="middle"
      >
        {res}
      </text>
    );
  };
  let [posData, setposData] = useState({});

  const formatYAxis = (tickitem) => {
    // tickitem comes as amount/value of that axis
    return `$${toCurrencyAmount(tickitem)}`;
  };

  return (
    <BarChart
      className={`mt-14 ${styles.rechartsWrapper}`}
      width={900}
      height={350}
      data={barGraphData}
      // barCategoryGap={data.length >= 7 ? '20%' : '25%'}
      margin={{
        top: 0,
        right: 0,
        left: 17,
        bottom: 0
      }}
    >
      <XAxis
        dataKey="name"
        tickLine={!true}
        tick={{ show: false, fontSize: 14 }}
      />
      <YAxis
        // domain={[0, 5000]}
        // hide
        tickLine={!true}
        tick={{ show: false, fontSize: 14 }}
        tickFormatter={formatYAxis}
      />
      <Tooltip
        content={<CustomTooltip data={barGraphData} />}
        cursor={false}
        position={{ x: posData.x - 12, y: posData.y - 80 }}
        wrapperStyle={{ outline: 'none' }}
      />
      <Bar
        dataKey="uv"
        barSize={50}
        // fill="#8884d8"
        // background
        label={<CustomizedLabel />}
        onMouseOver={(data) => {
          setposData(data);
        }}
        // position="right"
      >
        {barGraphData.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={barGraphData[index].color}
            position="right"
          />
        ))}
      </Bar>
    </BarChart>
  );
}

BarGraphComponent.propTypes = {
  barChartData: PropTypes.shape({
    length: PropTypes.any
  })
};



export function ApexBarChart() {
  const [apexChartData, setApexChartData] = useState([
    {
      category: 'Movies',
      totolOrders: 7,
      totalAmount: 6000
    },
    {
      category: 'Retail',
      totolOrders: 4,
      totalAmount: 1200
    },
    {
      category: 'Hotels',
      totolOrders: 2,
      totalAmount: 4300
    },
    {
      category: 'E-Zone',
      totolOrders: 3,
      totalAmount: 3000
    },
    {
      category: 'Travel',
      totolOrders: 1,
      totalAmount: 900
    },
    {
      category: 'Food',
      totolOrders: 4,
      totalAmount: 2100
    }
  ]);

  const options = {
    stroke: {
      show: !true,
      curve: 'smooth',
      lineCap: 'butt',
      colors: undefined,
      width: 2,
      dashArray: 0
    },
    chart: {
      id: 'apexchart-example-BarChart',
      toolbar: {
        show: !true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true | '<img src="/static/icons/reset.png" width="20">',
          customIcons: []
        },
        export: {
          csv: {
            filename: undefined,
            columnDelimiter: ',',
            headerCategory: 'category',
            headerValue: 'value',
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString();
            }
          },
          svg: {
            filename: undefined
          },
          png: {
            filename: undefined
          }
        },
        autoSelected: 'zoom'
      }
    },
    grid: {
      show: !true, // you can either change hear to disable all grids,
      strokeDashArray: 0,
      xaxis: {
        lines: {
          show: true //or just here to disable only x axis grids
        },
        axisBorder: {
          show: true,
          color: 'black',
          height: 3,
          width: '100%',
          offsetX: 1,
          offsetY: 1
        }
      },
      yaxis: {
        show: true,
        showAlways: true,
        showForNullSeries: true,
        seriesName: undefined,
        opposite: false,
        reversed: false,
        logarithmic: false,
        logBase: 10,
        tickAmount: 6,
        min: 6,
        max: 6,
        forceNiceScale: false,
        floating: false,
        decimalsInFloat: undefined,
        labels: {
          show: true,
          align: 'right',
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [],
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-yaxis-label'
          },
          offsetX: 0,
          offsetY: 0,
          rotate: 0
          //   formatter: (value) => {
          //     return val;
          //   }
        },
        axisBorder: {
          show: true,
          color: '#78909C',
          offsetX: 0,
          offsetY: 0
        },
        axisTicks: {
          show: true,
          borderType: 'solid',
          color: '#78909C',
          width: 6,
          offsetX: 0,
          offsetY: 0
        },
        title: {
          text: undefined,
          rotate: -90,
          offsetX: 0,
          offsetY: 0,
          style: {
            color: undefined,
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            cssClass: 'apexcharts-yaxis-title'
          }
        },
        crosshairs: {
          show: true,
          position: 'back',
          stroke: {
            color: '#b6b6b6',
            width: 1,
            dashArray: 0
          }
        },
        tooltip: {
          enabled: true,
          offsetX: 0
        }
      }
    },
    xaxis: {
      categories: apexChartData?.map((item) => item.category),
      //   categories: []
      labels: {
        show: true,
        style: {
          colors: ['#000'],
          fontSize: '10px',
          fontWeight: 400,
          fontFamily: 'kanit',
          cssClass: `${styles.apexchartsXaxisLabel}`
        }
      },
      position: 'bottom',
      axisBorder: {
        show: true,
        color: '#404040',
        height: 4,
        width: '0.15%',
        offsetX: 0,
        offsetY: 0
      },
      axisTicks: {
        show: !true,
        borderType: 'solid',
        color: '#78909C',
        width: 6,
        offsetX: 0,
        offsetY: 0
      }
    },
    yaxis: {
      labels: {
        show: true,
        align: 'right',
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: ['#000'],
          fontSize: '10px',
          fontWeight: 400,
          fontFamily: 'kanit'
          //   cssClass: 'apexcharts-yaxis-label'
        },
        offsetX: 0,
        offsetY: 0,
        rotate: 0,
        formatter: (value, index) => {
          return `$${value ? amountFormat(value) : '0.00'}`;
        }
      },
      axisBorder: {
        show: true,
        color: '#404040',
        height: 4,
        width: '0.15%',
        offsetX: 0,
        offsetY: 0
      },
      axisTicks: {
        show: !true,
        borderType: 'solid',
        color: '#78909C',
        width: 6,
        offsetX: 0,
        offsetY: 0
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#000'], //puts color for dataLabel's value
        fontSize: '10px',
        fontWeight: 'medium'
      },
      formatter: function (val, opt) {
        // return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val;
        return apexChartData[opt.dataPointIndex].totolOrders;
      },
      offsetX: 0 //aligns the dataLabel's value in x-axis
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 0,
        borderRadiusApplication: 'around',
        borderRadiusWhenStacked: 'last',
        columnWidth: '50%',
        barHeight: '70%',
        distributed: true, //returns each bar with individual colors
        rangeBarOverlap: true,
        rangeBarGroupRows: false,
        colors: {
          ranges: [
            {
              from: 0,
              to: 0,
              color: undefined
            }
          ],
          //   backgroundBarColors: ['red', 'blue', 'green'],
          backgroundBarColors: [],
          backgroundBarOpacity: 0.5,
          backgroundBarRadius: 15
        },
        dataLabels: {
          fontSize: '14px',
          color: '#000',
          position: 'center', //top center bottm
          maxItems: 100,
          hideOverflowingLabels: true,
          //   orientation: horizontal,
          total: {
            enabled: false,
            formatter: undefined,
            offsetX: 0,
            offsetY: 0,
            style: {
              color: '#373d3f',
              fontSize: '18px',
              fontFamily: undefined,
              fontWeight: 600
            }
          }
        }
      }
    },
    legend: {
      show: !true
    }
  };
  const series = [
    {
      name: 'series-1',
      data: apexChartData?.map((item) => item.totalAmount)
    }
  ];
  function amountFormat(amount) {
    let res = '';
    if(amount === 0){
      res = '0.00'
    }else if(amount === '' || isNaN(amount)){
      res = ''
    }else{
      amount = Number(amount).toFixed(2);
      res = `${amount}`.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,'); 
    }

    return res;
  }
  return (
    <>
      <div className={`${styles.chartContainer}`}>
        <Chart
          options={options}
          series={series}
          type="bar"
          //   width={370}
          //   height={320}
          // plotOptions={plotOptions}
          className={`${styles.chart}`}
        />
      </div>
    </>
  );
}

