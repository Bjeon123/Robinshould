import React from 'react'
import { LineChart, Line, XAxis, YAxis, ReferenceLine, Tooltip } from 'recharts';
import CustomToolTip from './custom_tool'

const LineGraph = (props) => {
    const refLine = props.data[0].price;
    const {data,min,max,color,setPrice} = props;
    let betterColor = color === "red" ? "#f14c01" : "#00c806";
    let width = (window.innerWidth*.45)
    let height= window.innerHeight*.3
    return (
        <div>
            <LineChart className="chart" width={props.width || width} height={props.height || height} data={data}>
                <Line type="linear" dataKey="price" dot={false} stroke={betterColor} strokeWidth={props.lw || 2}  activeDot={{ r: 8 }} />
                <XAxis hide="true" dataKey='time' />
                <YAxis hide="true" type="number" domain={[min, max]} />
                {setPrice ?  <Tooltip separator="-" position={{y: -20}} content={<CustomToolTip setPrice={setPrice}/>}/> : null}
                <ReferenceLine
                    y={refLine}
                    stroke="#b3b5b5"
                    strokeDasharray="2 5"
                    isFront={false}
                    strokeWidth={2}
                />
            </LineChart>
        </div>
    )
}

export default LineGraph