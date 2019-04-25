package com.Smartfactory.MqttServer.Dao.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(value = "userdata")
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserData {
    private int position;
    private boolean isBig;
    private String widgetType;
    private Sensor sensor;

    public UserData(){}

    public UserData(int position, boolean isBig, String widgetType, Sensor sensor) {
        this.position = position;
        this.isBig = isBig;
        this.widgetType = widgetType;
        this.sensor = sensor;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public boolean isBig() {
        return isBig;
    }

    public void setBig(boolean isBig) {
        isBig = isBig;
    }

    public String getWidgetType() {
        return widgetType;
    }

    public void setWidgetType(String widgetType) {
        this.widgetType = widgetType;
    }

    public Sensor getSensor() {
        return sensor;
    }

    public void setSensor(Sensor sensor) {
        this.sensor = sensor;
    }
}
