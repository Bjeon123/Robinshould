import React from 'react'
import { LineChart, Line, XAxis, YAxis, ReferenceLine, Tooltip  } from 'recharts';

const formatAPIData = (data,dataHasTime) =>{
    let formattedData=[];
    for(let i=0;i<data.chart.length;i++){
        let newRow ={};
        newRow['close'] = data.chart[i]['close'].toString();
        if(dataHasTime){
            newRow['dateTime'] = data.chart[i]['date'] + data.chart[i]['label']
        }
        else{
            newRow['date'] = data.chart[i]['date']
        }
        formattedData.push(newRow)
    }
    return formattedData
}

const LineGraph = (props)=>{
    const data = formatAPIData(props.data,props.dataHasTime)
    return(
        <div>
            <LineChart className="chart" width={650} height={350} data={data}>
                <Line type="linear" dataKey="close" dot={false} stroke={props.color} strokeWidth={1.5} isAnimationActive={false} activeDot={{ r: 8 }} />
                <XAxis hide="true" dataKey= 'dateTime' />
                <YAxis hide="true" type="number" domain={["150","154"]}/>
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