import { DHT22Entity } from "./dht22";
export interface Adapter {
  read(): Promise<Adapters>;
}

type Adapters = DHT22Entity;
