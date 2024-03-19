import React, { useState, useEffect } from 'react';
import { Radio, Check, TextInput } from './Select.js';

export function ChartTypeCard(props) {
    const { option, setOption } = props;
    const onChange = (value) => {
        const newoption = { ...option };
        newoption.chart.type = value;
        
        setOption(newoption);
    }

    return (
        <div className='box column noflex' style={{ margin:"8px" }}>
          <Radio
            name='charttype' value='timesequence' checked
            onChange={onChange}>Time Sequence</Radio>
          <Radio
            name='charttype' value='idfrequency'
            onChange={onChange}>CanId Frequency</Radio>
        </div>
    )
}