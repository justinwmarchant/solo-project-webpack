import React, { useState } from "react";
import EnteredFIData from "./EnteredFIData";

// const entries = [];

const MainPage = (props) => {
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
  const [principal, setPrincipal] = useState(0);
  const [returnOnInvestment, setReturnOnInvestment] = useState(5);
  const [safeWithdrawal, setSafeWithdrawal] = useState(4);
  const [fiDisplay, setFIDisplay] = useState(false);
  const [yearsToFI, setYearsToFI] = useState(0);
  const [fiEntries, setFIEntries] = useState([])
  const [displayOption, setDisplayOption] = useState(false);
  const [enteredNumber, setEnteredNumber] = useState(0)

  const formSubmitHandler = (event) => {
    event.preventDefault();
    //need to account for edge cases and improper values
    let yearlyNetworth = +principal;
    let yearsToFiRemaining = 0;
    let prevNetworth = +principal;
    let index;
    const yearlySavings = (monthlyIncome - monthlyExpenses) * 12;
    const fiNumber = (100 / safeWithdrawal) * monthlyExpenses * 12;
    if (monthlyExpenses >= monthlyIncome && principal < fiNumber)
      return console.log("Unfortunately, FI is not possible with these inputs");
    else {
      for (let i = 0; fiNumber > yearlyNetworth; i++) {
        console.log(yearsToFiRemaining);
        yearlyNetworth =
        yearlySavings + prevNetworth * (1 + returnOnInvestment / 100);
        prevNetworth = yearlyNetworth;
        yearsToFiRemaining += 1;
        index = fiEntries.length + 1
      }
    }
    console.log(yearsToFiRemaining);
    setFIDisplay(true);
    setYearsToFI(yearsToFiRemaining);
    setFIEntries([
      ...fiEntries, {
      monthlyIncome,
      monthlyExpenses,
      principal,
      returnOnInvestment,
      safeWithdrawal,
      yearsToFiRemaining,
      index}]
    );
    // setFIEntries([...entries])
    console.log(fiEntries);
    // return yearsToFi
    //setBackend(false)
  };

  const showEntries = () => {
    console.log(fiEntries)
  }

  const deleteEntry = (event) => {
    event.preventDefault();
    console.log(enteredNumber);
    const indexToDelete = +enteredNumber;
    const newEntries = fiEntries.filter((e) => e.index !== indexToDelete);
    for (let i = indexToDelete; i < fiEntries.length; i++) {
        fiEntries[i].index = fiEntries[i].index - 1
    }
    console.log(newEntries);
    setFIEntries([...newEntries]);

    // console.log(fiEntryState);
    // fiEntries = newEntries.map((entry) => (
    //   <div>{`${entry.index}. ${entry.monthlyIncome} ${entry.monthlyExpenses} ${entry.yearsToFiRemaining}`}</div>
    // ));
  };

  const deleteDisplayHandler = (event) => {
    event.preventDefault();
    setDisplayOption(true);
  };

  return (
    <div className='main-page-display'>
      <h2>The FIRE Drill</h2>
      <form onSubmit={formSubmitHandler}>
        <label>Well let's see...</label>
        <div>
          <label htmlFor='monthly-income'>Monthly Take-Home Income ($):</label>
          <input
            value={monthlyIncome}
            type='number'
            name='monthly-income'
            min='1'
            step='any'
            onChange={(e) => setMonthlyIncome(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='monthly-expenses'>Monthly Expenses ($):</label>
          <input
            value={monthlyExpenses}
            type='number'
            name='monthly-expenses'
            onChange={(e) => setMonthlyExpenses(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='principal'>Starting Portfolio Value ($):</label>
          <input
            value={principal}
            type='number'
            name='principal'
            onChange={(e) => setPrincipal(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='return-on-investment'>
            Expected Return on Investments (Interest Earned - Inflation) (%):
          </label>
          <input
            value={returnOnInvestment}
            type='number'
            name='monthly-income'
            onChange={(e) => setReturnOnInvestment(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='safe-withdrawal-rate'>Safe Withdrawal Rate: (%)</label>
          <input
            value={safeWithdrawal}
            type='number'
            name='monthly-income'
            onChange={(e) => setSafeWithdrawal(e.target.value)}
          />
        </div>
        <button type='submit'>Click Me!</button>
      </form>
      <button onClick={showEntries}>Entries</button>

     {/** {fiDisplay && <EnteredFIData dummy={entries} fiEntries={fiEntries} deleteEntry={deleteEntry} enteredNumber={enteredNumber}/>} */}

     {fiEntries.map((entry) => (
      <div>{`${entry.index}. ${entry.monthlyIncome} ${entry.monthlyExpenses} ${entry.yearsToFiRemaining}`}</div>))}
      <button>Update</button>
      <button onClick={deleteDisplayHandler}>Delete</button>
      {displayOption && (
        <form onSubmit={deleteEntry}>
          <input type='number' name='deletedEntry' onChange={(e) => (setEnteredNumber(e.target.value))}></input>
          <button type='submit'>Submit</button>
        </form>
      )}
    </div>
  );
};

export default MainPage;
