/*

function ChartBox_Deprecated(props) {
  const apiserver = 'http://127.0.0.1:4080'
  const onExit = props.onExit;
  const [ chartdata, setChartdata ] = useState({})
  //const [ chartoptions, setChartoptions ] = useState({})
  const chartoptions = {
    plugins: {
        title: {
            display: true,
            text: 'Chart Title'
        }
    },
    scales: {
      myScale: {
        axis: 'logarithmic',
        position: 'right',
      }
    }
  };
  const [ isLoad, setLoad ] = useState(false);
  const [ isDone, setDone ] = useState(false);
  const [ style, setStyle ] = useState({ margin : "8px", height: "60px" });

  const uploadFile = async (file) => {
    const form = new FormData();
    form.enctype = "multipart/form-data";
    form.append("data", file, file.name);
    reqUpload(form)
    .then(data => {
      console.log(data)
      reqTimeSequnce([data.token], 1000)
      .then((res) => {
        console.log(res)

        const datasets = []
        for (let data in res.datasets) {
          datasets.push({
            label: res.title,
            data : res.datasets[data],
            borderColor: 'red',
            tension: 0
          })
        }
        
        setChartdata({
          labels: res.labels,
          datasets : datasets
        })
        setStyle({ margin : "8px", height: "100%", flex: "1" })
        setDone(true);
        exportToURL({'tokens': []})
      });
    })
    .catch((e) => console.log(e));
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
        ></Line>)
        : (
          isLoad 
          ? 
            <div style={{ padding: "8px" }}>
              <div className="spinner"></div>
            </div>
          :
          <File
            onHandle={(file) => {
              setLoad(true);
              uploadFile(file)
            }}
          ></File>
          )
      }
    </div> 
  )
}
*/