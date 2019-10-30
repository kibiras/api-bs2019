options(encoding='UTF-8')
library(plumber)
r <- plumb("bs_test_api.R")
r$run(host = "0.0.0.0", port = 8002, swagger=TRUE)
