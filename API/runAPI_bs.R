options(encoding='UTF-8')
library(plumber)
r <- plumb("bs.R")
r$run(host = "0.0.0.0", port = 8000, swagger=TRUE)

