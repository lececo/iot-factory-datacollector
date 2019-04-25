# Iot-Factory

## Installationsanweisungen

 1. Clonen des Repositories / Entpacken des Quellcode
 2. Backend einrichten
 3. Frontend einrichten
 4.  Alle Komponenten starten

### Backend
Das Backend ist eine Java Spring Applikation die eine Datenbankanbindung benötigt. 

#### Installation der Backend Applikation
 - Um den Java Code auszuführen wird eine JDK Version 10+ benötigt.
 - Die Applikation holt sich per Gradle alle Dependencies automatisch. In der IDE (bevorzugt IntelliJ), muss nur eine Gradle Aktualisierung durchgeführt werden. Dies erkennt die IDE meistens automatisch und ein Info Popup erscheint. 
 - Wir benutzen als Datenbank MongoDB. Diese kann auf der offiziellen MongoDB Homepage runtergeladen und installiert werden: `https://www.mongodb.com/download-center/community`. Um MongoDB auf einem Ubuntu Betriebssystem zu installieren, sollte man dieser Anleitung folgen: `https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/`
 - Der MQTT-Server bzw. Broker Mosquitto muss heruntergeladen und installiert werden. In Ubuntu per Konsolenbefehl: `sudo apt-get install mosquitto mosquitto-clients`
 - Um Testdaten zu generieren, können beiliegende Python Skripts verwendet werden. Dazu muss man Python3 installieren und einen MQTT Client, per Python Packetmanager pip: `pip3 install paho-mqtt`
 
### Frontend
Das Frontend ist eine Web-App basierend auf dem [Angular-Framework](https://angular.io/) . 

#### Installation und lokales Ausführen der App
 - Zur Nutzung von Angular wird eine [Nodejs](https://nodejs.org/) Installation benötigt. Mehr Informationen zur Installation von [Nodejs](https://nodejs.org/) für ihr Betriebssystem finden Sie [hier](https://nodejs.org/en/download/).
 - Weiterhin benötigen Sie zum lokalen Ausführen der App das Angluar CLI Paket. Installieren Sie das Paket mit dem Konsolenbefehl `npm install -g @angular/cli`.
 - Als letztes müssen noch die Dependencies der App installiert werden. Hierzu wechseln Sie in den Ordner **mqttFrontend** z.B mit `cd mqttFrontend`und führen dort den Konsolenbefehl `npm install` aus.
 - Danach kann die App lokal mit dem Konsolenbefehl `ng serve` ausgeführt werden. Wie Sie auf ihrer Konsole sehen können Sie die App nun in Ihrem Browser unter `http://localhost:4200/` aufrufen.

#### Deployment
Um die endgültige Applikation für einen Remote-Server zu bauen führen Sie den Konsolenbefehl `ng build --prod` aus und kopieren alles im Ordner **dist/** auf ihren Server. Mehr Information zum Deployment und verschiedenen Optionen finden Sie [hier](https://angular.io/guide/deployment).