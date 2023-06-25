const express = require("express")
const user = require("./roles/userController")
const data = require("./roles/DataController")
const app = express()
const cors = require("cors")

app.use(cors({origin : "*"}))

app.listen(3200, ()=>{
    console.log("server listening at 3200")
})

app.use(express.json())

app.use("/user", user)
app.use("/data", data)