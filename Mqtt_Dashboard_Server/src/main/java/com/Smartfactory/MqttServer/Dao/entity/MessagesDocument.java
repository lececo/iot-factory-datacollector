package com.Smartfactory.MqttServer.Dao.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(value = "messages")
public class MessagesDocument {

    public String topic;
    public String clientId;

    public String sensorId;
    public int value;
    public int state;
    public String unit;
    public String time;

    @Id
    private String id;

    public MessagesDocument(){}

    public MessagesDocument(String topic, String clientId, String sensorId, int value, String unit, int state) {
        this.topic = topic;
        this.clientId = clientId;
        this.sensorId = sensorId;
        this.value = value;
        this.unit = unit;
        this.state = state;
    }


    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getSensorId() {
        return sensorId;
    }

    public void setSensorId(String sensorId) {
        this.sensorId = sensorId;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    @Override
    public String toString() {
        return "MQTTMessage{" +
                "topic='" + topic + '\'' +
                ", clientId='" + clientId + '\'' +
                ", sensorId='" + sensorId + '\'' +
                ", value=" + value +
                ", unit='" + unit + '\'' +
                ", time='" + time + '\'' +
                ", state='" + state +
                '}';
    }

}