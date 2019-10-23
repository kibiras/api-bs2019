# api-bs2019

REST API implemented with https://www.rplumber.io/

Database - https://mariadb.org/

## Requirements

* MariaDB
* r-base
* library(RMariaDB)
* library(DBI)
* library(openssl)

## How to run API (for testing)

In shell:
```
Rscript runAPI.R
```
In R environment working directory:
```
source("runAPI.R")
```

R runs swagger on localhost: http://127.0.0.1:8000/__swagger__/

## Test API endpoint
```bash
java -jar SebCarConfigurationServer.jar --server.port=9000
```

## Hosting API locally (Linux)

```bash
sudo nano /etc/systemd/system/plumber-api.service
```

```bash
[Unit]
Description=Plumber API
# After=postgresql 
# (or mariadb, mysql, etc if you use a DB with Plumber, otherwise leave this commented)

[Service]
ExecStart=/usr/bin/Rscript -e "api <- plumber::plumb('/your-dir/your-api-script.R'); api$run(port=8080, host='0.0.0.0')"
Restart=on-abnormal
WorkingDirectory=/your-dir/

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl activate plumber-api   # automatically start the service when the server boots
sudo systemctl start plumber-api      # start the service right now
```
