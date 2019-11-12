# api-bs2019

## bs 2019 application

### Checklist

Car numbers
* 0 (set even ip address) - Player1 - Yellow car
* 1 (set odd ip address) - Player2 - Green car

Before starting the applications:

* Check and set IPs for user PCs
* Add server PC IP to /build-stuff-gui/src/environments/environments.ts
* Add REST API address to /API/config.R
* Streaming to socket (from CAR server PC):
```
tail -f /tmp/test | nc -lk 4500
```
* Run Spark app:
```
cd /opt/spark/spark-2.4.4-bin-hadoop2.7/bin && ./spark-submit --class FromSocketToKafka /opt/flow/bs/socketToKafka/target/billiardstream-1.0-SNAPSHOT-jar-with-dependencies.jar test5 192.168.10.105 4500 1
```
* Run Spring app:
```
java -jar /opt/flow/bs/consumPersist/target/buildstuff-0.0.1-SNAPSHOT.jar --spring.config.location=/opt/flow/bs/application.properties
```
* Run R API - back-end application (8000 + 8001 ports)
```
Rscript runAPI_bs.R
```
```
Rscript runAPI_bs_additional.R
```
* build-stuff-gui - front-end application (Angular) (4200 port)
```
npm start
```
* Run everything on Guake terminal for convenient usage (F12)


### Useful links

* http://localhost:4200/ UI
* http://localhost:8000/__swagger__/ REST API Game
* http://localhost:8001/__swagger__/ Back-end
* http://localhost:3000/ Grafana

### GUIs

* REST API - Rstudio
* Spark + Spring - IntelliJ
* UI - Visual Studio
* MariaDB - DBeaver


### Kafka

this year we used Kafka from Confluent on Docker : https://docs.confluent.io/current/quickstart/ce-docker-quickstart.html

* Start Kafka cluster :
```
docker-compose up -d --build
```

### Docker

Docker is added unders systemctl and should start automatically after each reboot.

* Check Docker
```
systemctl status docker
```

### Mariadbb

* MariaDB is added unders systemctl and should start automatically after each reboot.

```
systemctl status mariadb
```
