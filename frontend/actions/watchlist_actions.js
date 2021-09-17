import * as APIUtil from '../util/watchlists_api_util'

export const RECEIVE_WATCHLISTS = "RECEIVE_WATCHLISTS";
export const RECEIVE_WATCHLIST = " RECEIVE_WATCHLIST";
export const REMOVE_WATCHLIST = 'REMOVE_WATCHLIST';

export const receiveWatchlists = watchlists => {
    return({
        type: RECEIVE_WATCHLISTS,
        watchlists
    })
}

export const receiveWatchlist = watchlist => ({
    type: RECEIVE_WATCHLIST,
    watchlist
})

export const removeWatchlist = watchlistId => ({
    type: REMOVE_WATCHLIST,
    watchlistId
})

export const fetchWatchlists = () => dispatch =>(
    APIUtil.fetchWatchlists().then(
        (watchlists)=>dispatch(receiveWatchlists(watchlists))
    )
) 

export const createNewWatchlist = watchlist =>dispatch =>(
    APIUtil.createNewWatchlist(watchlist).then(
        (watchlist)=> dispatch(receiveWatchlist(watchlist))
    )
)

export const deleteWatchlist = watchlist_id => dispatch =>(
    APIUtil.deleteWatchlist(watchlist_id).then(
        ()=> dispatch(removeWatchlist(watchlist_id))
    )
)



