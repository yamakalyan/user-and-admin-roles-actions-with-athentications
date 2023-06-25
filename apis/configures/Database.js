const mysql = require("mysql")

const database = mysql.createConnection({
    user : "root",
    password : "",
    database : "assisement-1",
    host : "localhost"
})

database.connect((err, result)=>{
    if (err) {
        console.log("database connections failed")
    } else {
        console.log("database connected")
    }
})

module.exports = database