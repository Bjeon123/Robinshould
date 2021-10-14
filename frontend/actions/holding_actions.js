import * as APIUtil from '../util/holdings_api_util';

export const RECEIVE_HOLDING = "RECEIVE_HOLDING";
export const RECEIVE_HOLDINGS = "RECEIVE_HOLDINGS";
export const REMOVE_HOLDING = "REMOVE_HOLDING";
export const RECEIVE_HOLDING_ERRORS = "RECEIVE_HOLDING_ERRORS"
export const CLEAR_ERRORS = "RECEIVE_HOLDING_ERRORS"

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

export const receiveErrors = errors => ({
    type: RECEIVE_HOLDING_ERRORS,
    errors
});

export const clearErrors = () => ({
    type: CLEAR_ERRORS,
});

export const createHolding = holding => dispatch =>(
    APIUtil.createHolding(holding)
        .then( holding => (dispatch(receiveHolding(holding))),
         err => (
            dispatch(receiveErrors(err.responseJSON))
        )
    )
)

export const updateHolding = holding => dispatch =>(
    APIUtil.updateHolding(holding).then(holding =>(
        dispatch(receiveHolding(holding))),
        err => (
            dispatch(receiveErrors(err.responseJSON))
        )
    )
)

export const deleteHolding = holding => dispatch => (
    APIUtil.deleteHolding(holding).then((holding) =>(
        dispatch(removeHolding(holding))
    ))
)