import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [amount, setAmount] = useState('');
  const [currencyRates, setCurrencyRates] = useState({});
  const [displayAll, setDisplayAll] = useState(false);
  const [factor, setFactor] = useState(1);

  useEffect(() => {
    const fetchRates = async () => {
      const response = await fetch(`https://openexchangerates.org/api/latest.json?app_id=483ea77b178444b0878b505205811779`);
      const data = await response.json();
      setCurrencyRates(data.rates);
    };

    fetchRates();
  }, []);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const toggleDisplayAll = () => {
    setDisplayAll(!displayAll);
  };

  const changeAllRates = () => {
    setFactor(factor === 1 ? 1.1 : 1);  // Toggle factor between 1 and 1.1 (10% increase or normal)
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
        <button onClick={toggleDisplayAll}>
          {displayAll ? "Show Fewer Currencies" : "Show All Currencies"}
        </button>
        <button onClick={changeAllRates}>
          {factor === 1 ? "Increase All by 10%" : "Reset Rates"}
        </button>
      </div>
      <div>
        {Object.entries(currencyRates).filter(([key, value]) => displayAll || ["EUR", "JPY", "GBP", "INR"].includes(key)).map(([key, value]) => (
          <p key={key}>{key}: {(value * factor * amount).toFixed(2)}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
