const express = require("express")
const user = express.Router()
const database = require("../configures/Database")




// Note : success is used for validations in UI and also for some cases

user.get("/auth", (req, res)=>{
    try {
        const roleKey = req.header("role")

        if (roleKey) {

            
        const sqlAuth = `SELECT * FROM users WHERE user_id='${roleKey}'`

        database.query(sqlAuth, (err, results)=>{
            if (err) {
                res.status(400).json({
                    success : false,
                    message : "Having internal issues.",
                    err
                })
            } else {
                if (results.length == 0) {
                    res.status(400).json({
                        success : false,
                        message : "There is no user regstered on Details."
                    })
                } else {
                    res.status(200).json({
                        success : true,
                        message : "auth successful",
                        results
                    }) 
                }
            }
        })


      
        } else {
            res.status(401).json({
                success : false,
                message : "invalidKeys"
            }) 
        }
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Internal issues",
            error
        })
    }
})

user.post("/login", (req, res)=>{
    try {
        const userId = req.body.user_id
        const userPassword = req.body.user_password

        const sqlLogin = `SELECT * FROM users WHERE user_id='${userId}' AND user_password='${userPassword}' `

        database.query(sqlLogin, (err, results)=>{
            if (err) {
                res.status(400).json({
                    success : false,
                    message : "Having internal issues.",
                    err
                })
            } else {
                if (results.length == 0) {
                    res.status(400).json({
                        success : false,
                        message : "There is no user regstered on Details."
                    })
                } else {
                    res.status(200).json({
                        success : true,
                        message : "Login successful",
                        results
                    }) 
                }
            }
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Internal error",
            error
        })
    }

})


module.exports = user