package com.Smartfactory.MqttServer.Dao.entityDao;

import com.Smartfactory.MqttServer.Dao.entity.Alert;

import java.util.List;

public interface AlertDao {
    String createAlert(Alert alert);
    int deleteAlert(String id);
    int updateAlert(Alert alert);
    List<Alert> getAlertList(String id);
}
