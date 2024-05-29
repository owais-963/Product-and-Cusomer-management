const e = require("express");
const { runQuery } = require("./query");

exports.getMostSellProduct = async (req, resp) => {
  try {
    const c_id = req.query.c_id;
    if (!c_id) {
      return resp.status(400).json({
        message: "Customer ID is required",
      });
    }
    const queryString = `SELECT name from Products WHERE id = ( SELECT PID 
                        FROM (SELECT TOP 1 product_ID AS PID, SUM(Quantity)
                        AS TotalQuantity FROM Orders WHERE customer_ID = '${c_id}' GROUP BY product_ID
                        Order By TotalQuantity DESC) AS most_sell_product)`;
    await runQuery(queryString)
      .then((result) => {
        if (result.status == 200) {
          return resp.status(200).json({
            data: result.result.recordsets
          });
        } else {
          console.log("QUERY ERROR:  ",result); // for debuging purpose should not be pushed on the deployment

          return resp.status(500).json({
            message: "Something went wrong",
          });
        }
      })
      .catch((err) => {
        console.log("Catch Error ",err); // for debuging purpose should not be pushed on the deployment

        return resp.status(500).json({
          message: "Something went wrong",
        });
      });
  } catch (err) {
    console.log("Catch Error ",err); // for debuging purpose should not be pushed on

    return resp.status(500).json({
      message: "Something went wrong",
    });
  }
};

exports.getPercenatgetOfEachSoldProduct = async (req, resp) => {
  try {
    const customerID = req.query.customerID;
    const queryString = `WITH TotalQuantity AS (SELECT SUM(quantity) AS TotalQuantity 
                        FROM orders WHERE customer_ID = '${customerID}'),CategoryQuantity AS 
                        (SELECT products.category AS category, SUM(orders.quantity) AS quantity 
                        FROM orders INNER JOIN products ON orders.product_ID = products.id 
                        WHERE orders.customer_ID = '${customerID}' GROUP BY products.category) SELECT 
                        cq.category,cq.quantity, ROUND((cq.quantity * 100.0 / tq.TotalQuantity), 2) AS Percentage
                        FROM CategoryQuantity cq, TotalQuantity tq;`

    await runQuery(queryString)
      .then((result) => {
        if (result.status == 200) {
          return resp.status(200).json({
            data: result.result.recordsets,
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
  } catch (err) {
    console.log(err); // for debuging purpose should not be pushed on

    return resp.status(500).json({
      message: "Something went wrong",
    });
  }
};

exports.getMostfrequentBuyProduct = async (req, resp) => {
    try {
      const queryString = `with productID as
      (select product_ID, COUNT(product_ID) as ProductCount from orders
      INNER JOIN Products on Orders.product_ID = Products.id group by product_ID)
      select TOP 1 Products.id as productID, products.name as product_name, productID.ProductCount as Product_count from Products
      Inner JOIN productID on products.id = productID.product_ID  ORDER By ProductCount DESC;`
  
      await runQuery(queryString)
        .then((result) => {
          if (result.status == 200) {
            return resp.status(200).json({
              data: result.result.recordsets,
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
    } catch (err) {
      console.log(err); // for debuging purpose should not be pushed on
  
      return resp.status(500).json({
        message: "Something went wrong",
      });
    }
  };

exports.sortProduct = async(req, resp) => {
    try {
        const id = req.query.customer_id;
        console.log("ID... ",id);
      const queryString = `SELECT p.id AS ProductID, p.name AS ProductName, 
      p.category AS Category, SUM(o.quantity) AS TotalQuantityOrdered
      FROM Products p INNER JOIN Orders o ON p.id = o.product_ID  where o.customer_ID = '${id}'
      GROUP BY p.id, p.name, p.category ORDER BY TotalQuantityOrdered DESC;`

      await runQuery(queryString)
      .then((result) => {
        if (result.status == 200) {
          return resp.status(200).json({
            data: result.result.recordsets,
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
    } catch (err) {
        console.log(err); // for debuging purpose should not be pushed on
    
        return resp.status(500).json({
          message: "Something went wrong",
        });
      }
    };
    