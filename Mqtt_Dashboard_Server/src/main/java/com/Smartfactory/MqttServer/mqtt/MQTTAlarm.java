package com.Smartfactory.MqttServer.mqtt;

import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.stereotype.Component;

@Component
public class MQTTAlarm {

    private  static final String SERVER_URI = "tcp://localhost:1883";
    private static final String ALARM_TOPIC = "alarm";
    private static MqttClient client;

    public MQTTAlarm() {
        try {
            client = new MqttClient(SERVER_URI, "AlarmPublisher");
            client.connect();
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }

    public synchronized static void publishAlarm(String message){
        MqttMessage MqttMessage = new MqttMessage(message.getBytes());
        try {
            client.publish(ALARM_TOPIC, MqttMessage);
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }
}
