import time
import adafruit_dht
import board
import json

dhtDevice = adafruit_dht.DHT22(board.D4)
temperature = dhtDevice.temperature
humidity = dhtDevice.humidity
data = {
  "temperature": temperature,
  "humidity": humidity
}

# returns {"temperature": 25.0, "humidity": 50.0 } for example
print(json.dumps(data))