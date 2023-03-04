import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';
import React from 'react';
import toCurrencyAmount from "../../Helpers/toCurrencyAmount.js"
import styles from './PayoutBarChart.module.scss';

export function PayoutBarChart({ graphData }) {
  const series = [
    {
      name: '', //name of the chart is being used for.

      // objectSample
      //   {
      //     category: 'Day1',
      //     totalAmount: 3500
      //   },
      // graphData should be passed as shown in above object format
      data: graphData?.map((item) => item?.totalAmount)
    }
  ];
  const options = {
    chart: {
      id: 'apexchart-example-Payout',
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
      show: true, // you can either change hear to disable all grids
      strokeDashArray: 0,
      xaxis: {
        lines: {
          show: !true //or just here to disable only x axis grids
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
        lines: {
          show: true //or just here to disable only x axis grids
        },
        axisBorder: {
          show: true,
          color: 'black',
          height: 3,
          width: '100%',
          offsetX: 0,
          offsetY: 0
        }
      }
    },
    // xaxis labels are passed here
    xaxis: {
      categories: graphData?.map((item) => item?.category),
      //   categories: []
      labels: {
        show: true,
        style: {
          colors: ['#000'],
          fontSize: '14px',
          fontWeight: 500,
          fontFamily: 'kanit'
          //   cssClass: 'apexcharts-yaxis-label'
        }
      },
      axisBorder: {
        show: !true,
        color: '#404040',
        offsetX: 0,
        offsetY: 0
      },
      axisTicks: {
        show: false
      }
    },
    // yaxis labels are modifeid and passed here
    yaxis: {
      labels: {
        show: true,
        align: 'right',
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: ['#000'],
          fontSize: '14px',
          fontWeight: 500,
          fontFamily: 'kanit'
          //   cssClass: 'apexcharts-yaxis-label'
        },
        offsetX: 0,
        offsetY: 0,
        rotate: 0,
        formatter: (value) => {
          return `$${value ? toCurrencyAmount(value) : '0.00'}`;
        }
      },
      axisBorder: {
        show: !true,
        color: '#404040',
        offsetX: 0,
        offsetY: 0
      },
      axisTicks: {
        show: false
      }
    },
    dataLabels: {
      enabled: !true, //shows/hides dataLable's value in each bar
      style: {
        colors: ['#000']
      },
      offsetX: 0 //aligns the dataLabel's value in x-axis
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 7,
        borderRadiusApplication: 'around',
        borderRadiusWhenStacked: 'last',
        columnWidth: '16%',
        barHeight: '100%',
        distributed: !true, //returns each bar with individual colors
        rangeBarOverlap: true,
        rangeBarGroupRows: false,
        colors: {
          ranges: [
            {
              from: 0,
              to: 0,
              color: ''
            }
          ],
          backgroundBarColors: ['#DCEFF6'],
          //   backgroundBarColors: [],
          backgroundBarOpacity: 1,
          backgroundBarRadius: 10
        },
        dataLabels: {
          enabled: false,
          fontSize: '14px',
          color: '#DCEFF6',
          position: 'center', //top center bottm
          maxItems: 8,
          hideOverflowingLabels: true,
          //   orientation: horizontal,
          total: {
            enabled: false,
            formatter: undefined,
            offsetX: 0,
            offsetY: 0,
            style: {
              color: '#000',
              fontSize: '18px',
              fontFamily: undefined,
              fontWeight: 600,
              borderRadius: '10px'
            }
          }
        }
      }
    },
    tooltip: {
      enabled: !true,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        return (
          '<div class="arrow_box">' +
          '<span>' +
          series[seriesIndex][dataPointIndex] +
          '</span>' +
          '</div>'
        );
      }
    },
    dashArray: {
      show: false
    },
    legend: {
      show: !true
    },
    colors: ['#6BB9D6']
  };
  return (
    <>
      <div className={`w-full ${styles.payoutChartContainer}`}>
        <Chart
          options={options}
          series={series}
          type="bar"
          width={'78%'}
          height={260}
          // plotOptions={plotOptions}
          className={`${styles.payoutChart}`}
        />
      </div>
    </>
  );
}

PayoutBarChart.propTypes = {
  graphData: PropTypes.shape({
    length: PropTypes.number,
    map: PropTypes.func,
    splice: PropTypes.func
  })
};
