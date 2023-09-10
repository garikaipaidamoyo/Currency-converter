document.addEventListener("DOMContentLoaded", function () {
    const currencyConverterForm = document.getElementById(
      "currency-converter-form"
    );
    const fromCurrencyInput = document.getElementById("from-currency");
    const toCurrencyInput = document.getElementById("to-currency");
    const amountInput = document.getElementById("amount");
    const exchangeDateInput = document.getElementById("exchange-date");
    const resultDisplay = document.querySelector(".result");
  
    currencyConverterForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const fromCurrency = fromCurrencyInput.value;
      const toCurrency = toCurrencyInput.value;
      const amount = parseFloat(amountInput.value);
      const exchangeDate = exchangeDateInput.value;
  
      const API_KEY = "2b0e589ecc60d67784ffef424b4f79da";
      const baseCurrency = "EUR";
  
      // Input validation
      if (isNaN(amount)) {
        console.error("Invalid amount entered.");
        resultDisplay.innerHTML =
          "<p>Invalid amount entered. Please enter a valid number.</p>";
        return; // Exit the function if the amount is invalid.
      }
  
      // Construct the correct API URL
      const apiUrl = "https://api.exchangerate.host/latest";
  
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          // Check if exchange rate for the selected currency pair is available
          if (!data.rates || !data.rates[toCurrency]) {
            const errorMessage = `Exchange rate for ${fromCurrency} to ${toCurrency} is not available.`;
            console.error(errorMessage);
            resultDisplay.innerHTML = `<p>${errorMessage}</p>`;
          } else {
            // Extract the exchange rate from the API response
            const exchangeRate = data.rates[toCurrency];
  
            // Calculate the converted amount
            const convertedAmount = amount * exchangeRate;
  
            // Log the API request URL to the console
            console.log(`API Request URL: ${apiUrl}`);
  
            // Update the result display using the updateResult function
            updateResult(
              resultDisplay,
              amount,
              fromCurrency,
              toCurrency,
              convertedAmount
            );
          }
        })
        .catch((error) => {
          console.error("Error fetching exchange rates:", error);
          resultDisplay.innerHTML = `<p>${error.message}</p>`;
        });
    });
  
    // Function to update the result in the specified result div
    function updateResult(
      resultDisplay,
      amount,
      fromCurrency,
      toCurrency,
      convertedAmount
    ) {
      resultDisplay.innerHTML = `
        <p>${amount} ${fromCurrency} is equal to ${convertedAmount.toFixed(
        2
      )} ${toCurrency}</p>
      `;
    }
  });