# bs.R

#' @apiTitle Build Stuff 2019
#' @apiDescription Tune your car using the REST API
options(encoding='UTF-8')
library(RMariaDB)
library(DBI)
library(openssl)
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

#* Get your game ID
#* @param driver_name Enter Your nickname
#* @post /startGame
function(driver_name = "", req){
  newest_id <- dbGetQuery(con, "select max(id) as id from game_info")
  car <- sample(data.frame(0,1,1,1))
  names(car) <- c("fuel","battery","tires","turbo_charger")
  road <- sample(data.frame(0,1))
  names(road) <- c("pithole","barrier")
  name <- driver_name
  id <- newest_id$id +1
  ip = req$REMOTE_ADDR
  token <- paste0(md5(paste0(id, name)))
  df <- cbind(id , name, token, car, road, ip)
  dbWriteTable(con, "game_info", df, append = TRUE)
  list(Message = "Success",
       token = token)
}

#* Test Drive Info
#* @param token Game Token
#* @get /testDrive
function(token = ""){
  if (token %in% dbGetQuery(con, "select distinct token from game_info")$token) {
    game_info <- dbGetQuery(con, paste0("select * from game_info where token = '", token, "'"))
    if (sum(game_info[4:9]) == 6) {
      text <- "Ready to reach max speed!"
    }
    else {
      text <- paste0("Problems left: ", (6-sum(game_info[4:9])))
    }
  }
  else {
    text <- "Please enter valid token"
    
  }
}

#* Run car diagnostics
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


#* Fix road problem
#* @param token Game Token
#* @param pithole 
#* @param barrier 
#* @post /fixRoadProblem
function(token = "", pithole = "", barrier = ""){
  if (token %in% dbGetQuery(con, "select distinct token from game_info")$token) {
    if (pithole == 1) {
      dbSendQuery(con, paste0("update game_info set pithole = 1 where token = '", token, "'"))
    }
    else if (barrier == 1) {
      dbSendQuery(con, paste0("update game_info set barrier = 1 where token = '", token, "'"))
    }
    c(status = "success",
         dbGetQuery(con, paste0("select pithole, barrier from game_info where token = '", token, "'")))
  }
  else {
    text <- "Please enter valid token"
    
  }
}

#* Fix car problem
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
    list(Message = paste0("Contratulations ", dbGetQuery(con, paste0("select name from game_info where token = '", token, "'"))$name),
         max_speed = (sum(dbGetQuery(con, paste0("select * from game_info where token = '", token, "'"))[4:9])*100/6),
         Event = "Čia kažkokį eventą galima padaryt, pvz papostinti i API/pakeisti faila/etc.",
         visi_duomenys = dbGetQuery(con, paste0("select * from game_info where token = '", token, "'")))
  }
  else {
    text <- "Please enter valid token"
  }
}

