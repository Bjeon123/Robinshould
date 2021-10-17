export const fetchWatchlists = () => (
    $.ajax({
        method: "GET",
        url: "/api/watchlists"
    })
)

export const createNewWatchlist = (watchlist)=>(
    $.ajax({
        method: "POST",
        url: "/api/watchlists",
        data: {watchlist}
    })
)

export const updateWatchlist = (watchlist)=>(
    $.ajax({
        method: "PATCH",
        url: `/api/watchlists/${watchlist.id}`,
        data: {watchlist}
    })
)

export const deleteWatchlist = (id) => (
    $.ajax({
        method: "DELETE",
        url: `/api/watchlists/${id}`,
    })
)


export const addStockToWatchlist=(watchlist_join)=>(
    $.ajax({
        method: "POST",
        url: `/api/watchlist_joins`,
        data: { watchlist_join}
    })
)

export const removeStockFromWatchlist = (id) => (
    $.ajax({
        method: "DELETE",
        url: `api/watchlist_joins/${id}`
    })
)

