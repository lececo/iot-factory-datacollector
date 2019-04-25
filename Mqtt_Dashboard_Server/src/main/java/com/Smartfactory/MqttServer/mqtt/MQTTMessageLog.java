package com.Smartfactory.MqttServer.mqtt;


import com.Smartfactory.MqttServer.Dao.Dao;
import com.Smartfactory.MqttServer.Dao.DaoSingletonFactory;
import com.Smartfactory.MqttServer.Dao.entity.Alert;
import com.Smartfactory.MqttServer.Dao.entity.MessagesDocument;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Calendar;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class MQTTMessageLog implements MqttCallback {

    private Dao dao;
    private static final Logger LOG = LoggerFactory.getLogger(MQTTMessageLog.class);
    private ObjectMapper objectMapper;
    private ExecutorService executor = Executors.newFixedThreadPool(4);
    private static MQTTBridge alarmPublisher;

    public MQTTMessageLog(MQTTBridge client){
        dao = DaoSingletonFactory.getInstance();
        objectMapper = new ObjectMapper();
        alarmPublisher = client;
    }

    @Override
    public void connectionLost(Throwable cause) {

    }

    @Override
    public void messageArrived(String topic, MqttMessage message) {
        String nachricht = message.toString();
        MessagesDocument mqttMessage;

        try {
            mqttMessage = objectMapper.readValue(nachricht, MessagesDocument.class);

            mqttMessage.setTime(new java.sql.Timestamp(Calendar.getInstance().getTime().getTime()).toString());

            // save message to mongo db
            dao.save(mqttMessage);

            Callable task = generateCallable(mqttMessage);
            executor.submit(task);
        } catch (Exception e){
            LOG.error("Exception in 'messageArrived method'! Message: " + nachricht);
        }

        //LOG.info("{}", nachricht);
    }

    private Callable generateCallable(MessagesDocument mqttMessage) {
        Callable callableTask = () -> {
            List<Alert> alertList = dao.getAlertsWithSensor(mqttMessage.getClientId());

            alertList.stream()
                     .forEach(i -> {
                         String message;
                         if(mqttMessage.getValue() > i.getMax()){
                            message = "ALARM!!! Max value: " + i.getMax()
                                    + " current value: " + mqttMessage.getValue();
                             alarmPublisher.publishAlarm(message);
                         }

                         if(mqttMessage.getValue() < i.getMin()){
                             message = "ALARM!!! Min value: " + i.getMin()
                                     + " current value: " + mqttMessage.getValue();
                            alarmPublisher.publishAlarm(message);
                         }
                     }
                     );

            return 0;
        };

        return callableTask;
    }

    @Override
    public void deliveryComplete(IMqttDeliveryToken token) {

    }
}
