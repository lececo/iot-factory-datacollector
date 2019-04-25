package com.Smartfactory.MqttServer.mqtt;

import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class MQTTBridge {

    private static final Logger LOG = LoggerFactory.getLogger(MQTTBridge.class);
    /** Die URI des Servers der abgefragt wird. */

    private  static final String SERVER_URI = "tcp://localhost:1883";
    // private static final String SERVER_URI = "tcp://192.168.178.40:1883";
    // private static final String SERVER_URI = "tcp://192.168.0.54:1883";

    /** Topic */
    //should subscribe to everything!
    //private static final String TEST_TOPIC = "#";
    private static final String TEST_TOPIC = "test";

    private static final String ALARM_TOPIC = "alarm";
    private static MqttClient client;

    public void connectToBroker() throws MqttException {

        LOG.info("Starte MQTT Client ...");

        client = new MqttClient(SERVER_URI, "TestSpring");

        client.setCallback(new MQTTMessageLog(this));

        /* server options
        MqttConnectOptions test = new MqttConnectOptions();
        char[] pw = {'s','f','1','3','3','7'};
        test.setUserName("smartfactory");
        test.setPassword(pw);

        client.connect(test);
        */

        client.connect();

        client.subscribe(TEST_TOPIC);
    }

    private static String generateClientId() {
        return UUID.randomUUID().toString();
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
