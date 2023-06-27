const mysql = require("mysql")
const env = require("dotenv")

env.config()

const database = mysql.createConnection({
    user : process.env.USER,
    password : "",
    database : process.env.DATABASE,
    host : process.env.HOST
})

database.connect((err, result)=>{
    if (err) {
        console.log("database connections failed")
    } else {
        console.log("database connected")
    }
})

module.exports = database