package com.Smartfactory.MqttServer.Dao.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(value = "alert")
public class Alert {
    private String creator;
    private String sensorId;
    private double min;
    private double max;
    private Boolean mqtt;
    private Boolean email;

    @Id
    private String id;

    public Alert(){}

    public Alert(String creator, String sensorId, double min, double max, boolean mqtt, boolean email) {
        this.creator = creator;
        this.sensorId = sensorId;
        this.min = min;
        this.max = max;
        this.mqtt = mqtt;
        this.email = email;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public String getSensorId() {
        return sensorId;
    }

    public void setSensorId(String sensorId) {
        this.sensorId = sensorId;
    }

    public double getMin() {
        return min;
    }

    public void setMin(double min) {
        this.min = min;
    }

    public double getMax() {
        return max;
    }

    public void setMax(double max) {
        this.max = max;
    }

    public Boolean getMQTT() {
        return mqtt;
    }

    public void setMQTT(Boolean MQTT) {
        this.mqtt = MQTT;
    }

    public Boolean getEmail() {
        return email;
    }

    public void setEmail(Boolean email) {
        this.email = email;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Alert{" +
                "id='" + id + '\'' +
                ", creator='" + creator + '\'' +
                ", sensorId='" + sensorId + '\'' +
                ", min=" + min + '\'' +
                ", max='" + max + '\'' +
                '}';
    }
}

