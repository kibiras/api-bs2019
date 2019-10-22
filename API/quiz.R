<<<<<<< HEAD
# bs.R

#' @apiTitle Build Stuff 2019
#' @apiDescription Tune your car using the REST API
options(encoding='UTF-8')
library(RMariaDB)
library(DBI)
library(openssl)
library(dplyr)
library(magrittr)
con <- dbConnect(RMariaDB::MariaDB(), user = "root", db = "seb")

#* Log some information about the incoming request
#* @filter logger
function(req){
  cat(as.character(Sys.time()), "-", 
      req$REQUEST_METHOD, req$PATH_INFO, "-", 
      req$HTTP_USER_AGENT, "@", req$REMOTE_ADDR, "\n")
  plumber::forward()
}

#* @filter cors
cors <- function(res) {
  res$setHeader("Access-Control-Allow-Origin", "*")
  plumber::forward()
}


#* Get questions
#* @param name Enter Your nickname
#* @get /getQuestions
function(name = "", req){
  newest_id <- dbGetQuery(con, "select max(id) as id from game_quiz")
  questions <- dbGetQuery(con, "SELECT * FROM questions
                          ORDER BY RAND()
                          LIMIT 5")
  id <- ifelse(is.na(newest_id$id), 1, newest_id$id + 1)
  questions <- arrange(questions, id)
  token <- paste0(md5(paste0(id, name)))
  ip = req$REMOTE_ADDR
  q1 <- questions$id[1]
  q2 <- questions$id[2]
  q3 <- questions$id[3]
  q4 <- questions$id[4]
  q5 <- questions$id[5]
  df <- cbind.data.frame(id , name, token, q1, q2, q3, q4, q5 , ip)
  dbWriteTable(con, "game_quiz", df, append = TRUE)
  list(quiz = df, questions = questions)
  
}

#* Post answers
#* @param token Game Token
#* @param a1 Answer 1
#* @param a2 Answer 2
#* @param a3 Answer 3
#* @param a4 Answer 4
#* @param a5 Answer 5
#* @post /postQuizResults
function(token = "", a1 = "", a2 = "", a3 = "", a4 = "", a5 = ""){
  answer <- c(a1, a2, a3, a4, a5)
  questions <- dbGetQuery(con, paste0('SELECT * FROM seb.game_quiz WHERE token = "', token, '"'))
  db <-dbGetQuery(con, paste0('SELECT * FROM seb.questions WHERE id IN (', paste(questions[4:8], collapse = ","), ')'))
  results <- cbind.data.frame(db, answer) %>%
    mutate(points = ifelse(correct_answer == answer, 1, 0))
  list(db = results, speed = sum(results$points)/5)
  
}

=======
# bs.R

#' @apiTitle Build Stuff 2019
#' @apiDescription Tune your car using the REST API
options(encoding='UTF-8')
library(RMariaDB)
library(DBI)
library(openssl)
library(dplyr)
library(magrittr)
con <- dbConnect(RMariaDB::MariaDB(), user = "root", db = "seb")

#* Log some information about the incoming request
#* @filter logger
function(req){
  cat(as.character(Sys.time()), "-", 
      req$REQUEST_METHOD, req$PATH_INFO, "-", 
      req$HTTP_USER_AGENT, "@", req$REMOTE_ADDR, "\n")
  plumber::forward()
}

#* @filter cors
cors <- function(res) {
  res$setHeader("Access-Control-Allow-Origin", "*")
  plumber::forward()
}


#* Get questions
#* @param name Enter Your nickname
#* @get /getQuestions
function(name = "", req){
  newest_id <- dbGetQuery(con, "select max(id) as id from game_quiz")
  questions <- dbGetQuery(con, "SELECT * FROM questions
                          ORDER BY RAND()
                          LIMIT 5")
  id <- ifelse(is.na(newest_id$id), 1, newest_id$id + 1)
  questions <- arrange(questions, id)
  token <- paste0(md5(paste0(id, name)))
  ip = req$REMOTE_ADDR
  q1 <- questions$id[1]
  q2 <- questions$id[2]
  q3 <- questions$id[3]
  q4 <- questions$id[4]
  q5 <- questions$id[5]
  df <- cbind.data.frame(id , name, token, q1, q2, q3, q4, q5 , ip)
  dbWriteTable(con, "game_quiz", df, append = TRUE)
  list(quiz = df, questions = questions)
  
}

#* Post answers
#* @param token Game Token
#* @param a1 Answer 1
#* @param a2 Answer 2
#* @param a3 Answer 3
#* @param a4 Answer 4
#* @param a5 Answer 5
#* @post /postQuizResults
function(token = "", a1 = "", a2 = "", a3 = "", a4 = "", a5 = ""){
  answer <- c(a1, a2, a3, a4, a5)
  questions <- dbGetQuery(con, paste0('SELECT * FROM seb.game_quiz WHERE token = "', token, '"'))
  db <-dbGetQuery(con, paste0('SELECT * FROM seb.questions WHERE id IN (', paste(questions[4:8], collapse = ","), ')'))
  results <- cbind.data.frame(db, answer) %>%
    mutate(points = ifelse(correct_answer == answer, 1, 0))
  list(db = results, speed = sum(results$points)/5)
  
}

>>>>>>> 39e5ea8b74ac7e7553edd3f3330744f85e1b9677
