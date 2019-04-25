package com.Smartfactory.MqttServer.Dao.entityDao;

import com.Smartfactory.MqttServer.Dao.entity.MessagesDocument;
import com.Smartfactory.MqttServer.Dao.entity.Sensor;
import com.Smartfactory.MqttServer.Dao.entity.SensorOnlineItem;
import com.Smartfactory.MqttServer.Dao.entity.UserDocument;

import java.util.List;

public interface MessagesDocumentDao {
    List<MessagesDocument> findByTopic(String topic);
    List<MessagesDocument> findByClientId(String clientId);
    List<MessagesDocument> findAll();
    List<String> findAllClients();
    List<SensorOnlineItem> findAllSensors();

    void save(MessagesDocument messagesDocument);

    // returns all messages for specific time, for specific sensor
    List<MessagesDocument> findSensorByElements(String client, String sensor, int elements);
}