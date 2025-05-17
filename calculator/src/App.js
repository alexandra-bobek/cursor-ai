import React, { useState } from 'react';
import './App.css';
import ExpenseTable from './components/ExpenseTable';
import ExpenseSummary from './components/ExpenseSummary';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [calculatedSummary, setCalculatedSummary] = useState({
    total: 0,
    averageDaily: 0,
    top3: []
  });
  const [isResultsUpToDate, setIsResultsUpToDate] = useState(false);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
    setIsResultsUpToDate(false);
  };

  const deleteExpense = (index) => {
    const newExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(newExpenses);
    
    // Reset summary if all expenses are deleted
    if (newExpenses.length === 0) {
      setCalculatedSummary({
        total: 0,
        averageDaily: 0,
        top3: []
      });
      setIsResultsUpToDate(true);
    } else {
      setIsResultsUpToDate(false);
    }
  };

  const calculateSummary = () => {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const averageDaily = total / 30;
    const top3 = [...expenses]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);

    return {
      total,
      averageDaily,
      top3
    };
  };

  const handleCalculate = () => {
    const newSummary = calculateSummary();
    setCalculatedSummary(newSummary);
    setIsResultsUpToDate(true);
  };

  // Check if Calculate button should be active
  const isCalculateEnabled = expenses.length > 0;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Expense Calculator</h1>
      </header>
      <main className="App-main">
        <ExpenseTable 
          expenses={expenses}
          onAddExpense={addExpense}
          onDeleteExpense={deleteExpense}
        />
        <div className="calculate-button-container">
          <button 
            className="calculate-button" 
            onClick={handleCalculate}
            disabled={!isCalculateEnabled}
          >
            Calculate
          </button>
        </div>
        <ExpenseSummary 
          summary={calculatedSummary} 
          isUpToDate={isResultsUpToDate || !isCalculateEnabled}
        />
      </main>
    </div>
  );
}

export default App;
