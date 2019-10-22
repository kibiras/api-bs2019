<<<<<<< HEAD
options(encoding='UTF-8')
library(plumber)
r <- plumb("bs.R")
r$run(host = "0.0.0.0", port = 8000, swagger=TRUE)
=======
options(encoding='UTF-8')
library(plumber)
r <- plumb("bs.R")
r$run(host = "0.0.0.0", port = 8000)
>>>>>>> 39e5ea8b74ac7e7553edd3f3330744f85e1b9677
