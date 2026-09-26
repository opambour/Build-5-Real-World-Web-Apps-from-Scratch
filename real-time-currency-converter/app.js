// 1. Select DOM Elements
const amountInput = document.querySelector('#amount');
const fromCurrency = document.querySelector('#from-currency');
const toCurrency = document.querySelector('#to-currency');
const convertBtn = document.querySelector('#convert-btn');
const resultDiv = document.querySelector('#result');

// 2. Add Event Listener to Convert Button
convertBtn.addEventListener('click', async () => {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  // Validate input
  if (isNaN(amount) || amount <= 0) {
    resultDiv.textContent = "Please enter a valid amount greater than 0.";
    return;
  }

  // Show loading message while fetching
  resultDiv.textContent = "Fetching live rates...";

  try {
    // 3. Fetch live exchange rates from public API
    const response = await fetch(`https://open.er-api.com/v6/latest/${from}`);
    
    // Check if network request was successful
    if (!response.ok) {
      throw new Error("Failed to connect to exchange rate server.");
    }

    const data = await response.json();

    // 4. Extract conversion rate and calculate final value
    const rate = data.rates[to];
    const convertedAmount = (amount * rate).toFixed(2);

    // 5. Display the result on screen
    resultDiv.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;

  } catch (error) {
    // Handle errors gracefully
    resultDiv.textContent = "Error fetching rates. Please check your connection.";
    console.error("API Error:", error);
  }
});