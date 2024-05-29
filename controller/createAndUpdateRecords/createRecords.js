const e = require("express");
const { runQuery } = require("../query");
const { updateStock } = require("./updateRecords");

exports.createCustomer = async (req, resp) => {
    try {
        const { name, email, card, phone } = req.body;
        const emailRegx = new RegExp ("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");
        const cardRegx = new RegExp ("^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$");
        const rwsCard = card.replace(/\s+/g, '');

        
        if (!name || !email || !card || !phone) {
            return resp.status(400).json({
                message: "Please fill all the fields"
            });
        }
        if(!emailRegx.test(email)){
            return resp.status(400).json({
                message: "Please enter a valid email"
            });
        }

        if(!cardRegx.test(rwsCard)){
            return resp.status(400).json({
                message: "Please enter a valid card number only accept visa or Master card"
            });
        }

        const queryString = `INSERT INTO Customer (name, email, card, phone) VALUES ('${name}', '${email}', '${card}', '${phone}')`;
        await runQuery(queryString).then((res) => {
            if (res.status == 200) {
                return resp.status(200).json({
                    message: "User successfully created"
                })
            }
            else if(res?.error?.number === 2627 || res?.error?.number === 2601){
                return resp.status(400).json({
                    message: "Email already exists"
                })
            }
            else {
                console.log(res); // for debuging purpose should not be pushed on the deployment

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

        // }).catch((err) => {
        //     console.log(err); // for debuging purpose should not be pushed on the deployment

        //     return resp.status(500).json({
        //         message: "Something went wrong"
        //     })
        // })
        
    } catch (err) {
        console.log(err); // for debuging purpose should not be pushed on

        return resp.status(500).json({
            message: "Something went wrong"
        })
    }
}

exports.createProduct = async (req, resp) => {
    try {
        const { name, price, stock, active, category } = req.body;
        if (!name ||!price ||!stock ||!active ||!category) {
            return resp.status(400).json({
                message: "Please fill all the fields"
            })
        }
        else {
            const date = new Date();
            const query = `INSERT INTO Products (name, price, stock, active, category, createdAt)
                          VALUES ('${name}', '${price}', '${stock}', '${active}', '${category}', '${date}')`;
            await runQuery(query).then((result) => {
                if (result.status == 200) {
                    return resp.status(200).json({
                        message: "Product created successfully"
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
        }
    } catch (err) {
        console.log(err); // for debuging purpose should not be pushed on

        return resp.status(500).json({
            message: "Something went wrong"
        })
    }
}

exports.createOrder = async (req, resp) => {
    try {
        const { customer_ID, product_ID, quantity } = req.body;
        if (!customer_ID ||!product_ID ||!quantity ) {
            return resp.status(400).json({
                message: "Please fill all the fields"
            })
        }
        else {
            const date = new Date();
            const query = `INSERT INTO Orders (customer_ID, product_ID, quantity, createdAt)
                          VALUES ('${customer_ID}', '${product_ID}', '${quantity}', '${date}')`;
            await runQuery(query).then((result) => {
                if (result.status == 200) {
                    updateStock(product_ID, quantity) // update stock for the product
                    return resp.status(200).json({
                        message: "Order created successfully"
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
        }
    } catch (err) {
        console.log(err); // for debuging purpose should not be pushed on

        return resp.status(500).json({
            message: "Something went wrong"
        })
    }
}