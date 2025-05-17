import React from 'react';
import './ExpenseSummary.css';

function ExpenseSummary({ summary, isUpToDate }) {
  const { total, averageDaily, top3 } = summary;

  return (
    <div className={`expense-summary ${!isUpToDate ? 'stale' : ''}`}>
      <h2>Summary</h2>
      {!isUpToDate && (
        <div className="stale-warning">
          Results are not up to date
        </div>
      )}
      <div className="summary-item">
        <label>Total Expenses:</label>
        <span>${total.toFixed(2)}</span>
      </div>
      <div className="summary-item">
        <label>Average Daily Expense:</label>
        <span>${averageDaily.toFixed(2)}</span>
      </div>
      <div className="top-expenses">
        <h3>Top 3 Largest Expenses:</h3>
        {top3.length > 0 ? (
          <ol>
            {top3.map((expense, index) => (
              <li key={index}>
                {expense.category}: ${expense.amount.toFixed(2)}
              </li>
            ))}
          </ol>
        ) : (
          <p>No expenses recorded yet</p>
        )}
      </div>
    </div>
  );
}

export default ExpenseSummary; 