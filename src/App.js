import React, { useState } from 'react';
import './App.css';

function App() {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(0);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const convertCurrency = async () => {
    const response = await fetch(`https://openexchangerates.org/api/latest.json?app_id=483ea77b178444b0878b505205811779`);
    const data = await response.json();
    const rate = data.rates[currency];
    setConvertedAmount(amount * rate);
  };

  return (
    <div className="App">
      <header>
        <h1>Currency Converter</h1>
      </header>
      <div>
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter amount in USD"
        />
        <select value={currency} onChange={handleCurrencyChange}>
          <option value="EUR">Euro</option>
          <option value="JPY">Japanese Yen</option>
          <option value="GBP">British Pound</option>
          <option value="INR">Indian Rupee</option>
        </select>
        <button onClick={convertCurrency}>Convert</button>
      </div>
      <p>Converted Amount: {convertedAmount.toFixed(2)} {currency}</p>
    </div>
  );
}

export default App;
