<<<<<<< HEAD
setwd("C:/Users/s87535/Desktop/buildstuff")
options(encoding='UTF-8')
library(plumber)
r <- plumb("quiz.R")
r$run(host = "0.0.0.0", port = 8001)
=======
setwd("C:/Users/s87535/Desktop/buildstuff")
options(encoding='UTF-8')
library(plumber)
r <- plumb("quiz.R")
r$run(host = "0.0.0.0", port = 8001)
>>>>>>> 39e5ea8b74ac7e7553edd3f3330744f85e1b9677
