options(encoding='UTF-8')
library(plumber)
r <- plumb("quiz.R")
r$run(host = "0.0.0.0", port = 8001, swagger=TRUE)
