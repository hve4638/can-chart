import React, { useState } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2';
import './App.css';
import './styles/Widget.css';
import './styles/Flex.css';
import './styles/Animation.css';
import File from './Widget.js';
import { Radio, Check, TextInput } from './Select.js';
import { reqUpload, reqTimeSequnce } from './Fetch.js';
import { CanChart } from './CanChart.js';
import { exportToURL } from './Anchor.js';
import { StatisticIDCard } from './StatisticIDCard.js';
import { ChartTypeCard } from './ChartTypeCard.js';
import { ChartOptionCard } from './ChartOptionCard.js';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  Tooltip,
  Legend
);
const Pad5 = () => (<div style={{height:'5px'}}></div>)

function App() {
  const [charttype, setCharttype] = useState('timesequence');
  const [limit, setLimit] = useState('1000');
  const [logScale, setLogScale] = useState(true);
  const [chartSignal, setChartSignal] = useState(0);
  const refreshChart = () => setChartSignal(chartSignal+1)

  const [option, setOption] = useState({
    'canid' : [
    ],
    'chart' : {
      'type' : 'timesequence',
      'limit' : 2000,
      'begin' : 0,
      'end' : 0,
      'logscale' : true,
      'advanced' : false
    }
  });

  return (
    <div className="App flex-wrap">
      <header>
        <p className='undraggable'>Can Chart</p>
      </header>
      <div className='contents' style={{padding:"8px"}}>
        <div className='column flex'>
          <CanChart
            type={charttype}
            limit={limit}
            logScale={logScale}
            option={option}
            setOption={setOption}
            chartSignal={chartSignal}
            refreshChart={refreshChart}
          ></CanChart>
        </div>
        <div
          id='sidebar'
          className='noflex column'
          style={{ width: "200px", flex: "none" }}
          >
          <ChartTypeCard
            option={option}
            setOption={setOption}
            refreshChart={refreshChart}
          ></ChartTypeCard>
          <ChartOptionCard
            option={option}
            setOption={setOption}
            refreshChart={refreshChart}
          ></ChartOptionCard>
          <StatisticIDCard 
            option={option}
            setOption={setOption}
            refreshChart={refreshChart}
          ></StatisticIDCard>
        </div>
        </div>
    </div>
  );
}

export default App;
