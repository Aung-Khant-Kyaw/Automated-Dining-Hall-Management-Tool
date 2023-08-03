import React from "react";
import Schedule from "../Components/DailyCalender"

function DailySchedulesPage(props) {
    return (
        <div>
            <Schedule id={props.id}/>
        </div>
    )
}

export default DailySchedulesPage;