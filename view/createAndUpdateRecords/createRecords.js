const e = require("express");
const { runQuery } = require("../query");

exports.createCustomer = async (req, resp) => {
    try {
        const { name, email, card, phone } = req.body;
        const emailRegx = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
        const cardRegx = "^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$"


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

        if(!cardRegx.test(card)){
            return resp.status(400).json({
                message: "Please enter a valid card number \n \
                only accept visa or Master card"
            });
        }

        const queryString = `INSERT INTO Customer (name, email, card, phone) VALUES ('${name}', '${email}', '${card}', '${phone}')`;
        await runQuery(queryString).then((result) => {
            if (result.status == 200) {
                return resp.status(200).json({
                    message: "Customer created successfully"
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

exports.createProduct = async (req, resp) => {
    try {
        const { name, price, stock, active, category } = req.body;
        if (!name ||!price ||!stock ||!active ||!category) {
            return resp.status(400).json({
                message: "Please fill all the fields"
            })
        }
        else {
            const query = `INSERT INTO Customer (name, email, card, phone) VALUES ('${name}', '${email}', '${card}', '${phone}')`;
            await runQuery(query).then((result) => {
                if (result.status == 200) {
                    return resp.status(200).json({
                        message: "Customer created successfully"
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