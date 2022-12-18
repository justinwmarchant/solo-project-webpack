import React, { useState } from "react";
import EnteredFIData from "./EnteredFIData";

const DUMMY_DATA = [

]

const MainPage = (props) => {
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
  const [principal, setPrincipal] = useState(0);
  const [returnOnInvestment, setReturnOnInvestment] = useState(5);
  const [safeWithdrawal, setSafeWithdrawal] = useState(4);
  const [fiDisplay, setFIDisplay] = useState(false);
  const [yearsToFI, setYearsToFI] = useState(0)


  const formSubmitHandler = (event) => {
    event.preventDefault();
    //need to account for edge cases and improper values
    let yearlyNetworth = +principal;
    let yearsToFiRemaining = 0;
    let prevNetworth = +principal
    const yearlySavings = (monthlyIncome - monthlyExpenses) * 12
    const fiNumber = ((100 / safeWithdrawal) * monthlyExpenses * 12)
    console.log(yearsToFiRemaining, prevNetworth, yearlySavings, fiNumber)
    for (let i = 0; fiNumber > yearlyNetworth; i++) {
        console.log(yearsToFiRemaining)
        yearlyNetworth = yearlySavings + (prevNetworth * (1 + returnOnInvestment/100))
        prevNetworth = yearlyNetworth
        yearsToFiRemaining += 1
    }
    console.log(yearsToFiRemaining)
    setFIDisplay(true)
    setYearsToFI(yearsToFiRemaining)
    DUMMY_DATA.push({monthlyIncome, monthlyExpenses, principal, returnOnInvestment, safeWithdrawal, yearsToFiRemaining})
    console.log(DUMMY_DATA)
    // return yearsToFi
    //setBackend(false)
  };

  return (
    
    <div className='main-page-display'>
      <h1>The FIRE Drill</h1>
      <form onSubmit={formSubmitHandler}>
        <label>Well let's see...</label>
        <div>
            <label htmlFor="monthly-income">Monthly Take-Home Income:</label>
          <input
            value={monthlyIncome}
            type='number'
            name='monthly-income'
            onChange={(e) => setMonthlyIncome(e.target.value)}
          />
        </div>
        <div>
            <label htmlFor="monthly-expenses">Monthly Expenses:</label>
          <input
            value={monthlyExpenses}
            type='number'
            name='monthly-expenses'
            onChange={(e) => setMonthlyExpenses(e.target.value)}
          />
        </div>
        <div>
        <label htmlFor="principal">Starting Portfolio Value:</label>
          <input
            value={principal}
            type='number'
            name='principal'
            onChange={(e) => setPrincipal(e.target.value)}
          />
        </div>
        <div>
        <label htmlFor="return-on-investment">Expected Return on Investments (Interest Earned - Inflation):</label>
          <input
            value={returnOnInvestment}
            type='number'
            name='monthly-income'
            onChange={(e) => setReturnOnInvestment(e.target.value)}
          />
        </div>
        <div>
        <label htmlFor="safe-withdrawal-rate">Safe Withdrawal Rate:</label>
          <input
            value={safeWithdrawal}
            type='number'
            name='monthly-income'
            onChange={(e) => setSafeWithdrawal(e.target.value)}
          />
        </div>
        <button type='submit'>Click Me!</button>
      </form>
      {fiDisplay && <EnteredFIData expenses={monthlyExpenses} income={monthlyIncome} yearsToFI={yearsToFI} dummy={DUMMY_DATA}/>}
    </div>
  );
};

export default MainPage;