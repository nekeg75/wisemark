const express = require("express")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use(morgan("combined"))
app.use(bodyParser.urlencoded({ extended: true }))
require("./Routes/routes")(app)

const port = 5000

// will host http socket server on http://localhost:port
app.listen(port, () => {
  console.log("listening on port " + port)
})
