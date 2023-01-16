import PropTypes from 'prop-types';
import React from 'react';
import Chart from 'react-apexcharts';
import './DonutChart.css';

// Will move DonutChart component to MoleculesFolder once it is finalized, for re-usability
export default function DonutChart({
  label,
  BottomLabel,
  donutData,
  colors,
  chartSeries,
  walletsByTotal,
  showNegative
}) {
    const capitalizeFirstLetter = (str="")=>{
      let letters = str?.toLocaleLowerCase();
      let updatedStr = "";
      for(let i=0; i<letters.length;i++){
          if(i===0){
              updatedStr += `${letters[0]}`.toLocaleUpperCase()
          }else{
            updatedStr += `${letters[i]}`
          }
      }
      return updatedStr;
    }
  const getValue = (val) => {
    return `${val}`.includes('.')
      ? `${val.toLocaleString()}`
      : `${val.toLocaleString()}.00`;
  };
  const labels = donutData.map((item) => {
    return item[0]?.categoryType.toLocaleLowerCase() !== 'categoryone'
      ? item[0]?.categoryType
      : 'categoryOne';
  });
  const networthAmount = walletsByTotal.reduce((a, b) => a + b);
  const options = {
    // legend false for hiding the default labelsContainer section
    legend: {
      show: false
    },
    labels: [...labels],
    colors: colors,
    plotOptions: {
      pie: {
        donut: {
          size: '45',
          labels: {
            show: true,
            name: {},
            value: {
              fontSize: '28px',
              fontWeight: 'bold'
            },
            total: {
              show: true,
              showAlways: true,
              label: `${label}`,
              fontSize: '18px',
              fontWeight: 'normal',
              color: 'black',
              formatter: function (w) {
                return `$${getValue(networthAmount - walletsByTotal[2])}`;
              }
            }
          }
        }
      }
    },
    dataLabels: {
      position: 'center',
      enabled: true,
      style: {
        colors: ['black'],
        fontSize: '18px',
        fontWeight: 'normal'
      },
      formatter: function (val) {
        return `${Math.floor(val)}%`;
      },
      dropShadow: {
        enabled: !true
      }
    },
    tooltip: {
      custom: function ({ series, seriesIndex, w }) {
        return (
          `<div ${`background-color: ${colors[seriesIndex]}; display:flex; padding:10px 10px;" class="arrow_box_container"`}>` +
          `<div ${`style="width:100%; height:30px; display:flex; align-items:center; justify-content: space-between; padding-bottom:10px; color:black; border-bottom: 1px solid white; background-color: ${colors[seriesIndex]}; "`} class="arrow_box">` +
          '<span>' +
          w.globals.labels[seriesIndex] +
          '</span>' +
          '<span>' +
          `${
            series[seriesIndex]
              ? seriesIndex !== showNegative
                ? `$${getValue(series[seriesIndex])}`
                : `-$${getValue(series[seriesIndex])}`
              : ''
          }` +
          '</span>' +
          '</div>' +
          '<div style="min-width:100%; display:flex; flex-flow:column;">' +
          `${chartSeries[seriesIndex].map((item, index) => {
            return (
              `<div ${`style="width:100%; line-height:30px; display:flex; align-items:flex-start; margin-bottom:${
                index === chartSeries[seriesIndex].length - 1 ? '0px' : '-22px'
              }; color:black; background-color: ${
                colors[seriesIndex]
              }; display:flex; justify-content: space-between;"`} class="arrow_box">` +
              '<span>' +
              `${item?.label}` +
              '&nbsp;' +
              '</span>' +
              '<span>' +
              `${
                item.value
                  ? seriesIndex !== showNegative
                    ? `$${getValue(item?.value)}`
                    : `-$${getValue(item?.value)}`
                  : ''
              }` +
              '</span>' +
              '</div>'
            );
          })}` +
          '</div>' +
          '<div>'
        );
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-start pt-[3rem] pb-[6px] px-[25%] bg-white mb-[10px]">
      <div className="text-center mb-[20px]">
        <span className="text-[20px] leading-[30px] tracking-[0.32px]">
          {BottomLabel}
        </span>
      </div>
      <div className="flex flex-col mixed-chart">
        <Chart
          options={options}
          series={walletsByTotal}
          type="donut"
          // width="100%"
          // height="500"
        />
      </div>
      <div className={`legendLabelsContainer flex flex-col gap-[8px]`}>
        {donutData.map((item, index) => {
          return (
            <div
              key={index}
              className="flex items-center justify-between w-full"
            >
              <div className="gap-[10px] text-[14px] font-normal leading-[21px] flex items-center">
                <span
                  className={`w-[15px] h-[15px] rounded-[100%]`}
                  style={{ backgroundColor: colors[index] }}
                ></span>
                <span>
                  {item[0]?.categoryType.toLocaleLowerCase() !== 'ibaas'
                    ? item[0]?.categoryType
                    : 'Wallets'}
                </span>
              </div>
              <div className="text-[14px] font-normal leading-[21px] flex items-center">
                {`${
                  walletsByTotal[index]
                    ? index === showNegative
                      ? `-$${getValue(walletsByTotal[index])}`
                      : `$${getValue(walletsByTotal[index])}`
                    : ''
                }`}
              </div>
            </div>
          );
        })}
      </div>
      <div className='mt-[30px] border-t w-full text-center py-[5px]'>
      <div className='flex justify-center p-2 border-b'><h2>Chart Type : Donut</h2></div>
      </div>
    </div>
  );
}

DonutChart.propTypes = {
  chartSeries: PropTypes.shape({
    length: PropTypes.string,
    map: PropTypes.func
  }),
  colors: PropTypes.array,
  donutCryptoTotal: PropTypes.func,
  donutData: PropTypes.shape({
    map: PropTypes.func
  }),
  donutDepositsTotal: PropTypes.func,
  donutLoansTotal: PropTypes.func,
  donutMutualFundsTotal: PropTypes.func,
  donutwalletsByTotal: PropTypes.func,
  label: PropTypes.string,
  showNegative: PropTypes.bool,
  BottomLabel: PropTypes.string,
  walletsByTotal: PropTypes.array
}
