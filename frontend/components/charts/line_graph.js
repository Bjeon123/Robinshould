import React from 'react'
import { LineChart, Line, XAxis, YAxis, ReferenceLine, Tooltip } from 'recharts';
import CustomToolTip from './custom_tool'

const LineGraph = (props) => {
    const refLine = props.data[0].price;
    const {data,min,max,color,setPrice} = props;
    return (
        <div>
            <LineChart className="chart" width={props.width || 650} height={props.height || 350} data={data}>
                <Line type="linear" dataKey="price" dot={false} stroke={color} strokeWidth={props.lw || 1.5} isAnimationActive={false} activeDot={{ r: 8 }} />
                <XAxis hide="true" dataKey='time' />
                <YAxis hide="true" type="number" domain={[min, max]} />
                {/* <Tooltip separator="-" position={{y: -30}} content={<CustomToolTip setPrice={setPrice}/>}/> */}
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