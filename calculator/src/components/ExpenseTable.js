import React, { useState } from 'react';
import './ExpenseTable.css';

function ExpenseTable({ expenses, onAddExpense, onDeleteExpense }) {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (category.trim() && amount > 0) {
      onAddExpense({
        category: category.trim(),
        amount: parseFloat(amount)
      });
      setCategory('');
      setAmount('');
    }
  };

  return (
    <div className="expense-table">
      <h2>Enter Expenses</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-row">
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            required
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            step="0.01"
            min="0"
            required
          />
          <button type="submit">Add</button>
        </div>
      </form>

      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount ($)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.category}</td>
              <td>${expense.amount.toFixed(2)}</td>
              <td>
                <button 
                  onClick={() => onDeleteExpense(index)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseTable; 