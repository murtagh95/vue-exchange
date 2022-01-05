export default class CoinCap {
  static url = "https://api.coincap.io/v2/";

  static async getAssets() {
    let response = await fetch(`${this.url}assets?limit=20`);
    response = await response.json();
    return response.data;
  }
}
