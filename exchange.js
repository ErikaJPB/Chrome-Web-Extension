const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const convert = document.getElementById("convert");
const result = document.getElementById("result");

const apiKey = "v8KiyB41xixc49b/HxEIUQ==zm76iBaK8XlfXIQe";
const apiUrl = "https://api.api-ninjas.com/v1/exchangerate?pair=";

convert.addEventListener("click", async () => {
  const amountTotal = Number(amount.value);
  const currencyTotal = currency.value;
  let url;
  let resultPrice;

  if (!amountTotal || isNaN(amountTotal)) {
    result.innerHTML = "Please enter a valid number for the amount.";
    return;
  }

  if (currencyTotal === "COP") {
    url = apiUrl + "USD_COP";
    try {
      const response = await fetch(url, {
        headers: {
          "X-API-KEY": apiKey,
        },
      });
      if (!response.ok) {
        result.innerHTML =
          "An error occurred while fetching exchange rates. Please try again later.";
        return;
      }
      const data = await response.json();
      const rate = data.exchange_rate;
      resultPrice = amountTotal / rate;
    } catch (error) {
      console.error("Request failed:", error);
      result.innerHTML = "An error occurred. Please try again later.";
      return;
    }
    result.innerHTML = `${amountTotal.toFixed(2)}  = ${resultPrice.toFixed(
      2
    )} USD`;
  } else if (currencyTotal === "USD") {
    url = apiUrl + "COP_USD";
    try {
      const response = await fetch(url, {
        headers: {
          "X-API-KEY": apiKey,
        },
      });
      if (!response.ok) {
        result.innerHTML =
          "An error occurred while fetching exchange rates. Please try again later.";
        return;
      }
      const data = await response.json();
      const rate = data.exchange_rate;
      resultPrice = amountTotal / rate;
    } catch (error) {
      console.error("Request failed:", error);
      result.innerHTML = "An error occurred. Please try again later.";
      return;
    }
    result.innerHTML = `${amountTotal.toFixed(2)} = ${resultPrice.toFixed(
      2
    )} COP`;
  }
});
