import axios from 'axios';
const baseUrl = "https://sandbox.iexapis.com";
const token = 'pk_b33e3727ae694c11b9275f5ba6e0d253';

// export const fetchStockIntradayData= (ticker) =>(
//     $.ajax({
//         method: "GET",
//https://cloud.iexapis.com/
//         url: `https://cloud.iexapis.com/v1/stock/${ticker}/batch?&types=chart&range=5dm&token=pk_b33e3727ae694c11b9275f5ba6e0d253`
//     })
// )


export const searchStocks = (input) => (
    $.ajax({
        method: "GET",
        url: `api/search/stocks/${input}`
    })
)

export const fetchStockId= (ticker) => (
    $.ajax({
        method: "GET",
        url: `/api/stocks/${ticker}`
    })
)

export const fetchStockTicker= (stockId) =>(
    $.ajax({
        method: "GET",
        url: `/api/stocks/${stockId}`
    })
)

export const fetchStockTickers = (userId) => (
    $.ajax({
        method: "GET",
        url: `/api/users/${userId}/stocks`
    })
)

export const fetchintradayData =(ticker) =>(
    $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/v1/stock/${ticker}/batch?&types=intraday-prices,news&last=4&token=pk_b33e3727ae694c11b9275f5ba6e0d253`
    })
)

export const fetchAllQuotes = (tickerArr) =>(
    $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/v1/stock/market/batch?&types=price,intraday-prices,news&symbols=${tickerArr.join(',')}&token=pk_b33e3727ae694c11b9275f5ba6e0d253`,
    })
)

export const getNews = (tickerArr) =>(
    $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/v1/stock/market/batch?&types=news&symbols=${tickerArr.join(',')}&last=1&token=pk_b33e3727ae694c11b9275f5ba6e0d253`,
    })
)

export const fetchStockWeekData= (ticker) =>(
    $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/v1/stock/${ticker}/batch?&types=chart&range=5dm&token=pk_b33e3727ae694c11b9275f5ba6e0d253`
    })
)
export const fetchStockMonthData= (ticker) =>(
    $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/v1/stock/${ticker}/batch?&types=chart&range=1mm&token=pk_b33e3727ae694c11b9275f5ba6e0d253`
    })
)
export const fetchStock3MonthData= (ticker) =>(
    $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/v1/stock/${ticker}/batch?&types=chart&range=3m&token=pk_b33e3727ae694c11b9275f5ba6e0d253`
    })
)
export const fetchStockYearData= (ticker) =>(
    $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/v1/stock/${ticker}/batch?&types=chart&range=1y&token=pk_b33e3727ae694c11b9275f5ba6e0d253`
    })
)
export const fetchStock5YearData= (ticker) =>(
    $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/v1/stock/${ticker}/batch?&types=chart&range=5y&token=pk_b33e3727ae694c11b9275f5ba6e0d253`
    })
)

export const fetchStockStats = (ticker) =>(
    $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/v1/stock/${ticker}/batch?&types=price,company,stats&token=pk_b33e3727ae694c11b9275f5ba6e0d253`,
    })
)

export const fetchWeekQuotes = (tickerArr) => (
    $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/v1/stock/market/batch?&types=chart&range=5dm&symbols=${tickerArr.join(',')}&token=pk_b33e3727ae694c11b9275f5ba6e0d253`,
    })
)

export const fetchMonthQuotes = (tickerArr) => (
    $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/v1/stock/market/batch?&types=chart&range=1mm&symbols=${tickerArr.join(',')}&token=pk_b33e3727ae694c11b9275f5ba6e0d253`,
    })
)

export const fetchThreeMonthsQuotes = (tickerArr) => (
    $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/v1/stock/market/batch?&types=chart&range=3m&symbols=${tickerArr.join(',')}&token=pk_b33e3727ae694c11b9275f5ba6e0d253`,
    })
)

export const fetchOneYearQuotes = (tickerArr) => (
    $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/v1/stock/market/batch?&types=chart&range=1y&symbols=${tickerArr.join(',')}&token=pk_b33e3727ae694c11b9275f5ba6e0d253`,
    })
)

export const fetchFiveYearQuotes = (tickerArr) => (
    $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/v1/stock/market/batch?&types=chart&range=5y&symbols=${tickerArr.join(',')}&token=pk_b33e3727ae694c11b9275f5ba6e0d253`,
    })
)
