import { exec } from "child_process";
import { Adapter } from ".";
export interface DHT22Entity {
  temperature: number;
  humidity: number;
}
export class DHT22 implements Adapter {
  async read() {
    return new Promise<DHT22Entity>((resolve, reject) => {
      exec("python3 ./sensors/dht22.py", (error, stdout, _stderr) => {
        if (error) {
          reject(error);
        }
        resolve(JSON.parse(stdout));
      });
    });
  }
}
