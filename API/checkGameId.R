library(magrittr)
library(httr)
library(DBI)
source("config.R")
GET(car_api, content_type_json(), encode = "json", timeout(2)) %>%
  content()

