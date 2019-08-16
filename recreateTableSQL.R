library(RMariaDB)
library(DBI)
con <- dbConnect(RMariaDB::MariaDB(), user = "root", db = "seb")
dbSendQuery(con, "drop table seb.game_info")
dbSendQuery(con, "create table seb.game_info (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(200) NULL,
            token VARCHAR(200),
            fuel INT,
            battery INT,
            tires INT,
            turbo_charger INT,
            pithole INT,
            barrier INT,
			ip VARCHAR(50),
            PRIMARY KEY (id))")

