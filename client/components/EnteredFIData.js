import React from "react";

const EnteredFIData = props => {
    const fiEntries = props.dummy.map(entry => <div>{entry.monthlyIncome} {entry.monthlyExpenses} {entry.yearsToFiRemaining}<button>Update</button><button>Delete</button></div>)

    return (
    <div> 
        {fiEntries}
    </div>
    )
}

export default EnteredFIData