const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const AuthRouter = require("./Routers/AuthRouter")
const ProductRouter = require("./Routers/ProductRouter")
const cors = require("cors")
require("dotenv").config()
require("./Models/db")

const PORT = process.env.PORT || 8000;


app.get("/ping", (req, res) => {
    res.send("PONG")
})

app.use(bodyParser.json())
app.use(cors())
app.use("/auth", AuthRouter)
app.use('/products', ProductRouter)

app.listen(PORT, () => {
    console.log(`Servier is running on ${PORT}`)
})