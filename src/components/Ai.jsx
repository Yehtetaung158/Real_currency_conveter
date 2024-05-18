// src/CurrencyConverter.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
    const [rates, setRates] = useState({});
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [convertedAmount, setConvertedAmount] = useState(0);

    useEffect(() => {
        // Fetch the currency rates from an API
        axios.get('https://api.exchangerate-api.com/v4/latest/USD')
            .then(response => {
                setRates(response.data.rates);
            })
            .catch(error => {
                console.error('Error fetching the exchange rates', error);
            });
    }, []);

    useEffect(() => {
        if (rates) {
            const rate = rates[toCurrency] / rates[fromCurrency];
            setConvertedAmount((amount * rate).toFixed(2));
        }
    }, [amount, fromCurrency, toCurrency, rates]);

    return (
        <div>
            <h1>Currency Converter</h1>
            <div>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                >
                    {Object.keys(rates).map(currency => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
                <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                >
                    {Object.keys(rates).map(currency => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
            </div>
            <h2>
                {amount} {fromCurrency} = {convertedAmount} {toCurrency}
            </h2>
        </div>
    );
};

export default CurrencyConverter;
