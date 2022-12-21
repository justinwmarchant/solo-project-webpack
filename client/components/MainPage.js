import React, { useState } from "react";
import Card from "./Layout/Card";

const MainPage = (props) => {
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
  const [principal, setPrincipal] = useState(0);
  const [returnOnInvestment, setReturnOnInvestment] = useState(5);
  const [safeWithdrawal, setSafeWithdrawal] = useState(4);
  const [fiDisplay, setFIDisplay] = useState(false);
  const [yearsToFI, setYearsToFI] = useState(0);
  const [fiEntries, setFIEntries] = useState([]);
  const [displayFIEntries, setDisplayFIEntries] = useState(false);
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
      index = fiEntries.length + 1;
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
    setDisplayFIEntries(true);
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
    if (fiEntries.length <= 0) {
      setDisplayFIEntries(false);
    }
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
    let yearlyNetworth = +principal;
    let yearsToFiRemaining = 0;
    let prevNetworth = +principal;
    const fiNumber = (100 / safeWithdrawal) * monthlyExpenses * 12;
    const yearlySavings = (monthlyIncome - monthlyExpenses) * 12;
    event.preventDefault();
    const indexToUpdate = +enteredNumber;
    console.log(indexToUpdate);
    const updateEntry = fiEntries.filter((e) => e.index === indexToUpdate);
    console.log(updateEntry);
    console.log(fiEntries);
    for (let i = 0; fiNumber > yearlyNetworth; i++) {
      yearlyNetworth =
        yearlySavings + prevNetworth * (1 + returnOnInvestment / 100);
      prevNetworth = yearlyNetworth;
      yearsToFiRemaining += 1;
    }
    for (const prop in fiEntries[indexToUpdate - 1]) {
      console.log(fiEntries[indexToUpdate - 1]);
      console.log(fiEntries[indexToUpdate - 1].monthlyExpenses);
      fiEntries[indexToUpdate - 1].monthlyIncome = monthlyIncome;
      fiEntries[indexToUpdate - 1].monthlyExpenses = monthlyExpenses;
      fiEntries[indexToUpdate - 1].principal = principal;
      fiEntries[indexToUpdate - 1].returnOnInvestment = returnOnInvestment;
      fiEntries[indexToUpdate - 1].safeWithdrawal = safeWithdrawal;
      fiEntries[indexToUpdate - 1].yearsToFiRemaining = yearsToFiRemaining;
    }
    setFIEntries([...fiEntries]);
    setUpdateDisplayForm(false);
    setUpdateDisplay(false);
  };

  return (
    //Main Form

    <div className='main-page-display'>
      <h2>The FIRE Drill</h2>
      <form className='main-form' onSubmit={formSubmitHandler}>
        <div>
          <label id='main-form-label' htmlFor='monthly-income'>
            Monthly Take-Home Income ($):
          </label>
          <input
            id='monthly-income'
            value={monthlyIncome}
            type='number'
            name='monthly-income'
            min='1'
            step='any'
            onChange={(e) => setMonthlyIncome(e.target.value)}
          />
        </div>
        <div>
          <label id='main-form-label' htmlFor='monthly-expenses'>
            Monthly Expenses ($):
          </label>
          <input
            id='monthly-expenses'
            value={monthlyExpenses}
            type='number'
            name='monthly-expenses'
            onChange={(e) => setMonthlyExpenses(e.target.value)}
          />
        </div>
        <div>
          <label id='main-form-label' htmlFor='principal'>
            Starting Portfolio Value ($):
          </label>
          <input
            id='principal'
            value={principal}
            type='number'
            name='principal'
            onChange={(e) => setPrincipal(e.target.value)}
          />
        </div>
        <div>
          <label id='main-form-label' htmlFor='return-on-investment'>
            Expected Return on Investments (Interest Earned - Inflation) (%):
          </label>
          <input
            id='return-on-investment'
            value={returnOnInvestment}
            type='number'
            name='monthly-income'
            onChange={(e) => setReturnOnInvestment(e.target.value)}
          />
        </div>
        <div>
          <label id='main-form-label' htmlFor='safe-withdrawal-rate'>
            Safe Withdrawal Rate (%):
          </label>
          <input
            id='safe-withdrawal-rate'
            value={safeWithdrawal}
            type='number'
            name='monthly-income'
            onChange={(e) => setSafeWithdrawal(e.target.value)}
          />
        </div>
        <button className='save-button' type='submit'>
          Save
        </button>
      </form>

      {/* Entries that appear after clicking save */}

      <div className='fire-log'>
        <div>The FIRE Log:</div>
        {displayFIEntries && (
          <Card>
            {fiEntries.map((entry) => (
              <div>{`${entry.index}. With a monthly income of $${entry.monthlyIncome} and monthly expenses of $${entry.monthlyExpenses}, it will take approximately ${entry.yearsToFiRemaining} years to retire`}</div>
            ))}
          </Card>
        )}
      </div>
      <div className='update-delete-buttons'>
        <button className='update-button' onClick={updateDisplayHandler}>
          Update
        </button>
        <button className='delete-button' onClick={deleteDisplayHandler}>
          Delete
        </button>
      </div>

      {/* Display after you click delete button */}

      {displayOption && (
        <div className='delete-display'>
          <div>Which entry would you like to delete?</div>
          <form onSubmit={deleteEntry}>
            <input
              type='number'
              name='deletedEntry'
              onChange={(e) => setEnteredNumber(e.target.value)}
            ></input>
            <button type='submit'>Submit</button>
          </form>
        </div>
      )}

      {/*Display after you click update button */}

      {updateDisplay && (
        <div className='update-display'>
          <div>Which entry do you want to update?</div>
          <form onSubmit={updateEntryForm}>
            <input
              type='number'
              name='updatedEntry'
              onChange={(e) => setEnteredNumber(e.target.value)}
            ></input>
            <button className='update-log-button' type='submit'>
              Submit
            </button>
          </form>
        </div>
      )}

      {/* Display after you select which entry to update */}

      {updateDisplayForm && (
        <form className='update-form' onSubmit={updateFIEntry}>
          <div>
            {" "}
            <label>Monthly Take-Home Income ($):</label>
            <input
              value={monthlyIncome}
              type='number'
              min='1'
              step='any'
              name='updated-monthly-income'
              onChange={(e) => setMonthlyIncome(e.target.value)}
            ></input>
          </div>
          <div>
            {" "}
            <label>Monthly Expenses ($):</label>
            <input
              value={monthlyExpenses}
              type='number'
              name='updated-monthly-expenses'
              onChange={(e) => setMonthlyExpenses(e.target.value)}
            ></input>
          </div>
          <div>
            {" "}
            <label>Principal ($):</label>
            <input
              value={principal}
              type='number'
              name='updated-principal'
              onChange={(e) => setPrincipal(e.target.value)}
            ></input>
          </div>
          <div>
            {" "}
            <label>Return on Investment (%)):</label>
            <input
              value={returnOnInvestment}
              type='number'
              name='updated-return-on-investment'
              onChange={(e) => setReturnOnInvestment(e.target.value)}
            ></input>
          </div>
          <div>
            {" "}
            <label>Safe Withdrawal Rate (%):</label>
            <input
              value={safeWithdrawal}
              type='number'
              name='updated-safe-withdrawal'
              onChange={(e) => setSafeWithdrawal(e.target.value)}
            ></input>
          </div>
          <button className='finished-update-button' type='submit'>
            Save
          </button>
        </form>
      )}
    </div>
  );
};

export default MainPage;
