library(jsonlite)
library(tidyverse)
library(lubridate)
game <- fromJSON("game.json", flatten=TRUE)
dbWriteTable(con, "game_test", game, append = TRUE)

game <- game %>%
  mutate(datetime = as_datetime(time))
summary(game)

ggplot(game) +
  geom_line(aes(y = attentionlevel_Player1, x = datetime, color = "attention"), alpha = 0.4) +
  geom_line(aes(y = meditation1level_Player1, x = datetime, color = "meditation"), alpha = 0.4) +
  geom_line(aes(y = speed_Player1, x = datetime, color = "speed"), alpha = 0.4)

unique(game$eventName)

geforce <- dbGetQuery(con, "select id, time, gforcex_player1, gforcey_player1 from event_first_try_backup")
