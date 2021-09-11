const baseUrl = "https://sandbox.iexapis.com";
const token = 'pk_b33e3727ae694c11b9275f5ba6e0d253';

// export const fetchStockIntradayData= (ticker) =>(
//     $.ajax({
//         method: "GET",
//         url: `https://sandbox.iexapis.com/v1/stock/${ticker}/batch?&types=chart&range=5dm&token=Tpk_cdcb2f431e914c2cb121acf5f2136e2a`
//     })
// )
export const fetchStockWeekData= (ticker) =>(
    $.ajax({
        method: "GET",
        url: `https://sandbox.iexapis.com/v1/stock/${ticker}/batch?&types=chart&range=5dm&token=Tpk_cdcb2f431e914c2cb121acf5f2136e2a`
    })
)
export const fetchStockMonthData= (ticker) =>(
    $.ajax({
        method: "GET",
        url: `https://sandbox.iexapis.com/v1/stock/${ticker}/batch?&types=chart&range=1mm&token=Tpk_cdcb2f431e914c2cb121acf5f2136e2a`
    })
)
export const fetchStock3MonthData= (ticker) =>(
    $.ajax({
        method: "GET",
        url: `https://sandbox.iexapis.com/v1/stock/${ticker}/batch?&types=chart&range=3m&token=Tpk_cdcb2f431e914c2cb121acf5f2136e2a`
    })
)
export const fetchStockYearData= (ticker) =>(
    $.ajax({
        method: "GET",
        url: `https://sandbox.iexapis.com/v1/stock/${ticker}/batch?&types=chart&range=1y&token=Tpk_cdcb2f431e914c2cb121acf5f2136e2a`
    })
)
export const fetchStock5YearData= (ticker) =>(
    $.ajax({
        method: "GET",
        url: `https://sandbox.iexapis.com/v1/stock/${ticker}/batch?&types=chart&range=5y&token=Tpk_cdcb2f431e914c2cb121acf5f2136e2a`
    })
)

export const fetchStockStats = (ticker) =>(
    $.ajax({
        method: "GET",
        url: `https://sandbox.iexapis.com/v1/stock/${ticker}/batch?&types=price,company,stats&token=Tpk_cdcb2f431e914c2cb121acf5f2136e2a`,
    })
)
