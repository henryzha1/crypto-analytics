export default class CoinGecko {
  static async getInfo(cryptoId) {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}`);
      const parsedResponse = await response.json();
      if(!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}
        ${parsedResponse.error}`;
        throw new Error(errorMessage);
      } else {
        return parsedResponse;
      }
    } catch(error) {
      return error;
    }
  }
}
