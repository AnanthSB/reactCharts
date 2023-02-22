import styles from './App.scss';
import { ApexBarChart, BarGraphComponent } from './barChart/BarChart';
import LineChartGraph from './Graphs/LineChartGraph/LineChartGraph';
import DonutChart from './Graphs/DonutChart/DonutChart';
import donutData from './Graphs/DonutChart/donutData.json';
import payoutsData from "./Graphs/PayoutBarChart/data.json";
// import areaChartData from "./Graphs/AreaChart/data.json"
import BarChart1 from './barChart/BarChart';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { PayoutBarChart } from './Graphs/PayoutBarChart/PayoutBarChart';
// import AreaChart from './Graphs/AreaChart/AreaChart';

function App() {
  const [categoryWiseSum, setCategoryWiseSum] = useState([]);
  const [categorizedArray, setCategorizedArray] = useState([]);
  const [payoutGraphData, setPayoutGraphData] = useState([]);

const [barGraphData, setBarGraphData] = useState([]);
const colors = [
  '#FFAE74',
  '#6AB9D5',
  '#C87EFF',
  '#EEFF03',
  '#FFBF7E',
  '#DF7086',
  '#FFAE74',
  '#6AB9D5',
  '#FFAE74',
  '#6AB9D5'
];
useEffect(()=>{
  // forBarcChart - 1st Graph
  const apiData = [
    {
      name: 'Category1',
      uv: 7200,
      amt: 7200,
      totalOrders: 100
    },
    {
      name: 'Category2',
      uv: 4100,
      amt: 4100,
      totalOrders: 43
    },
    {
      name: 'Category3',
      uv: 6200,
      amt: 6200,
      totalOrders: 24
    },
    {
      name: 'Category4',
      uv: 5200,
      amt: 5200,
      totalOrders: 53
    },
    {
      name: 'Category5',
      uv: 8000,
      amt: 8000,
      totalOrders: 79
    },
    {
      name: 'Category6',
      uv: 5000,
      amt: 5000,
      totalOrders: 23
    },
    {
      name: 'Category7',
      uv: 2100,
      amt: 2100,
      totalOrders: 23
    },
    {
      name: 'Category8',
      uv: 4500,
      amt: 4500,
      totalOrders: 1
    },
  ];
  setBarGraphData(apiData.map((item,index)=>{
    return {
      ...item,
      color: `${colors[index]}`
    }
  }))
  
  // For DonutChart circle wala
  let arr1 = donutData.data.map((item)=>item.categoryType);
  const uniqueArr1 = Array.from(new Set(arr1));  //destructuring the unique set objects into an array

  const categoryByTotal = (index) => {
    let sum = 0;
    for (let i = 0; i < donutData.data.length; i++) {
      if(donutData.data[i].categoryType === uniqueArr1[index]){
        sum += donutData.data[i].AvailableBalance;
      }
    }
    return sum;
  };
  let arr = uniqueArr1.map((item,index)=>{
    return categoryByTotal(index);
  })
  const categorizeArray = uniqueArr1.map((item)=>{
    let arr = [];
    for(let i=0; i<donutData?.data.length; i++){
      if(item === donutData?.data[i].categoryType){
        arr.push(donutData.data[i])
      }
    }
    return arr;
  })
  setCategorizedArray(categorizeArray)
  setCategoryWiseSum(arr)
  },[])

  // payoutsData
  useEffect(()=>{
    const array = payoutsData?.data?.slice(1); //slice method used for getting items of an array from index to To index. Here we are filtering last 7days payouts.
    setPayoutGraphData(
      array?.map((item) => {
        return {
          // category: `Day${index + 1}`
          category: moment(item?.createdAt?.split(" ")[0]).format('D MMM YYYY'),
          totalAmount: +item?.totalAmount
        };
      })
    );
  },[])
  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',justifyItems:'center'}} className={`${styles.appContainer} gap-[2rem] pt-[8px]`}>
              <DonutChart
              label={'Total'} //That goes center of the DonutChart
              titleLabel={'Donut ApexChart'}
              donutData={categorizedArray}
              walletsByTotal={categoryWiseSum}
              chartSeries={categorizedArray.map((item)=>{
                let list = item.map((item,index) => {
                  return {
                    label: `${index+1}. ${item?.subCategoryType}`,
                    value: item?.AvailableBalance
                  };
                });
                return list;
              })}
              // colors={[`#b6aDA8`, `#11c78F`, `#FF8F8F`, `#EA1425`, `#31a4e4`]}
              showNegative={1} //pass index of the series, which you want to show in -ve
              colors={categorizedArray.map((item)=>{
                return  `#${Math.random().toString(16).slice(2,8).padEnd(6,0)}`;
              })}
              // trying for to show in red color based on a condition where subCategoryType === "loans"
              // colors={categorizedArray.map((item)=>{
              //   return  item?.subCategoryType === "Loans" ? `#${Math.random().toString(16).slice(2,8).padEnd(6,0)}` : "#FF0000";
              // })}
        />
        <div className='flex flex-col items-center justify-center w-full'>
          <BarGraphComponent barGraphData={barGraphData} />
          <p className='flex justify-center p-2 border-b'>Chart Type : Bar Rechart</p>
        </div>
        
        <div>
          <PayoutBarChart graphData={payoutGraphData} />
          <p className='flex justify-center p-2 border-b mt-[50px]'>Chart Type : Bar Rechart</p>
        </div>

        {/* AreaChart */}
        <div>
          {/* <AreaChart
            areaChartData={areaChartData}
          /> */}
          <p className='flex justify-center p-2 border-b mt-[50px]'>Chart Type : Bar Rechart</p>
        </div>

        <div className='flex flex-col items-center justify-center w-full'>
          <BarChart1 />
          <p className='flex justify-center p-2 border-b'>Chart Type : Bar Rechart</p>
        </div>
        
        <div className='flex flex-col items-center justify-center w-full'>
          <ApexBarChart />
          <p>Chart Type : Bar ApexChart</p>
        </div>
        
        <div >
          <LineChartGraph />
          <div className='flex justify-center p-2 border-b'><h2>Chart Type : line</h2></div>
        </div>
    </div>
  );
}

export default App;
