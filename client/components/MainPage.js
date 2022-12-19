import React, { useState } from "react";

const MainPage = (props) => {
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
  const [principal, setPrincipal] = useState(0);
  const [returnOnInvestment, setReturnOnInvestment] = useState(5);
  const [safeWithdrawal, setSafeWithdrawal] = useState(4);
  const [fiDisplay, setFIDisplay] = useState(false);
  const [yearsToFI, setYearsToFI] = useState(0);
  const [fiEntries, setFIEntries] = useState([]);
  const [displayOption, setDisplayOption] = useState(false);
  const [enteredNumber, setEnteredNumber] = useState(0);
  const [updateDisplay, setUpdateDisplay] = useState(false);
  const [updateDisplayForm, setUpdateDisplayForm] = useState(false);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    let yearlyNetworth = +principal;
    let yearsToFiRemaining = 0;
    let prevNetworth = +principal;
    let index = 0;
    const yearlySavings = (monthlyIncome - monthlyExpenses) * 12;
    const fiNumber = (100 / safeWithdrawal) * monthlyExpenses * 12;
    if (monthlyExpenses >= monthlyIncome && principal < fiNumber)
      return console.log("Unfortunately, FI is not possible with these inputs");
    else {
      index = fiEntries.length + 1
      for (let i = 0; fiNumber > yearlyNetworth; i++) {
        console.log(yearsToFiRemaining);
        yearlyNetworth =
          yearlySavings + prevNetworth * (1 + returnOnInvestment / 100);
        prevNetworth = yearlyNetworth;
        yearsToFiRemaining += 1;
      }
    }
    setFIDisplay(true);
    setYearsToFI(yearsToFiRemaining);
    setFIEntries([
      ...fiEntries,
      {
        monthlyIncome,
        monthlyExpenses,
        principal,
        returnOnInvestment,
        safeWithdrawal,
        yearsToFiRemaining,
        index,
      },
    ]);
    console.log(fiEntries);
  };

  const deleteEntry = (event) => {
    event.preventDefault();
    console.log(enteredNumber);
    const indexToDelete = +enteredNumber;
    const newEntries = fiEntries.filter((e) => e.index !== indexToDelete);
    for (let i = indexToDelete; i < fiEntries.length; i++) {
      fiEntries[i].index = fiEntries[i].index - 1;
    }
    console.log(newEntries);
    setFIEntries([...newEntries]);
    setDisplayOption(false);
  };

  const deleteDisplayHandler = (event) => {
    event.preventDefault();
    setDisplayOption(true);
  };

  const updateDisplayHandler = (event) => {
    event.preventDefault();
    setUpdateDisplay(true);
  };

  const updateEntryForm = (event) => {
    event.preventDefault();
    setUpdateDisplayForm(true);
  };

  const updateFIEntry = (event) => {
    event.preventDefault();
    const indexToUpdate = +enteredNumber;
    console.log(indexToUpdate);
    const updateEntry = fiEntries.filter((e) => e.index === indexToUpdate);
    console.log(updateEntry);
    console.log(fiEntries);
    for (const prop in fiEntries[indexToUpdate - 1]) {
      console.log(fiEntries[indexToUpdate - 1]);
      console.log(fiEntries[indexToUpdate - 1].monthlyExpenses);
      fiEntries[indexToUpdate - 1].monthlyIncome = monthlyIncome;
      fiEntries[indexToUpdate - 1].monthlyExpenses = monthlyExpenses;
      fiEntries[indexToUpdate - 1].principal = principal;
      fiEntries[indexToUpdate - 1].returnOnInvestment = returnOnInvestment;
      fiEntries[indexToUpdate - 1].safeWithdrawal = safeWithdrawal;
    }
    setFIEntries([...fiEntries]);
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
          <label htmlFor='safe-withdrawal-rate'>
            Safe Withdrawal Rate: (%)
          </label>
          <input
            value={safeWithdrawal}
            type='number'
            name='monthly-income'
            onChange={(e) => setSafeWithdrawal(e.target.value)}
          />
        </div>
          <button type='submit'>Save</button>
      </form>

      {/** {fiDisplay && <EnteredFIData dummy={entries} fiEntries={fiEntries} deleteEntry={deleteEntry} enteredNumber={enteredNumber}/>} */}
      <div>Saved Entries:
      {fiEntries.map((entry) => (
        <div>{`${entry.index}. Monthly Income: ${entry.monthlyIncome} Monthly Expenses: ${entry.monthlyExpenses} Years to Freedom: ${entry.yearsToFiRemaining}`}</div>
      ))}
      </div>
      <div className="update-delete-buttons">
      <button onClick={updateDisplayHandler}>Update</button>
      <button onClick={deleteDisplayHandler}>Delete</button>
      </div>
      {displayOption && (
        <form onSubmit={deleteEntry}>
          <input
            type='number'
            name='deletedEntry'
            onChange={(e) => setEnteredNumber(e.target.value)}
          ></input>
          <button type='submit'>Submit</button>
        </form>
      )}
      {updateDisplay && (
        <form onSubmit={updateEntryForm}>
          <input
            type='number'
            name='updatedEntry'
            onChange={(e) => setEnteredNumber(e.target.value)}
          ></input>
          <button type='submit'>Submit</button>
        </form>
      )}
      {updateDisplayForm && (
        <form onSubmit={updateFIEntry}>
          <input
            value={monthlyIncome}
            type='number'
            min='1'
            step='any'
            name='updated-monthly-income'
            onChange={(e) => setMonthlyIncome(e.target.value)}
          ></input>
          <input
            value={monthlyExpenses}
            type='number'
            name='updated-monthly-expenses'
            onChange={(e) => setMonthlyExpenses(e.target.value)}
          ></input>
          <input
            value={principal}
            type='number'
            name='updated-principal'
            onChange={(e) => setPrincipal(e.target.value)}
          ></input>
          <input
            value={returnOnInvestment}
            type='number'
            name='updated-return-on-investment'
            onChange={(e) => setReturnOnInvestment(e.target.value)}
          ></input>
          <input
            value={safeWithdrawal}
            type='number'
            name='updated-safe-withdrawal'
            onChange={(e) => setSafeWithdrawal(e.target.value)}
          ></input>
          <button type='submit'>Submit</button>
        </form>
      )}
    </div>
  );
};

export default MainPage;
