import './css/styles.css';
import CoinGecko from './coinGecko.js';

// business logic

async function handleChange(e) {
  const value = e.target.value;
  const response = await CoinGecko.getInfo(value);
  if(response.id) {
    printInfo(response);
  } else {
    printError(response, value);
  }

}

// UI logic

function printInfo(response) {
  document.getElementById("error").innerText = "";
  document.getElementById("fullName").innerText = `Name: ${response.name} (${response.symbol})`;
  document.getElementById("description").innerText = `Description: ${response.description.en}`;
  document.getElementById("currentPrice").innerText = `Current Price (USD): ${response.market_data.current_price.usd}`;
  document.getElementById("marketCap").innerText = `Current Market Cap (USD): ${response.market_data.market_cap.usd}`;
  document.getElementById("numberOfTrades").innerText = `Total Number of ${response.name} Traded in Last 24H: ${(response.market_data.total_volume.usd/response.market_data.current_price.usd).toFixed(2)}`;

}

function printError(error, cryptoName) {
  document.querySelectorAll(".metadata").forEach((element) => {
    element.innerText = "";
  });
  document.getElementById("error").innerText = `There was an error accessing data for ${cryptoName}:
  ${error}`;
}



document.getElementById("cryptoSearch").addEventListener("change", handleChange);