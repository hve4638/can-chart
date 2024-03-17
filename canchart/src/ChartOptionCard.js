import React, { useState, useEffect } from 'react';
import { Radio, Check, TextInput } from './Select.js';

const Pad5 = () => (<div style={{height:'5px'}}></div>)

export function ChartOptionCard(props) {
    const { option, setOption, refreshChart } = props;
    const onChange = (key, value) => {
        const newoption = { ...option };
        newoption.chart[key] = value;
        
        setOption(newoption);
    }

    return (
        <div className='box column noflex' style={{ margin:"8px" }}>
          <TextInput
            caption='position (begin)'
            value={option.chart.begin}
            onChange={(value)=>onChange('begin', value)}
          ></TextInput>
          <TextInput
            caption='position (end)'
            value={option.chart.end}
            onChange={(value)=>onChange('end', value)}
          ></TextInput>
          <TextInput
            caption='limit'
            value={option.chart.limit}
            onChange={(value)=>onChange('limit', value)}
          ></TextInput>
          <Pad5></Pad5>
          <Check
            checked={option.chart.logscale}
            onChange={(value)=>onChange('logscale', value)}
          >Log Scale</Check>
          <Check 
            checked={option.chart.advanced}
            onChange={(value)=>onChange('advanced', value)}
          >Advanced</Check>
          <div className='flex'></div>
          <Pad5></Pad5>
          <button
            onClick={(x)=>{
              refreshChart()
            }}
          >Refresh</button>
        </div>
    )
}