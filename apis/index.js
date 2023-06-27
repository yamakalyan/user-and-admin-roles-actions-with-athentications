const express = require("express")
const user = require("./roles/userController")
const data = require("./roles/DataController")
const cors = require("cors")
const env = require("dotenv")
const app = express()

app.use(cors({origin : "*"}))
env.config()

app.listen(process.env.PORT || 3200, ()=>{
    console.log("server listening at 3200")
})

app.use(express.json())

app.use("/user", user)
app.use("/data", data)