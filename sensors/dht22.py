import time
import adafruit_dht
import board
import json
import sys

try:
    dhtDevice = adafruit_dht.DHT22(board.D4)
    temperature = dhtDevice.temperature
    humidity = dhtDevice.humidity
    data = {
        "temperature": temperature,
        "humidity": humidity
    }
    print(json.dumps(data))
except RuntimeError as error:
    print(json.dumps({"error": str(error)}), file=sys.stderr)