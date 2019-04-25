package com.Smartfactory.MqttServer.Dao.dao_impl;

import com.Smartfactory.MqttServer.Dao.Dao;
import com.Smartfactory.MqttServer.Dao.entity.*;
import com.Smartfactory.MqttServer.Dao.entityDao.AlertDao;
import com.Smartfactory.MqttServer.Dao.entityDao.MessagesDocumentDao;
import com.Smartfactory.MqttServer.Dao.entityDao.UserDao;
import com.mongodb.MongoClient;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoDbFactory;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class DaoImplementations extends Dao {

    private MongoOperations mongoOps = new MongoTemplate(new SimpleMongoDbFactory(new MongoClient(), "mongo"));


    @Override
    public List<MessagesDocument> findByTopic(String topic) {
        Query query = new Query();
        query.addCriteria(Criteria.where("topic").is(topic));

        return mongoOps.find(query, MessagesDocument.class);
    }

    @Override
    public List<MessagesDocument> findByClientId(String client) {
        Query query = new Query();
        query.addCriteria(Criteria.where("clientId").is(client));

        return mongoOps.find(query, MessagesDocument.class);
    }

    @Override
    public List<MessagesDocument> findAll() {
        return mongoOps.findAll(MessagesDocument.class);
    }

    @Override
    public List<String> findAllClients() {
        List<String> clientList;

        clientList = mongoOps.findDistinct("clientId", MessagesDocument.class, String.class);

        return clientList;
    }

    /**
     * Gives back a list of information about all distinct sensors:
     * List Entry example:
     * clientid;sensorid;unit;true
     * @return
     */
    @Override
    public List<SensorOnlineItem> findAllSensors() {
        List<String> sensorList;
        List<SensorOnlineItem> sensorOnlineItems = new ArrayList<>();

        sensorList = mongoOps.findDistinct("sensorId", MessagesDocument.class, String.class);

        MessagesDocument messagesDocument;
        for (int i = 0; i < sensorList.size(); i++){
            Query query = new Query();
            query.addCriteria(Criteria.where("sensorId").is(sensorList.get(i)));
            messagesDocument = mongoOps.findOne(query, MessagesDocument.class);

            String time = messagesDocument.getTime();
            Instant sensorTime = null;
            try {
                sensorTime = (new SimpleDateFormat("yyyy-mm-dd hh:mm:ss.SSS").parse(time)).toInstant();
            } catch (ParseException e) {
                e.printStackTrace();
            }
            Instant MinutesAgo = ZonedDateTime.now().minusMinutes(10).toInstant();
            boolean withinLast10Minutes = sensorTime.isAfter(MinutesAgo);
            sensorOnlineItems.add(new SensorOnlineItem(
                    messagesDocument.getClientId(),
                    messagesDocument.getSensorId(),
                    messagesDocument.getUnit(),
                    messagesDocument.getState(),
                    withinLast10Minutes));
          }

        return sensorOnlineItems;
    }

    @Override
    public void save(MessagesDocument messagesDocument) {
        mongoOps.save(messagesDocument);
    }


    //time format: 2018-11-21 19:52:17.168
    @Override
    public List<MessagesDocument> findSensorByElements(String clientID, String sensorID, int elements) {
        Query query = new Query();
        query.addCriteria(Criteria.where("clientId").is(clientID));
        query.addCriteria(Criteria.where("sensorId").is(sensorID));

        List<MessagesDocument> sensorData = mongoOps.find(query, MessagesDocument.class);

        if(sensorData.size() < elements){
            return sensorData;
        }

        return sensorData.subList(sensorData.size() - 1 - elements,sensorData.size() - 1);
    }

    @Override
    public String createUser(String email, String password) {
        UserDocument user = new UserDocument(email, password);
        mongoOps.save(user);

        Query query = new Query();
        query.addCriteria(Criteria.where("email").is(email));
        query.addCriteria(Criteria.where("password").is(password));

        user = mongoOps.findOne(query, UserDocument.class);

        return user.getId();
    }

    /**
     * Success returns 0. Failure returns 1.
     * @param id
     * @return
     */
    @Override
    public int deleteUser(String id) {
        Query query = new Query();
        query.addCriteria(Criteria.where("id").is(id));
        mongoOps.findAndRemove(query, UserDocument.class);

        return 0;
    }

    @Override
    public int updateUserData(String id, UserData[] data) {
        Query query = new Query();
        query.addCriteria(Criteria.where("id").is(id));

        Update update = new Update();
        update.set("data", data);
        mongoOps.updateFirst(query, update, UserDocument.class);

        return 0;
    }

    @Override
    public String login(String email, String password) {
        Query query = new Query();
        query.addCriteria(Criteria.where("email").is(email));
        query.addCriteria(Criteria.where("password").is(password));

        UserDocument user = mongoOps.findOne(query, UserDocument.class);

        if(user == null){
            return null;
        }

        return user.getId();
    }

    @Override
    public List<UserData> getUserData(String id) {
        Query query = new Query();
        query.addCriteria(Criteria.where("id").is(id));

        UserDocument user = mongoOps.findOne(query, UserDocument.class);

        return user.getData();
    }

    @Override
    public String createAlert(Alert alert) {
        mongoOps.save(alert);

        Query query = new Query();
        query.addCriteria(Criteria.where("creator").is(alert.getCreator()));
        query.addCriteria(Criteria.where("sensorId").is(alert.getSensorId()));
        query.addCriteria(Criteria.where("min").is(alert.getMin()));
        query.addCriteria(Criteria.where("max").is(alert.getMax()));

        return mongoOps.findOne(query, Alert.class).getId();
    }

    @Override
    public int deleteAlert(String id) {
        Query query = new Query();
        query.addCriteria(Criteria.where("id").is(id));
        mongoOps.findAndRemove(query, Alert.class);

        return 0;
    }

    @Override
    public int updateAlert(Alert alert) {
        Query query = new Query();
        query.addCriteria(Criteria.where("id").is(alert.getId()));

        Update update = new Update();
        update.set("creator", alert.getCreator());
        update.set("sensorId", alert.getSensorId());
        update.set("min", alert.getMin());
        update.set("max", alert.getMax());
        update.set("mqtt", alert.getMQTT());
        update.set("email", alert.getEmail());

        mongoOps.updateFirst(query, update, Alert.class);

        return 0;
    }

    @Override
    public List<Alert> getAlertList(String id) {
        Query query = new Query();
        query.addCriteria(Criteria.where("creator").is(id));
        return mongoOps.find(query, Alert.class);
    }


    public List<Alert> getAlertsWithSensor(String sensorID) {
        Query query = new Query();
        query.addCriteria(Criteria.where("sensorId").is(sensorID));
        return mongoOps.find(query, Alert.class);
    }
}
