import React, { useState, useEffect } from 'react';
import { reqUpload, reqTimeSequnce } from './Fetch.js';
import { Line } from 'react-chartjs-2';
import File from './Widget.js';
import { exportToURL } from './Anchor.js';

const colorcandidates = [
    'red', 'blue', 'green', 'orange', 'purple', 'yellow', 'cyan', 'magenta',
    'lime', 'teal', 'pink', 'indigo', 'brown', 'grey', 'black'
];

export function CanChart(props) {
    const { option, setOption, chartSignal, refreshChart } = props;
    const [ chartdata, setChartdata ] = useState({})
    const chartoptions = {
      plugins: {
          title: {
              display: true,
              text: 'Chart Title'
          }
      },
      scales: {
        x: {
          display: true,
        },
        y: {
          display: true,
          type: 'logarithmic',
          ticks: {
            callback: function (value, index, values) {
              return Number(value.toString());
            }
          }
        }
      }
    };
    const [ isLoad, setLoad ] = useState(false);
    const [ tokens, setTokens ] = useState([]);
    const [ isDone, setDone ] = useState(false);
    const [ style, setStyle ] = useState({ margin : "8px", flex: "1" });
  
    useEffect(()=>{
        console.log('Chart Reload')
        if (tokens.length == 0) {
            return;
        }

        if (option.chart.type == 'timesequence') {
            setLoad(true);
            setDone(false);
            reqTimeSequnce(tokens, option)
            .then((chartdata) => {
                const datasets = []
                console.log(chartdata)
                for (let i = 0; i < chartdata.datasets.length; i++) {
                    const data = chartdata.datasets[i];
                    
                    datasets.push({
                        label : data.label,
                        data : data.data,
                        borderColor: 'rgba(255, 99, 132, 0)',
                        backgroundColor: colorcandidates[i],
                        tension: 0,
                    });
                }

                const newoption = { ...option }
                newoption.canid = chartdata.additions.canids
                setOption(newoption)
                
                setChartdata({
                    labels : chartdata.labels,
                    datasets : datasets
                });
                setStyle({ margin : "8px", flex: "1" })
                setDone(true);
            })
            .catch((e) => console.log(e))
        }
    }, [chartSignal]);

    const uploadFile = async (files) => {
        const responses = []
        for (const file of files) {
            const form = new FormData();
            form.enctype = "multipart/form-data";
            form.append("data", file, file.name);

            responses.push(reqUpload(form))
        }

        const newtokens = []
        for (const res of responses) {
            const data = await res;
            newtokens.push(data.token)
        }
        setTokens(newtokens)
        refreshChart()
        return;
    }
    
    return (
      <div
        className='box chartbox center upload'
        style={ style }
        >
        {
          isDone 
          ? (<Line
                data={chartdata}
                options={chartoptions}
          ></Line>

          )
          : (
            isLoad 
            ? 
              <div style={{ padding: "8px" }}>
                <div className="spinner"></div>
              </div>
            :
            <File
              onHandle={(files) => {
                setLoad(true);
                uploadFile(files)
              }}
            ></File>
            )
        }
      </div> 
    )
}
