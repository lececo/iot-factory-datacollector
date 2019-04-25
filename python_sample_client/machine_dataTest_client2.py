#!/usr/bin/env python3

import paho.mqtt.client as mqtt
import random
import time
from paho.mqtt.client import MQTTMessage

# This is the Publisher

client = mqtt.Client()
client.connect("localhost",1883,60)
data = b'{"topic":"test","clientId":"client_localhost1","sensorId":"1","value":"10","unit":"unit_1_component", "state":"0"}'
client.publish("test", data)
client.disconnect()

client2 = mqtt.Client()
client2.connect("localhost",1883,60)
data = '{"topic":"test","clientId":"client_localhost2","sensorId":"1","value":"' + str(random.randint(10,99)) + '","unit":"unit_1_component", "state":"0"}'
data = data.encode('utf-8')

while True:
    client2.publish("test", data)
    time.sleep(4)
    data = '{"topic":"test","clientId":"client_localhost2","sensorId":"1","value":"' + str(random.randint(10,55)) + '","unit":"unit_1_component", "state":"0"}'
    data = data.encode('utf-8')

#MQTTMessage message = new MQTTMessage();
#message.setPayload("{foo: bar, lat: 0.23443, long: 12.3453245}".getBytes());
#client.publish("foo", message);
