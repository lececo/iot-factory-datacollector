package com.Smartfactory.MqttServer.Dao.entity;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(value = "sensorListItem")
public class SensorOnlineItem {
    private String clientId;
    private String sensorId;
    private String sensorUnit;
    private int sensorState;
    private boolean active;

    public SensorOnlineItem(String clientId, String sensorId, String sensorUnit, int sensorState, boolean active) {
        this.clientId = clientId;
        this.sensorId = sensorId;
        this.sensorUnit = sensorUnit;
        this.sensorState = sensorState;
        this.active = active;
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
}
