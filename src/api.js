export default class CoinCap {
  static url = "https://api.coincap.io/v2/";

  static async getAssets() {
    let response = await fetch(`${this.url}assets?limit=20`);
    response = await response.json();
    return response.data;
  }

  static async getAsset(coin) {
    let response = await fetch(`${this.url}assets/${coin}`);
    response = await response.json();
    return response.data;
  }

  static async getAssetHistory(coin) {
    const now = new Date();

    const end = now.getTime();

    // today minus one day
    now.setDate(now.getDate() - 0.5);
    const start = now.getTime();

    let url = `${this.url}assets/${coin}/history?interval=h1&start=${start}&end=${end}`;
    let response = await fetch(url);
    response = await response.json();
    return response.data;
  }

  static async getMarkets(coin) {
    let response = await fetch(`${this.url}assets/${coin}/markets?limit=5`);
    response = await response.json();
    return response.data;
  }

  static async getExchange(id) {
    let response = await fetch(`${this.url}exchanges/${id}`);
    response = await response.json();
    return response.data;
  }
}
