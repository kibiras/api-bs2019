# bs.R

#' @apiTitle Build Stuff 2019 additional API
#' @apiDescription quiz + just drive endpoints
options(encoding='UTF-8')
library(RMariaDB)
library(DBI)
library(openssl)
library(dplyr)
library(magrittr)
library(jsonlite)
library(stringi)
library(httr)
library(pingr)

source("config.R")

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
  pc_id <- as.integer(stri_sub(ip, -1)) %% 2
  date <- as.character(Sys.time())
  df <- cbind.data.frame(id , name, token, q1, q2, q3, q4, q5 , ip, pc_id, date)
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
  pc_id <- questions$pc_id
  max_speed <- (0.4 + 0.4 * sum(results$points)/5)
  speed_params <- list(pc_id = pc_id, speed = max_speed)
  POST(car_api, content_type_json(), body = speed_params, encode = "json")
  list(db = results, speed = max_speed)
  
}

#* Start driving!
#* @param token Game Token
#* @post /startDriveUI
function(token = ""){
  if (token %in% dbGetQuery(con, "select distinct token from game_info")$token) {
    game_info <- dbGetQuery(con, paste0("select * from game_info where token = '", token, "'"))
    max_speed <- (0.4 + ifelse(sum(game_info[4:7]) == 4, 0.1, 0) + ifelse(sum(game_info[8:9]) == 0, 0.1, 0))
    pc_id <- game_info$pc_id
    speed_params <- list(pc_id = pc_id, speed = max_speed)
    POST(car_api, content_type_json(), body = speed_params, encode = "json")
    list(Message = paste0("Contratulations, you are ready to go!"),
         max_speed = max_speed)
  }
  else {
    text <- "Please enter valid token"
  }
}

#* Start driving!
#* @post /startJustDrive
function(req){
  ip <- req$REMOTE_ADDR
  max_speed <- 0.4
  pc_id <- as.integer(stri_sub(ip, -1)) %% 2
  speed_params <- list(pc_id = pc_id, speed = max_speed)
  POST(car_api, content_type_json(), body = speed_params, encode = "json")
  list(Message = paste0("Contratulations, you are ready to go!"),
         max_speed = max_speed)
}

#* @post /register
#* @param nickname username
#* @param email email
#* @param agreedLeaderBoard leaderboard
#* @param agreedInformation communication
function(nickname = "", email = "", agreedLeaderBoard = "", agreedInformation = "", req){
  username <- nickname
  email <- email
  leaderboard <- agreedLeaderBoard
  communication <- agreedInformation
  # game_id <- dbGetQuery(con, "select max(race_id) as game_id from event;")$game_id
  # get_id <- GET(car_api, content_type_json(), encode = "json", timeout(2)) %>%
  #   content()
  # game_id <- get_id$content
  
  if (is.na(ping(car_api, count = 1))) {
    game_id <- dbGetQuery(con, "select max(race_id) as game_id from event;")$game_id
  }
    else {
      get_id <- GET(car_api, content_type_json(), encode = "json", timeout(2)) %>%
        content()
      game_id <- get_id$content
    }
  date <- as.character(Sys.time())
  ip <- req$REMOTE_ADDR
  api_pc_id <- as.integer(stri_sub(ip, -1)) %% 2
  pc_id <- api_pc_id
  df <- cbind.data.frame(username, email, leaderboard, communication, pc_id, game_id, api_pc_id, ip, date) 
  dbWriteTable(con, "users", df, append = TRUE)
  list(Message = "Success")
}

