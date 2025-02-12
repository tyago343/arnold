export class DHT22Mock {
  async read() {
    const randomTemperature = parseFloat((20 + Math.random() * 10).toFixed(2));
    const randomHumidity = parseFloat((40 + Math.random() * 20).toFixed(2));
    return {
      temperature: randomTemperature,
      humidity: randomHumidity,
    };
  }
}
