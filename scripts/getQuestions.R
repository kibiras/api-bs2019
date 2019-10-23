library(httr)
library(tidyverse)
library(textutils)
library(DBI)
library(RMariaDB)
con <- dbConnect(RMariaDB::MariaDB(), 
                 host = "lsp7490d.sebank.se",
                 user = "root", 
                 db = "seb")

questions <- GET("https://opentdb.com/api.php?amount=32&category=18&type=boolean") %>%
  content(as="parsed") 
questions_df <- map_df(questions$results, magrittr::extract)
questions_df$question <- HTMLdecode(questions_df$question)
saveRDS(questions_df, "questions.rds")
questions_df <- readRDS("questions.rds")

questions_df <- questions_df %>%
  mutate(id = row_number()) %>%
  select(id, category, difficulty, question, correct_answer)
dbSendQuery(con, "drop table seb.questions")
dbWriteTable(con, "questions", questions_df, append = TRUE)


