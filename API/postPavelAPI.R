library(httr)
library(jsonlite)
body = '{
"pc_id":0,
"speed":0.6
}
'
POST("http://127.0.0.1:9000/api/config", content_type_json(), body = body, encode = "json")

a <- GET("http://127.0.0.1:9000/api/config", content_type_json(), encode = "json")

aa <- fromJSON(body)

speed_params <- list(pc_id = 0, speed = 0)
