const e = require("express");
const { runQuery } = require("../query");

exports.getMostSellProduct = async (req, resp) => {
    try{
    const queryString = `SELECT name from Products WHERE id = ( SELECT product_ID 
                        FROM (SELECT product_ID AS PID, SUM(Quantity)
                        AS TotalQuantity FROM Orders GROUP BY product_ID
                        DESC LIMIT 1) AS most_sell_product)`
                        await query(queryString).then((result) => {
                            if (result.status == 200) {
                                return resp.status(200).json({
                                    data: result.recordset[0]
                                })
                            }
                            else {
                                console.log(result); // for debuging purpose should not be pushed on the deployment
                
                                return resp.status(500).json({
                                    message: "Something went wrong"
                                })
                            }
                
                        }).catch((err) => {
                            console.log(err); // for debuging purpose should not be pushed on the deployment
                
                            return resp.status(500).json({
                                message: "Something went wrong"
                            })
                        })
                        
                    } catch (err) {
                        console.log(err); // for debuging purpose should not be pushed on
                
                        return resp.status(500).json({
                            message: "Something went wrong"
                        })
                    
    }
}

exports.getMostSellProduct = async (req, resp) => {
    try{
        const customerID = req.query.customerID;
    const queryString = `SELECT name from Products WHERE id = ( SELECT product_ID 
                        FROM (SELECT product_ID AS PID, SUM(Quantity)
                        AS TotalQuantity FROM Orders 
                        WHERE customer_ID = '${customerID}' GROUP BY product_ID
                        DESC LIMIT 1) AS most_sell_product)`
                        
                        await runQuery(queryString).then((result) => {
                            if (result.status == 200) {
                                return resp.status(200).json({
                                    data: result.recordset[0]
                                })
                            }
                            else {
                                console.log(result); // for debuging purpose should not be pushed on the deployment
                
                                return resp.status(500).json({
                                    message: "Something went wrong"
                                })
                            }
                
                        }).catch((err) => {
                            console.log(err); // for debuging purpose should not be pushed on the deployment
                
                            return resp.status(500).json({
                                message: "Something went wrong"
                            })
                        })
                        
                    } catch (err) {
                        console.log(err); // for debuging purpose should not be pushed on
                
                        return resp.status(500).json({
                            message: "Something went wrong"
                        })
                    
    }
}