import * as APIUtil from '../util/holdings_api_util';

export const RECEIVE_HOLDING = "RECEIVE_HOLDING";
export const RECEIVE_HOLDINGS = "RECEIVE_HOLDINGS";
export const REMOVE_HOLDING = "REMOVE_HOLDING";

export const receiveHoldings = holdings => ({
    type: RECEIVE_HOLDINGS,
    holdings
});

export const receiveHolding = holding => ({
    type: RECEIVE_HOLDING,
    holding
});

export const removeHolding = holding =>({
    type: REMOVE_HOLDING,
    holding
})

export const createHolding = holding => dispatch =>(
    APIUtil.createHolding(holding).then(holding =>(
        dispatch(receiveHolding(holding))
    ))
)

export const updateHolding = holding => dispatch =>(
    APIUtil.updateHolding(holding).then(holding =>(
        dispatch(receiveHolding(holding))
    ))
)

export const deleteHolding = holding => dispatch => (
    APIUtil.deleteHolding(holding).then((holding) =>(
        dispatch(removeHolding(holding))
    ))
)