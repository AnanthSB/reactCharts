import styles from './App.scss';
import BarChart, { ApexBarChart } from './barChart/BarChart';
import LineChartGraph from './LineChartGraph/LineChartGraph';
import DonutChart from './DonutChart/DonutChart';
import donutData from './DonutChart/donutData.json';

function App() {
  const categoryOne = donutData.data.filter((item) => {
    return item.categoryType.toLocaleLowerCase() === 'categoryone';
  });
  const categoryTwo = donutData.data.filter((item) => {
    return item.categoryType.toLocaleLowerCase() === 'categorytwo';
  });
  const categoryThree = donutData.data.filter((item) => {
    return item.categoryType.toLocaleLowerCase() === 'categorythree';
  });
  const categoryFour = donutData.data.filter((item) => {
    return item.categoryType.toLocaleLowerCase() === 'categoryfour';
  });
  const categoryFive = donutData.data.filter((item) => {
    return item.categoryType.toLocaleLowerCase() === 'categoryfive';
  });
  const categoryOneTotal = () => {
    let sum = 0;
    for (let i = 0; i < categoryOne.length; i++) {
      sum += categoryOne[i].AvailableBalance;
    }
    return sum;
  };
  const categoryTwoTotal = () => {
    let sum = 0;
    for (let i = 0; i < categoryTwo.length; i++) {
      sum += categoryTwo[i].AvailableBalance;
    }
    return sum;
  };
  const categoryThreeTotal = () => {
    let sum = 0;
    for (let i = 0; i < categoryThree.length; i++) {
      sum += categoryThree[i].AvailableBalance;
    }
    return sum;
  };
  const categoryFourTotal = () => {
    let sum = 0;
    for (let i = 0; i < categoryFour.length; i++) {
      sum += categoryFour[i].AvailableBalance;
    }
    return sum;
  };
  const categoryFiveTotal = () => {
    let sum = 0;
    for (let i = 0; i < categoryFive.length; i++) {
      sum += categoryFive[i].AvailableBalance;
    }
    return sum;
  };
  const chartSeries = [
    categoryOne,
    categoryTwo,
    categoryThree,
    categoryFour,
    categoryFive
  ].map((item) => {
    let list = item.map((item,index) => {
      return {
        label: `${index+1}. ${item.subCategoryType}`,
        value: item.AvailableBalance
      };
    });
    return list;
  });

  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',justifyItems:'center'}} className={`${styles.appContainer} gap-[2rem] pt-[8px]`}>
        <div className='flex flex-col items-center justify-center w-full'>
          <BarChart />
          <p className='flex justify-center p-2 border-b'>Chart Type : ReactECharts</p>
        </div>
        <div className='flex flex-col items-center justify-center w-full'>
          <ApexBarChart />
          <p>Chart Type : ApexBar</p>
        </div>
        <LineChartGraph />
        <DonutChart 
              label={'Total'}
              titleLabel={'Apex DonutChart'}
              // donutData prop takes an array containing categoriesTypes
              donutData={[
                categoryOne,
                categoryTwo,
                categoryThree,
                categoryFour,
                categoryFive
              ]}
              colors={[`#b6aDA8`, `#11c78F`, `#FF8F8F`, `#EA1425`, `#31a4e4`]}
              chartSeries={chartSeries}
              walletsByTotal={[
                categoryOneTotal(),
                categoryTwoTotal(),
                categoryThreeTotal(),
                categoryFourTotal(),
                categoryFiveTotal()
              ]}
              showNegative={1} //pass index of the series, which you want to show in -ve
        />
    </div>
  );
}

export default App;
