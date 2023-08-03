import React from "react";
import Schedule from "../Components/PersonalCalender"

function PersonalSchedulePage(props) {
    return (
        <div>
            <Schedule id={props.id}/>
        </div>
    )
}

export default PersonalSchedulePage;