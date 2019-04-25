package com.Smartfactory.MqttServer.Dao;

import com.Smartfactory.MqttServer.Dao.entity.Alert;
import com.Smartfactory.MqttServer.Dao.entityDao.AlertDao;
import com.Smartfactory.MqttServer.Dao.entityDao.MessagesDocumentDao;
import com.Smartfactory.MqttServer.Dao.entityDao.UserDao;

import java.util.List;

public abstract class Dao implements UserDao, AlertDao, MessagesDocumentDao {
    public abstract List<Alert> getAlertsWithSensor(String clientId);
}
