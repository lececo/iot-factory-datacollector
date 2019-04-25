package com.Smartfactory.MqttServer.Dao.entity;


import org.springframework.data.mongodb.core.mapping.Document;

@Document(value = "userdata")
public class Sensor {
    private String clientId;
    private String sensorId;
    private int sensorValue;
    private String sensorUnit;
    private int sensorState;
    private boolean active;
    private int updateInterval;

    public Sensor(){}

    public Sensor(String clientId, String sensorId, int sensorValue, String sensorUnit, int sensorState, boolean active, int updateInterval) {
        this.clientId = clientId;
        this.sensorId = sensorId;
        this.sensorValue = sensorValue;
        this.sensorUnit = sensorUnit;
        this.sensorState = sensorState;
        this.active = active;
        this.updateInterval = updateInterval;
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

    public int getSensorValue() {
        return sensorValue;
    }

    public void setSensorValue(int sensorValue) {
        this.sensorValue = sensorValue;
    }

    public String getSensorUnit() {
        return sensorUnit;
    }

    public void setSensorUnit(String sensorUnit) {
        this.sensorUnit = sensorUnit;
    }

    public int getSensorState() {
        return sensorState;
    }

    public void setSensorState(int sensorState) {
        this.sensorState = sensorState;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public int getUpdateInterval() {
        return updateInterval;
    }

    public void setUpdateInterval(int updateInveral) {
        this.updateInterval = updateInterval;
    }
}
