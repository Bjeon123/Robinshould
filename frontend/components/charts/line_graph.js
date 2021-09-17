import React from 'react'
import { LineChart, Line, XAxis, YAxis, ReferenceLine, Tooltip  } from 'recharts';

const formatAPIData = (data,dataHasTime,dataType) =>{
    let max = Number.MIN_VALUE;
    let min = Number.MAX_VALUE;
    let formattedData=[];
    for (let i = 0; i < data[dataType].length;i++){
        if (data[dataType][i]['close']<min){
            min = data[dataType][i]['close']
        }
        if (data[dataType][i]['close']>max){
            max = data[dataType][i]['close']
        }
        let newRow ={};
        newRow['close'] = data[dataType][i]['close'];
        if(dataHasTime){
            newRow['dateTime'] = data[dataType][i]['date'] + data[dataType][i]['label']
        }
        else{
            newRow['dateTime'] = data[dataType][i]['date']
        }
        formattedData.push(newRow)
    }
    return (
        {
            min: min,
            max: max,
            data: formattedData
        }
    )
}

const LineGraph = (props)=>{
    const {min,max,data} = formatAPIData(props.data, props.dataHasTime, props.dataType)
    return(
        <div>
            <LineChart className="chart" width={props.width || 650} height={props.height|| 350} data={data}>
                <Line type="linear" dataKey="close" dot={false} stroke={props.color} strokeWidth={props.lw || 1.5} isAnimationActive={false} activeDot={{ r: 8 }} />
                <XAxis hide="true" dataKey='dateTime' />
                <YAxis hide="true" type="number" domain={[min, max]}/>
                <Tooltip/>
                <ReferenceLine 
                    y={props.refLine} 
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