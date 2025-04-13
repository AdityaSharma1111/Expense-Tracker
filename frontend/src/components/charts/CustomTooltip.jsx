import React from 'react'

function CustomTooltip({active, payload}) {

    if (active && payload && payload.length) {
        return (<div>
            <p>
                {payload[0].name}
            </p>
            <p>
                Amount: {" "}
                <span>
                    ₹{payload[0].value}
                </span>
            </p>
        </div>);
    }

    return null;
}

export default CustomTooltip