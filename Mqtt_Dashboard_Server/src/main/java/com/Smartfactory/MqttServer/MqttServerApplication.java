package com.Smartfactory.MqttServer;

import com.Smartfactory.MqttServer.mqtt.MQTTBridge;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
//public class MqttServerApplication implements CommandLineRunner {
public class MqttServerApplication {

    //@Autowired
    //public static MessagesDocumentRepository dao_impl;
    private static MQTTBridge mqttBridge = new MQTTBridge();
    public static void main(String[] args) {
        SpringApplication.run(MqttServerApplication.class, args);
        try {
            mqttBridge.connectToBroker();
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }

    /*
    @Override
    public void run(String... args) throws Exception {

            dao_impl.deleteAll();


            // example injection of data
            dao_impl.save(new MessagesDocument("rotation/client1", "client1", "0", 22, "unit1"));
            dao_impl.save(new MessagesDocument("rotation/client1", "client1", "1", 25, "unit1"));
            dao_impl.save(new MessagesDocument("rotation/client2", "client2", "0", 21, "unit2"));
            dao_impl.save(new MessagesDocument("rotation/client2", "client2","0", 29,"unit2"));

            // fetch all messages
            System.out.println("Messages found with findAll():");
            System.out.println("-------------------------------");
            for (MessagesDocument mes : dao_impl.findAll()) {
                System.out.println(mes);
            }
            System.out.println();

            // fetch messages through topic
            System.out.println("Messages found with findByTopic('rotation/client2'):");
            System.out.println("--------------------------------");
            System.out.println(dao_impl.findByTopic("rotation/client2"));

            // fetch messages through clientnames
            System.out.println("Customers found with findByClientname('client2'):");
            System.out.println("--------------------------------");
            for (MessagesDocument mes : dao_impl.findByClientId("client2")) {
                System.out.println(mes);
            }


    }*/


}