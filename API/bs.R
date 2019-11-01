# bs.R

#' @apiTitle Build Stuff 2019
#' @apiDescription Tune your car using the REST API in order to reach the max speed!
#' Get the token and fix your car problems.
#' Start with the first endpoint startGame and continue.
options(encoding='UTF-8')
library(RMariaDB)
library(DBI)
library(openssl)
library(httr)
library(jsonlite)
library(stringi)
library(dplyr)
library(magrittr)

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

#* Get your game token
#* @post /startGame
function(req){
  newest_id <- dbGetQuery(con, "select max(id) as id from game_info")
  car <- sample(data.frame(0,1,1,1))
  names(car) <- c("fuel","battery","tires","turbo_charger")
  road <- sample(data.frame(0,1))
  names(road) <- c("pithole","barrier")
  name <- "noname"
  id <- newest_id$id +1
  ip <- req$REMOTE_ADDR
  pc_id <- as.integer(stri_sub(ip, -1)) %% 2
  date <- Sys.time()
  token <- paste0(md5(paste0(id, name)))
  df <- cbind.data.frame(id, name, token, car, road, ip, pc_id, date) 
  dbWriteTable(con, "game_info", df, append = TRUE)
  list(Message = "Success",
       token = token)
}

#* Find out the problems
#* @param token Game Token
#* @get /testDrive
function(token = ""){
  if (token %in% dbGetQuery(con, "select distinct token from game_info")$token) {
    game_info <- dbGetQuery(con, paste0("select * from game_info where token = '", token, "'"))
    problems <- (4 - sum(game_info[4:7]) + sum(game_info[8:9]))
    if (problems == 0) {
      text <- "Ready to reach max speed!"
    }
    else {
      text <- paste0("Problems left: ", problems)
    }
  }
  else {
    text <- "Please enter valid token"
    
  }
}

#* List all problems
#* @param token Game Token
#* @get /diagnostics
function(token = ""){
  if (token %in% dbGetQuery(con, "select distinct token from game_info")$token) {
    dbGetQuery(con, paste0("select fuel, battery, tires, turbo_charger, pithole, barrier from game_info where token = '", token, "'"))
  }
  else {
    text <- "Please enter valid token"
    
  }
}


#* Fix road issues
#* @param token Game Token
#* @param pithole 
#* @param barrier 
#* @post /fixRoadProblem
function(token = "", pithole = "", barrier = ""){
  if (token %in% dbGetQuery(con, "select distinct token from game_info")$token) {
    if (pithole == 0) {
      dbSendQuery(con, paste0("update game_info set pithole = 0 where token = '", token, "'"))
    }
    else if (barrier == 0) {
      dbSendQuery(con, paste0("update game_info set barrier = 0 where token = '", token, "'"))
    }
    c(status = "success",
      dbGetQuery(con, paste0("select pithole, barrier from game_info where token = '", token, "'")))
  }
  else {
    text <- "Please enter valid token"
    
  }
}

#* Fix car issues
#* @param token Game Token
#* @param fuel Fuel status
#* @param battery Battery status
#* @param tires Tires status
#* @param turbo_charger Turbo charger in place
#* @post /fixCarProblem
function(token = "", fuel = "", battery = "", tires = "", turbo_charger = ""){
  if (token %in% dbGetQuery(con, "select distinct token from game_info")$token) {
    if (fuel == 1) {
      dbSendQuery(con, paste0("update game_info set fuel = 1 where token = '", token, "'"))
    }
    else if (battery == 1) {
      dbSendQuery(con, paste0("update game_info set battery = 1 where token = '", token, "'"))
    }
    else if (tires == 1) {
      dbSendQuery(con, paste0("update game_info set tires = 1 where token = '", token, "'"))
    }
    else if (turbo_charger == 1) {
      dbSendQuery(con, paste0("update game_info set turbo_charger = 1 where token = '", token, "'"))
    }
    c(status = "success",
      dbGetQuery(con, paste0("select fuel, battery, tires, turbo_charger from game_info where token = '", token, "'")))
  }
  else {
    text <- "Please enter valid token"
    
  }
}

#* Start driving!
#* @param token Game Token
#* @post /startDrive
function(token = ""){
  if (token %in% dbGetQuery(con, "select distinct token from game_info")$token) {
    game_info <- dbGetQuery(con, paste0("select * from game_info where token = '", token, "'"))
    max_speed <- (0.4 + ifelse(sum(game_info[4:7]) == 4, 0.3, 0) + ifelse(sum(game_info[8:9]) == 0, 0.3, 0))
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
