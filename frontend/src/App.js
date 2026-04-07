import React, { useState, useEffect } from 'react';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ description: '', amount: '' });

  useEffect(() => {
    fetch('/api/expenses').then(res => res.json()).then(data => setExpenses(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    }).then(() => window.location.reload());
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Expense Tracker</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Desc" onChange={e => setForm({...form, description: e.target.value})} />
        <input placeholder="Amount" type="number" onChange={e => setForm({...form, amount: e.target.value})} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {expenses.map(ex => <li key={ex.id}>{ex.description}: ${ex.amount}</li>)}
      </ul>
    </div>
  );
}
export default App;
