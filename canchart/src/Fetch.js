const apiserver = 'http://127.0.0.1:4080'

export function reqUpload(form) {
    return fetch(`${apiserver}/upload`, {
      method: "POST",
      headers: { 'Access-Control-Allow-Origin' : '*' }, 
      body: form
    }).then((res) => {
      if (!res.ok) {
        console.log('[reqUpload] response error' + res.json())
        throw new Error('Response Error');
      }
      return res.json();
    })
}

export function reqTimeSequnce(tokens, option) {
  const data = {
    tokens : tokens,
    limit : option.chart.limit-0,
    begin : option.chart.begin-0,
    end : option.chart.end-0,
    canid : option.canid
  };

  return fetch(`${apiserver}/chart/timesequence`, {
    method: "POST",
    headers: { 'Content-Type' : 'application/json' }, 
    body: JSON.stringify(data)
  }).then((res) => {
    if (!res.ok) {
      console.log('[reqTimeSequnce] response error' + res.json())
      console.log(data)
      throw new Error('Response Error');
    }
    return res.json();
  })
}