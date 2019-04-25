package com.Smartfactory.MqttServer.controller;

import com.Smartfactory.MqttServer.Dao.Dao;
import com.Smartfactory.MqttServer.Dao.DaoSingletonFactory;
import com.Smartfactory.MqttServer.Dao.entity.*;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class MainRESTController {

    private Dao dao = DaoSingletonFactory.getInstance();
    private static final Logger LOG = LoggerFactory.getLogger(MainRESTController.class);

    // Simple Login Check!
    private boolean loggedIN = false;

    private boolean checkLogin() {
        return loggedIN;
    }

    @RequestMapping(value = "/getAllMessages",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<MessagesDocument> getMessages() {
        if(!checkLogin()){
            return null;
        }

        return dao.findAll();
    }

    @RequestMapping(value = "/getOnlineClients",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<String> getOnlineClients() {
        if(!checkLogin()){
            return null;
        }

        return dao.findAllClients();
    }

    @RequestMapping(value = "/getOnlineSensors",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<SensorOnlineItem> getOnlineSensors() {
        if(!checkLogin()){
            return null;
        }

        return dao.findAllSensors();
    }


    // provide in request body all clients, which data should be returned
    @RequestMapping(value = "/getSpecificClientData",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<MessagesDocument> getSpecificClientData(@RequestParam(value = "client") String client) {
        if(!checkLogin()){
            return null;
        }

        return dao.findByClientId(client);
    }

    // provide in request body all clients, which data should be returned
    @RequestMapping(value = "/getSpecificTopicData",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<MessagesDocument> getSpecificTopicData(@RequestParam(value = "topic") String topic) {
        if(!checkLogin()){
            return null;
        }

        return dao.findByClientId(topic);
    }

    // provide in request body all clients, which data should be returned
    @RequestMapping(value = "/getSpecificSensorDataByElements",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<MessagesDocument> getSpecificSensorByTime(@RequestParam Map<String, String> requestParams) {
        if(!checkLogin()){
            return null;
        }

        String clientId = requestParams.get("client");
        String sensorId = requestParams.get("sensor");
        int elements = Integer.parseInt(requestParams.get("elements"));

        return dao.findSensorByElements(clientId, sensorId, elements);
    }

    // Returns ID as String or error messages
    @RequestMapping(value = "/createUser",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String createUser(@RequestParam Map<String, String> requestParams) {
        String email = requestParams.get("email");
        String passwort = requestParams.get("password");

        email = email.trim();
        passwort = passwort.trim();

        if(email == null|| passwort == null
            || email == "" || passwort == ""){
            return "Error: No empty input please. Check your input";
        }

        if(passwort.length() <= 5){
            return "Error: Your password is too short! Please enter again!";
        }

        return dao.createUser(email, passwort);
    }

    @RequestMapping(value = "/deleteUser",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Integer deleteUser(@RequestParam(value = "id") String id) {

        if(!checkLogin()){
            return null;
        }

        return dao.deleteUser(id);
    }

    @RequestMapping(value = "/login",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String login(@RequestParam Map<String, String> requestParams) {
        String email = requestParams.get("email");
        String passwort = requestParams.get("password");

        String returnValue = dao.login(email, passwort);
        if(returnValue != null){
            loggedIN = true;
            return returnValue;
        }

        return "Error: Wrong login data!";
    }

    @RequestMapping(value = "/logout",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String logout() {

        if(loggedIN) {
            loggedIN = false;
            return "Success: You are logged out!";
        }

        return "Error: You are not logged in!";
    }

    @RequestMapping(value = "/getUserData",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<UserData> getUserData(@RequestParam(value = "id") String id) {

        if(!checkLogin()){
            return null;
        }

        return dao.getUserData(id);
    }


    @RequestMapping(value = "/updateUser",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Integer updateUser(@RequestParam(value = "id") String id, @RequestBody String data) {

        if(!checkLogin()){
            return null;
        }

        // data = data.replaceAll("isBig", "big");
        ObjectMapper objectMapper = new ObjectMapper();
        List<UserData> userData = null;
        try {
            userData = objectMapper.readValue(data, new TypeReference<List<UserData>>(){});
        } catch (IOException e) { e.printStackTrace(); }

        return dao.updateUserData(id, userData.toArray(new UserData[userData.size()]));
    }

    @RequestMapping(value = "/createAlert",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String createAlert(@RequestBody String data) {

        if(!checkLogin()){
            return null;
        }

        ObjectMapper objectMapper = new ObjectMapper();
        Alert alert = null;
        try {
            alert = objectMapper.readValue(data, new TypeReference<Alert>(){});
        } catch (IOException e) { e.printStackTrace(); }

        return dao.createAlert(alert);
    }

    @RequestMapping(value = "/updateAlert",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Integer updateAlert(@RequestBody String data) {

        if(!checkLogin()){
            return null;
        }

        data = data.replaceAll("MQTT", "mqtt");
        data = data.replaceAll("Email", "email");
        ObjectMapper objectMapper = new ObjectMapper();
        Alert alert = null;
        try {
            alert = objectMapper.readValue(data, new TypeReference<Alert>(){});
        } catch (IOException e) { e.printStackTrace(); }

        return dao.updateAlert(alert);
    }


    @RequestMapping(value = "/deleteAlert",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Integer deleteAlert(@RequestParam(value = "id") String id) {

        if(!checkLogin()){
            return null;
        }

        return dao.deleteAlert(id);
    }

    // id ist die UserID
    @RequestMapping(value = "/getAlertList",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Alert> getAlertList(@RequestParam(value = "id") String id) {

        if(!checkLogin()){
            return null;
        }

        return dao.getAlertList(id);
    }


}