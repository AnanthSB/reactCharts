import './App.css';
import BarChart from './barChart/BarChart';
import LineChartGraph from './LineChartGraph/LineChartGraph';

function App() {

  return (
    <div className="max-w-full min-h-[100vh] bg-slate-400 flex flex-wrap justify-center gap-[30px] p-2">
        <BarChart />
        <LineChartGraph />
    </div>
  );
}

export default App;
