package com.Smartfactory.MqttServer.Dao.entityDao;

import com.Smartfactory.MqttServer.Dao.entity.UserData;

import java.util.List;

public interface UserDao {
    String createUser(String email, String password);
    int deleteUser(String id);
    int updateUserData(String id, UserData[] data);
    String login(String email, String password);
    List<UserData> getUserData(String id);
}
