import React from "react";
import Schedule from "../Components/TradeCalender"

function TradeShiftPage(props) {
    return (
        <div>
            <Schedule id={props.id}/>
        </div>
    )
}

export default TradeShiftPage;