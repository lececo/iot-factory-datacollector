#!/usr/bin/env python3

import paho.mqtt.client as mqtt
import random
import time
from paho.mqtt.client import MQTTMessage

# This is the Publisher
def on_message(mosq, obj, msg):
    print(msg.topic + " " + str(msg.qos) + " " + str(msg.payload))

client = mqtt.Client()
client.on_message = on_message
client.connect("localhost",1883,60)
client.subscribe("alarm")
client.loop_start()

while True:
    time.sleep(20)
    