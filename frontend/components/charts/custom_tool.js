import React from "react";

const CustomToolTip = ({ active, payload,label,setPrice}) => {
    if (active && payload) {
        setPrice(payload[0].value)
        return(
            <div className="custom-tooltip">
                {label}
            </div>
        )
    }
    else{
        setPrice("")
        return null
    }
}

export default CustomToolTip;