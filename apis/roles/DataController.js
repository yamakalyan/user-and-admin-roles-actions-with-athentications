const express = require("express")
const data = express.Router()
const database = require("../configures/Database")




// create data 
data.post("/create", (req, res) => {
    try {

        const roleKey = req.header("role")

        if (roleKey) {
            // body inputs for data creation
            const customerId = req.body.customer_id
            const orderDate = req.body.order_date
            const company = req.body.company
            const owner = req.body.owner
            const item = req.body.item
            const quantity = req.body.quantity
            const weight = req.body.weight
            const requestForShipment = req.body.req_shipment
            const trackingId = req.body.tracking_id
            const shipmentSize = req.body.shipment_size
            const boxCount = req.body.boxCount
            const specification = req.body.specification
            const checkListQunatity = req.body.check_list_qunatity


            const createQuery = `INSERT INTO data(customer_id, order_date, company, owner, item, quantity, weight,
                 req_for_shipment, tracking_id, shipment_size, box_count, specification, checklist_quantity) 
                 VALUES ('${customerId}', '${orderDate}', '${company}', '${owner}', '${item}' ,'${quantity}' ,'${weight}',
                  '${requestForShipment}', '${trackingId}', '${shipmentSize}' ,'${boxCount}', '${specification}', '${checkListQunatity}')`

            database.query(createQuery, (err, results) => {
                if (err) {
                    res.status(400).json({
                        success: false,
                        message: "Having internal issues",
                        err
                    })
                } else {
                    res.status(200).json({
                        success: true,
                        message: "Succesfully added data"
                    })
                }
            })
        } else {
            res.status(401).json({
                success: false,
                message: "invalidKeys"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal issues",
            error
        })
    }
})

function mixData(data, value){

    
}
// WHole data list with admin 
data.get("/", (req, res) => {
    try {

        const roleKey = req.header("role")

        if (roleKey) {

            
            const details = async (id) => {
                return new Promise((resolve, reject) => {
                    const quantiysql = `SELECT SUM (quantity) as quantity FROM data WHERE data_ifdeleted='0' AND customer_id='${id}' `
                    database.query(quantiysql, (err, quantityResults) => {
                        if (err) {
                            reject(err)
                        } else {
                            const weightsql = `SELECT SUM (weight) as weight FROM data WHERE data_ifdeleted='0' AND customer_id='${id}' `
                    database.query(weightsql, (err, weightResults) => {
                        if (err) {
                            reject(err)
                        } else {
                            const boxsql = `SELECT SUM (box_count) as boxcount FROM data WHERE data_ifdeleted='0' AND customer_id='${id}' `
                            database.query(boxsql, (err, boxResults) => {
                                if (err) {
                                    reject(err)
                                } else {
                                    quantityResults[0].weightResults = weightResults
                                    quantityResults[0].boxResults = boxResults
                                    resolve(quantityResults)
                                    resolve(weightResults)
                                    resolve(boxResults)
                                }
                            })
                        }
                    })
                        }
                    })
                })
            }

            const listData = `SELECT DISTINCT customer_id FROM data WHERE data_ifdeleted='0' ORDER BY customer_id ASC `

            database.query(listData, async (err, listResults) => {
                if (err) {
                    res.status(400).json({
                        success: false,
                        message: "Having internal issues",
                        err
                    })
                } else {
                    if (listResults.length == 0) {
                        res.status(400).json({
                            success: false,
                            message: "No data list found",
                        })
                    } else {

                        for (let i = 0; i < listResults.length; i++) {

                            const customerId = listResults[i].customer_id

                            listResults[i].details = await details(customerId)

                        }
                        console.log(listResults[0].details[0].weightResults[0].weight)
                        console.log(listResults[1].details[0].weightResults[0].weight)

                        res.status(200).json({
                            success: true,
                            message: "Succesfully found data",
                            listResults,
                        })
                    }
                }
            })

        } else {
            res.status(401).json({
                success: false,
                message: "invalidKeys"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal issues",
            error
        })
    }
})


data.get("/count", (req, res) => {
    try {

        const roleKey = req.header("role")

        if (roleKey) {

            const totalQuantity = async () => {
                return new Promise((resolve, reject) => {
                    const boxsql = `SELECT SUM (quantity) as total FROM data WHERE data_ifdeleted='0' `
                    database.query(boxsql, (err, quantityResults) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(quantityResults)
                        }
                    })
                })
            }

            const totalWeight = async (id) => {
                return new Promise((resolve, reject) => {
                    const weightsql = `SELECT SUM (weight) as total FROM data WHERE data_ifdeleted='0' `
                    database.query(weightsql, (err, results) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(results)
                        }
                    })
                })
            }

            const totalBoxCount = async (id) => {
                return new Promise((resolve, reject) => {
                    const boxsql = `SELECT SUM (box_count) as total FROM data WHERE data_ifdeleted='0'`
                    database.query(boxsql, (err, results) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(results)
                        }
                    })
                })
            }

            const listData = `SELECT COUNT (customer_id) as total FROM data WHERE data_ifdeleted='0'`

            database.query(listData, async (err, listResults) => {
                if (err) {
                    res.status(400).json({
                        success: false,
                        message: "Having internal issues",
                        err
                    })
                } else {
                    if (listResults.length == 0) {
                        res.status(400).json({
                            success: false,
                            message: "No data list found",
                        })
                    } else {

                        let weight = {}
                        let quantity = {}
                        let boxcount = {}

                        for (let i = 0; i < listResults.length; i++) {

                            weight =  await totalWeight()
                            quantity =  await totalQuantity()
                            boxcount = await totalBoxCount()

                            //  customerQuantity()
                        }


                        res.status(200).json({
                            success: true,
                            message: "Succesfully found total data",
                            weight,
                            quantity,
                            boxcount
                        })
                    }
                }
            })

        } else {
            res.status(401).json({
                success: false,
                message: "invalidKeys"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal issues",
            error
        })
    }
})

module.exports = data