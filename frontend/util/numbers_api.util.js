export const numToMoney = new Intl.NumberFormat('en-US', 
    {
        style: 'currency',
        currency: 'USD',
    }
);

export const formatPercent = (percent)=>{
    let symbol = percent < 0 ? "-" : "+";
    return `${symbol}${percent.toFixed(2)}%` 
}

export const formatSingleStockData = (data,timeframe) => {
    const datapoints = data['intraday-prices'] ? data['intraday-prices'] : data['chart']
    const dataLastIdx = datapoints.length - 1;
    let currentPrice = datapoints[dataLastIdx]['close'].toFixed(2);
    let dataHasTime = (timeframe === "3M" || timeframe === "1Y" || timeframe === "5Y") ? false : true;
    let max = Number.MIN_VALUE;
    let min = Number.MAX_VALUE;
    const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
    "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let formattedData = [];
    let lastNonZeroPrice= datapoints[0]['close'] || datapoints[1]['close'];
    for (let i = 0; i < datapoints.length; i++) {
        const datapoint = datapoints[i]
        if (datapoint['close'] !== 0 && datapoint['close'] !== 0 < min) {
            min = datapoint['close']
        }
        if (datapoint['close'] > max) {
            max = datapoint['close']
        }
        let newRow = {};
        if(datapoint['close']){
            lastNonZeroPrice = datapoint['close'];
            newRow['price'] = datapoint['close'];
        }
        else{
            newRow['price'] = lastNonZeroPrice
        }
        if (dataHasTime) {
            const date = datapoint['date'].split("-")
            newRow['time'] = monthNames[parseInt(date[1])-1] + " "+ date[2] +", " +date[0] +" " + datapoint['label']
        }
        else {
            const date = datapoint['date'].split("-")
            newRow['time'] = monthNames[parseInt(date[1])-1] + " "+ date[2] +", " +date[0]
        }
        if(i=== dataLastIdx){
            currentPrice = newRow['price']
        }
        formattedData.push(newRow)
    }
    let percentChange = ((formattedData[dataLastIdx]['price'] - formattedData[0]['price'])/formattedData[0]['price'])*100
    let cashChange = formattedData[dataLastIdx]['price'] - formattedData[0]['price']
    let color = formattedData[0]['price'] < formattedData[dataLastIdx]['price'] ? "green" : "red";
    return (
        {
            min: min,
            max: max,
            data: formattedData,
            color: color,
            currentPrice: currentPrice,
            percentChange: percentChange,
            cashChange: cashChange
        }
    )
};

export const formatPortfolio = (data,timeframe,holdings,capital) => {
    const dataType = timeframe === "1D" ? 'intraday-prices' : 'chart';
    const dataHasTime = (timeframe == "3M" || timeframe == "1Y" || timeframe == "5Y") ? false : true;
    let maxDataSetLen = 0;
    let holdingsArr= Object.values(holdings)
    const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
    "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    for(let i =0; i < holdingsArr.length;i++){
        let ticker = holdingsArr[i].ticker
        if(data[ticker][dataType].length > maxDataSetLen){
            maxDataSetLen = data[ticker][dataType].length
        }
    }
    let formattedData = new Array(maxDataSetLen).fill(null).map(()=> ({price: capital}))
    let firstMaxLen = false;
    for(let i =0; i < holdingsArr.length;i++){
        const ticker = holdingsArr[i].ticker;
        const shares = holdingsArr[i].shares;
        const datapoints = data[ticker][dataType]
        let lastNonZeroPrice = datapoints[0]['close'] || datapoints[1]['close'] ||datapoints[3]['close'] 
        let j = maxDataSetLen - datapoints.length;
        let offset = maxDataSetLen - datapoints.length;
        while(j < maxDataSetLen){
            if(!firstMaxLen && datapoints.length === maxDataSetLen){
                if(j === maxDataSetLen-1){
                    firstMaxLen = true;
                }
                if (dataHasTime) {
                    let date = datapoints[j-offset]['date'].split("-")
                    formattedData[j]['time'] = monthNames[parseInt(date[1])-1] + " "+ date[2] +", " +date[0] +" " + datapoints[j-offset]['label']
                    if(datapoints[j-offset]['close']){
                        lastNonZeroPrice = datapoints[j-offset]['close'];
                        formattedData[j]['price'] += shares * datapoints[j-offset]['close']
                    }
                    else{
                        formattedData[j]['price'] += shares * lastNonZeroPrice
                    }
                }
                else {
                    const date = datapoints[j-offset]['date'].split("-")
                    formattedData[j]['time'] = monthNames[parseInt(date[1])-1] + " "+ date[2] +", " + date[0]
                    if(datapoints[j-offset]['close']){
                        lastNonZeroPrice = datapoints[j-offset]['close'];
                        formattedData[j]['price'] += shares * datapoints[j-offset]['close']
                    }
                    else{
                        formattedData[j]['price'] += shares * lastNonZeroPrice
                    }
                }
                j++
            }
            else{
                if(datapoints[j-offset]['close']){
                    lastNonZeroPrice = datapoints[j-offset]['close'];
                    formattedData[j]['price'] += shares * datapoints[j-offset]['close']
                }
                else{
                    formattedData[j]['price'] += shares * lastNonZeroPrice
                }
                j++
            }
        }
    }
    let max = Number.MIN_VALUE;
    let min = Number.MAX_VALUE;
    formattedData.forEach(dataRow =>{
        if(dataRow.price < min){
            min = dataRow.price
        }
        if(dataRow.price > max){
            max = dataRow.price
        }
    })
    let currentPrice = formattedData[formattedData.length-1]['price']
    let color = formattedData[1]['price'] < currentPrice ? "green" : "red";
    return (
        {
            min: min,
            max: max,
            data: formattedData,
            color: color,
            currentPrice: currentPrice
        }
    )
}
