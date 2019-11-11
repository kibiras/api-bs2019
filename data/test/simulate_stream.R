library(RMariaDB)
library(DBI)
library(openssl)
library(dplyr)
library(magrittr)
library(jsonlite)
library(stringi)

con <- dbConnect(RMariaDB::MariaDB(), user = "seb", password = "seb", db = "seb")


data <- fromJSON("game.json", flatten=TRUE)
colnames(data) <- tolower(colnames(data))
# data <- dbGetQuery(con, "select * from event_first_try_backup")

data %>%
  filter(eventname %in% c("gameStart", "raceStart", "raceFinished")) %>%
  select(raceid, time, eventname, whichplayercaused,wholeracetime_player1, wholeracetime_player2, lapnumber_player1, 
         lapnumber_player2, speed_player1, speed_player2, gforcey_player1, gforcex_player1) %>%
  write.csv("example.csv")

as.numeric(Sys.time())
head(data$time)





dbGetQuery(con, "drop table event_generated")
rate <- 10
for (game_id in seq(1:5)) {
  data$raceid <- game_id
  i <- 1
while (i <= nrow(data)) {
  input <- data[i:(i + rate),]
  input$time <- as.integer(Sys.time())
  input$gforcex_player1 <- rnorm(1, mean = 50, sd = 10)
  input$gforcey_player1 <- rnorm(1, mean = 50, sd = 15)
  dbWriteTable(con, "event_generated", input, append = TRUE)
  i <- i + rate  + 1
  Sys.sleep(1)
  }
}



