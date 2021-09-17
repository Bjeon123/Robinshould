import React from 'react';

const ShareDetails = ({shares,currentPrice,openPrice}) =>{
    return (
        <div className="share-detail-container">
            <div className="sd-element">
                <p>Your Market Value</p>
                <h1>${(shares.shares*currentPrice).toFixed(2)}</h1>
                <div className="sd-todays-return">
                    <h3>Today's return
                        <p className="right">${(shares.shares * currentPrice - shares.shares * openPrice).toFixed(2)}</p>
                    </h3>
                </div>
                <div className="sd-total-ret">
                    <h3 >Total return
                    <p className="right">${(shares.shares * shares.avg_price - shares.shares * currentPrice).toFixed(2)}</p>
                    </h3>
                </div>
            </div>
            <div className="sd-element">
                <p>Your Average Cost</p>
                <h1>${shares.avg_price.toFixed(2)}</h1>
                <div className="sd-shares">
                    <h3>Shares
                        <p className="right">{shares.shares}</p>
                    </h3>
                </div>
            </div>
        </div>
    )
}

export default ShareDetails;