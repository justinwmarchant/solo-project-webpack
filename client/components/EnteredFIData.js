import React from "react";

const EnteredFIData = props => {
    return <div> Entered Income: {props.income}
    Entered Expenses: {props.expenses}
    Years to Freedom: {props.yearsToFI}
        <button>Update</button>
        <button>Delete</button>
    </div>
}

export default EnteredFIData