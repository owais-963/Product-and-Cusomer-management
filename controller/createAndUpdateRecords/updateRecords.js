const e = require("express");
const { runQuery } = require("../query");

exports.updateCustomer = async (req, resp) => {
  try {
    const { name, email, card, phone, customer_id } = req.body;
    const emailRegx = new RegExp(
      "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
    );
    const cardRegx = new RegExp(
      "^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$"
    );
    const rwsCard = card.replace(/\s+/g, "");

    if (!name || !email || !card || !phone || !customer_id) {
      return resp.status(400).json({
        message: "Please fill all the fields",
      });
    }
    if (!emailRegx.test(email)) {
      return resp.status(400).json({
        message: "Please enter a valid email",
      });
    }

    if (!cardRegx.test(rwsCard)) {
      return resp.status(400).json({
        message:
          "Please enter a valid card number only accept visa or Master card",
      });
    }

    const queryString = `UPDATE Customer set name = '${name}',
                             email = '${email}', card = '${card}', phone = '${phone}'
                             where id = '${customer_id}'`;

    await runQuery(queryString)
      .then((res) => {
        if (res.status == 200) {
          return resp.status(200).json({
            message: "User successfully updated",
          });
        } else if (res?.error?.number === 2627 || res?.error?.number === 2601) {
          return resp.status(400).json({
            message: "Email already exists",
          });
        } else {
          console.log(res); // for debuging purpose should not be pushed on the deployment

          return resp.status(500).json({
            message: "Something went wrong",
          });
        }
      })
      .catch((err) => {
        console.log(err); // for debuging purpose should not be pushed on the deployment

        return resp.status(500).json({
          message: "Something went wrong",
        });
      });

    // }).catch((err) => {
    //     console.log(err); // for debuging purpose should not be pushed on the deployment

    //     return resp.status(500).json({
    //         message: "Something went wrong"
    //     })
    // })
  } catch (err) {
    console.log(err); // for debuging purpose should not be pushed on

    return resp.status(500).json({
      message: "Something went wrong",
    });
  }
};

exports.updateProduct = async (req, resp) => {
  try {
    const { name, price, stock, active, category, id } = req.body;
    if (!name || !price || !stock || !active || !category || !id) {
      return resp.status(400).json({
        message: "Please fill all the fields",
      });
    } else {
      const date = new Date();
      const query = `UPDATE Products set name= '${name}', price='${price}',
                         stock = '${stock}', active = '${active}',
                         category = '${category}', updatedAt = '${date}'
                         where id = '${id}';`;
      await runQuery(query)
        .then((result) => {
          if (result.status == 200) {
            return resp.status(200).json({
              message: "Product update successfully",
            });
          } else {
            console.log(result); // for debuging purpose should not be pushed on the deployment
            return resp.status(500).json({
              message: "Something went wrong",
            });
          }
        })
        .catch((err) => {
          console.log(err); // for debuging purpose should not be pushed on the deployment

          return resp.status(500).json({
            message: "Something went wrong",
          });
        });
    }
  } catch (err) {
    console.log(err); // for debuging purpose should not be pushed on

    return resp.status(500).json({
      message: "Something went wrong",
    });
  }
};

exports.updateStock = async (id, stock) => {
  try {
    var getStock = 0;
    if (!stock || !id) {
      return resp.status(400).json({
        message: "Please fill all the fields",
      });
    } else {
      await runQuery(`SELECT stock FROM Products WHERE id = '${id}';`)
        .then((result) => {
          if (result.status == 200) {
            getStock = result.result.recordset[0].stock
            
          } else {
            console.log(result); // for debuging purpose should not be pushed on the deployment
            return {
              message: "Something went wrong",
            };
          }
        })
        .catch((err) => {
          console.log(err); // for debuging purpose should not be pushed on the deployment

          return {
            message: "Something went wrong",
          };
        });

        getStock =   getStock - stock; 
        const query = `UPDATE Products set
                         stock = '${getStock}' where id = '${id}';`;

      await runQuery(query)
        .then((result) => {
          if (result.status == 200) {
            return {
              message: "Product created successfully",
            };
          } else {
            console.log(result); // for debuging purpose should not be pushed on the deployment
            return {
              message: "Something went wrong",
            };
          }
        })
        .catch((err) => {
          console.log(err); // for debuging purpose should not be pushed on the deployment

          return{
            message: "Something went wrong",
          };
        });
    }
  } catch (err) {
    console.log(err); // for debuging purpose should not be pushed on

    return {
      message: "Something went wrong",
    };
  }
};

