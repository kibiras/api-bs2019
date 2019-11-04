library(httr)
library(tidyverse)
library(textutils)
library(DBI)
library(RMariaDB)
con <- dbConnect(RMariaDB::MariaDB(), user = "seb", db = "seb")

questions_cs <- GET("https://opentdb.com/api.php?amount=32&category=18&type=boolean") %>%
  content(as="parsed") 
questions_games <- GET("https://opentdb.com/api.php?amount=20&category=15&type=boolean") %>%
  content(as="parsed") 
questions_math <- GET("https://opentdb.com/api.php?amount=15&category=19&type=boolean") %>%
  content(as="parsed") 

questions <- append(questions_cs$results, questions_games$results)
questions <- append(questions, questions_math$results)

questions_df <- map_df(questions, magrittr::extract)
questions_df$question <- HTMLdecode(questions_df$question)
saveRDS(questions_df, "questions.rds")
questions_df <- readRDS("questions.rds")

questions_df <- questions_df %>%
  mutate(id = row_number()) %>%
  select(id, category, difficulty, question, correct_answer)
dbSendQuery(con, "drop table seb.questions")
dbWriteTable(con, "questions", questions_df, append = TRUE)


