library(RMariaDB)
library(DBI)
con <- dbConnect(RMariaDB::MariaDB(), user = "seb", db = "seb")

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
			      pc_id INT,
			      date VARCHAR(50),
            PRIMARY KEY (id))")

dbSendQuery(con, "drop table seb.game_quiz")
dbSendQuery(con, "create table seb.game_quiz (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(200) NULL,
            token VARCHAR(200),
            q1 VARCHAR(200),
            q2 VARCHAR(200),
            q3 VARCHAR(200),
            q4 VARCHAR(200),
            q5 VARCHAR(200),
			      ip VARCHAR(50),
            pc_id INT,
            date VARCHAR(50),
            PRIMARY KEY (id))")

dbSendQuery(con, "drop table seb.users")
dbSendQuery(con, "create table seb.users (
            id INT NOT NULL AUTO_INCREMENT,
            username VARCHAR(200),
            email VARCHAR(200),
            leaderboard INT, 
            communication INT, 
            pc_id INT, 
            game_id INT, 
            date VARCHAR(200),
            PRIMARY KEY (id))")



