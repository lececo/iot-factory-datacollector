package com.Smartfactory.MqttServer.Dao;

import com.Smartfactory.MqttServer.Dao.dao_impl.DaoImplementations;
import com.Smartfactory.MqttServer.Dao.entityDao.MessagesDocumentDao;

import java.text.SimpleDateFormat;
import java.util.Calendar;

public class DaoSingletonFactory {
    private static Dao dao = null;

    public static Dao getInstance()
    {
        if (DaoSingletonFactory.dao == null) {
            DaoSingletonFactory.dao = new DaoImplementations();
        }

        return DaoSingletonFactory.dao;
    }
}