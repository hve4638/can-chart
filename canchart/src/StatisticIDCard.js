import React, { useState, useEffect } from 'react';
import { Radio, Check, TextInput } from './Select.js';

export function StatisticIDCard(props) {
    const { option, setOption, refreshChart } = props;

    option.canid.sort((a, b) => a.value - b.value);

    return (
        <div
            className='box column noflex' 
            style={{ margin:"8px", overflow: "auto", maxHeight: "300px", minHeight: "60px" }}>
            <div className='center undraggable'>Can ID</div>
            {
                option.canid.map((item, index) => (
                    <Check
                        key={index}
                        checked={item.enabled}
                        onChange={
                            (value) => {
                                const newoption = { ...option }
                                newoption.canid[index].enabled = value;

                                setOption(newoption);
                                refreshChart();
                            }
                        }
                    >{item.id} ({item.count})
                    </Check>
                ))
            }
        </div>
    )
}