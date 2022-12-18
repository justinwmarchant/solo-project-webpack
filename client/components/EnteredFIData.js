import React, { useState } from "react";

const EnteredFIData = (props) => {
  const [displayOption, setDisplayOption] = useState(false);

//   let fiEntries = props.fiEntries.map((entry) => (
//       <div>{`${entry.index}. ${entry.monthlyIncome} ${entry.monthlyExpenses} ${entry.yearsToFiRemaining}`}</div>
//     ));


  const onSubmitDelete = event => {
    event.preventDefault()
    props.deleteEntry(event.target.deletedEntry.value)
  }

  const deleteDisplayHandler = (event) => {
    event.preventDefault();
    setDisplayOption(true);
  };

  // const removeEntry = () => {
  //     const newEntry = entries.filter()
  // }

  return (
    <div>
      {props.fiEntries.map((entry) => (
      <div>{`${entry.index}. ${entry.monthlyIncome} ${entry.monthlyExpenses} ${entry.yearsToFiRemaining}`}</div>))}
      <button>Update</button>
      <button onClick={deleteDisplayHandler}>Delete</button>
      {displayOption && (
        <form onSubmit={props.deleteEntry}>
          <input type='number' name='deletedEntry' onChange={(e) => (props.enteredNumber = e)}></input>
          <button>Submit</button>
        </form>
      )}
    </div>
  );
};

export default EnteredFIData;
